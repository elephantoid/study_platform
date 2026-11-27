import "server-only";

import { cache } from "react";
import * as api from "./api";
import * as files from "./load";
import type { CardSummary, CardView, Topic } from "./types";

/**
 * 카드·토픽 데이터 소스. `STUDY_API_URL` 이 있으면 Rust API, 없으면 content/ 파일 로더. 반환 타입은 같다.
 * 요청 때마다 env 를 읽으므로 같은 이미지를 두 방식으로 쓸 수 있다 (이 함수를 부르는 페이지는 동적 렌더링).
 *
 * API 에 엔드포인트가 없는 것(강의·대시보드·출처 목록, API.md §5)은 계속 load.ts 를 직접 쓴다.
 * draft 게이트(CONTRACT §5)는 강의 생성 콘텐츠에만 있고 그 경로는 바뀌지 않는다.
 * `cache` 는 한 요청 안의 중복 호출만 합친다 (요청 사이에는 캐시하지 않는다).
 */

export function contentApiUrl(): string | undefined {
  return process.env.STUDY_API_URL?.trim() || undefined;
}

export const listCards = cache(async (): Promise<CardSummary[]> => {
  const base = contentApiUrl();
  return base ? api.listCards(base) : files.listCards();
});

export const getCard = cache(async (id: string): Promise<CardView | null> => {
  const base = contentApiUrl();
  return base ? api.getCard(base, id) : files.getCard(id);
});

export const listTopics = cache(async (): Promise<Topic[]> => {
  const base = contentApiUrl();
  return base ? api.listTopics(base) : files.listTopics();
});

export async function topicName(id: string): Promise<string> {
  return (await listTopics()).find((t) => t.id === id)?.name ?? id;
}
