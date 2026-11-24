# STATUS

프로젝트 진행 상태의 정본. 계획은 `PLAN.md`, 규칙은 `CONTRACT.md`.

갱신: 2026-11-25 (CC, `fix/notes-review`)

## 마일스톤

| M | 상태 | 근거 |
|---|---|---|
| M1 수집 기반 | ✅ 완료 | `ingest audit` 6/6 ok, MIT 4개 레포 md 355개, `link_only` 2개 0바이트, 강의 70편 manifest (공개 62, 비공개 8) |
| M2 콘텐츠 파이프라인 | 🟡 진행 중 | 아래 표 |
| M3 앱 MVP | ⏳ AG 착수 대기 (`feat/ui-ag`, 목업) | CONTRACT §4 타입 고정됨 |
| M4 AI 채점 + 공개 | ⏳ | |

## M2 완료 기준 대비

| 기준 (PLAN.md) | 상태 |
|---|---|
| boost-devs 에서 ≥200 문항 draft, 전부 `sourceId`·`roles` 보유 | ✅ 268개, `ingest check` 0 errors |
| (추가) jbee·gyoogle·jobhope (MIT) | ✅ 95개 (`extract_notes`, 주제 범위 안의 글만 150개 → 중복 55개 제외). 원문 오류 80곳(카드 48개)을 `pipeline/overrides/notes.yaml` 로 바로잡음. 사람 확인 대기 |
| CME295 1편 → 세그먼트 ≥5 + 문항 ≥10 | ✅ 세그먼트 9개 (YouTube 챕터, manifest), 서술형 문항 11개 (`cme295-2025au-l01-q01..11`). 한국어 요약 강의 파일은 AG 담당 |
| (추가) Agent 직무 보강 시범 | ✅ CS329Z 1강 → 서술형 12개 (ai-agents 7, agent-tools-mcp 2, self-improving 2, llm-eval 1) |
| `link_only` 원문이 섞이면 빌드 실패 | ✅ `ingest check` 가 본문 600자 초과 시 error. CI 연결은 M3 레포 구성 후 |

## 남은 일

- [x] 시범 문항 검토 (2026-11-16): 말투 "~하세요" 통일, 조사 띄어쓰기 교정, Reflexion 중복(q04·q05)을 q05로 병합. 생성 지침에 규칙 3개 추가
- [x] `cs329z-2026au-l01-q04.md` 삭제 (q05에 병합됨. id는 재사용하지 않는다)
- [ ] 나머지 60편 문항 확대: **현 단계에서는 하지 않음** (사용자 결정 2026-11-16)
- [x] 계약 v2 (`chore/contract-v2`): AG의 꼬리질문·syllabus·slideUnits를 **선택 항목**으로 받고, `generation.by: notebooklm` 추가(검수는 CC·사람만), 복사 검사를 frontmatter 전체로 확대, 모의면접 삭제(사용자 승인)
- [x] AG: `cce35b3` 위로 rebase 완료. 남은 것: `chore/contract-v2`(`c9b1444`) 위로 다시 rebase (충돌 없음)
- [ ] **NotebookLM 강의 2편 검수 fail** (2026-11-16, CC): 슬라이드 번호 날조, 강의에 없는 일반론, 날짜 오류. HIGH 15 / MED 24 / LOW 15. AG가 영상·실제 덱을 소스로 넣어 재생성 → CC 재검수
- [x] 계약 보완 (`c9b1444`): `generation.sources` 필수, 슬라이드 번호는 실제 덱 쪽수 이내, 공유 노트북 URL만, draft 강의 콘텐츠는 UI에서 숨김
- [x] 파이프라인 보안 보강: summary_link 복사 검사 fail closed, 자막 경로의 id 검증, 업로더 불일치 차단
- [x] 채점 방식: **의미 일치로 확정** (사용자 2026-11-16). `mustHave`·`rubricKeywords` 는 영어 원어여도 한국어 답의 같은 개념을 인정한다
- [ ] concept 카드 268개의 `difficulty` 는 전부 자리표시자(`intermediate`). critic 또는 사람이 정한다
- [x] jbee·gyoogle·jobhope (MIT) 추출: 150개 draft
- [x] 노트 카드 1·2차 검수 (2026-11-20): codex `gpt-5.6-luna` 가 지적(high 148건, 중복 83건) → antigravity `claude-sonnet-5-5` 가 확인(치환 71건 채택, 61건 반려, drop 57건: boost 중복 48 + 노트 간 9) → CC가 치환문을 원문과 대조. 고친 카드 46개에는 본문 끝에 수정 표시가 붙는다
- [x] 검수 결과 보완 (2026-11-25): `gyoogle-os-002`(은행원 등)·`gyoogle-os-015`(데커·피터슨 등) 되살리고 교정, `gyoogle-db-002`·`gyoogle-ds-008` 치환 보완
- [ ] 노트 카드 검수 결과 사람 확인: `pipeline/overrides/notes.yaml` (drop·치환 목록)
- [ ] ai-harness `review` role 이 고장: policy 의 `antigravity/claude-sonnet-4-6`·`gemini-3.1-pro` 가 Antigravity에서 사라짐. 이번 검수는 `--model claude-sonnet-5-5` 로 우회함
- [x] CI: `.githooks/pre-commit` (테스트 + `ingest check --require-transcripts` + `ingest gate`) + `.github/workflows/content.yml` (원격 생기면 동작). `core.hooksPath` 설정됨
- [x] M4 채점기 설계: `docs/GRADER.md`
- [ ] M4 평가 세트 132건 (AG 답안 초안 → 사람 라벨) → `lib/grader/` 순수 함수 → 모델 구성 확정
- [ ] 서술형 꼬리질문 3개씩: **추후** (사용자 결정 2026-11-16)
- [ ] 비공개 CS329Z 6편: 공개되면 `ingest videos` 재실행으로 자동 편입

## 운영 메모

- 원본 자막 62편: `~/.cache/study-platform/raw/yt/` (전부 yt-dlp, 직접 올린 자막 59 / 자동 3). repo 밖이며 commit 대상이 아니다.
- Defuddle 대체 경로는 CS329Z 1강에서 실측 검증: 챕터 14개 일치, 시작 시각 오차 ≤1초.
