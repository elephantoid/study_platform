---
id: boost-py-037
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

How can the ternary operators be used in python?

## 해설

ternary operators(삼항 연산자)는 조건문을 표시하는 데 사용되는 연산자이며 `[true_value] if [condition] else [false_value]`의 형태로 표현된다.

```python
a = 123
print("a is 123" if a==123 else "a is not 123") # a is 123

a = 456
print("a is 123" if a==123 else "a is not 123") # a is not 123
```

**References**
- [[Python] 삼항 연산자(Ternary Operator) - 똑똑이](https://m.blog.naver.com/wideeyed/221858874414)
