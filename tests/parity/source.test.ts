/**
 * 데이터 소스 전환(lib/content/source.ts) 검사. cards.test.ts 가 HTTP 응답과 파일 로더를 비교한다면,
 * 여기서는 web 이 실제로 쓰는 함수가 두 모드에서 같은 값을 내는지 본다.
 *
 * - API 모드(STUDY_API_URL 설정): source.* 가 Rust API 를 거쳐 파일 로더와 같은 카드·토픽·상세(followUps 포함)를 낸다
 * - 파일 모드(STUDY_API_URL 없음): source.* 가 파일 로더 결과를 그대로 낸다
 * - 없는 id·형식이 틀린 id 는 두 모드 모두 null (페이지가 404)
 * - API 를 쓰기로 했는데 닿지 않으면 파일로 되돌아가지 않고 예외
 */
import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { test } from "node:test";
import * as files from "../../lib/content/load";
import * as source from "../../lib/content/source";

const API = process.env.STUDY_API_URL;
const skip = API ? false : "STUDY_API_URL 이 없어 건너뜀 (Rust 서버를 띄운 뒤 설정)";
const json = (v: unknown) => JSON.parse(JSON.stringify(v));

async function withApiUrl<T>(value: string | undefined, fn: () => Promise<T>): Promise<T> {
  const saved = process.env.STUDY_API_URL;
  if (value === undefined) delete process.env.STUDY_API_URL;
  else process.env.STUDY_API_URL = value;
  try {
    return await fn();
  } finally {
    if (saved === undefined) delete process.env.STUDY_API_URL;
    else process.env.STUDY_API_URL = saved;
  }
}

test("파일 모드: source 가 파일 로더 결과를 그대로 낸다", async () => {
  await withApiUrl(undefined, async () => {
    assert.equal(source.contentApiUrl(), undefined);
    assert.deepEqual(await source.listCards(), files.listCards());
    assert.deepEqual(await source.listTopics(), files.listTopics());
    const id = files.listCards()[0].id;
    assert.deepEqual(await source.getCard(id), files.getCard(id));
    assert.equal(await source.getCard("no-such-card"), null);
  });
});

test("API 모드: 카드 목록·토픽·topicName 이 파일 로더와 같다", { skip }, async () => {
  assert.ok(source.contentApiUrl());
  assert.deepEqual(json(await source.listCards()), json(files.listCards()));
  assert.deepEqual(json(await source.listTopics()), json(files.listTopics()));
  for (const t of files.listTopics()) assert.equal(await source.topicName(t.id), files.topicName(t.id));
});

test("API 모드: 모든 카드 상세가 같다 (개념/퀴즈 필드, followUps, attribution)", { skip }, async () => {
  const diffs: string[] = [];
  const kinds = { concept: 0, quiz: 0, followUps: 0 };
  for (const { id } of files.listCards()) {
    const viaApi = await source.getCard(id);
    assert.ok(viaApi, `${id}: API 모드에서 null`);
    try {
      assert.deepEqual(json(viaApi), json(files.getCard(id)));
    } catch {
      diffs.push(id);
    }
    kinds[viaApi.type === "concept" ? "concept" : "quiz"] += 1;
    if (viaApi.followUps) kinds.followUps += 1;
    // PR #4 규칙: concept 만 explanationMd, open 만 modelAnswerKo, 꼬리질문은 정확히 3개 order 1→3, 출처는 항상
    if (viaApi.type !== "concept") assert.equal(viaApi.explanationMd, undefined, `${id}: quiz 에 explanationMd`);
    if (viaApi.type !== "open") assert.equal(viaApi.modelAnswerKo, undefined, `${id}: open 아닌데 modelAnswerKo`);
    if (viaApi.followUps) assert.deepEqual(viaApi.followUps.map((f) => f.order), [1, 2, 3]);
    assert.ok(viaApi.attribution.license && viaApi.attribution.url, `${id}: attribution 없음`);
    assert.equal("rubric" in viaApi || "answerIndex" in viaApi, false, `${id}: 서버 전용 필드 노출`);
  }
  assert.deepEqual(diffs.slice(0, 20), [], `${diffs.length} cards differ`);
  // 빈 검사가 아니라는 확인: 두 종류와 꼬리질문 카드가 실제로 있다.
  assert.ok(kinds.concept > 0 && kinds.quiz > 0 && kinds.followUps > 0, JSON.stringify(kinds));
});

test("API 모드: 없는 id 와 형식이 틀린 id 는 null", { skip }, async () => {
  assert.equal(await source.getCard("no-such-card"), null);
  assert.equal(await source.getCard("../etc/passwd"), null);
  assert.equal(await source.getCard("A".repeat(10)), null);
});

test("API 모드: 서버에 닿지 않으면 파일로 되돌아가지 않고 예외", { skip }, async () => {
  await withApiUrl("http://127.0.0.1:9", async () => {
    await assert.rejects(source.listCards(), { name: "ContentApiError" });
    await assert.rejects(source.getCard(files.listCards()[0].id), { name: "ContentApiError" });
  });
});

test("API 모드: 주소가 다른 서비스를 가리켜 404 를 주면 '없는 카드'로 숨기지 않고 예외", async () => {
  // 실제로 겪은 일: 로컬 8080 에 다른 서비스가 떠 있으면 모든 카드가 404 → 페이지 404 로 보였다.
  const other = createServer((_req, res) => {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: { code: "NOT_FOUND", message: "nope" } }));
  });
  await new Promise<void>((r) => other.listen(0, "127.0.0.1", r));
  const { port } = other.address() as AddressInfo;
  try {
    await withApiUrl(`http://127.0.0.1:${port}`, async () => {
      await assert.rejects(source.getCard("boost-algo-004"), { name: "ContentApiError" });
      await assert.rejects(source.listCards(), { name: "ContentApiError" });
    });
  } finally {
    other.close();
  }
});
