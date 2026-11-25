---
id: boost-algo-005
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

Merge Sort

## 해설

합병 정렬(Merge Sort)는 배열을 잘게 쪼갠 뒤 둘씩 크기를 비교해 정렬하고 분리된 리스트를 재귀적으로 합쳐서 정렬을 완성하는 정렬 알고리즘이다. 분할된 배열을 저장해둘 공간이 필요해 메모리 소모량이 큰 편이다. 문제를 분리하고 각각을 해결한 후 다시 합치는 Divide & Conquer 방식을 사용한다.

- Divide: 초기 배열을 2개의 배열로 분할한다.
- Conquer: 각 부분 배열을 재귀적으로 병합 정렬을 사용하여 정렬한다.
- Merge: 부분 배열을 하나의 배열로 결합한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/merge-sort.png)

> **시간 복잡도**

$$
O(N \log N)
$$

> **파이썬 구현**

```python
def merge_sort(list):
    if len(list) <= 1:
        return list
    mid = len(list) // 2
    leftList = list[:mid]
    rightList = list[mid:]
    leftList = merge_sort(leftList)
    rightList = merge_sort(rightList)
    return merge(leftList, rightList)
```

**References**
- [[ 정렬 ] 병합 정렬 (Merge Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/245)
- [합병정렬(Merge Sort) - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/10/03/mergesort/)
- [6.11. The Merge Sort - Problem Solving with Algorithms and Data Structures using Python](https://runestone.academy/runestone/books/published/pythonds/SortSearch/TheMergeSort.html)
