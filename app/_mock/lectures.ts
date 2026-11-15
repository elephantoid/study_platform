import { MOCK_ATTRIBUTIONS } from "./sources";
import type { LectureView } from "./types";

/**
 * CS329Z Lecture 1 목업 데이터
 * - videoId: DGI4vucR71w
 * - durationSec: 4176 (69분 36초)
 * - 사용자 지침 준수:
 *   1) 전체 요약(summaryMd)은 하지 않고 Syllabus에 나온 Slides와 함께 공부할 수 있는 구조로 구성
 *   2) 세그먼트 내용은 자리표시자(Placeholder)로 둠
 */
export const MOCK_LECTURES: Record<string, LectureView> = {
  "cs329z-lec01": {
    id: "cs329z-lec01",
    course: "CS329Z",
    term: "Autumn 2026",
    title: "Lecture 1: Introduction to Engineering AI Agents",
    videoId: "DGI4vucR71w",
    durationSec: 4176,
    syllabus: {
      lectureNo: 1,
      date: "2026-11-09",
      instructor: "Diyi Yang, Michael Ryan, John Yang",
      syllabusUrl: "https://cs329z.stanford.edu/",
      slidesTitle: "CS329Z Lecture 1 Slides — Compound AI Systems & Agentic Foundations (PDF)",
      slidesUrl: "https://cs329z.stanford.edu/",
      deckPageCount: 58,
      readingLinks: [
        {
          title: "[Syllabus Reading 1] The Shift from Models to Compound AI Systems (BAIR)",
          url: "https://bair.berkeley.edu/blog/2024/02/18/compound-ai-systems/",
        },
        {
          title: "[Syllabus Reading 2] ReAct: Synergizing Reasoning and Acting in Language Models",
          url: "https://arxiv.org/abs/2210.03629",
        },
      ],
    },
    segments: [
      {
        id: "cs329z-l01-s01",
        startSec: 0,
        endSec: 420,
        title: "Segment 1: Course Logistics & Why AI Agents Now",
        summaryKo:
          "[세그먼트 1 자리표시자] Syllabus 개요 및 단일 LLM 호출에서 자율 에이전트 시스템으로의 전환 배경을 슬라이드와 함께 확인하는 구간입니다.",
        slideRange: "Slides 1–11",
        slideKeyPointsPlaceholder: [
          "[Slide 01–04 자리표시자] CS329Z 커리큘럼 로드맵 및 평가 기준",
          "[Slide 05–08 자리표시자] 정적 프롬프트 모델 vs 환경과 상호작용하는 에이전트 정의",
          "[Slide 09–11 자리표시자] 에이전트 엔지니어링의 3대 축: Reasoning, Tool Use, Memory",
        ],
        questionIds: ["q-mle-bias-variance-concept"],
      },
      {
        id: "cs329z-l01-s02",
        startSec: 420,
        endSec: 1260,
        title: "Segment 2: Anatomy of an AI Agent & Compound Systems",
        summaryKo:
          "[세그먼트 2 자리표시자] 에이전트 아키텍처 다이어그램 슬라이드(Planner, Executor, Verifier)를 영상 설명과 대조하며 학습하는 구간입니다.",
        slideRange: "Slides 12–24",
        slideKeyPointsPlaceholder: [
          "[Slide 12–16 자리표시자] Compound AI System 구성 요소 다이어그램",
          "[Slide 17–20 자리표시자] 계획(Planning) 및 작업 분해(Task Decomposition) 패턴",
          "[Slide 21–24 자리표시자] 모델 크기 확장 vs 시스템 엔지니어링 트레이드오프",
        ],
        questionIds: ["q-mle-bias-variance-concept"],
      },
      {
        id: "cs329z-l01-s03",
        startSec: 1260,
        endSec: 2190,
        title: "Segment 3: Reasoning Loops (CoT, ReAct, Reflexion)",
        summaryKo:
          "[세그먼트 3 자리표시자] ReAct(Reason + Act) 프롬프트 트레이스 슬라이드와 실패 모드 사례를 영상 타임스탬프에 맞춰 따라가는 구간입니다.",
        slideRange: "Slides 25–38",
        slideKeyPointsPlaceholder: [
          "[Slide 25–29 자리표시자] Chain-of-Thought(CoT) vs ReAct 루프 수식 및 트레이스 비교",
          "[Slide 30–34 자리표시자] 외부 도구 호출(Tool Calling) JSON 스키마 및 Observation 주입",
          "[Slide 35–38 자리표시자] 무한 루프(Looping) 및 도구 인자 환각 사례 분석",
        ],
        questionIds: ["q-agent-react-open"],
      },
      {
        id: "cs329z-l01-s04",
        startSec: 2190,
        endSec: 3240,
        title: "Segment 4: Memory Hierarchy & Context Engineering",
        summaryKo:
          "[세그먼트 4 자리표시자] 단기 컨텍스트 윈도우와 장기 외부 메모리(Episodic / Semantic) 슬라이드 도식을 함께 공부하는 구간입니다.",
        slideRange: "Slides 39–49",
        slideKeyPointsPlaceholder: [
          "[Slide 39–42 자리표시자] Working Memory(컨텍스트 창) 대역폭과 Attention 병목",
          "[Slide 43–46 자리표시자] Episodic / Procedural / Semantic Memory 계층 설계",
          "[Slide 47–49 자리표시자] 컨텍스트 압축 및 Subagent 격리 패턴",
        ],
        questionIds: ["q-rs-attention-mcq"],
      },
      {
        id: "cs329z-l01-s05",
        startSec: 3240,
        endSec: 4176,
        title: "Segment 5: Evaluation Benchmarks, Safety & Course Project",
        summaryKo:
          "[세그먼트 5 자리표시자] 에이전트 벤치마크(SWE-bench, WebArena, GAIA) 슬라이드 표와 안전 가드레일 설계 원칙을 점검하는 구간입니다.",
        slideRange: "Slides 50–58",
        slideKeyPointsPlaceholder: [
          "[Slide 50–53 자리표시자] End-to-End 성공률 vs 스텝별 루브릭 평가(Trajectory Eval)",
          "[Slide 54–56 자리표시자] 부작용(Side-effect) 통제 및 Human-in-the-loop 가드레일",
          "[Slide 57–58 자리표시자] 학기 프로젝트 안내 및 다음 강의 예고",
        ],
        questionIds: ["q-agent-react-open"],
      },
    ],
    attribution: MOCK_ATTRIBUTIONS["src-stanford-cs329z"],
  },
};
