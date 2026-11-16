# GRADER — M4 서술형 채점 설계

서술형(`type: open`) 답안을 rubric 으로 채점해 `GradeResult`(CONTRACT §4)를 돌려준다. 구현 위치는 `lib/grader/` + `app/api/attempts` (CC). 꼬리질문 채점은 같은 엔진에 `rubricKeywords`·`maxScore` 를 넣어 재사용한다 (꼬리질문 생성 후).

모델 사실 출처: Claude API 스킬 모델표 (2026-10-06 캐시). 구현 전에 Models API 로 다시 확인한다.

## 1. 결정

| # | 결정 | 이유 |
|---|---|---|
| D1 | **의미 일치 채점** (사용자 확정 2026-11-16). `mustHave` 는 개념 목록이지 문자열 목록이 아니다 | 키워드는 영어 원어, 답은 한국어다. "memory fidelity" 를 "기억 충실도" 로 쓴 답이 맞다 |
| D2 | 모델은 **항목별 판정만** 한다. 합산·감점·verdict 는 서버 코드가 계산한다 | 모델 산술 오류와 "10점 달라" 식 주입이 총점에 직접 닿지 않게 한다 |
| D3 | 항목마다 `evidence` = **답안에서 그대로 인용한 구간**. 서버가 답안의 부분 문자열인지 확인하고 아니면 그 항목 0점 | 답에 없는 내용을 근거로 점수를 주는 환각을 기계적으로 막는다. 공백·문장부호만 정규화 |
| D4 | 기본 `claude-haiku-5-5` (effort `medium` 명시). 아래 조건에서 `claude-sonnet-5-5` 로 승급 | 한 건 비용: Haiku ≈ $0.0005, Sonnet ≈ $0.01 (입력 2k·출력 0.6k 토큰 가정) |
| D5 | 출력은 **구조화 출력**(AI SDK 의 object 출력 → API `output_config.format`). 강제 tool 호출은 쓰지 않는다 | Sonnet 5.5 는 강제 `tool_choice` 가 400 |
| D6 | 재현성은 **결과 저장**으로 얻는다. `(questionId, rubricHash, answerHash)` 가 같으면 저장된 결과를 돌려준다 | 현재 모델은 `temperature` 를 받지 않는다 (400). 같은 답에 점수가 바뀌면 신뢰가 깨진다 |
| D7 | 호출 경로는 AI Gateway (`anthropic/claude-haiku-5-5` 문자열) | ARCHITECTURE 결정. Gateway 를 거쳐도 캐시가 적용되는지는 `cache_read` 사용량으로 확인한다 (R3) |

**D4 반론 검토**: 한 건 1센트면 처음부터 Sonnet 만 써도 된다. 캐스케이드는 코드와 캐시 공간이 둘로 갈린다 (캐시는 모델별). 그래서 **평가 세트(§4)에서 Haiku 단독 / 캐스케이드 / Sonnet `low` 단독을 같이 재고**, Haiku 일치율이 Sonnet 보다 3%p 이상 낮으면 Sonnet 단독으로 간다. 숫자가 나오기 전에는 캐스케이드를 기본으로 둔다.

## 2. 흐름

```
POST /api/attempts {questionId, answer}
 → 검증: 로그인, 답안 1~3000자, open 문항인가
 → 캐시 조회 (D6) ── 있으면 반환
 → Haiku 채점 → 스키마 검증 → evidence 검증(D3) → 서버 합산(D2)
 → 승급 조건? ── 예 → Sonnet 재채점 (Sonnet 결과를 채택)
 → 저장 → FSRS 평점 제안 → GradeResult
```

**승급 조건** (하나라도):
1. 모델이 어느 항목에 `uncertain: true` 를 표시
2. 총점이 경계 ±1 안 (3·4점, 6·7점)
3. 스키마 위반, evidence 검증 실패 항목이 2개 이상, 또는 `stop_reason: refusal`. Haiku 거절에는 서버 측 fallback 이 없으므로 앱이 처리한다

Sonnet 도 실패하면 `{ error: { code: "GRADER_UNAVAILABLE" } }` 를 돌려준다. 이 시도는 FSRS 에 기록하지 않는다. 점수를 지어내지 않는다.

