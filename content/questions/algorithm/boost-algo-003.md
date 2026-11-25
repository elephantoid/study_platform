---
id: boost-algo-003
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

Selection Sort

## 해설

선택 정렬(Selection Sort)은 위치 변경 횟수를 줄여, 버블 정렬을 일부 개선한 기법이다. 주어진 배열 중에 최댓값을 찾아 정렬되지 않은 배열의 맨 뒤의 값과 자리를 바꾸어나가는 정렬 알고리즘이다. 배열의 맨 뒤부터 차례로 정렬이 된다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/selection-sort.png)

버블 정렬은 왼쪽에 있는 값이 비교 대상인 오른쪽에 있는 값보다 크면 자리를 바꿔줬는데 반해, 선택 정렬은 일단 최댓값(혹은 최솟값)을 찾은 뒤에야 이 값을 정해진 위치로 보내주게 된다. 다시 말해 비교 횟수 측면에서는 버블 정렬과 선택 정렬이 같고 둘 모두 $O(n^2)$의 계산 복잡성을 갖지만 자리 이동(swap)측면에서는 선택 정렬이 효율적이다.

> **시간 복잡도**

$$
O(N^2)
$$

> **파이썬 구현**

```python
def selectionSort(alist):
   for fillslot in range(len(alist)-1, 0, -1):
       positionOfMax = 0
       for location in range(1, fillslot+1):
           if alist[location] > alist[positionOfMax]:
               positionOfMax = location

       temp = alist[fillslot]
       alist[fillslot] = alist[positionOfMax]
       alist[positionOfMax] = temp
```

**References**
- [[ 정렬 ] 선택 정렬 (Selection Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/242)
- [선택정렬 - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/11/06/selectionsort/)
- [6.8. The Selection Sort - Problem Solving with Algorithms and Data Structures using Python](https://runestone.academy/runestone/books/published/pythonds/SortSearch/TheSelectionSort.html)
