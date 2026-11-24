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
  model: rule-based/extract_interview@1 + claude-opus-5-5
  at: '2026-11-25'
followUps:
- id: boost-algo-014-f1
  order: 1
  promptMd: BFS에서 방문 표시를 큐에 넣을 때 하는 것과 꺼낼 때 하는 것은 무엇이 다른가요? 스택으로 구현한 DFS에서는 어느 쪽이 맞나요?
  hintKo: 한 정점이 여러 이웃에게서 발견되는 그래프를 그려 보세요.
  rubricKeywords:
  - BFS는 넣을 때 표시
  - 꺼낼 때 표시하면 중복 삽입으로 큐가 O(E)
  - DFS는 꺼낼 때 표시해야 DFS 순서
  - 넣을 때 표시한 스택 탐색은 DFS가 아닐 수 있음
  modelAnswerKo: 'BFS에서 꺼낼 때 표시하면 같은 층의 여러 정점이 같은 이웃을 각각 큐에 넣습니다. 꺼낼 때 다시 확인하면 결과는 맞지만 큐가 최대 $O(E)$까지 커집니다. 확인조차 하지 않으면 같은 정점을 여러 번 처리합니다. 넣을 때 표시하면 각 정점이 한 번만 들어가 큐가 $O(V)$이고, 처음 발견한 순간의 거리가 최단이라 올바릅니다.


    스택 DFS는 반대입니다. 넣을 때 표시하면 먼저 본 정점이 자리를 차지해, 나중에 더 깊은 경로로 도달해야 할 정점을 그 경로에서 방문하지 못합니다. 모든 정점을 방문하기는 하지만 재귀 DFS의 순서와 달라 발견·종료 시각을 쓰는 알고리즘(사이클 검출, 위상 정렬, 단절점 등)에 쓸 수 없습니다. 꺼낼 때 표시하고 이미 방문했으면 건너뛰거나, 이웃 반복자를 스택에 두어 재귀를 그대로 흉내 냅니다.'
  maxScore: 10
- id: boost-algo-014-f2
  order: 2
  promptMd: 간선의 가중치가 0 또는 1인 그래프에서 최단 경로를 구하려 합니다. 일반 BFS가 틀리는 이유를 설명하고 $O(V+E)$ 방법을 제시하세요.
  hintKo: BFS 큐가 항상 지키는 불변식이 무엇인지 생각해 보세요.
  rubricKeywords:
  - BFS는 동일 가중치에서만 최단
  - 큐 안의 거리 순서 불변식
  - 0-1 BFS
  - 덱 앞/뒤 삽입
  - 일반 가중치는 다익스트라
  modelAnswerKo: 'BFS가 최단을 보장하는 것은 큐가 항상 거리 순서이고, 안에 든 거리가 많아야 1 차이 나기 때문입니다. 그래서 처음 발견한 때의 거리가 최단입니다. 가중치 0인 간선이 있으면 간선 수가 많아도 비용이 더 작은 경로가 있을 수 있는데, BFS는 간선 수 순서로 확정하므로 틀립니다.


    0-1 BFS는 덱을 씁니다. 정점 $v$를 꺼내 이웃 $w$의 거리를 줄일 수 있으면 갱신하고, 가중치 0이면 덱의 **앞**에, 1이면 **뒤**에 넣습니다. 이렇게 하면 덱이 거리 순서를 유지해 우선순위 큐 없이 다익스트라와 같은 순서로 정점을 꺼냅니다. 한 정점이 여러 번 들어갈 수 있으므로 저장된 거리보다 큰 항목은 건너뛰며, 전체는 $O(V+E)$입니다. 가중치가 일반적인 음이 아닌 값이면 다익스트라, 음수가 있으면 Bellman-Ford를 씁니다.'
  maxScore: 10
- id: boost-algo-014-f3
  order: 3
  promptMd: LLM 에이전트가 도구 호출을 이어 가며 목표 상태를 찾는 문제를 상태 공간 탐색으로 보겠습니다. 분기 계수가 $b$, 해의 깊이가 $d$일 때 BFS, DFS, 반복 심화(IDDFS)를 비교하고 무엇을 고를지 설명하세요.
  hintKo: 시간뿐 아니라 동시에 들고 있어야 하는 상태 수와, 상태 하나를 펼치는 비용을 생각해 보세요.
  rubricKeywords:
  - BFS 시간·공간 O(b^d)
  - DFS 공간 O(bm)이지만 최단·완전성 보장 없음
  - IDDFS 시간 O(b^d), 공간 O(bd)
  - 상태 중복 검사
  - 휴리스틱·예산으로 가지치기
  modelAnswerKo: 'BFS는 가장 얕은 해를 찾지만 시간과 공간이 모두 $O(b^d)$라 상태(컨텍스트, 환경 스냅샷)를 많이 들고 있어야 합니다. DFS는 최대 깊이 $m$에 대해 공간이 $O(bm)$으로 작지만 잘못된 가지로 끝없이 들어갈 수 있고 찾은 해가 최단이라는 보장이 없습니다. IDDFS는 깊이 제한을 늘리며 DFS를 반복해 공간 $O(bd)$, 시간 $O(b^d)$로 얕은 해를 찾습니다. 얕은 층을 다시 펼치는 비용은 $b > 1$이면 상수 배에 그칩니다.


    다만 에이전트에서는 노드 하나를 펼치는 비용이 LLM 호출과 부작용이 있는 도구 실행이라, 다시 펼치는 일이 실제 돈과 위험입니다. 그래서 결과를 캐시하고, 상태를 정규화해 중복을 제거하며, 되돌릴 수 없는 행동은 탐색에서 분리합니다. 실무에서는 전체 탐색보다 평가 모델의 점수로 순서를 정하는 best-first나 beam 방식에 깊이와 비용 예산을 두는 편이 현실적입니다.'
  maxScore: 10
