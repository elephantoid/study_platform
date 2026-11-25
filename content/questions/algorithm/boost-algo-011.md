---
id: boost-algo-011
topicId: algorithm
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: boost-algo-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1 + claude-opus-5-5
  at: '2026-11-25'
followUps:
- id: boost-algo-011-f1
  order: 1
  promptMd: 최단 경로 문제는 최적 부분 구조를 갖지만, 일반 그래프의 최장 단순 경로 문제는 그렇지 않습니다. 이유를 반례와 함께 설명하고, 이 문제의 계산 복잡도와 DP를 쓸 수 있는 예외를 말해 보세요.
  hintKo: 두 부분 경로를 이었을 때 같은 정점을 두 번 지날 수 있는지 보세요.
  rubricKeywords:
  - 부분 문제가 독립적이지 않음
  - 정점 재방문
  - 반례
  - DAG에서는 위상 순서로 DP 가능
  - NP-hard
  modelAnswerKo: '최단 경로에서는 $u \to w \to v$가 최단이면 $u \to w$와 $w \to v$도 각각 최단입니다. 더 짧은 부분 경로가 있으면 바꿔 끼워 전체를 줄일 수 있기 때문입니다.


    최장 **단순** 경로에서는 부분 문제가 독립적이지 않습니다. 예를 들어 정점 4개의 순환 $q - r - t - s - q$에서 $q$에서 $t$로 가는 최장 단순 경로 중 하나는 $q \to r \to t$입니다. 그런데 $q$에서 $r$로 가는 최장 단순 경로는 $q \to s \to t \to r$로, 최종 정점 $t$를 이미 지나므로 이어 붙일 수 없습니다. 이 문제는 NP-hard입니다.


    DAG에서는 정점을 다시 방문할 수 없으므로 위상 순서로 $dp[v] = \max_{(u,v)}(dp[u] + w)$를 계산해 $O(V+E)$에 풉니다(시작점 $s$가 정해져 있으면 $dp[s]=0$, 나머지는 $-\infty$로 시작). 작업 그래프의 임계 경로가 그 예입니다. 정점 수가 작으면 방문 집합을 상태에 넣는 비트마스크 DP로 지수 시간에 풀 수도 있습니다.'
  maxScore: 10
- id: boost-algo-011-f2
  order: 2
  promptMd: 0/1 배낭 문제의 $O(NW)$ DP는 다항 시간 알고리즘인가요? 1차원 배열로 공간을 줄일 때 무게를 큰 쪽부터 순회해야 하는 이유도 설명하세요.
  hintKo: 숫자 W를 입력으로 적는 데 필요한 길이와 W의 값이 어떤 관계인지 생각해 보세요.
  rubricKeywords:
  - 의사 다항 시간
  - 입력 길이는 log W
  - 역순 순회는 이전 물건까지의 dp[w - w_i]를 읽음
  - 정방향은 같은 물건을 중복 사용
  modelAnswerKo: '아닙니다. $W$는 $\log_2 W$비트로 주어지므로 $O(NW)$는 입력 길이에 대해 지수적입니다. 이런 알고리즘을 의사 다항 시간(pseudo-polynomial)이라 하며, 0/1 배낭은 NP-hard입니다. $W$가 작을 때만 실용적이고, 크면 가치 기준 DP나 근사(FPTAS), 분기 한정을 검토합니다.


    1차원 배열은 $dp[w] = \max(dp[w], dp[w - w_i] + v_i)$로 갱신합니다. 오른쪽의 $dp[w - w_i]$는 물건 $i$를 고려하기 **전**의 값이어야 합니다. 작은 쪽부터 돌면 이미 물건 $i$를 넣은 값을 읽어 같은 물건을 여러 번 쓰게 됩니다(이것은 무한 배낭의 풀이입니다). 큰 쪽부터 돌면 읽는 칸이 아직 갱신되지 않아 각 물건을 한 번만 씁니다. 공간은 $O(W)$가 됩니다.'
  maxScore: 10
