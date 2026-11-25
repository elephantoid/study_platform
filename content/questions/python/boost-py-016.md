---
id: boost-py-016
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

What are functions in Python?

## 해설

함수는 호출될 때만 실행되는 코드 블록이다. Python 함수를 정의하기 위해 def 키워드가 사용된다. 반복되는 부분을 함수로 만들어서 사용하면, 똑같은 코드를 여러번 반복하여 쓰지 않아도 되고, 프로그램의 흐름을 쉽게 파악할 수 있다는 장점이 있다.

```python
def new_func():
  print("Hi, Welcome to Edureka")

new_func(); # 함수 호출

# Output: Hi, Welcome to Edureka
```

**References**
- [04-1 함수 - 점프 투 파이썬](https://wikidocs.net/24)
