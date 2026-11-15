---
id: boost-algo-006
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

Heap Sort

## 해설

힙 정렬(Heap Sort)은 완전 이진 트리로 구현되는 정렬 방식으로, 모든 노드가 힙 속성(각 노드의 값이 자신의 자식 노드 값보다 큰 이진 트리)을 만족하도록 재귀적으로 트리 구조를 만들어 정렬을 완성하는 정렬 알고리즘이다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/heap-sort.png)

> **동작 원리**

1. 주어진 원소들로 최대 힙을 구성한다.
2. 현재 힙의 루트 노드에는 최대값이 존재하게 된다. 루트의 값을 마지막 요소와 바꾼 후, 힙의 사이즈를 하나 줄인다.
3. 힙의 사이즈가 1보다 크면 위 과정을 반복한다.

> **시간 복잡도**

$$
O(N \log N)
$$

> **파이썬 구현**

```python
def heapify(unsorted, index, heap_size):
    largest = index
    left_index = 2 * index + 1
    right_index = 2 * index + 2
    if left_index < heap_size and unsorted[left_index] > unsorted[largest]:
        largest = left_index
    if right_index < heap_size and unsorted[right_index] > unsorted[largest]:
        largest = right_index
    if largest != index:
        unsorted[largest], unsorted[index] = unsorted[index], unsorted[largest]
        heapify(unsorted, largest, heap_size)

def heap_sort(unsorted):
    n = len(unsorted)
    for i in range(n//2-1, -1, -1):
        heapify(unsorted, i, n)
    for i in range(n-1, 0, -1):
        unsorted[0], unsorted[i] = unsorted[i], unsorted[0]
        heapify(unsorted, 0, i)
    return unsorted
```

**References**
- [[ 정렬 ] 힙 정렬 (Heap Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/246)
- [힙 정렬(Heap Sort) - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/09/27/heapsort/)
- [힙정렬(Heap Sort) 알고리즘 :: 마이구미 - 마이구미의 HelloWorld](https://mygumi.tistory.com/310)
