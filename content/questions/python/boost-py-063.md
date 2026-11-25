---
id: boost-py-063
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

How to create an empty class in Python?

## 해설

파이썬에서 클래스 내부에 아무 내용 없이 선언만 하기 위해서는 `pass` 나 `...` 을 사용할 수 있다. 추가적으로 empty class 를 선언한 후, 외부에서 객체를 통해 클래스의 변수나 함수를 만들 수도 있다.

```python
class empty():
    ... # or pass

e = empty()
e.a = 10
print(e.a) # 10
```
