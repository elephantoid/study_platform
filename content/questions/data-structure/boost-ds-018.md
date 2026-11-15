---
id: boost-ds-018
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

Red-black Tree

## 해설

> **레드-블랙트리의 정의**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/red-black-tree.png)

레드-블랙 트리(Red-Black Tree)는 이진탐색트리(Binary Search Tree)의 한 종류로, 삽입(insert), 삭제(delete), 검색(retrieval) 연산을 $O(\log N)$에 수행하도록 보장하는 **균형 잡힌 트리**를 말한다. 즉, 트리의 높이가 $\log N$이 되도록 한다.

레드-블랙 트리는 **다음의 조건**을 만족한다.

- 모든 노드는 빨간색 혹은 검은색이다.
- 루트 노드는 검은색이다.
- `NULL` 혹은 `NIL`로 표기된 리프노드는 검정색이다.
- 빨간색 노드의 자식 노드는 검정색이다. 즉, 빨간색 노드가 연속적으로 나올 수 없다.
- 리프노드에서 루트노드까지 가는 경로에서 만나는 검은색 노드의 개수는 같다.

> **레드-블랙트리가 균형 잡힌 트리인 이유**

레드-블랙 트리의 **5번째 조건** 때문인데, 검은색 노드의 개수가 B이고 빨간색 노드가 최소가 되는 경우와 최대가 되는 경우를 생각해보자. 빨간색 노드가 최소가 되려면, 빨간색 노드 자체가 없어야 하고 총 노드의 개수는 B개이다. 빨간색 노드가 최대가 되려면, `검정-빨강-검정-빨강-...`으로 반복되어야 한다. 이 경우 총 노드의 개수는 2B이다.

그러므로 최소 경로와 최대 경로의 차이는 2배보다 크지 않으므로 레드-블랙 트리는 균형 잡힌 트리라고 말할 수 있다.

> **레드-블랙 트리의 연산**

레드-블랙 트리의 연산으로 `검색`, `삽입`, `제거`가 있다. 자세한 내용은 [레드-블랙 트리/동작 - 위키백과](https://ko.wikipedia.org/wiki/%EB%A0%88%EB%93%9C-%EB%B8%94%EB%9E%99_%ED%8A%B8%EB%A6%AC#%EB%8F%99%EC%9E%91)를 참고!

**References**
- [알고리즘) Red-Black Tree - ZeddiOS](https://zeddios.tistory.com/237)
- [고급 주제 - 코딩인터뷰 완전분석](http://www.yes24.com/Product/Goods/44305533)
- [[레드-블랙 트리 - 위키백과](https://ko.wikipedia.org/wiki/%EB%A0%88%EB%93%9C-%EB%B8%94%EB%9E%99_%ED%8A%B8%EB%A6%AC#%EB%8F%99%EC%9E%91)]
