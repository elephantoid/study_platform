---
id: boost-ds-010
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

tree

## 해설

tree는 그래프의 일종으로, 부모 노드 밑에 여러 자식 노드가 연결되고, 자식 노드 각각에 다시 자식 노드가 연결되는 재귀적 형태의 자료구조이다. 노드들은 서로 다른 자식 노드를 가지며 이때 각 노드는 재사용 되지 않는다. 트리는 다음과 같은 특징을 갖는다.

- 반드시 하나의 루트 노드만이 존재한다.
- 모든 자식 노드는 한 개의 부모 노드만을 가진다.
- 서로 다른 임의의 두 노드에 대해 두 노드를 연결하는 경로는 유일하다.
- 사이클을 가지는 노드 집합이 존재하지 않는다.
- 노드가 N개인 트리는 항상 N-1개의 간선을 가진다.

> **트리 용어**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/tree-terms.png)

- `노드(node)`: 트리를 구성하는 기본 원소
- `루트 노드(root node/root)`: 트리에서 부모가 없는 최상위 노드, 트리의 시작점
- `부모 노드(parent node)`: 루트 노드 방향으로 직접 연결된 노드
- `자식 노드(child node)`: 루트 노드 반대 방향으로 직접 연결된 노드
- `형제 노드(siblings node)`: 같은 부모 노드를 갖는 노드들
- `잎 노드(leaf node)/단말 노드(terminal node)`: 자식이 없는 노드
- `경로(path)`: 한 노드에서 다른 한 노드에 이르는 길 사이에 있는 노드들의 순서
- `길이(length)`: 출발 노드에서 도착 노드까지 거치는 노드의 개수
- `깊이(depth)`: 루트 경로의 길이
- `레벨(level)`: 루트 노드(level=1)부터 노드까지 연결된 링크 수의 합
- `높이(height)`: 가장 긴 루트 경로의 길이
- `차수(degree)`: 각 노드의 자식의 개수
- `트리의 차수(degree of tree)`: 트리의 최대 차수 = max[deg1, deg2, ..., degn]
- `크기(size)`: 노드의 개수
- `너비(width)`: 가장 많은 노드를 갖고 있는 레벨의 크기

**References**
- [[자료구조] 트리(Tree)란 - HeeJeong Kwon](https://gmlwjd9405.github.io/2018/08/12/data-structure-tree.html)
- [트리의 종류와 이해 - cjmp1](http://www.secmem.org/blog/2019/05/09/%ED%8A%B8%EB%A6%AC%EC%9D%98-%EC%A2%85%EB%A5%98%EC%99%80-%EC%9D%B4%ED%95%B4/)
- [[자료구조] 트리? + 이진 트리 (Binary Tree) - Suyeon's Blog](https://suyeon96.tistory.com/29)
- [트리(그래프) - 나무위키](<https://namu.wiki/w/%ED%8A%B8%EB%A6%AC(%EA%B7%B8%EB%9E%98%ED%94%84)>)
