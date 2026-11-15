---
id: boost-ds-004
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

circular linked list

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/circular-linked-list.png)

앞서 언급했던 linked list 유형들과는 다르게, tail이 다시 head를 가리키는 구조를 가지고 있다. 따라서, tail 노드의 next에는 NULL이 들어가는 것 대신, head의 주소가 들어간다.

**References**
- [연결 리스트의 개념과 종류 - suitepotato](https://velog.io/@suitepotato/00007)
