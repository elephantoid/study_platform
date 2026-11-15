---
id: boost-py-024
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

How can you generate random numbers in Python?

## 해설

random 모듈로 간단히 생성할 수 있다. 편의를 위해 다음과 같이 random 모듈을 import하고 시드값을 2021로 고정하자.

```python
import random
random.seed(2021)
```

- 0과 1사이의 임의의 수를 생성하고 싶은 경우

```python
print(random.random())          # 0.8363375023320742
```

- 특정 범위 내의 임의의 정수를 생성하고 싶은 경우

```python
print(random.randint(0, 10))    # 10
```

- 특정 범위 내의 n개의 정수를 생성하고 싶은 경우

```python
n = 5
lst = range(1, 101)
print(random.sample(lst, 5))    # [70, 36, 32, 82, 5]
```

**References**
- [Generating random number list in Python - tutorialspoint](https://www.tutorialspoint.com/generating-random-number-list-in-python)
