---
id: boost-algo-023
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

Topological Sort

## 해설

`위상 정렬(Topological Sort)`란 <u><strong>방향 그래프</strong>의 모든 노드를 선행 순서를 지키며 정점을 순서대로 나열하는 것</u>이다. 위상 정렬의 대표적인 예로 대학교 선수과목이 있다. 위상 정렬 알고리즘은 다음과 같다.

- 진입차수가 0인 노드를 큐에 넣는다.
- 큐가 빌 때가지 다음을 반복한다.
  - 큐에서 요소를 꺼내 해당 노드에서 출발하는 간선을 그래프에서 제거한다.
  - 새롭게 진입차수가 0이 된 노드를 큐에 넣는다.

만약 모든 노드를 방문하기 전에 큐가 빈다면 사이클이 존재한다고 판단할 수 있다. 왜냐하면 사이클이 존재하는 경우 사이클을 형성하는 노드들의 진입차수가 항상 1 이상이므로 큐에 넣을 수가 없기 때문이다.

구현 방법은 [위상 정렬 - 이것이 취업을 위한 코딩테스트다](https://github.com/ndb796/python-for-coding-test/blob/master/10/6.py) 구현 코드를 참고!

> **💡 진입 차수(degree)**  
> 노드의 관점에서 들어오는 간선의 개수를 진입 차수(degree)라고 한다.

**References**
- [[알고리즘] 위상 정렬(Topological Sort)이란](https://gmlwjd9405.github.io/2018/08/27/algorithm-topological-sort.html)
- [위상정렬 - 위키백과](https://ko.wikipedia.org/wiki/%EC%9C%84%EC%83%81%EC%A0%95%EB%A0%AC)
