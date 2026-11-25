---
id: boost-py-061
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

How do you do data abstraction in Python?

## 해설

데이터 추상화는 객체지향의 주요 개념으로 사용자에게 데이터의 주요 정보만 제공하여 구체적인 구현은 몰라도 사용할 수 있게 만드는 방법이다.

파이썬에서는 abstract class 를 통해 데이터 추상화를 할 수 있다. abstract class 를 사용하기 위해서는 `abc` 모듈을 import 하고 `metaclass=ABCClass` 와 `@abstractmethod` 를 사용해야 한다.

```python
from abc import *
class 추상클래스명(metaclass=ABCMeta):

     @abstractmethod
        def 추상메소드(self):
            pass
```
