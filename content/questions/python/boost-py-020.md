---
id: boost-py-020
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

How does break, continue and pass work?

## 해설

`break`는 가장 가까운 for문이나 while문의 루프에서 빠져나가도록 한다.

```python
for i in range(10):
  if i == 5:
    break
  print(i, end=' ')

# >> 0 1 2 3 4
```

`continue`는 이번 이터레이션(iteration)을 건너뛰고 다음 이터레이션을 이어나가도록 한다.

```python
for i in range(10):
  if i == 5:
    continue
  print(i, end=' ')

# >> 0 1 2 3 4 6 7 8 9
```

`pass`는 문법적으로 필요하지만, 아무 것도 하지 않게 하고 싶을 때 사용한다. 주로 함수나 클래스의 구조부터 세우고 나중에 구현을 하고 싶을 때 사용한다.

```python
class MyClass:
    def not_implemented_method(self):
        pass
```

**References**
- [루프의 break 와 continue 문, 그리고 else 절 - Python Documentation](https://docs.python.org/ko/3/tutorial/controlflow.html?highlight=break)
- [pass 문 - Python Documentation](https://docs.python.org/ko/3/tutorial/controlflow.html?highlight=break#pass-statements)
