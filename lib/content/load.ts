import "server-only";

import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import type {
  Attribution,
  CardSummary,
  CardType,
  CardView,
  ContentStatus,
  Dashboard,
  FollowUpItem,
  LectureSegmentView,
  LectureSummary,
  LectureSyllabus,
  LectureView,
  RoleId,
  SegmentRef,
  SlideStudyUnit,
  Topic,
} from "./types";
import { isQuizType } from "./types";

/**
 * content/ 를 서버에서만 읽어 API.md 모양으로 만든다. 클라이언트 번들에는 들어가지 않는다 ("server-only").
 * 규칙은 PR #7 server/src/content/loader.rs 와 같게 둔다: `## 문제`/`## 해설` 구간, attribution.url 우선순위
 * (노트 canonicalUrl → 강의 구간 → 출처 URL), rubric 은 내보내지 않음.
 */

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");
const MANIFEST = path.join(ROOT, "pipeline", "manifests", "videos.json");

const ROLE_NAMES: Record<RoleId, string> = {
  agent: "Agent Engineer",
  mle: "ML Engineer",
  rs: "Research Scientist",
  ds: "Data Scientist",
};

type Front = Record<string, unknown>;
type Source = { id: string; url: string; license: string; reuse: Attribution["reuse"]; attribution: string };
type RawLecture = Front & { segments?: Front[]; syllabus?: LectureSyllabus };

type Store = {
  sources: Map<string, Source>;
  topics: Topic[];
  notes: Map<string, { canonicalUrl: string }>;
  cards: Map<string, CardView>;
  lectures: Map<string, RawLecture>;
};

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.isFile() && e.name.endsWith(".md") ? [p] : [];
  });
}

export function splitFront(text: string): { front: Front; body: string } {
  if (!text.startsWith("---\n")) throw new Error("missing frontmatter");
  const end = text.indexOf("\n---\n", 3);
  if (end < 0) throw new Error("unterminated frontmatter");
  return { front: YAML.parse(text.slice(4, end)) ?? {}, body: text.slice(end + 5).trim() };
}

/** `## 문제` 구간과 `## 해설` 이후 전부. loader.rs `sections` 와 같다. */
export function sections(body: string): { promptMd: string; explanationMd?: string } {
  const [first, ...rest] = body.split("\n");
  if (first.trimEnd() !== "## 문제") throw new Error("body must start with a '## 문제' line");
  const i = rest.findIndex((l) => l.trimEnd() === "## 해설");
  if (i < 0) return { promptMd: rest.join("\n").trim() };
  return { promptMd: rest.slice(0, i).join("\n").trim(), explanationMd: rest.slice(i + 1).join("\n").trim() };
}

const str = (v: unknown) => (v == null ? "" : String(v));

/** 개발 미리보기 플래그. 서버 전용 env 라 빌드 번들에 새겨지지 않는다 (CONTRACT §5). */
function showDraft(): boolean {
  return process.env.STUDY_SHOW_DRAFT === "1";
}

let cache: Store | null = null;

