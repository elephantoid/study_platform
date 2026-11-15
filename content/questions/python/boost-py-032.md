---
id: boost-py-032
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

What are docstrings in Python?

## 해설

docstrings은 주석은 아니지만, 사용자에게 코드에 대한 설명을 적어놓은 문서(documentation)이다. docstrings는 `__doc__` 속성이나 `help()` 내장 함수로 접근할 수 있다. docstrings는 작은 따옴표(`'`) 혹은 큰 따옴표(`"`) 3개로 작성할 수 있다.

```python
def mult(a, b):
  """
  Returns the product of a and b
  - a(float): any real number
  - b(float): any real number
  """
  return a*b
```

```python
print(help(mult))
print(mult.__doc__)
```

> **💡 Comments(주석) vs Dosctrings**  
> comments와 docstrings은 각각 `#`, `"""`을 쓴다는 점에서 다르지만 가장 큰 차이는 **읽는 대상**이다. comments는 개발을 위해 동료 혹은 나중에 코드를 읽을 나에게 남겨놓는 것이고 docstrings는 이 코드를 사용할 사용자들이 이해하기 쉽도록 남겨놓는 것이다.

**References**
- [Documenting Python Code: A Complete Guide - Real Python](https://realpython.com/documenting-python-code/)
