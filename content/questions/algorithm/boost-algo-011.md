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
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

Dynamic Programming

## 해설

다이나믹 프로그래밍(Dynamic Programming)은 **중복된 하위 문제들의 결과를 저장**한 후 원래 문제의 결과와 합하는 알고리즘이다.

다이나믹 프로그래밍과 분할 정복 알고리즘의 큰 차이점은 **중복된 문제**의 차이이다. 분할 정복 알고리즘을 사용한 병합 정렬이나 퀵 정렬의 경우 하위 문제들이 중복되지 않는다. 반면 다이나믹 프로그래밍은 중복된 하위 문제들의 결과를 저장함으로써 중복 계산을 피한다. 만약 문제가 중복된 하위 문제가 없다면 그 문제는 다이나믹 프로그래밍으로 풀 수 없다.

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
# 전역 변수로 table과 n이 미리 선언됨
def fibb(n):
  if n <= 1:
    return 1
  if table[n]:
    return table[n]
  table[n] = fibb(n-1) + fibb(n-2)
  return table[n]
```

**References**
- [23장. 다이나믹 프로그래밍 - 파이썬 알고리즘 인터뷰](http://www.yes24.com/Product/Goods/91084402)
