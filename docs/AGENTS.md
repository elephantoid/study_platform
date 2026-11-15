# AGENTS

## 설계 원칙 (공식 문서 근거)

- **워크플로 우선, 자율 에이전트는 최소화**. 경로가 고정된 작업은 코드 경로로 묶는다 — [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents). 수집은 스크립트로 하고, LLM 은 변환·판정에만 쓴다.
- **패턴**: routing(직무·토픽 태깅) → prompt chaining(분할 → 요약 → 문항) → evaluator-optimizer(critic) → parallelization(강의 단위 병렬) — 같은 문서.
- **서브에이전트를 쓰는 조건**: 산출물이 메인 컨텍스트를 오염시킬 때, 도구 제한이 필요할 때, 독립적이고 요약 가능할 때 — [Claude Code subagents](https://code.claude.com/docs/en/sub-agents). 정의 위치는 `.claude/agents/<name>.md`. 필수 필드는 `name`, `description`. `tools` 는 allowlist 로 최소화하고 `model` 은 별칭 또는 전체 ID 로 지정한다.
- **반복 절차는 스킬로**: `.claude/skills/<name>/SKILL.md`, 500줄 미만. 부작용이 있는 스킬에는 `disable-model-invocation: true` 를 건다 — [Skills](https://code.claude.com/docs/en/skills).
- **Antigravity 쪽 규칙**: `AGENTS.md` / `.agents/rules/*.md`, frontmatter `trigger` 필수, 파일당 24KB 제한 — [Antigravity rules](https://antigravity.google/docs/rules).

## 모델 라우팅 기준

모델 ID 출처: [Claude models overview](https://platform.claude.com/docs/en/about-claude/models/overview), [Antigravity models](https://antigravity.google/docs/models), [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing) (2026-11-15).

| 작업 성격 | Claude | Gemini / Antigravity | 근거 |
|---|---|---|---|
| 계획·설계·rubric 작성 (고난도, 저빈도) | `claude-opus-5-5` | `gemini-4-carbon` / Orchestrator 의 planner | 공식 문서상 "대부분 워크로드 권장" / Carbon·Argon 이 계획 담당 |
| 문항 생성 (중난도, 중빈도) | `claude-sonnet-5-5` | `gemini-4-hydrogen` | 속도·지능 균형 |
| 대량 추출·태깅·요약 (저난도, 고빈도) | `claude-haiku-5-5` (Batch 50% 할인) | `gemini-3.5-flash-lite` | 분류·추출용 저가 티어 |
| 최종 검수 critic | 생성 모델과 **다른 계열** | ↔ | 자기 산출물 자기 검수는 놓친다 |

`claude-fable-5-2` 는 쓰지 않는다. 단가가 Opus 의 2배인데, 이 파이프라인에는 Opus 로 부족한 추론 단계가 없다.

가격 주의: `gemini-4-carbon/argon` 은 2026-12-01, `gemini-3.8-flash` 는 2027-01-01 에 인상 예정이다 (Gemini pricing).

## 에이전트 목록

| # | 이름 | 역할 | 입력 → 출력 | 도구 (allowlist) | 모델 | 실행 위치 |
|---|---|---|---|---|---|---|
| 0 | (스크립트) `ingest` | repo md·YouTube 메타·자막 수집. 같은 오류 2회면 중단하고 실패 보고 | `sources.yaml` → `tmp/raw/*` | gh, yt-dlp 또는 Agent-Reach (`--lang en-orig,en` 고정) | **LLM 없음** | `pipeline/` Python CLI |
| 1 | `source-auditor` | 소스 라이선스·reuse 판정, 갱신 감지 | `sources.yaml` → 판정 + diff | Bash(`gh api` 만), Read | haiku | Claude Code subagent |
| 2 | `interview-extractor` | 레포 md 에서 Q/A 정규화, 직무·토픽 태깅 | `tmp/raw/repo/*.md` → `content/questions/*.md` (draft) | Read, Write(`content/` 만) | haiku | subagent, 파일 단위 병렬 |
| 3 | `lecture-segmenter` | 자막을 챕터로 나누고 한국어 요약 + 타임스탬프 작성 | `tmp/raw/yt/<id>.srt` → `content/lectures/<id>.md` | Read, Write(`content/` 만) | sonnet | subagent, 강의 단위 병렬 |
| 4 | `question-generator` | 세그먼트에서 면접 문항·모범답안·rubric 생성 (RS·Agent 직무 보강) | `content/lectures/*.md` → `content/questions/*.md` | Read, Write(`content/` 만) | sonnet. rubric 템플릿은 opus 가 1회 작성 | subagent |
| 5 | `content-critic` | 사실 오류·중복·라이선스 위반·난이도 판정 → pass/fail + 사유 | draft md → 판정 JSON | Read, Grep | 생성 모델과 다른 계열 (Gemini 또는 `ai review`) | 외부 위임 |
| 6 | 런타임 `grader` | 서술형 답안을 rubric 으로 채점하고 피드백 생성 | 답안 + rubric → score, feedback | 없음 (구조화 출력) | `anthropic/claude-haiku-5-5` 기본, 낮은 확신이면 `claude-sonnet-5-5` 로 승급 | 앱 서버 (AI SDK + Gateway) |

- 1~4 는 `.claude/agents/*.md` 로 정의한다. 각 파일의 `description` 은 "언제 부르는가" 한 문장으로 쓴다.
- 쓰기 경로는 `content/` 로 제한한다. 앱 코드·설정은 에이전트가 건드리지 않는다.
- 2~4 의 출력은 언제나 `status: draft` 다. `published` 전환은 사람 PR 리뷰로만 한다.
- 실행 절차(수집 → 변환 → critic → PR)는 스킬 `content-pipeline` 하나로 묶는다. 부작용이 있으므로 `disable-model-invocation: true` 를 건다.