- id: boost-algo-011-f3
  order: 3
  promptMd: HMM이나 CRF의 디코딩에 쓰는 Viterbi 알고리즘을 DP로 설명하세요. 상태 정의, 점화식, 복잡도를 말하고, LLM의 텍스트 생성에는 왜 Viterbi 대신 beam search를 쓰는지 설명하세요.
  hintKo: Markov 가정이 있으면 과거를 무엇 하나로 요약할 수 있나요?
  rubricKeywords:
  - dp[t][s] = 시각 t에 상태 s로 끝나는 최대 점수
  - O(T S^2)
  - Markov 가정으로 과거를 직전 상태로 요약
  - LLM은 전체 이력에 의존해 상태가 지수적
  modelAnswerKo: '$dp[t][s]$를 시각 $t$에 상태 $s$로 끝나는 경로의 최대 로그 확률로 둡니다. 점화식은 HMM 기준으로 $dp[t][s] = \max_{s''}(dp[t-1][s''] + \log P(s \mid s'')) + \log P(x_t \mid s)$이고(선형 사슬 CRF에서는 로그 확률 대신 정규화하지 않은 전이·자질 점수를 더합니다), 최댓값을 준 $s''$를 저장해 두었다가 끝에서 거꾸로 따라가며 경로를 복원합니다. 시간은 $O(TS^2)$, 공간은 $O(TS)$입니다. 확률의 곱은 언더플로가 나므로 로그로 더합니다.


    이것이 성립하는 이유는 1차 Markov 가정 때문에 과거가 직전 상태 하나로 요약되기 때문입니다. LLM의 다음 토큰 확률은 앞의 모든 토큰에 의존하므로 정확한 DP의 상태는 접두 문장 전체가 되어 어휘 크기 $V$에 대해 $V^t$로 늘어납니다. 부분 문제가 겹치지 않아 저장해도 이득이 없습니다. 그래서 상위 $B$개의 접두만 남기는 beam search로 근사하거나 sampling을 씁니다. beam search는 최적해를 보장하지 않습니다.'
  maxScore: 10
---

## 문제

Dynamic Programming

## 해설

다이나믹 프로그래밍(Dynamic Programming)은 **중복된 하위 문제들의 결과를 저장**한 후 원래 문제의 결과와 합하는 알고리즘이다.

다이나믹 프로그래밍과 분할 정복 알고리즘의 큰 차이점은 **중복된 문제**의 차이이다. 분할 정복 알고리즘을 사용한 병합 정렬이나 퀵 정렬의 경우 하위 문제들이 중복되지 않는다. 반면 다이나믹 프로그래밍은 중복된 하위 문제들의 결과를 저장함으로써 중복 계산을 피한다. 만약 문제에 중복된 하위 문제가 없다면 결과를 저장해도 이득이 없어 분할 정복과 다를 것이 없다.

다이나믹 프로그래밍은 크게 상향식과 하향식 접근법으로 나뉜다.

> **상향식 접근법: 타뷸레이션(Tabulation)**

상향식 접근법(Bottom-Up Approach)는 작은 문제의 정답을 이용해 큰 문제의 정답을 푸는 방식이다. 데이터를 테이블 형태로 저장하기 때문에 `타뷸레이션(Tabulation)`이라고 부른다.

```python
def fibb(n):
  table = [1] * (n+1)
  for i in range(2, n+1):
    table[i] = table[i-1] + table[i-2]
  return table[n]
```

> **하향식 접근법: 메모이제이션(Memoization)**

하향식 접근법(Top-Down Approach)는 작은 문제의 결과를 얻었는지 확인해가며 문제를 재귀로 풀어가는 방식이다. 분할 정복에서의 재귀 방식과 유사하나 이미 푼 문제인지 검사한다. 이와 같은 방식을 `메모이제이션(Memoization)`이라고 부른다.

```python
# 위와 같이 fibb(0) = fibb(1) = 1 로 둔다
def fibb(n, table=None):
  if table is None:
    table = {}
  if n <= 1:
    return 1
  if n in table:
    return table[n]
  table[n] = fibb(n-1, table) + fibb(n-2, table)
  return table[n]
```

**References**
- [23장. 다이나믹 프로그래밍 - 파이썬 알고리즘 인터뷰](http://www.yes24.com/Product/Goods/91084402)

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

**적용 조건**

- **최적 부분 구조(Optimal Substructure)**: 문제의 최적해를 부분 문제의 최적해로 만들 수 있다. 분할 정복과 그리디에도 필요한 조건이다.
- **중복되는 부분 문제(Overlapping Subproblems)**: 같은 부분 문제가 여러 번 나타난다. 그래야 저장하는 이득이 있다. 예: `fibb(5)`를 단순 재귀로 풀면 `fibb(3)`을 2번, `fibb(2)`를 3번 계산한다.

**푸는 순서**: 상태 정의 → 점화식 → 초깃값 → 계산 순서 → 답의 위치. 시간 복잡도는 대개 (상태 수) × (상태 하나의 전이 비용)이다. 피보나치의 단순 재귀는 $O(2^N)$(더 정확히는 $\Theta(\varphi^N)$, $\varphi \approx 1.618$), DP는 $O(N)$이다.

| | Bottom-up | Top-down |
| --- | --- | --- |
| 계산 범위 | 모든 상태 | 필요한 상태만 |
| 순서 | 의존 관계에 맞게 직접 정한다 | 재귀가 정한다 |
| 비용 | 반복문이라 상수가 작다 | 호출 비용, 재귀 깊이 제한 |
| 공간 최적화 | 앞의 몇 개만 남기기 쉽다 | 어렵다 |
