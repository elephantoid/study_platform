import { test, expect, demoLogin } from "./fixtures";

test("비로그인은 빈 큐 안내를 보고 크래시하지 않는다", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/review");
  await expect(page.getByTestId("review-empty-state")).toBeVisible();
  expect(errors).toEqual([]);
});

test("정답은 기본으로 숨기고, 펼치기 전에는 평점을 고를 수 없고, 카드를 바꾸면 다시 숨긴다", async ({ page }) => {
  await page.goto("/review");
  await demoLogin(page);
  await expect(page.getByTestId("review-card")).toBeVisible();
  await expect(page.getByTestId("review-answer")).toHaveCount(0);
  await expect(page.getByTestId("fsrs-rate-3")).toBeDisabled();

  await page.getByTestId("toggle-answer-btn").click();
  await expect(page.getByTestId("review-answer")).toBeVisible();
  await page.getByTestId("fsrs-rate-3").click();
  await expect(page.getByTestId("fsrs-rating-recorded")).toBeVisible();
  await expect(page.getByTestId("fsrs-self-rating")).not.toContainText(/\+\d+일/);

  await page.getByRole("button", { name: "다음 복습 카드 →" }).click();
  await expect(page.getByTestId("review-answer")).toHaveCount(0);
  await expect(page.getByTestId("fsrs-rate-3")).toBeDisabled();
});
