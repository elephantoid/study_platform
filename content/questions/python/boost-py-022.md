---
id: boost-py-022
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

How can you randomize the items of a list in place in Python?

## 해설

**random 모듈의 `shuffle` 메서드**를 사용하면 구현할 수 있다. `random.shuffle`은 시퀀스 객체의 요소를 임의로 섞어서 해당 시퀀스를 반환한다.

```python
import random

random.seed(2021)       # 시드 고정
lst = list(range(10))
print(lst)              # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
random.shuffle(lst)
print(lst)              # [2, 7, 9, 3, 0, 5, 1, 4, 8, 6]
```

**References**
- [Shuffle a list, string, tuple in Python (random.shuffle, sample) - note.nkmk.me](https://note.nkmk.me/en/python-random-shuffle/)
- [random - Python Documentation](https://docs.python.org/ko/3/library/random.html)