function store(): Store {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const sources = new Map<string, Source>(
    (YAML.parse(fs.readFileSync(path.join(CONTENT, "sources.yaml"), "utf8")) as Source[]).map((s) => [s.id, s])
  );
  const rawTopics = YAML.parse(fs.readFileSync(path.join(CONTENT, "topics.yaml"), "utf8")) as Omit<
    Topic,
    "cardCounts"
  >[];

  const notes = new Map<string, { canonicalUrl: string }>();
  for (const f of walk(path.join(CONTENT, "notes"))) {
    const { front } = splitFront(fs.readFileSync(f, "utf8"));
    notes.set(str(front.id), { canonicalUrl: str(front.canonicalUrl) });
  }

  const lectures = new Map<string, RawLecture>();
  const segments = new Map<string, SegmentRef>();
  for (const f of walk(path.join(CONTENT, "lectures"))) {
    const { front } = splitFront(fs.readFileSync(f, "utf8"));
    const lec = front as RawLecture;
    lectures.set(str(lec.id), lec);
    for (const s of lec.segments ?? []) {
      segments.set(str(s.id), {
        id: str(s.id),
        lectureId: str(lec.id),
        videoId: str(lec.videoId),
        startSec: Number(s.startSec),
      });
    }
  }
  // 강의 파일이 없는 구간은 manifest(CONTRACT §3.1 정본)에서 푼다. 컨테이너 이미지에는 없을 수 있다.
  if (fs.existsSync(MANIFEST)) {
    const m = JSON.parse(fs.readFileSync(MANIFEST, "utf8")) as Record<
      string,
      { videos: Record<string, { videoId: string; lectureId?: string; segments?: { id: string; startSec: number }[] }> }
    >;
    for (const e of Object.values(m))
      for (const v of Object.values(e.videos))
        for (const s of v.segments ?? [])
          if (!segments.has(s.id) && v.lectureId)
            segments.set(s.id, { id: s.id, lectureId: v.lectureId, videoId: v.videoId, startSec: s.startSec });
  }

  const cards = new Map<string, CardView>();
  for (const f of walk(path.join(CONTENT, "questions"))) {
    const { front, body } = splitFront(fs.readFileSync(f, "utf8"));
    const source = sources.get(str(front.sourceId));
    if (!source) throw new Error(`${f}: unknown sourceId ${str(front.sourceId)}`);
    const { promptMd, explanationMd } = sections(body);
    const rt = (front.reviewTarget ?? {}) as { noteId?: string; segmentId?: string };
    const note = rt.noteId ? notes.get(rt.noteId) : undefined;
    const segment = rt.segmentId ? segments.get(rt.segmentId) : undefined;
    const url = note
      ? note.canonicalUrl
      : segment
        ? `https://www.youtube.com/watch?v=${segment.videoId}&t=${segment.startSec}s`
        : source.url;
    const type = front.type as CardType;
    const rubric = front.rubric as { modelAnswerKo?: string } | undefined;
    const followUps = (front.followUps as FollowUpItem[] | undefined)?.slice().sort((a, b) => a.order - b.order);
    const card: CardView = {
      id: str(front.id),
      topicId: str(front.topicId),
      sourceId: source.id,
      type,
      difficulty: front.difficulty as CardView["difficulty"],
      roles: (front.roles as RoleId[] | undefined) ?? [],
      status: (front.status as ContentStatus | undefined) ?? "draft",
      promptMd,
      ...(type === "concept" && explanationMd !== undefined ? { explanationMd } : {}),
      ...(type === "mcq" && Array.isArray(front.choices) ? { choices: front.choices as string[] } : {}),
      ...(type === "open" && rubric?.modelAnswerKo ? { modelAnswerKo: rubric.modelAnswerKo } : {}),
      reviewTarget: { ...(rt.noteId ? { noteId: rt.noteId } : {}), ...(segment ? { segment } : {}) },
      attribution: {
        sourceId: source.id,
        license: source.license,
        reuse: source.reuse,
        attribution: source.attribution,
        url,
      },
      ...(followUps?.length === 3 ? { followUps: followUps as CardView["followUps"] } : {}),
    };
    cards.set(card.id, card);
  }

  const topics: Topic[] = rawTopics.map((t) => ({ ...t, cardCounts: { concept: 0, quiz: 0 } }));
  const parents = new Map(rawTopics.map((t) => [t.id, t.parentId]));
  const byId = new Map(topics.map((t) => [t.id, t]));
  for (const c of cards.values()) {
    // 그 토픽과 모든 상위 토픽에 센다 (API.md `cardCounts`).
    for (let id: string | undefined = c.topicId; id; id = parents.get(id)) {
      const t = byId.get(id);
      if (t) t.cardCounts[isQuizType(c.type) ? "quiz" : "concept"] += 1;
    }
  }

  cache = { sources, topics, notes, cards, lectures };
  return cache;
}

// ---------------------------------------------------------------- cards

export function getCard(id: string): CardView | null {
  return store().cards.get(id) ?? null;
}

export function listCards(): CardSummary[] {
  return [...store().cards.values()]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((c) => ({
      id: c.id,
      type: c.type,
      topicId: c.topicId,
      sourceId: c.sourceId,
      difficulty: c.difficulty,
      roles: c.roles,
      status: c.status,
      promptMd: c.promptMd,
      hasFollowUps: Boolean(c.followUps),
    }));
}

/** 출처 id → 배지용 Attribution (url 은 출처 URL). 목록 행처럼 카드 attribution 이 없는 곳에 쓴다. */
export function sourceAttributions(): Record<string, Attribution> {
  return Object.fromEntries(
    [...store().sources.values()].map((s) => [
      s.id,
      { sourceId: s.id, license: s.license, reuse: s.reuse, attribution: s.attribution, url: s.url },
    ])
  );
}

export function listTopics(): Topic[] {
  return store().topics;
}

