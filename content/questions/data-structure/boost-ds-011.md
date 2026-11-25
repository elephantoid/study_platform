---
id: boost-ds-011
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

binary tree

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/binary-tree.png)

이진 트리(binary tree)는 각각의 노드가 최대 두 개의 자식 노드를 가지는 트리를 말한다. 즉, 모든 노드의 차수(degree)가 2 이하인 트리를 말한다. 이진 트리의 모든 서브 트리들은 모두 이진 트리이다.

> **순회(Traversal) 방법**

- 전위 순회(preorder)
  1. 노드를 방문한다.
  2. 왼쪽 서브 트리를 전위 순회한다.
  3. 오른쪽 서브 트리를 전위 순회한다.
- 중위 순회(inorder)
  1. 왼쪽 서브 트리를 중위 순회한다.
  2. 노드를 방문한다.
  3. 오른쪽 서브 트리를 중위 순회한다.
- 후위 순회(postorder)
  1. 왼쪽 서브 트리를 후위 순회한다.
  2. 오른쪽 서브 트리를 후위 순회한다.
  3. 노드를 방문한다.
- 레벨 순서 순회(level-order)
  - 모든 노드를 낮은 레벨부터 차례대로 순회한다. 레벨 순서 순회는 너비 우선 순회(breadth-first traversal)라고도 한다.

**References**
- [이진 트리 - 위키백과](https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%A7%84_%ED%8A%B8%EB%A6%AC)
- [이진 탐색 트리: 이론과 소개 - 오늘도 MadPlay!](https://madplay.github.io/post/binary-search-tree)
- [트리 순회 - 위키백과](https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%A6%AC_%EC%88%9C%ED%9A%8C)
