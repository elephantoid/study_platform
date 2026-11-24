# syntax=docker/dockerfile:1.17
# study_platform-web: Next.js 앱. 버전은 tag + digest 로 고정한다 (올릴 때 둘 다 바꾼다).
FROM node:22.23.5-alpine3.24@sha256:1314fb30ec37592d5845e5a160d522c0e680972aa534549940b8d73bde88481a AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* 는 빌드 때 번들에 새겨진다. 컨테이너 환경변수로는 못 바꾼다.
ARG NEXT_PUBLIC_SHOW_DRAFT=0
ENV NEXT_PUBLIC_SHOW_DRAFT=$NEXT_PUBLIC_SHOW_DRAFT
# 앱 설정은 그대로 두고 이미지 안에서만 standalone 출력을 켠다.
RUN mv next.config.ts next.config.app.ts
COPY <<'TS' ./next.config.ts
import type { NextConfig } from "next";
import appConfig from "./next.config.app";

const config: NextConfig = {
  ...appConfig,
  output: "standalone",
  outputFileTracingRoot: process.cwd(),
};

export default config;
TS
# public/ 은 아직 없을 수 있다. 아래 COPY 가 실패하지 않게 만들어 둔다.
RUN mkdir -p public && npm run build

FROM base AS web
ARG REVISION=unknown
LABEL org.opencontainers.image.source="https://github.com/elephantoid/study_platform" \
      org.opencontainers.image.revision="$REVISION"
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000
# 코드는 root 소유(읽기 전용)로 두고, 캐시 디렉터리만 실행 사용자에게 준다.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
RUN mkdir -p .next/cache && chown 1000:1000 .next/cache
USER 1000:1000
EXPOSE 3000
# /api/health 가 생기면 경로를 바꾼다 (docs/SELF_HOSTING.md).
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/" || exit 1
CMD ["node", "server.js"]
