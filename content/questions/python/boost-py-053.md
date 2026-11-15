---
id: boost-py-053
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

What is split used for?

## 해설

`split()`은 특정 문자를 기준으로 문자열을 분리할 때 사용한다.

```python
str.split(sep=None, maxsplit=-1)
```

sep을 구분자로 사용하여 문자열에 있는 단어 list를 반환한다.

sep이 지정되면 구분자를 기준으로 문자열을 분리하고, sep이 지정되지 않았거나 None인 경우에는 whitespace를 기준으로 문자열을 분리한다.

maxsplit이 지정되면 그 수만큼의 분할이 수행되고, maxsplit이 지정되지 않았거나 -1인 경우에는 가능한 모든 분할이 수행된다.

```python
a = "ai tech interview"
print(a.split())  # ['ai', 'tech', 'interview']
a = "ai                    tech          interview"
print(a.split())  # ['ai', 'tech', 'interview']
a = "ai-tech-interview"
print(a.split("-")) # ['ai', 'tech', 'interview']
a = "ai-tech-interview"
print(a.split("-", 1))  # ['ai', 'tech-interview']
```

**References**
- [str.split - Python documentation](https://docs.python.org/3/library/stdtypes.html#str.split)
