---
id: boost-ds-014
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

bst(binary search tree)

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/bst.png)

이진 탐색 트리(binary search tree)는 아래의 성질을 갖고 있는 이진 트리이다.

- 각각의 모든 노드들의 값(key)은 중복된 값이 아니다.
- 노드의 왼쪽 서브트리에는 그 노드의 값보다 작은 값들을 지닌 노드들로 이루어져 있다.
- 노드의 오른쪽 서브트리에는 그 노드의 값보다 큰 값들을 지닌 노드들로 이루어져 있다.
- 좌우 서브트리는 각각이 다시 이진 탐색 트리여야 한다.

> **탐색(Search)**

검색하고자 하는 값을 루트 노드와 먼저 비교하고, 일치할 경우 루트 노드를 리턴한다.

- 불일치하고 검색하고자 하는 값이 루트 노드의 값보다 작을 경우 왼쪽 서브트리에서 재귀적으로 검색한다.
- 불일치하고 검색하고자 하는 값이 루트 노드의 값보다 큰 경우 오른쪽 서브트리에서 재귀적으로 검색한다.

> **삽입(Insert)**

삽입을 하기 전, 탐색을 수행한다. 트리를 탐색한 후 키와 일치하는 노드가 없으면 마지막 노드에서 키와 노드의 크기를 비교해서 왼쪽이나 오른쪽에 새로운 노드를 삽입한다.

> **삭제(Delete)**

삭제하려는 노드의 자식 수에 따라

- **자식 노드가 없는 노드(리프 노드) 삭제**: 해당 노드를 단순히 삭제한다.
- **자식 노드가 1개인 노드 삭제**: 해당 노드를 삭제하고 그 위치에 해당 노드의 자식 노드를 대입한다.
- **자식 노드가 2개인 노드 삭제**: 삭제하고자 하는 노드의 값을 해당 노드의 왼쪽 서브트리에서 가장 큰 값으로 변경하거나, 오른쪽 서브트리에서 가장 작은 값으로 변경한 뒤, 해당 노드(왼쪽 서브트리에서 가장 큰 값을 가지는 노드 또는 오른쪽 서브트리에서 가장 작은 값을 가지는 노드)를 삭제한다.

> **시간 복잡도**

BST의 탐색, 삽입, 삭제의 복잡도는 모두 $O(h)$이다. (h는 BST의 높이) BST는 평균 시간 복잡도가 $O(\log_2 n)$이지만 최악의 경우 $O(n)$이다. (skewed tree 이면 node의 수만큼 시간이 소요됨)

트리가 complete binary tree 거나 full binary tree 이면 $O(\log_2 n)$, skewed tree 이면 $O(n)$의 시간복잡도를 갖는다.

**References**
- [이진 탐색 트리 - 위키백과](https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%A7%84_%ED%83%90%EC%83%89_%ED%8A%B8%EB%A6%AC)
- [Binary Search Tree - 불곰](https://brownbears.tistory.com/392)
- [6. Binary Search Tree - JuHy\_](https://ju-hy.tistory.com/90)
