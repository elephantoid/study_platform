---
id: boost-py-019
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

What is self in Python?

## 해설

```python
class MyClass:
    def method(self):
        return 'instance method', self

obj = MyClass
print(obj.method())

# >> ('instance method', <__main__.MyClass object at 0x7f10aa8e68b0>)
```

우선 `self`가 어디에서 쓰이는지 알아야 한다. `self`는 인스턴스 메서드(instance method)의 첫 번째 인자이다. 메서드가 호출될 때, 파이썬은 `self`에 인스턴스를 넣고 이 인스턴스를 참조하여 인스턴스 메서드를 실행할 수 있게 된다.

**References**
- [self 이해하기 - 파이썬으로 배우는 알고리즘 트레이딩](https://wikidocs.net/1742)
- [Python's Instance, Class, and Static Methods Demystified - Real Python](https://realpython.com/instance-class-and-static-methods-demystified/)
- [Why must ‘self’ be used explicitly in method definitions and calls? - Python Documentation](https://docs.python.org/3/faq/design.html?highlight=self#why-must-self-be-used-explicitly-in-method-definitions-and-calls)
