import { test, expect, demoLogin } from "./fixtures";

// CONTRACT §5: 375px·1440px 에서 가로 스크롤이 없어야 한다. html 의 overflow-x:hidden 에 가려지지 않게 scrollWidth 로 잰다.
const PAGES = [
  "/roles/agent",
  "/questions",
  "/questions/boost-algo-004",
  "/questions/cs329z-2026au-l01-q01",
  "/review",
  "/lectures",
  "/lectures/cs329z-2026au-l01",
  "/lectures/cme295-2025au-l01",
];

for (const width of [375, 1440]) {
  for (const path of PAGES) {
    test(`가로 스크롤 없음 ${width}px ${path}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      if (path === "/review") await demoLogin(page);
      if (path === "/questions/boost-algo-004") await page.getByTestId("reveal-explanation-btn").click();
      const overflow = await page.evaluate(() => {
        const widest = [...document.querySelectorAll<HTMLElement>("body *")]
          .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
          .filter((el) => !el.closest(".katex-display, pre, table, .overflow-x-auto, .truncate"))
          .slice(0, 3)
          .map((el) => `${el.tagName}.${el.className}`.slice(0, 120));
        return { sw: document.documentElement.scrollWidth, bw: document.body.scrollWidth, vw: window.innerWidth, widest };
      });
      expect(overflow.widest, JSON.stringify(overflow)).toEqual([]);
      expect(Math.max(overflow.sw, overflow.bw)).toBeLessThanOrEqual(overflow.vw);
    });
  }
}
