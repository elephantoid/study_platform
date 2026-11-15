---
id: boost-py-041
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

What are negative indexes and why are they used?

## 해설

> **인덱스**

- 시퀀스 객체에 `[]`(대괄호)를 붙여 사용
- 시퀀스 객체의 인덱스는 항상 0부터 시작
- 시퀀스 객체(list, tuple, range, 문자열)에 사용가능
- 시퀀스객체[인덱스]

> **음수 인덱스**

- 인덱스를 음수로 지정하면 뒤에서부터 요소에 접근하게 된다.
  - -1은 뒤에서 첫 번째, -5는 뒤에서 다섯 번째 요소를 뜻한다.
- 시퀀스 객체(list, tuple, range, 문자열)에 사용가능

```python
example = ['Boostcamp', 'AI', 'Tech', 'penguin', 'sally', 'adc', 'heath']
print(example[5]) # adc
print(example[-2])  # adc
print(example[-4:]) # ['penguin', 'sally', 'adc', 'heath']

example = "BoostDevs"
print(example[:5])  # Boost
print(example[-4:-1]) # Dev
```

**References**
- [Python | 인덱스(index) - 황복실](https://velog.io/@sz3728/Python-index)
