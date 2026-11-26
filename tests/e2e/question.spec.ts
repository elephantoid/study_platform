import { test, expect, demoLogin } from "./fixtures";

const OPEN = "/questions/cs329z-2026au-l01-q01"; // open, draft, 꼬리질문 없음
const CONCEPT = "/questions/boost-algo-004"; // concept, 꼬리질문 3개

test("없는 문항 id 는 다른 문항이 아니라 404", async ({ page }) => {
  const res = await page.goto("/questions/does-not-exist");
  expect(res?.status()).toBe(404);
});

// 화면 기준 검사다. modelAnswerKo 는 API.md 의 공개 필드라 페이지 데이터(RSC props)에는 들어 있다 (재리뷰 N4).
test("비로그인은 퀴즈 카드를 열람만 하고 모범답안이 화면에 보이지 않는다", async ({ page }) => {
  await page.goto(OPEN);
  await expect(page.getByTestId("guest-auth-gate")).toBeVisible();
  await expect(page.getByTestId("model-answer")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText("기반 LLM 코어 위에");
});

test("퀴즈 카드: 제출 전에는 결과·모범답안이 없고, 제출 뒤에도 점수를 지어내지 않는다", async ({ page }) => {
  await page.goto(OPEN);
  await demoLogin(page);
  await expect(page.getByTestId("card-kind-badge")).toHaveAttribute("data-card-type", "open");
  await expect(page.locator("#main-open-answer")).toHaveValue("");
  await expect(page.getByTestId("answer-result-panel")).toHaveCount(0);
  await expect(page.getByTestId("submit-main-answer-btn")).toBeDisabled();

  await page.locator("#main-open-answer").fill("asdf");
  await page.getByTestId("submit-main-answer-btn").click();
  const panel = page.getByTestId("answer-result-panel");
  await expect(panel.getByTestId("grading-pending")).toContainText("draft");
  await expect(panel.getByTestId("model-answer")).toContainText("기반 LLM 코어 위에");
  await expect(panel).not.toContainText(/\d+\s*\/\s*10점|PASS|포함됨/);
});

test("개념 카드: 채점 없이 해설을 펼친 뒤에만 꼬리질문이 열린다", async ({ page }) => {
  await page.goto(CONCEPT);
  await demoLogin(page);
  await expect(page.getByTestId("card-kind-badge")).toHaveAttribute("data-card-type", "concept");
  await expect(page.getByTestId("quiz-card-body")).toHaveCount(0);
  await expect(page.getByTestId("followup-questions-section")).toHaveCount(0);
  await expect(page.getByTestId("concept-explanation")).toHaveCount(0);

  await page.getByTestId("reveal-explanation-btn").click();
  await expect(page.getByTestId("concept-explanation").getByTestId("markdown")).toBeVisible();
  await expect(page.getByTestId("answer-result-panel")).toHaveCount(0);
  await expect(page.getByTestId("followup-questions-section")).toBeVisible();

  // 꼬리질문 키워드·모범답안은 답을 확정하기 전에는 없다.
  const f1 = page.getByTestId("followup-card-1");
  await expect(f1).not.toContainText("크기 k+1 최소 힙");
  await expect(page.getByTestId("followup-submit-1")).toBeDisabled();
  await page.getByTestId("followup-input-1").fill("asdf");
  await page.getByTestId("followup-submit-1").click();
  await expect(page.getByTestId("followup-reveal-1")).toContainText("크기 k+1 최소 힙");
  await expect(f1).not.toContainText(/\d+\s*\/\s*10점|포함됨/);
});

test("마크다운은 서식으로 렌더링되고 수식은 KaTeX 로 그린다", async ({ page }) => {
  await page.goto(CONCEPT);
  await page.getByTestId("reveal-explanation-btn").click();
  await expect(page.getByTestId("concept-explanation").locator("p, li, h2, h3").first()).toBeVisible();
  await expect(page.locator(".katex").first()).toBeVisible();
});

test("문항 목록은 개념/퀴즈를 type 으로 나눈다", async ({ page }) => {
  const kinds = (t: string) => page.locator("main li > span:first-child > div").filter({ hasText: new RegExp(`^${t}$`) });
  await page.goto("/questions?type=concept");
  await expect(kinds("개념").first()).toBeVisible();
  await expect(kinds("퀴즈")).toHaveCount(0);
  await page.goto("/questions?type=quiz");
  await expect(kinds("퀴즈").first()).toBeVisible();
  await expect(kinds("개념")).toHaveCount(0);
});
