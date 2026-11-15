---
id: boost-ds-019
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

B-Tree

## 해설

> **B-트리의 정의**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/b-tree.png)

B-트리는 이진 트리(Binary Tree)를 확장해 모든 리프 노드들이 같은 높이를 갖도록 하는 트리이다. 노드 내에 여러 개의 key가 있을 수 있으며, 최대 key의 개수에 따라 2개이면 2차 B-트리, N개면 N차 B-트리라고 부른다.

B-트리는 **다음의 조건**을 만족한다.

- 노드의 key의 개수가 N이면, 자식 노드의 개수는 N+1이다.
- 노드 내의 key는 오름차순으로 정렬되어 있다.
- 루트 노드는 2개 이상의 자식을 가져야 한다.
- 루트 노드를 제외한 나머지 노드들은 적어도 최대 M/2개의 key를 가져야 한다.
  - M은 B-트리의 차수를 말한다.
- 리프 노드는 모두 같은 레벨에 있어야 한다.

> **B-트리의 연산**

B-트리의 연산은 `검색`과 `삽입`, `제거`가 있다. 다음 연산은 B-트리 연산을 이해할 수 있는 자료로 이것을 참고!

- B-트리 연산 시뮬레이션: [B-Tree Algorithm Visualizations](https://www.cs.usfca.edu/~galles/visualization/BTree.html)
- B-트리 연산 개념 정리: [[자료구조] 그림으로 알아보는 B-Tree - emplam27.log](https://velog.io/@emplam27/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-B-Tree)

> **B-트리 vs B+ 트리**

B+ 트리는 B-트리와 비슷하지만 리프노드가 연결리스트의 형태를 띄어 선형 검색이 가능한 트리이다. 모든 노드에 key와 data가 있는 B 트리와는 달리 B+ 트리는 리프 노드에만 data가 존재한다. 또한 `삽입`과 `제거` 연산 모두 리프 노드에서만 이루어진다.

**References**
- [[자료구조] 그림으로 알아보는 B-Tree - emplam27.log](https://velog.io/@emplam27/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-B-Tree)
- [[자료구조] 그림으로 알아보는 B+Tree - emplam27.log](https://velog.io/@emplam27/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-B-Plus-Tree)
- [B트리 - 위키백과](https://ko.wikipedia.org/wiki/B_%ED%8A%B8%EB%A6%AC)
- [B-Tree 개념 정리 - Jlog](https://hyungjoon6876.github.io/jlog/2018/07/20/btree.html)
