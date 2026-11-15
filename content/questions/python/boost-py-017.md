---
id: boost-py-017
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

What is `__init__`?

## 해설

`__init__`는 파이썬에서 특별하게 약속된 메서드 가운데 하나로, 초기화 메서드 혹은 생성자라고도 한다. 이 메서드는 클래스의 새 개체/인스턴스가 생성될 때 메모리를 할당하기 위해 자동으로 호출되며, 그 객체가 갖게 될 여러 가지 성질을 정해준다. 모든 클래스에는 `__init__` 메서드가 있다.

```python
class Employee:
  def __init__(self, name, age,salary):
    self.name = name
    self.age = age
    self.salary = 20000

E1 = Employee("XYZ", 23, 20000)

# E1은 Employee 클래스의 객체
# __init__ 는 E1에 메모리를 할당함

print(E1.name)
print(E1.age)
print(E1.salary)

'''
출력:

XYZ
23
20000
'''
```

> **💡 `__init__.py`은 무엇인가?**  
> python 3.3 이하 버전에서, package import하기 위해서 사용되는 규칙이다. 3.3 이후의 버전에서는 이 제약사항이 해제되었다. `__init__.py`는 python 프로그램이 디렉토리를 처음 가져올 때 자동으로 실행되는 **패키지 초기화 파일** 역할을 하고, **모듈의 네임스페이스 초기화** 역할을 한다.

**References**
- [7.5. 특별한 메서드들 - 왕초보를 위한 Python](https://wikidocs.net/89)
- [패키지 **init**.py 파일들 - 그것으로 말미암아,](https://m.blog.naver.com/jodi999/221609408266)
