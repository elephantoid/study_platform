---
id: boost-algo-014
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

Graph Traversal: BFS, DFS

## 해설

> **BFS(Breadth-First Search, 너비우선탐색)**

BFS는 그래프 전체를 탐색하는 방법 중 하나로써, 현재 확인하는 노드의 인접한 노드들을 먼저 탐색하는 것이다. 시작 정점으로부터 가까운 정점을 먼저 방문하고 멀리 떨어져 있는 정점을 나중에 방문하는 순회하는 방식으로 노드를 탐색한다. 주로 구현은 Queue라는 자료구조에 이웃하는 정점을 다 담아놓고 차례대로 pop을 하는 방식으로 구현한다. 주로 두 노드 사이의 최단 경로 혹은 임의의 경로를 찾고 싶을 때 이 방법을 사용한다.

- `장점`
  - 노드의 수가 적고 깊이가 얕은 경우 빠르게 동작할 수 있다.
  - 단순 검색 속도가 깊이 우선 탐색(DFS)보다 빠르다.
  - 너비를 우선 탐색하기에 답이 되는 경로가 여러개인 경우에도 최단경로임을 보장한다.
  - 최단경로가 존재한다면 어느 한 경로가 무한히 깊어진다해도 최단경로를 반드시 찾을 수 있다.
- `단점`
  - 재귀호출의 DFS와는 달리 큐에 다음에 탐색할 정점들을 저장해야 하므로 저장공간이 많이 필요하다.
  - 노드의 수가 늘어나면 탐색해야하는 노드 또한 많아지기에 비현실적이다.

> **DFS(Depth-First Search, 깊이우선탐색)**

DFS는 그래프 전체를 탐색하는 방법중 하나로써, 시작점 부터 다음 분기(branch)로 넘어가기 전에 해당 분기를 완벽하게 탐색하고 넘어가는 방법이다. 먼저 보이는 노드부터 계속해서 깊이를 늘려가며 탐색하고, 더 이상 탐색할 노드가 없다면 이전 노드로 돌아가서 다른 브랜치를 다시 깊이 파보는 형식을 말한다. Stack이나 재귀함수를 통해서 구현할 수 있는데, 재귀함수가 구현이 간편하다.

- `장점`
  - 현재 경로 상의 노드들만 기억하면 되므로, 저장 공간의 수요가 비교적 적다.
  - 목표 노드가 깊은 단계에 있는 경우에도 해를 빨리 구할 수 있다.
  - 구현이 너비 우선 탐색(BFS) 보다 간단하다.
- `단점`
  - 단순 검색 속도는 너비 우선 탐색(BFS) 보다 느리다.
  - 깊이 우선 탐색은 해를 구하면 탐색이 종료되므로, 구한 해가 최단 경로가 된다는 보장이 없다. 목표에 이르는 경로가 다수인 경우, DFS를 통해 구한 해가 최적이 아닐 수 있다. DFS를 사용하여 최단 경로를 구하기 위해서는, 모든 경로를 전부 확인해보아야 한다.

> **BFS와 DFS의 탐색 순서**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/bfs-dfs.png)

> **주의해야할 것**

노드를 Queue 혹은 Stack에 넣을 때, 방문 여부를 반드시 표시해주어야 한다. 그렇지 않으면, 자료구조에 노드가 중복되게 들어갈 수 있기 때문이다. 방문 표시를 하지 않으면, 심한 경우에는 무한루프에 빠질 수도 있다.

**References**
- [[Algorithm] BFS 알고리즘 (Breadth-First Search) - 코딩팩토리](https://coding-factory.tistory.com/612)
- [[Algorithm] DFS 알고리즘 (Depth First Search) - 코딩팩토리](https://coding-factory.tistory.com/611)
