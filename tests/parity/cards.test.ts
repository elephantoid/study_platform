/**
 * 패리티 테스트: UI 로더(lib/content/load.ts)와 Rust API(server/, docs/API.md)가 같은 content/ 에서
 * 같은 카드·토픽을 만드는지 비교한다 (재리뷰 N2). 두 구현 중 한쪽만 고치면 여기서 깨진다.
 *
 * STUDY_API_URL (예: http://127.0.0.1:8080) 이 없으면 건너뛴다. CI `web` 워크플로의 parity job 이 서버를 띄워 실행한다.
 * 실행: STUDY_API_URL=http://127.0.0.1:8080 npm run test:parity
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { getCard, listCards, listTopics } from "../../lib/content/load";

const API = process.env.STUDY_API_URL?.replace(/\/$/, "");
const skip = API ? false : "STUDY_API_URL 이 없어 건너뜀 (Rust 서버를 띄운 뒤 설정)";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);
  assert.equal(res.status, 200, `${path} → HTTP ${res.status}`);
  return (await res.json()) as T;
}

/** undefined 필드를 지워 JSON 응답과 같은 모양으로 맞춘다. */
const json = (v: unknown) => JSON.parse(JSON.stringify(v));

test("카드 목록이 같다 (GET /api/cards 전량, 항목 필드까지)", { skip }, async () => {
  const items: unknown[] = [];
  for (let offset = 0; ; offset += 200) {
    const page = await get<{ items: unknown[]; total: number }>(`/api/cards?limit=200&offset=${offset}`);
    items.push(...page.items);
    if (items.length >= page.total || page.items.length === 0) break;
  }
  // 둘 다 id 오름차순 (API.md §1 정렬).
  assert.deepEqual(json(listCards()), items);
});

test("카드마다 GET /api/cards/{id} 와 getCard 출력이 필드 단위로 같다", { skip }, async () => {
  const diffs: string[] = [];
  for (const { id } of listCards()) {
    const api = await get<Record<string, unknown>>(`/api/cards/${id}`);
    const ui = json(getCard(id)) as Record<string, unknown>;
    for (const k of new Set([...Object.keys(api), ...Object.keys(ui)])) {
      try {
        assert.deepEqual(ui[k], api[k]);
      } catch {
        diffs.push(`${id}.${k}: ui=${JSON.stringify(ui[k])?.slice(0, 120)} api=${JSON.stringify(api[k])?.slice(0, 120)}`);
      }
    }
  }
  assert.deepEqual(diffs.slice(0, 20), [], `${diffs.length} field diffs`);
});

test("토픽 이름·상위·가중치·cardCounts 가 같다 (GET /api/topics)", { skip }, async () => {
  const api = await get<{ items: Record<string, unknown>[] }>("/api/topics");
  assert.deepEqual(json(listTopics()), api.items);
});
