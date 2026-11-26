import { test as base, expect, type Page } from "@playwright/test";

/** YouTube 임베드는 막는다. iframe 은 그대로 있고 src·data 속성만 검사한다. */
export const test = base.extend({
  page: async ({ page }, provide) => {
    await page.route(/youtube\.com|ytimg\.com|googlevideo\.com/, (r) => r.abort());
    await provide(page);
  },
});

export { expect };

export async function demoLogin(page: Page) {
  const toggle = page.getByTestId("session-mode-toggle");
  await expect(toggle, "build with npm run build:e2e (NEXT_PUBLIC_DEMO_AUTH=1)").toBeVisible();
  if ((await toggle.getAttribute("aria-pressed")) !== "true") await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
}
