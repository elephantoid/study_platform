---
id: boost-py-065
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

What is map function in Python?

## 해설

map 함수는 iterable 한 객체의 모든 원소에 동일한 함수를 적용하는 기능을 한다.

첫 인자로 적용할 함수를, 두번째 인자로 iterable 한 객체를 넣으면, iterable 한 map 객체 형태로 각 원소에 대해 함수가 적용된 묶음들이 담겨 나온다.

```python
int_arr = list(map(int, input().split()))
```
