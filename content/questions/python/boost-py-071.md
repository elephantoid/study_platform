---
id: boost-py-071
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

What is @classmethod, @staticmethod, @property?

## 해설

> **@classmethod**

클래스 내부의 함수 중에 @classmethod 로 선언된 함수에 대해서는 클래스의 객체를 만들지 않고도 바로 접근이 가능하다. 하지만 함수의 첫 인자로 클래스를 받아서, 상속되었을 때 자식 클래스의 데이터를 따르는 특징이 있다.

> **@staticmethod**

@staticmethod 는 @classmethod 와 마찬가지로 클래스의 객체를 만들지 않고도 바로 접근할 수 있다. 하지만 클래스를 인자로 받지 않기 때문에, 상속되었을 때에도 자식 클래스의 데이터를 따르지 않고 처음에 클래스에서 선언한 데이터대로 함수가 사용된다.

```python
class Language:
    default_language = "English"

    def __init__(self):
        self.show = '나의 언어는' + self.default_language

    @classmethod
    def class_my_language(cls):
        return cls()

    @staticmethod
    def static_my_language():
        return Language()

    def print_language(self):
        print(self.show)


class KoreanLanguage(Language):
    default_language = "한국어"


>>> from language import *
>>> a = KoreanLanguage.static_my_language()
>>> b = KoreanLanguage.class_my_language()
>>> a.print_language()
나의 언어는English
>>> b.print_language()
나의 언어는한국어
```

> **@property**

객체지향 언어에서는 캡슐화를 위해 변수를 직접 지정하지 않고 객체의 함수를 통해 지정하고 받아오는 setter, getter 함수를 사용한다. 파이썬에서는 이를 편하게 사용할 수 있도록 @property 를 제공한다.

getter 가 될 함수에 @property 를, setter 가 될 함수에 @변수.setter 를 붙이면 된다.

```python
class Test:

    def __init__(self):
        self.__color = "red"

    @property
    def color(self):
        return self.__color

    @color.setter
    def color(self,clr):
        self.__color = clr

if __name__ == '__main__':

    t = Test()
    t.color = "blue"

    print(t.color)
```

**References**
- [44. class 정리, 정적메소드 @classmethod와 @staticmethod의 정리 - 파이썬 기본을 갈고 닦자!](https://wikidocs.net/16074)
- [파이썬에서 @property 에 대해 알아보자. - HAMA 블로그](https://hamait.tistory.com/827)
