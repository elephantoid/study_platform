---
id: boost-py-069
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

What are Decorators in Python?

## 해설

함수를 인자로 받고 내부 함수에서 인자로 받은 함수를 사용하는 클래스나 함수가 있을 때, 인자로 사용할 함수를 간편하게 지정해주는 역할을 하는 것이 Decorator 이다.

Decorator 의 사용 문법은 인자가 될 함수 위에 `@외부함수이름` 을 붙여주면 된다.

아래 예시를 보면, Decorator 를 통해 big_number 와 big_number2 라는 서로 다른 함수를 make_time_checker 가 인자로 받아 내부 함수에서 사용하고 있다.

```python
import time


def make_time_checker(func):
      def new_func(*args, **kwargs):
            start_time = time.perf_counter()
            result = func(*args, **kwargs)
            end_time = time.perf_counter()
            print('실행시간:', end_time - start_time)
            return result
      return new_func

@make_time_checker
def big_number(n):
      return n ** n ** n

@make_time_checker
def big_number2(n):
      return (n+1) ** (n+1) ** (n+1)
```

**References**
- [5) 데코레이터 - 제대로 파이썬](https://wikidocs.net/23106)
