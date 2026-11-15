---
id: boost-algo-008
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

Counting Sort

## 해설

계수 정렬(Counting Sort)은 입력값의 빈도를 세어서 이를 결과 리스트의 인덱스로 활용하고 입력 리스트의 요소값에 해당하는 결과 리스트 인덱스 위치에 채워 넣는 방식으로 정렬을 완성하는 정렬 알고리즘이다. 입력 리스트의 최댓값(k)이 커질수록 복잡도가 크게 높아진다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/counting-sort.png)

> **동작 원리**

1. 각 데이터의 개수를 모두 count 한다.
2. 최솟값부터 각 값까지의 count 누적합을 구한다.
3. 새로운 배열에 누적합의 개수를 줄여주며 저장한다.

> **시간 복잡도**

$$
O(N+k)
$$

($k$: 데이터의 최댓값)

> **파이썬 구현**

```python
def counting_sort(A, k):
    B = [-1] * len(A)
    C = [0] * (k + 1)

    for a in A:
        C[a] += 1

    for i in range(k):
        C[i+1] += C[i]

    for j in reversed(range(len(A))):
    	B[C[A[j]] - 1] = A[j]
    	C[A[j]] -= 1

    return B
```

**References**
- [[ 정렬 ] 카운팅 정렬(Counting Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/249)
- [카운팅 정렬, 래딕스 정렬 - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/10/16/countingsort/)
- [Counting Sort in C++ - prepinsta](https://prepinsta.com/cpp-program/counting-sort/)