---

## 문제

Graph Traversal: BFS, DFS

## 해설

> **BFS(Breadth-First Search, 너비우선탐색)**

BFS는 그래프 전체를 탐색하는 방법 중 하나로써, 현재 확인하는 노드의 인접한 노드들을 먼저 탐색하는 것이다. 시작 정점으로부터 가까운 정점을 먼저 방문하고 멀리 떨어져 있는 정점을 나중에 방문하는 순회하는 방식으로 노드를 탐색한다. 주로 구현은 Queue라는 자료구조에 이웃하는 정점을 다 담아놓고 차례대로 pop을 하는 방식으로 구현한다. 주로 두 노드 사이의 최단 경로 혹은 임의의 경로를 찾고 싶을 때 이 방법을 사용한다.

- `장점`
  - 노드의 수가 적고 깊이가 얕은 경우 빠르게 동작할 수 있다.
  - 모든 간선의 가중치가 같은 그래프라면 답이 되는 경로가 여러개인 경우에도 처음 찾은 경로가 최단경로임을 보장한다.
  - 각 노드의 이웃이 유한하다면 어느 한 경로가 무한히 깊어진다해도 (간선 수 기준) 최단경로를 반드시 찾을 수 있다.
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
  - 목표가 시작점 가까이에 있어도 다른 분기를 먼저 깊이 탐색하느라 늦게 찾을 수 있고, 한 경로가 무한히 깊으면 끝나지 않을 수 있다.
  - 깊이 우선 탐색은 해를 구하면 탐색이 종료되므로, 구한 해가 최단 경로가 된다는 보장이 없다. 목표에 이르는 경로가 다수인 경우, DFS를 통해 구한 해가 최적이 아닐 수 있다. DFS를 사용하여 최단 경로를 구하기 위해서는, 모든 경로를 전부 확인해보아야 한다.

> **BFS와 DFS의 탐색 순서**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/bfs-dfs.png)

> **주의해야할 것**

방문 여부를 반드시 표시해주어야 한다. BFS는 노드를 Queue에 넣을 때 표시하고, Stack으로 구현한 DFS는 노드를 꺼낼 때 표시하며 이미 방문한 노드면 건너뛴다(넣을 때 표시하면 모든 노드를 방문하기는 하지만 DFS 순서가 아닐 수 있다). BFS에서 표시를 늦추면 Queue에 같은 노드가 중복되게 들어갈 수 있다. 방문 표시를 아예 하지 않으면 사이클이 있는 그래프에서 무한루프에 빠질 수도 있다.

**References**
- [[Algorithm] BFS 알고리즘 (Breadth-First Search) - 코딩팩토리](https://coding-factory.tistory.com/612)
- [[Algorithm] DFS 알고리즘 (Depth First Search) - 코딩팩토리](https://coding-factory.tistory.com/611)

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

**시간·공간 복잡도**

| | 인접 리스트 | 인접 행렬 |
| --- | --- | --- |
| 시간 (BFS·DFS 공통) | $O(V + E)$ | $O(V^2)$ |
| 방문 배열과 큐·스택 | $O(V)$ (아래의 스택 DFS는 중복 삽입으로 최대 $O(E)$) | 왼쪽과 같음 |

두 탐색은 모든 정점을 한 번씩 방문하고 모든 간선을 한 번씩(무방향은 두 번) 보므로 점근적 시간이 같다. 달라지는 것은 방문 순서와 메모리다. BFS의 큐는 그래프의 폭에, DFS의 스택은 깊이에 좌우된다.

**파이썬 구현** (`graph`는 인접 리스트)

```python
from collections import deque

def bfs(graph, start):
    dist = {start: 0}              # 방문 표시를 겸한다
    order = []
    q = deque([start])
    while q:
        v = q.popleft()            # list.pop(0)은 O(N)이라 쓰지 않는다
        order.append(v)
        for w in graph[v]:
            if w not in dist:      # 넣을 때 표시
                dist[w] = dist[v] + 1
                q.append(w)
    return order, dist             # dist: 간선 수 기준 최단 거리

def dfs(graph, start):
    visited, order = set(), []
    stack = [start]
    while stack:
        v = stack.pop()
        if v in visited:           # 꺼낼 때 표시
            continue
        visited.add(v)
        order.append(v)
        for w in reversed(graph[v]):  # 재귀 DFS와 같은 순서
            if w not in visited:
                stack.append(w)
    return order
```

재귀 DFS는 짧지만 깊은 그래프에서 파이썬의 재귀 한도(기본 1000)에 걸린다.
