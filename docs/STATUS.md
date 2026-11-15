# STATUS

프로젝트 진행 상태의 정본. 계획은 `PLAN.md`, 규칙은 `CONTRACT.md`.

갱신: 2026-11-15 (CC, `feat/pipeline-cc`)

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
| CME295 1편 → 세그먼트 ≥5 + 문항 ≥10 | ✅ 세그먼트 9개 (YouTube 챕터, manifest), 서술형 문항 11개 (`cme295-2025au-l01-q01..11`). 한국어 요약 강의 파일은 AG 담당 |
| (추가) Agent 직무 보강 시범 | ✅ CS329Z 1강 → 서술형 12개 (ai-agents 7, agent-tools-mcp 2, self-improving 2, llm-eval 1) |
| `link_only` 원문이 섞이면 빌드 실패 | ✅ `ingest check` 가 본문 600자 초과 시 error. CI 연결은 M3 레포 구성 후 |

## 남은 일

- [ ] `boost-net-031.md`, `boost-net-032.md` 삭제 (추출 규칙 변경 전의 잔여 파일, commit 안 됨. 자동 삭제가 권한 대기로 막혀 남겨둠)
- [ ] 문항 생성 시범 23개 품질 확인 (사람) → 통과하면 나머지 60편으로 확대 (Sonnet 1편당 약 10만 토큰)
- [ ] `rubric.mustHave` 가 영어 원어 키워드다. 한국어 답안 채점은 문자열 일치가 아니라 의미 일치여야 한다 → M4 grader 설계에 반영
- [ ] concept 카드 268개의 `difficulty` 는 전부 자리표시자(`intermediate`). critic 또는 사람이 정한다
- [ ] jbee·gyoogle·jobhope (MIT) 추출: 구조가 boost-devs 와 달라 규칙 추출기 미적용
- [ ] AG: `git rebase feat/initial-plan-cc` 후 착수 (계약이 2회 갱신됨)
- [ ] CI: `ingest check` + "published 전환은 사람 승인" 검사 (CONTRACT §3)
- [ ] 비공개 CS329Z 6편: 공개되면 `ingest videos` 재실행으로 자동 편입

## 운영 메모

- 원본 자막 62편: `~/.cache/study-platform/raw/yt/` (전부 yt-dlp, 직접 올린 자막 59 / 자동 3). repo 밖이며 commit 대상이 아니다.
- Defuddle 대체 경로는 CS329Z 1강에서 실측 검증: 챕터 14개 일치, 시작 시각 오차 ≤1초.
