import { defineConfig, devices } from "@playwright/test";

/**
 * UI 테스트 (PLAN M3/M4 완료 기준: 타임스탬프 이동, 375·1440px 가로 스크롤 없음, 출처 배지 DOM 검사 + 리뷰 회귀).
 * 데모 로그인 흐름이 있어 `npm run build:e2e`(NEXT_PUBLIC_DEMO_AUTH=1)로 빌드한 뒤 실행한다: `npm run test:e2e`.
 * YouTube 요청은 테스트마다 막는다 (네트워크·재생에 기대지 않는다).
 */
const PORT = 3100;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://127.0.0.1:${PORT}`, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npx next start -p ${PORT} -H 127.0.0.1`,
    url: `http://127.0.0.1:${PORT}/roles/agent`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
