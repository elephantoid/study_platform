---
id: boost-py-001
topicId: python
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
- ds
reviewTarget:
  noteId: boost-py-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

What is the difference between list and tuples in Python?

## 해설

리스트는 mutable(변경 가능), 튜플은 immutable(변경 불가능)이라는 특징을 가지고 있다. 따라서 리스트는 선언 후에도 값에 대한 변경, 삭제가 가능하지만, 튜플은 선언 후에 값을 변경하거나 삭제하는 것이 불가능하다. 또한 리스트는 튜플보다 느리다는 단점을 가지고 있으며, 하나의 튜플/리스트에 다른 타입의 값을 함께 저장할 수 있다는 공통점이 있다. 리스트는 대괄호 `[ ]`를, 튜플은 소괄호 `( )`를 사용해서 나타낸다.

**References**
- [[Python] 튜플(tuple), 리스트(list), 셋(set), 딕셔너리(dict) 비교 - specialscene](https://specialscene.tistory.com/142)
