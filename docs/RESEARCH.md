# RESEARCH

조사일: 2026-11-15. `[unverified]` = 1차 출처로 확인하지 못함.

## 1. 도구 검증

| 도구 | 용도 | 설치 | 핵심 명령 | 제약 | 라이선스 |
|---|---|---|---|---|---|
| [rea](https://github.com/morluto/rea) | 웹·JS·바이너리 리버스 엔지니어링 (MCP) | `npx rea-agents setup` 또는 `npm i -g rea-agents` | `npx -y rea-agents@latest analyze-javascript-application <abs-path> --json` | Node ≥22.23.4, 웹 분석에 Chrome 계열 필요, 네이티브 분석은 Ghidra/IDA 등 필요. 서버 로직은 관찰 불가 | MIT |
| [Agent-Reach](https://github.com/Panniantong/Agent-Reach) | YouTube·Reddit 등 읽기 전용 수집 | `uv tool install https://github.com/Panniantong/Agent-Reach/releases/latest/download/agent-reach.zip` → `agent-reach setup` ([install.md](https://github.com/Panniantong/Agent-Reach/blob/main/docs/install.md)). **PyPI `agent-reach` 는 다른 패키지** | `agent-reach read <URL>`, `agent-reach <channel> <action>` | Python ≥3.10 + uv. 상태 `~/.agent-reach/`. 로그인 채널은 사용자 Chrome 쿠키 복사 → 부계정 권장 | MIT |

Agent-Reach 채널 ([README](https://github.com/Panniantong/Agent-Reach)):

| 채널 | 기능 | 인증 |
|---|---|---|
| youtube | 메타, 검색, 자막, ASR | 불필요 (ASR만 Groq/OpenAI 키) |
| reddit | 검색, 본문, 댓글 | **로그인 필요**, 댓글 트리 불완전 |

자막 추출 대안 (기존 공개 방법, 옵션명 사용 전 재확인 `[unverified]`):
- [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api) — `YouTubeTranscriptApi().fetch(video_id)`
- [yt-dlp](https://github.com/yt-dlp/yt-dlp#subtitle-options) — `--skip-download --write-auto-subs --sub-langs en`

**함정**: Agent-Reach youtube 채널의 `lang` 기본값은 `zh-Hans,zh,en,en-orig` 다 ([youtube.py](https://github.com/Panniantong/Agent-Reach/blob/main/agent_reach/channels/youtube.py)). 영어 강의에 기본값을 쓰면 중국어 기계번역 자막을 먼저 받아온다 (관련 PR [#763](https://github.com/Panniantong/Agent-Reach/pull/763) closed, [#937](https://github.com/Panniantong/Agent-Reach/pull/937) open). 그래서 `--lang en-orig,en` 을 항상 명시한다. Antigravity 쪽 조사가 짚은 "1시간 차단" 주장은 1차 출처로 확인하지 못했다 `[unverified]`.

판단: YouTube 자막은 Agent-Reach 또는 yt-dlp 어느 쪽이든 무인증. Reddit 은 로그인 의존이라 MVP 에서 제외 권장.

## 2. 참고 사이트 분석 (jeongcheogi.edugamja.com)

rea 는 설치가 필요해 이번 세션에서 쓰지 않았다. 공개 HTML·헤더·sitemap 으로 대체했다. 구조만 기록하며 브랜드·문구·문항은 복제하지 않는다.

**스택**: Next.js App Router(Turbopack), Vercel(icn1), Clerk(인증), Algolia(검색), Sentry. DB·결제 PG `[unverified]`. 출처: 응답 헤더, [sitemap.xml](https://jeongcheogi.edugamja.com/sitemap.xml)

**사이트 맵** (sitemap 약 350 URL)

| 영역 | URL 수 | 내용 |
|---|---|---|
| `/theory/*` | 136 | 과목별 개념 |
| `/coding/*` | 145 | 언어별 코딩 문제 |
| `/past-exam/*` | 35 | 기출 회차 |
| `/summary-pdf` | 15 | 유료 요약 PDF |
| `/exam-registration/*` | 10 | 시험 정보 |
| 기타 | ~6 | membership, community, final-mock-exam, my/study-progress |

**학습 루프**: 개념 → 기출·해설 → 랜덤 퀴즈(11~12문, 새로고침 재출제) / 일일 시험(04시 갱신) → 오답 노트·복습(Premium). 진도는 출석 연속일, 회독 수, 배지, 경로 지도로 보여준다. **간격 반복(SRS) 알고리즘 증거 없음** `[unverified]`.

**기능**: ⌘K 검색, 글별 댓글·포럼, "LLM 용 복사", 필기·즐겨찾기, 목차, 풀이 사이드패널, 시즌 스킨.

**수익화**: 무료 개념·기출 → Starter(광고 제거·필기) → Premium(오답 복습·모의고사). 무료 SEO 유입을 받아 학습 기록을 로그인에 묶고, 복습을 유료로 건다.

**우리에게 주는 시사점**: 가져올 것은 개념 → 문제 → 오답 → 복습 루프와 ⌘K 검색, LLM 용 복사다. 참고 사이트는 회독 카운트 수준이라, 진짜 SRS(FSRS)를 넣는 것이 차별화 지점이다.

## 3. 소스 감사 (기술 면접)

라이선스는 `gh api repos/<r>/license` (404 = 없음) 와 루트 파일 목록으로, 날짜는 `pushed_at` 으로 확인했다 (2026-11-15). WeareSoft 만 최근 **커밋**이 2022-02-25 로 push 날짜와 다르다.

| 소스 | 라이선스 | 최근 push | ★ | 구성 | 직무 관련도 (MLE / RS / Agent / DS) | 재사용 방식 |
|---|---|---|---|---|---|---|
| [boost-devs/ai-tech-interview](https://github.com/boost-devs/ai-tech-interview) | MIT | 2026-03-17 | 2.4k | 통계·수학, ML, DL, Python, 네트워크, OS, 자료구조, 알고리즘 | 상 / 상 / 중 / 상 | 원문 수록 (저작권 표시 유지) |
| [jbee37142/Interview_Question_for_Beginner](https://github.com/jbee37142/Interview_Question_for_Beginner) | MIT | 2024-08-09 | 21.8k | CS 전반 + MachineLearning, Python | 중 / 하 / 중 / 중 | 원문 수록 (ML·Python·CS 기초만) |
| [gyoogle/tech-interview-for-developer](https://github.com/gyoogle/tech-interview-for-developer) | MIT | 2025-06-04 | 17.7k | CS, 언어, Web, New Technology | 하 / 하 / 중 / 하 | 원문 수록 (CS 기초만) |
| [gyoogle.dev/blog](https://gyoogle.dev/blog/) | 사이트 표기 미확인 `[unverified]`. 레포 `gyoogle/gyoogle.github.io` 는 라이선스 없음 | 2020-03-12 | – | 위 레포의 렌더본으로 추정 | 위와 동일 | **링크만** (원문은 MIT 레포에서 가져오면 됨) |
| [jobhope/TechnicalNote](https://github.com/jobhope/TechnicalNote) | MIT | 2023-12-27 | 0.6k | CS, **linear_algebra**, security | 중 / 중 / 하 / 중 | 원문 수록 (선형대수 중심) |
| [WeareSoft/tech-interview](https://github.com/WeareSoft/tech-interview) | **없음** | 2022-02-25 (커밋) | 4.9k | CS 전반 | 하 / 하 / 하 / 하 | **링크만** |
| [baeharam/Must-Know-About-Frontend](https://github.com/baeharam/Must-Know-About-Frontend) | **없음** | 2024-03-16 | 3.7k | 프론트엔드 | 없음 | **링크만**. 대상 직무와 무관하므로 제외 권장 |

결론: 4개 직무에 실질적인 소스는 boost-devs 하나다. **Research Scientist(논문·실험 설계)와 Agent Engineer(도구 호출·평가·오케스트레이션) 문항은 한국어 공개 소스에 사실상 없다.** 이 두 직무는 강의(§4) 기반으로 생성하고 사람이 검수해야 한다.

## 4. 강의 실재성

| 코스 | 정식 제목 / 학기 | 공식 사이트 | 공개 YouTube | 비고 |
|---|---|---|---|---|
| CS329Z | Engineering AI Agents / Fall 2026 (첫 개설) | [cs329z.stanford.edu](https://cs329z.stanford.edu/) | **[재생목록 `PLPRcF5HR02_U`](https://www.youtube.com/playlist?list=PLPRcF5HR02_U)** "Stanford CS329Z Engineering AI Agents \| Autumn 2026", 12편 (2026-11-15). Lecture 1 [`DGI4vucR71w`](https://www.youtube.com/watch?v=DGI4vucR71w)(2026-11-09) ~ Lecture 6(2026-11-14), 업로더 Stanford Online. Lecture 1 은 영어 자동자막 있음 | 2026-09 블로그의 "Canvas only, not public" 은 틀린 정보다. 업로드가 진행 중이라 M1 에서 재생목록을 폴링한다. **주의**: `PLVKEyLMx8AmU` 는 제3자(CatDataING)의 "unofficial walkthrough" 라 제외한다 |
| CS329A | Self-Improving AI Agents / Autumn 2025 | [cs329a.stanford.edu](https://cs329a.stanford.edu/), [XCS329A](https://online.stanford.edu/courses/xcs329a-self-improving-ai-agents) | **[재생목록 `PLangBM27OtEA`](https://www.youtube.com/playlist?list=PLangBM27OtEA)** "CS329A Self-Improving AI Agents", 9편. 영상 업로더 Stanford Online, 2026-08-03 일괄 공개 (Part 1 Course Overview ~) | 이전에 적었던 `PL3058ht9…` 는 강사 개인(Aakanksha Chowdhery)의 Winter 2025 5편 재생목록이라 공식 소스로 쓰지 않는다. 같은 9편을 담은 제3자 재생목록이 여럿 있다 |
| CME295 | Transformers and Large Language Models / Autumn 2025, Autumn 2026 | [cme295.stanford.edu](https://cme295.stanford.edu/syllabus/) | Autumn 2025: [9편](https://www.youtube.com/playlist?list=PLoROMvodv4rOCXd21gf0CF4xr35yINeOy). Autumn 2026: [`PLakGfbKCei80`](https://www.youtube.com/playlist?list=PLakGfbKCei80) 진행 중 | 즉시 사용 가능. 13자 재생목록 ID 는 잘린 값이 아니라 YouTube 의 짧은 ID 다 (페이지 조회로 확인) |
| CS153 | Frontier Systems / Spring 2026 | [cs153.stanford.edu](https://cs153.stanford.edu) | [14편](https://www.youtube.com/playlist?list=PLoROMvodv4rN447WKQ5oz_YdYbS74M5IA) ([Stanford Daily](https://stanforddaily.com/2026/04/15/500-and-counting-the-cs-class-students-are-lining-up-to-take/): 전 콘텐츠 공개) | 즉시 사용 가능 |

자막 유무는 4개 모두 `[unverified]`. M1 첫 작업에서 `yt-dlp --list-subs` 로 확인한다.

**IBM Technology** ([playlists](https://www.youtube.com/@IBMTechnology/playlists), 2026-11-15)

| 재생목록 | 편수 | 주제 |
|---|---|---|
| [AI Agents Explained](https://www.youtube.com/playlist?list=PLOspHqNVtKAB6AzNie7BrFhbg4dv4Gfz8) | 66 | 에이전트 개념·아키텍처 |
| [AI Models Explained](https://www.youtube.com/playlist?list=PLOspHqNVtKAC-FUNMq8qjYVw6_semZHw0) | 53 | LLM 기초 |
| [RAG Explained](https://www.youtube.com/playlist?list=PLOspHqNVtKADc8E1JLd_kBBPdEBDdmwsR) | 25 | RAG, 벡터 DB |
| [Agentic & AI Coding Explained](https://www.youtube.com/playlist?list=PLOspHqNVtKADqC3pf-SjB23mtqJbmwsWw) | 27 | 에이전트형 코딩 |
| [AI Technical Tutorials](https://www.youtube.com/playlist?list=PLOspHqNVtKACI0uR7Oa-bkWbtTufpJNhi) | 38 | 실습 |

IBM 영상은 5~15분 단편이라 "개념 카드 + 면접 문항"으로 바로 변환하기 좋다. Stanford 강의는 60~80분이라 챕터 분할이 먼저다.
