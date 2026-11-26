import { test, expect } from "./fixtures";

// CONTRACT §5: 외부 콘텐츠를 렌더링하는 모든 곳에 출처 배지 (M4 DOM 검사).
const PAGES = [
  "/roles/agent",
  "/questions",
  "/questions/boost-algo-004",
  "/questions/cs329z-2026au-l01-q01",
  "/lectures",
  "/lectures/cs329z-2026au-l01",
];

for (const path of PAGES) {
  test(`출처 배지: ${path}`, async ({ page }) => {
    await page.goto(path);
    const badges = page.getByTestId("attribution-badge");
    await expect(badges.first()).toBeVisible();
    for (const b of await badges.all()) {
      await expect(b).toHaveAttribute("data-license", /.+/);
      const href = (await b.getAttribute("href")) ?? (await b.locator("a").first().getAttribute("href"));
      expect(href).toMatch(/^https:\/\//);
    }
  });
}

test("대시보드: 강의마다 배지가 있고 토픽 배지는 실제 출처를 쓴다", async ({ page }) => {
  await page.goto("/roles/agent");
  for (const id of ["cme295-2025au-l01", "cs329z-2026au-l01"]) {
    const card = page.locator(`a[href="/lectures/${id}"]`).locator("xpath=ancestor::div[contains(@class,'space-y-3')][1]");
    await expect(card.getByTestId("attribution-badge")).toHaveCount(1);
  }
  const agents = page.getByTestId("topic-card-ai-agents").getByTestId("attribution-badge");
  await expect(agents).toHaveAttribute("data-source-id", "cs329z-2026au");
  await expect(agents).toHaveAttribute("data-reuse", "summary_link");
});

test("문항 배지: 강의 구간 문항은 구간 링크, 노트 문항은 노트 원문 링크", async ({ page }) => {
  await page.goto("/questions/cs329z-2026au-l01-q01");
  await expect(page.getByTestId("attribution-badge").getByRole("link")).toHaveAttribute(
    "href",
    /^https:\/\/www\.youtube\.com\/watch\?v=DGI4vucR71w&t=\d+s$/
  );
  await page.goto("/questions/boost-algo-004");
  await expect(page.getByTestId("attribution-badge").getByRole("link")).toHaveAttribute("href", /8-algorithm\.md$/);
});
