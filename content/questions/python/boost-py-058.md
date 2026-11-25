---
id: boost-py-058
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

Does python support multiple inheritance?

## 해설

파이썬은 자바와 다르게 multiple inheritance 을 지원한다. multiple inheritance 의 개념은 [#55](#55) 에서 참고할 수 있다.

예시는 아래와 같다.

```python
class P_A():
    ...

class P_B():
    ...

class C(P_A, P_B): #P_A 와 P_B 클래스를 동시에 상속
    ...

```