export function topicName(id: string): string {
  return store().topics.find((t) => t.id === id)?.name ?? id;
}

// ---------------------------------------------------------------- lectures

function lectureAttribution(lec: RawLecture): Attribution {
  const s = store().sources.get(str(lec.sourceId));
  if (!s) throw new Error(`lecture ${str(lec.id)}: unknown sourceId ${str(lec.sourceId)}`);
  return {
    sourceId: s.id,
    license: s.license,
    reuse: s.reuse,
    attribution: s.attribution,
    url: `https://www.youtube.com/watch?v=${str(lec.videoId)}`,
  };
}

function canShowGenerated(status: ContentStatus): boolean {
  return status === "reviewed" || status === "published" || showDraft();
}

/**
 * CONTRACT §5: draft 강의는 생성 콘텐츠(summaryKo, syllabus, slideUnits)를 학습자 화면에 보이지 않는다.
 * 렌더링 단계가 아니라 여기서 필드 자체를 빼므로 HTML·RSC payload·JS 번들 어디에도 실리지 않는다.
 */
export function getLecture(id: string): LectureView | null {
  const lec = store().lectures.get(id);
  if (!lec) return null;
  const status = (lec.status as ContentStatus | undefined) ?? "draft";
  const shown = canShowGenerated(status);
  const qBySeg = new Map<string, { id: string; type: CardType }[]>();
  for (const c of [...store().cards.values()].sort((a, b) => a.id.localeCompare(b.id))) {
    const sid = c.reviewTarget.segment?.id;
    if (sid) qBySeg.set(sid, [...(qBySeg.get(sid) ?? []), { id: c.id, type: c.type }]);
  }
  const segments: LectureSegmentView[] = (lec.segments ?? []).map((s) => ({
    id: str(s.id),
    startSec: Number(s.startSec),
    endSec: Number(s.endSec),
    title: str(s.title),
    questions: qBySeg.get(str(s.id)) ?? [],
    ...(shown
      ? {
          ...(s.summaryKo ? { summaryKo: str(s.summaryKo) } : {}),
          ...(s.slideRange ? { slideRange: str(s.slideRange) } : {}),
          ...(Array.isArray(s.slideUnits) ? { slideUnits: s.slideUnits as SlideStudyUnit[] } : {}),
        }
      : {}),
  }));
  return {
    id: str(lec.id),
    sourceId: str(lec.sourceId),
    course: str(lec.course).toUpperCase(),
    term: str(lec.term),
    title: str(lec.title),
    videoId: str(lec.videoId),
    durationSec: Number(lec.durationSec),
    status,
    generatedContentShown: shown,
    ...(shown && lec.syllabus ? { syllabus: lec.syllabus } : {}),
    segments,
    attribution: lectureAttribution(lec),
  };
}

export function listLectures(): LectureSummary[] {
  return [...store().lectures.values()]
    .map((lec) => ({
      id: str(lec.id),
      course: str(lec.course).toUpperCase(),
      term: str(lec.term),
      title: str(lec.title),
      durationSec: Number(lec.durationSec),
      status: ((lec.status as ContentStatus | undefined) ?? "draft") as ContentStatus,
      attribution: lectureAttribution(lec),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

// ---------------------------------------------------------------- dashboard

/** 사용자 상태(dueCount·숙련도)는 백엔드가 없어 0 이다. 나머지는 content/ 에서 계산한다. */
export function getDashboard(role: RoleId): Dashboard {
  const { topics, cards, sources } = store();
  const leaf = topics
    .filter((t) => t.parentId && t.roles[role] && t.cardCounts.concept + t.cardCounts.quiz > 0)
    .sort((a, b) => (b.roles[role] ?? 0) - (a.roles[role] ?? 0) || a.name.localeCompare(b.name));
  return {
    role: { id: role, name: ROLE_NAMES[role] },
    dueCount: 0,
    topics: leaf.map((t) => {
      const srcIds = [...new Set([...cards.values()].filter((c) => c.topicId === t.id).map((c) => c.sourceId))].sort();
      return {
        id: t.id,
        name: t.name,
        weight: t.roles[role] ?? 0,
        cardCounts: t.cardCounts,
        sources: srcIds.flatMap((id) => {
          const s = sources.get(id);
          return s ? [{ sourceId: s.id, license: s.license, reuse: s.reuse, attribution: s.attribution, url: s.url }] : [];
        }),
      };
    }),
    lectures: listLectures(),
  };
}

export { ROLE_NAMES };
