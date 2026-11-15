---
id: boost-algo-019
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

Minimum Spanning Tree

## 해설

> **Spanning Tree**

Spanning Tree(신장 트리)란 그래프에서 일부 간선을 선택해서 만든, 그래프 내의 모든 정점을 포함하는 트리를 말한다.

Spanning Tree는 그래프의 `최소 연결 부분 그래프` 이다. `최소 연결`의 의미는 간선의 수가 가장 적다는 것이다. n개의 정점을 가지는 그래프가 모두 이어지기 위해서는 최소 (n-1)개의 간선이 필요하다. n개의 노드를 가지는 그래프에서 (n-1)개의 간선으로 연결되어 있으면 필연적으로 트리 형태가 되고, 이를 spanning tree라고 부른다. 또한, 트리 형식을 만족해야하므로 사이클을 포함해서는 안된다. DFS, BFS을 통해 탐색 도중에 사용된 간선만 모아서 이어주면, 그래프에서 신장 트리를 찾을 수 있다. 하나의 그래프에는 많은 신장 트리가 존재할 수 있다.

> **Minimum Spanning Tree**

MST(Minimum Spanning Tree, 최소 신장 트리)란 Spanning Tree 중에서 사용된 간선들의 가중치 합이 최소인 트리를 말한다.

MST는 간선에 가중치를 고려하여 최소 비용의 Spanning Tree를 선택하는 것을 말한다. 즉, 네트워크(가중치를 간선에 할당한 그래프)에 있는 모든 정점들을 가장 적은 수의 간선과 비용으로 연결하는 것이다.
MST는 **간선의 가중치의 합이 최소**여야 한다는 특징이 있다. 이 외에도 "n개의 정점을 가지는 그래프에 대해 **반드시 (n-1)개의 간선만을 사용**해야 한다"거나 "**사이클이 포함되어서는 안된다**"는 등의 spanning tree의 특징도 포함한다.

MST를 구현하기 위해서 `Kruskal MST 알고리즘` 혹은 `Prim 알고리즘`이 사용된다. 그래프 내에 적은 숫자의 간선만을 가지는 `희소 그래프(Sparse Graph)`의 경우 Kruskal 알고리즘이 적합하고, 그래프에 간선이 많이 존재하는 `밀집 그래프(Dense Graph)` 의 경우는 Prim 알고리즘이 적합하다.

**References**
- [[알고리즘] 최소 신장 트리(MST, Minimum Spanning Tree)란 - heejeong Kwon](https://gmlwjd9405.github.io/2018/08/28/algorithm-mst.html)
