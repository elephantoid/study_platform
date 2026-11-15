# PLAN

근거: `docs/RESEARCH.md`, 설계: `docs/ARCHITECTURE.md`, 에이전트: `docs/AGENTS.md`.

## 목표

ML Engineer · Research Scientist · Agent Engineer · Data Scientist 지원자가 **면접 문항을 간격 반복으로 체화**하고, **Stanford·IBM 강의를 한국어 요약 + 문항으로 학습**하는 웹앱.

차별화: 참고 사이트는 회독 카운트 수준에 머문다. 우리는 FSRS 복습과 rubric 기반 서술형 AI 채점을 한다.

## MVP 범위

- 직무 4개 × 토픽 트리, 직무별 가중치
- 문항 유형: 개념(카드), 서술형(AI 채점), 객관식
- FSRS 복습 큐 ("오늘 복습할 N개"), 오답 모음 (오답 → 개념 노트 또는 강의 타임스탬프로 바로 이동)
- 직무별 모의 면접 세트: 직무 가중치로 N문항을 무작위로 뽑고, 끝나면 총점과 취약 토픽 리포트를 준다
- 모든 외부 콘텐츠에 출처·라이선스·원본 링크 배지
- 강의 페이지: 원본 YouTube 임베드 + 챕터 타임스탬프 + 한국어 요약 + 연결 문항
- ⌘K 검색, 문항 "LLM 용 복사"
- 로그인(진도 저장), 비로그인은 열람만 가능
- 초기 콘텐츠: boost-devs(MIT) 전체, jbee·gyoogle·jobhope(MIT)에서 관련 섹션, **CS329Z 공개분 전부 (현재 Lecture 1~6, 업로드되는 대로 추가)**, CS329A 9편, CME295 Autumn 2025 9편, CS153 14편, IBM AI Agents Explained 상위 20편

## 비범위 (MVP 이후)

결제·멤버십, 커뮤니티·댓글, Reddit 수집(로그인 의존), 모바일 앱, 모의 면접 음성, 시즌 스킨, 사용자 업로드.

## 마일스톤

| M | 내용 | 완료 기준 (테스트 가능) |
|---|---|---|
| M1 수집 기반 | `sources.yaml`, `ingest` 스크립트, `source-auditor` | `ingest` 실행 시 MIT 소스 4개의 md 가 `tmp/raw/repo/` 에 생기고, `link_only` 소스는 본문 0바이트다. CME295·CS153 전 영상의 자막 유무가 `sources.yaml` 에 기록된다 |
| M2 콘텐츠 파이프라인 | 에이전트 2~5, `content-pipeline` 스킬, 빌드 시 라이선스 검사 | boost-devs 에서 ≥200 문항이 draft 로 생성되고, 모든 문항에 `sourceId`·`roleTags` 가 있다. CME295 1편이 세그먼트 ≥5개 + 문항 ≥10개로 변환된다. `link_only` 소스 원문이 들어간 파일이 있으면 빌드가 실패한다 |
| M3 앱 MVP | Next.js 앱, DB 스키마, 인증, FSRS 큐, 강의 페이지, 검색 | 로그인 사용자가 카드 10개를 평가하면 `ReviewCard.due` 가 FSRS 규칙대로 갱신된다 (단위 테스트). 강의 타임스탬프를 클릭하면 해당 초로 이동한다 (E2E). 모의 면접 세트가 직무 가중치대로 출제된다 (단위 테스트, 1,000회 샘플링에서 토픽 분포 오차 ±5%p). 375px·1440px 에서 가로 스크롤이 없다 |
| M4 AI 채점 + 공개 | `grader`, 오답 모음, SEO, 배포 | 서술형 답안 채점 결과가 rubric 항목별 점수 JSON 으로 저장된다. 고정 답안 20개 평가셋에서 사람 채점과 ±1점 일치율 ≥80%. 외부 콘텐츠를 렌더링하는 모든 화면에서 출처·라이선스·원본 링크 배지 누락이 0건이다 (DOM 검사 E2E). Vercel production 배포 후 Lighthouse SEO ≥90 |

## 위험

| 위험 | 대응 |
|---|---|
| CS329Z 가 학기 중 주 단위로 업로드 중 (2026-11-09 Lecture 1) | `ingest` 가 재생목록을 주 1회 폴링해 새 영상만 처리한다. 이미 처리한 videoId 는 건너뛴다 |
| 같은 강의를 담은 제3자·비공식 재생목록이 많다 (CS329Z walkthrough 등) | `sources.yaml` 에 공식 재생목록 ID 만 등록하고, 영상마다 업로더가 `Stanford Online` 인지 확인한다 |
| RS·Agent 직무의 한국어 문항 소스 부재 | 강의 기반 생성 + 사람 검수 필수. 초기 문항 수가 MLE·DS 대비 적다는 점을 감수 |
| LLM 생성 문항의 사실 오류 | 다른 계열 모델 critic + `published` 는 사람 승인만 |
| YouTube 자막 정책·차단 | 자막 전문 미보관, 요약·타임스탬프만 저장. 수집 도구 2종(yt-dlp, Agent-Reach)으로 폴백 |
