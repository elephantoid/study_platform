---
id: boost-py-034
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

What is the usage of help() and dir() function in Python?

## 해설

`help()`는 docstrings를 작성하였다면 해당 docstrings를 출력한다. docstrings에는 클래스, 메서드의 사용법에 관한 내용이 담겨있으므로 해당 클래스와 메서드를 사용자에게 매우 유용하다. docstrings에 대한 내용은 [#31](#31) 참고!

`dir()`은 인자로 넣은 객체의 속성과 메서드를 문자열로 변환하고 그것을 요소로 갖는 정렬된 리스트를 반환한다. `dir`은 사용할 객체의 메서드와 속성에 대한 정보를 얻고 싶을 때 유용하다. 다만 인자가 없다면 현재 지역 스코프에서 정의된 함수와 변수들의 리스트를 반환한다.

```python
def func(x):
  return x

a = 3
print(dir(a))     # 객체 a에 대한 속성, 메서드
print(dir(func))  # 함수 func에 대한 속성, 메서드
print(dir())      # 지역 스코프에 정의된 a와 func
```

**References**
- [내장 함수: help() - Python Documentation](https://docs.python.org/ko/3/library/functions.html#help)
- [내장 함수: dir() - Python Documentation](https://docs.python.org/ko/3/library/functions.html#dir)
- [10 Python built-in functions you should know](https://towardsdatascience.com/10-python-built-in-functions-you-should-know-fbd5c879e0ab)
