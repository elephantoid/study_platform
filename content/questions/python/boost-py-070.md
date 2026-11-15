---
id: boost-py-070
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

What is object interning?

## 해설

파이썬에서는 모든 것이 객체이므로 변수들은 값을 바로 가지지 않고 값을 가진 주소를 참조하게 된다.

object interning 은 자주 사용될, 즉 재활용될 object 에 대해 매번 새로운 주소를 할당하는 것은 비효율적이므로, 하나의 주소에 값을 주고 그 주소를 재활용하는 작업을 말한다.

기본적으로 파이썬에서는 `-5~256, [a-Az-Z0-9_]` 에 대해 고정된 주소를 할당하여 interning 을 하고 있다.

**References**
- [파이썬의 효과적인 메모리 재활용 방법 Interning - Nephtyw'S Programming Stash](https://nephtyws.github.io/python/interning/)
