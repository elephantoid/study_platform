---
id: boost-ds-003
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

double linked list

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/double-linked-list.png)

[#1-1 Single linked list](#1-1)은 단방향 연결이기 때문에 한번 다음 노드로 이동하면, 이전 노드로 돌아가기 힘들다는 단점이 있었다. 그러나 Double linked list는 뒤의 노드의 주소뿐만 아니라, 이전 노드의 주소도 담고 있다. 하나의 노드는 하나의 데이터와 두 개의 링크를 가지고 있으며, 각각의 링크를 prev와 next라고 부른다. 다음 노드를 참조하고 싶다면 next 링크가 담고 있는 주소를 확인하면 되고, 이전의 노드를 참조하고 싶다면 prev 링크가 가지는 주소를 확인하면 된다.

**References**
- [연결 리스트의 개념과 종류 - suitepotato](https://velog.io/@suitepotato/00007)
