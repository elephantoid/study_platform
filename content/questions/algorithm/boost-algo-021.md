---
id: boost-algo-021
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

Kruskal

## 해설

Kruskal 알고리즘이란 **간선 선택**을 기반으로 하는 알고리즘으로, 이전 단계에서 만들어진 신장 트리와는 상관없이 무조건 최소 간선만을 선택하는 방법이다. 매 단계마다 사이클을 만들지 않는 최소 간선을 채택하면 된다.

Kruskal 알고리즘은 탐욕적인 방법(greedy method)을 이용하여, 네트워크(가중치를 간선에 할당한 그래프)의 모든 정점을 최소 비용으로 연결하는 최적 해답을 구하는 방법이다. MST(최소 비용 신장 트리)가 **최소 비용의 간선으로 구성**되며, **사이클을 포함하지 않는다**는 조건에 근거하여, 최적해를 보장할 수 있다. 각 단계에서 사이클을 이루지 않는 최소 비용 간선을 선택하면 된다.

주의할 점은 다음 간선을 `이미 선택된 간선들의 집합`에 추가할 때 사이클을 생성하는지를 체크해야 한다는 것이다. 새로운 간선이 `이미 다른 경로에 의해 연결되어 있는 정점들`을 연결할 때 사이클이 형성된다. 즉, 추가할 새로운 간선의 양끝 정점이 같은 집합에 속해 있으면, 사이클이 형성된다. 따라서, 추가하고자 하는 간선의 양끝 정점이 같은 집합에 속해 있는지를 먼저 검사해야 하고, 이때 `union-find 알고리즘`을 사용하여 검사할 수 있다.

Kruskal 알고리즘의 동작방법은 아래와 같다.

- 그래프의 간선들을 가중치의 오름차순으로 정렬한다.
- 정렬된 간선 리스트에서 순서대로 사이클을 형성하지 않는 간선을 선택한다.
- 즉, 가장 낮은 가중치를 먼저 선택한다.
- 사이클을 형성하는 간선을 제외한다.
- 해당 간선을 현재의 MST(최소 비용 신장 트리)의 집합에 추가한다.

Kruskal 알고리즘의 시간 복잡도는 $O(e \log_2 e)$이다.

> **Kruskal 알고리즘 수행 단계**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/kruskal.png)

**References**
- [[알고리즘] Kruskal 알고리즘 이란 - heejeong Kwon](https://gmlwjd9405.github.io/2018/08/29/algorithm-kruskal-mst.html)
