import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next 16 removed `next lint`; ESLint runs directly with Next's flat configs.
const config = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [".next/**", "node_modules/**", "pipeline/**", "server/**", "playwright-report/**", "test-results/**", "next-env.d.ts"],
  },
];

export default config;
