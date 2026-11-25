---
id: boost-algo-002
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

Bubble Sort

## 해설

버블 정렬(Bubble Sort)은 배열의 0번부터 N-1번까지 탐색을 하면서 인접한 칸과 비교하여 swap을 하는 방식의 정렬 알고리즘이다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/bubble-sort.png)

위의 과정이 버블 정렬을 1회 실시하고 나서의 결과이다. j번째 값과 j+1번째 값을 비교해서 만약 j번째 값이 더 크다면 swap을 해주는 식으로 동작한다.

> **시간 복잡도**

$$
O(N^2)
$$

> **파이썬 구현**

```python
def bubbleSort(alist):
    for passnum in range(len(alist)-1, 0, -1):
        for i in range(passnum):
            if alist[i] > alist[i+1]:
                temp = alist[i]
                alist[i] = alist[i+1]
                alist[i+1] = temp
```

**References**
- [[ 정렬 ] 버블정렬 (Bubble Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/241)
- [버블정렬 - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/11/05/bubblesort/)
- [6.7. The Bubble Sort - Problem Solving with Algorithms and Data Structures using Python](https://runestone.academy/runestone/books/published/pythonds/SortSearch/TheBubbleSort.html)
