---
id: boost-py-039
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

What does `len()` do?

## 해설

`len()` 함수는 object의 길이(item의 수)를 return 한다.

argument로는 sequence(string, bytes, tuple, list, range, ...), collection(dictionary, set, frozenset, ...)을 받는다.

```python
stg = "ai-tech-interview"
len(stg)  #17

ex_list = ["ai", "tech", "interview"]
len(ex_list)  # 3
```

**References**
- [Built-in Functions - Python documentation](https://docs.python.org/3/library/functions.html#len)
