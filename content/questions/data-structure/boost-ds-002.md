---
id: boost-ds-002
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

single linked list

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/single-linked-list.png)

[#1 Linked list](#1)에서 언급한 내용은 모두 Single linked list에 해당한다. Single linked list는 linked list 중에서도 가장 기본적인 구조로 되어 있으며, head에서 tail까지 단방향으로 포인터가 이어져 있으므로 N 번째 노드에서 N-1 번째 노드에 접근할 수 없다. 대신, 다시 head로부터 N-1 번의 탐색을 통해 접근해야 한다.

**References**
- [연결 리스트의 개념과 종류 - suitepotato](https://velog.io/@suitepotato/00007)
