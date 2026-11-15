---
id: boost-py-056
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

How are classes created in Python?

## 해설

**class** 키워드를 사용하여 클래스를 만들 수 있다. 이 때, 클래스명 옆 괄호에 상속받을 부모 클래스를 설정할 수도 있다.

기본적으로 `__init__` 이라는 매직 메소드를 통해 멤버 변수들을 세팅할 수 있다. 자세히는 클래스가 객체로 선언될 때, 멤버 변수의 값을 초기화하는 역할을 담당한다.

클래스 내에서는 멤버 함수를 만들 수 있고, 클래스 객체에서 멤버 함수를 사용할 수 있다.

```python
class MyClass():
    def __init__(self, feature):
        self.feature = feature
        ...

    def my_method(self):
        ...
```