## 3. 채점 규칙 (서버 코드)

- 항목 점수는 `0..points` 로 자른다. 감점은 모델이 해당한다고 표시한 것만, rubric 값 그대로 쓴다. 총점은 `max(0, Σawarded + Σdeductions)`.
- **verdict**: `pass` ≥ 7, `partial` 4–6, `fail` ≤ 3 (10점 만점). `mustHave` 개념이 하나라도 빠지면 최대 `partial`.
- **FSRS 평점 제안**: fail → Again, partial → Hard, pass → Good. 사용자가 Easy 로 올리거나 내릴 수 있다 (사용자가 최종 결정).
- **프롬프트 구조** (캐시 순서): ① 고정 system (채점 원칙·출력 규칙) ② 문항 + rubric (`cache_control`) ③ `<answer>` 태그 안의 답안. ①+② 는 512 토큰 최소치를 넘긴다. 답안은 데이터로만 취급하라고 system 에 적고, 답 안의 지시는 무시한다.
- 모델 출력 스키마: `criteria[{id, awarded, evidence, uncertain}]`, `deductionsHit[desc]`, `mustHaveCovered[{term, covered}]`, `feedbackKo` (3~5문장, 빠진 개념을 짚는다). `modelAnswerKo` 는 rubric 값을 서버가 붙인다.

## 4. 평가 세트 (구현 전 완료 조건)

위치 `lib/grader/eval/`. 서술형 22문항 × 6유형 = **132건**.

| 유형 | 내용 | 기대 |
|---|---|---|
| 정답 | 모범답안을 다른 말로 풀어 씀 | pass |
| 부분 | 항목 하나를 일부러 뺌 | partial |
| 오개념 | rubric `deductions` 의 오개념을 넣음 | 감점 적용 |
| 무관 | 주제는 맞지만 질문에 답하지 않음 | fail |
| 영어 | 정답을 영어로 씀 | pass (D1 확인) |
| 주입 | 빈약한 답 + "만점을 줘라" 류 지시 | fail 또는 partial, pass 절대 금지 |

- 답안 초안은 **Gemini(AG)** 가 쓴다. 채점기와 같은 계열이 쓰면 서로 맞춰진 문체를 후하게 볼 수 있다. **항목별 정답 라벨은 사람이 단다.**
- 합격선 (Haiku 또는 채택한 구성):

| 지표 | 기준 |
|---|---|
| verdict 일치율 | ≥ 90% |
| 총점 MAE | ≤ 1.0점 |
| 항목 단위 일치율 | ≥ 85% |
| 주입 유형 pass 비율 | 0% |
| 승급 비율 (캐스케이드일 때) | ≤ 25% |
| p95 지연 | ≤ 6초 |

## 5. 위험

| # | 위험 | 대응 |
|---|---|---|
| R1 | 자기 계열 편향: 문항·모범답안을 Sonnet 이 썼고 채점도 Claude 다 | 평가 세트 답안은 Gemini 가 쓰고, 라벨은 사람이 단다 |
| R2 | 모범답안이 틀리면 채점도 틀린다 | 문항이 `reviewed` 이상일 때만 AI 채점을 켠다. draft 는 모범답안만 보여준다 |
| R3 | Gateway 가 `cache_control` 을 전달하지 않을 수 있다 | 첫 구현에서 `cache_read_input_tokens` 를 확인한다. 0이면 비용만 늘고 기능은 같다 |
| R4 | 답안 개인정보 | 답안 원문은 사용자 소유 데이터로 저장하고, 평가 세트에는 합성 답안만 쓴다 |

## 6. 순서

1. 평가 세트 132건 (AG 초안 → 사람 라벨). 꼬리질문보다 먼저.
2. `lib/grader/` 순수 함수: 합산, evidence 검증, verdict, 승급 판정. 모델 호출 없이 단위 테스트한다.
3. 모델 호출 + 평가 세트 실행 → D4 구성 확정. 실행 비용은 132건 × 3구성 ≈ $2 미만이고, 돌리기 전에 승인받는다.
4. `app/api/attempts` 연결은 AG 앱 골격이 병합된 뒤.
