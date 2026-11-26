import { test, expect } from "./fixtures";

const LECTURE = "/lectures/cs329z-2026au-l01";

test("챕터를 누르면 그 startSec 으로 이동하고 플레이어를 다시 만들지 않는다", async ({ page }) => {
  await page.goto(`${LECTURE}?t=1325`);
  const iframe = page.getByTestId("youtube-embed-iframe");
  await expect(iframe).toHaveAttribute("src", /start=1325/);
  await expect(iframe).toHaveAttribute("src", /enablejsapi=1/);
  const srcBefore = await iframe.getAttribute("src");

  await page.getByTestId("segment-jump-460").click();
  await expect(iframe).toHaveAttribute("data-current-sec", "460");
  await expect(page.getByTestId("current-timestamp-badge")).toContainText("460초");
  await expect(page.getByTestId("segment-item-cs329z-2026au-l01-s03")).toHaveClass(/border-indigo-600/);
  expect(await iframe.getAttribute("src")).toBe(srcBefore);
});

test("?t= 는 음수·소수·범위 밖을 정수 초로 바로잡는다", async ({ page }) => {
  await page.goto(`${LECTURE}?t=-5`);
  await expect(page.getByTestId("youtube-embed-iframe")).toHaveAttribute("data-current-sec", "0");
  await page.goto(`${LECTURE}?t=12.7`);
  await expect(page.getByTestId("youtube-embed-iframe")).toHaveAttribute("data-current-sec", "12");
  await page.goto(`${LECTURE}?t=99999999`);
  await expect(page.getByTestId("youtube-embed-iframe")).toHaveAttribute("data-current-sec", "4175");
});

test("draft 강의는 생성 콘텐츠 없이 영상과 챕터만 보인다", async ({ page }) => {
  await page.goto(LECTURE);
  await expect(page.getByTestId("draft-learner-notice")).toBeVisible();
  await expect(page.getByTestId("slide-by-slide-reader")).toHaveCount(0);
  await expect(page.getByTestId("syllabus-metadata-card")).toHaveCount(0);
  await expect(page.locator('[data-testid^="segment-summary-"]')).toHaveCount(0);
  await expect(page.locator('[data-testid^="segment-jump-"]').first()).toBeVisible();
});

test("구간에 연결된 문항 링크는 실제 문항으로 간다", async ({ page }) => {
  await page.goto(LECTURE);
  const link = page.getByTestId("segment-item-cs329z-2026au-l01-s06").getByRole("link").first();
  await expect(link).toHaveAttribute("href", "/questions/cs329z-2026au-l01-q01");
});

test("없는 강의 id 는 404", async ({ page }) => {
  const res = await page.goto("/lectures/does-not-exist");
  expect(res?.status()).toBe(404);
});
