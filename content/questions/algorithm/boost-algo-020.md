---
id: boost-algo-020
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

Prim

## 해설

Prim 알고리즘이란 시작 정점에서부터 출발하여 신장트리 집합을 단계적으로 확장해나가는 방법이다. **정점 선택**을 기반으로 하는 알고리즘이며, 이전 단계에서 만들어진 신장 트리를 확장하면서 나아가는 방법이다. Prim 알고리즘의 동작방법은 아래와 같다.

- 시작 단계에서는 시작 정점만이 MST(최소 비용 신장 트리) 집합에 포함된다.
- 앞 단계에서 만들어진 MST 집합에 인접한 정점들 중에서 최소 간선으로 연결된 정점을 선택하여 트리를 확장한다.
- 즉, 가장 낮은 가중치를 먼저 선택한다.
- 위의 과정을 트리가 (N-1)개의 간선을 가질 때까지 반복한다.

Prim 알고리즘의 시간 복잡도는, 주 반복문이 정점의 수 n만큼 반복하고, 내부 반복문이 n번 반복되므로, $O(n^2)$이다.

> **Prim 알고리즘의 수행 단계**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/prim.png)

**References**
- [[알고리즘] Prim 알고리즘 이란 - heejeong Kwon](https://gmlwjd9405.github.io/2018/08/30/algorithm-prim-mst.html)
