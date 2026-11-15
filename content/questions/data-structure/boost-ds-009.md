---
id: boost-ds-009
topicId: data-structure
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: boost-ds-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

graph

## 해설

그래프는 정점과 간선으로 이루어진 자료구조이다. 정점 간의 연결관계는 간선으로 나타낸다.

> **그래프의 종류**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/graph.png)

간선이 담고있는 정보와 연결 상태에 따라 그래프의 종류가 나뉜다. 두 정점을 연결하는 간선에 방향이 없다면 `무방향 그래프`, 두 정점을 연결하는 간선에 방향이 존재하면 `방향 그래프`라고 부른다. 방향 그래프는 간선의 방향으로만 이동할 수 있다. 두 정점을 이동할 때 비용이 발생하면 `가중치 그래프`로 나타낼 수 있다. 모든 정점이 간선으로 연결된 경우, `완전 그래프`라고 부른다.

> **그래프 구현 방식**

첫 번째로 **인접행렬 방식**이 있다. 노드를 인덱스로 삼는 2차원 배열을 만들어 각 노드가 간선으로 연결되어있으면 배열에 1을 넣어주고, 연결되지 않았다면 0을 넣어주면 된다.

두 노드의 연결관계를 조회할 때, $O(1)$ 시간이 걸린다. 그러나 모든 정점에 대해, 간선 정보를 입력해야하므로 초기화에 $O(N^2)$ 시간이 소요된다.

노드의 수가 많고, 간선의 수가 적은 그래프의 경우에, 공간을 낭비하게 된다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/adjacent-matrix.png)

두 번째로 **인접리스트 방식**이 있다. 그래프의 노드들을 리스트로 표현한다. head 노드와 연결된 노드들을 링크에 달아주면 된다.

한 정점에 연결된 노드들의 정보를 얻기 위해서 $O(M)$ 시간이 걸린다.(M은 간선의 수) 간선 정보만 유지하므로, 공간 낭비가 적으나 두 정점이 연결되었는지 확인하기 위해서 $O(M)$ 시간이 걸리며, 구현이 비교적 어렵다.

> **그래프 용어**

- `정점(vertice)` : 노드(node)라고도 하며 정점에는 데이터가 저장된다.
- `간선(edge)`: 링크(arcs)라고도 하며 노드간의 관계를 나타낸다.
- `인접 정점(adjacent vertex)` : 간선에 의해 직접 연결된 정점이다.
- `단순 경로(simple-path)` : 경로 중 반복되는 정점이 없는것, 같은 간선을 자나가지 않는 경로이다.
- `차수(degree)` : 무방향 그래프에서 하나의 정점에 인접한 정점의 수이다.
- `진출 차수(out-degree)` : 방향그래프에서 사용되는 용어로 한 노드에서 외부로 향하는 간선의 수를 뜻한다.
- `진입차수(in-degree)` : 방향그래프에서 사용되는 용어로 외부 노드에서 들어오는 간선의 수를 뜻한다.

**References**
- [[Algorithm] 자료구조 그래프(Graph)란 무엇인가? - 코딩팩토리](https://coding-factory.tistory.com/610)
