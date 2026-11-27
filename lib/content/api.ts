import "server-only";

import type { CardSummary, CardView, Topic } from "./types";

/**
 * Rust 콘텐츠 API(server/, docs/API.md) 클라이언트. lib/content/load.ts 와 같은 타입을 돌려준다.
 * 응답 모양이 로더와 같은지는 tests/parity/ 가 필드 단위로 본다.
 *
 * 실패는 숨기지 않는다: 없는 카드(404)만 null 이고, 연결 실패·시간 초과·5xx 는 예외로 올려 페이지를 500 으로 만든다.
 * 파일 로더로 몰래 되돌아가지 않는 이유: API 를 쓰기로 설정했는데 다른 데이터가 보이면 설정 오류가 가려진다.
 */

const TIMEOUT_MS = 5_000;
const PAGE = 200; // API.md `limit` 상한
/** API.md §1.1 `INVALID_ID` 와 같은 규칙. 이 형식이 아니면 요청하지 않고 없는 카드로 본다. */
const CARD_ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export class ContentApiError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ContentApiError";
  }
}

async function request(base: string, path: string): Promise<Response> {
  const url = `${base.replace(/\/+$/, "")}${path}`;
  try {
    return await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (cause) {
    throw new ContentApiError(`content API unreachable: GET ${url}`, { cause });
  }
}

async function getJson<T>(base: string, path: string): Promise<T> {
  const res = await request(base, path);
  if (!res.ok) throw new ContentApiError(`content API GET ${path} → HTTP ${res.status}`);
  return (await res.json()) as T;
}

export async function listCards(base: string): Promise<CardSummary[]> {
  const items: CardSummary[] = [];
  for (let offset = 0; ; offset += PAGE) {
    const page = await getJson<{ items: CardSummary[]; total: number }>(base, `/api/cards?limit=${PAGE}&offset=${offset}`);
    items.push(...page.items);
    if (items.length >= page.total || page.items.length === 0) return items;
  }
}

export async function getCard(base: string, id: string): Promise<CardView | null> {
  if (id.length > 80 || !CARD_ID.test(id)) return null;
  const res = await request(base, `/api/cards/${id}`);
  // API 의 CARD_NOT_FOUND 일 때만 없는 카드다. 주소를 잘못 넣어 다른 서비스가 404 를 주면 숨기지 않고 예외.
  if (res.status === 404) {
    const code = await res
      .json()
      .then((b: { error?: { code?: string } }) => b?.error?.code)
      .catch(() => undefined);
    if (code === "CARD_NOT_FOUND") return null;
  }
  if (!res.ok) throw new ContentApiError(`content API GET /api/cards/${id} → HTTP ${res.status}`);
  return (await res.json()) as CardView;
}

export async function listTopics(base: string): Promise<Topic[]> {
  return (await getJson<{ items: Topic[] }>(base, "/api/topics")).items;
}
