---
id: boost-algo-009
topicId: algorithm
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: boost-algo-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

Radix Sort

## 해설

기수 정렬(Radix Sort)은 입력값의 자릿수(d) 각각에 대해 카운팅 정렬을 적용하여 입력 데이터의 최댓값인 k가 커질수록 효율이 떨어지는 카운팅 정렬의 단점을 보완한 정렬 알고리즘이다. 10진법으로 표현된 입력값에 기수 정렬을 적용하면 k 값이 9로 작아진다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/radix-sort.png)

> **시간 복잡도**

$$
d \times O(N)
$$

($d$: 입력값의 자릿수)

> **파이썬 구현**

```python
from math import log

def get_digit(number, d, base):
    return (number//base**d) % base

def counting_sort_with_digit(A, d, base):
    k = base - 1
    B = [-1] * len(A)
    C = [0] * (k + 1)
    for a in A:
        C[get_digit(a, d, base)] += 1
    for i in range(k):
        C[i+1] += C[i]
    for j in reversed(range(len(A))):
        B[C[get_digit(A[j], d, base)]-1] = A[j]
        C[get_digit(A[j], d, base)] -= 1
    return B

def radix_sort(list, base=10):
    digit = int(log(max(list), base)+1)
    for d in range(digit):
        list = counting_sort_with_digit(list, d, base)
    return list
```

**References**
- [[ 정렬 ] 기수 정렬 (Radix Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/248)
- [카운팅 정렬, 래딕스 정렬 - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/10/16/countingsort/)
