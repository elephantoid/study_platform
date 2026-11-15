---
id: boost-algo-001
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

시간, 공간 복잡도

## 해설

복잡도란 알고리즘의 성능을 평가하는 척도로 <strong>시간 복잡도(Time Complexity)</strong>와 <strong>공간 복잡도(Space Complexity)</strong>로 나뉜다.

- 시간 복잡도(Time Complexity): 알고리즘에 사용되는 연산 횟수의 총량
- 공간 복잡도(Space Complexity): 알고리즘에 사용되는 메모리 공간의 총량

즉, 시간 복잡도는 속도에 대한 분석 결과이고, 공간 복잡도는 메모리 사용량에 대한 분석 결과이다.

알고리즘의 복잡도는 점근적 표기법으로 나타내는데, 점근적 표기법에는 대표적으로 O(빅오), Ω(오메가), Θ(세타)가 있다.

- O Notation (빅오 표기법): 점근적 상한선 / 최악의 경우
- Ω Notation (오메가 표기법): 점근적 하한선 / 최상의 경우
- θ Notation (세타 표기법): 점근적 상한선과 점근적 하한선의 교집합 / 평균의 경우

일반적으로 최악의 경우의 성능을 측정하는 빅오 표기법을 많이 사용한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/complexity.png)

**References**
- [알고리즘의 시간 복잡도와 Big-O 쉽게 이해하기 - Chulgil.Lee](https://blog.chulgil.me/algorithm/)
- [시간복잡도와 공간복잡도(Time Complexity Space Complexity) - 오늘도 MadPlay!](https://madplay.github.io/post/time-complexity-space-complexity)
- [[컴퓨터 알고리즘 성능분석] 점근적 표기법 (Asymptotic Notation) - 될성부른떡잎](https://ledgku.tistory.com/31)
