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
# 대시보드·강의 페이지는 빌드 때 정적으로 만들어진다. draft 미리보기(서버 전용, 번들에 안 들어감)도 빌드 때 정한다.
# 카드 페이지(/questions, /review)는 요청 때 렌더링한다: STUDY_API_URL(런타임 env)이 있으면 Rust API, 없으면 아래 content/.
# 그래서 빌드에는 API 서버가 필요 없다.
ARG STUDY_SHOW_DRAFT=0
ENV STUDY_SHOW_DRAFT=$STUDY_SHOW_DRAFT
# 1 이면 데모 로그인 토글 (실제 인증 없음). NEXT_PUBLIC_* 라 번들에 새겨진다. 기본은 열람 전용
ARG NEXT_PUBLIC_DEMO_AUTH=0
ENV NEXT_PUBLIC_DEMO_AUTH=$NEXT_PUBLIC_DEMO_AUTH
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
# STUDY_API_URL 이 없을 때(파일 모드) 카드 페이지가 요청 때 읽는다. 읽기 전용 root 소유.
COPY --from=build /app/content ./content
COPY --from=build /app/pipeline/manifests/videos.json ./pipeline/manifests/videos.json
RUN mkdir -p .next/cache && chown 1000:1000 .next/cache
USER 1000:1000
EXPOSE 3000
# /api/health 가 생기면 경로를 바꾼다 (docs/SELF_HOSTING.md).
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/" || exit 1
CMD ["node", "server.js"]
