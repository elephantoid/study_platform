---
id: boost-algo-007
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

Quick Sort

## 해설

퀵 정렬(Quick Sort)는 pivot을 기준으로 pivot 앞에는 pivot보다 작은 값, 뒤에는 큰 값이 오도록 하여 배열을 분할하고, 분할된 두 개 배열 각각에 재귀적으로 이 과정을 반복해 정렬을 완성하는 정렬 알고리즘이다. 합병 정렬과 달리 주어진 배열을 임의로 나누지 않기 때문에 대개는 효율적이지만, pivot이 잘못 선택되면 복잡도가 $O(n^2)$이 될 수도 있다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/quick-sort.png)

위의 과정이 퀵 정렬을 1회 실시하고 나서의 결과이다. 54(pivot)를 기준으로 두 개의 배열로 나뉜다.

> **시간 복잡도**

- 최악의 경우(Worst): $O(N^2)$
- 평균적인 경우(Average): $O(N \log N)$
- 최선의 경우(Best): $O(N \log N)$

> **파이썬 구현**

```python
def quickSort(alist):
   quickSortHelper(alist, 0, len(alist)-1)

def quickSortHelper(alist, first, last):
   if first < last:

       splitpoint = partition(alist, first, last)

       quickSortHelper(alist, first, splitpoint-1)
       quickSortHelper(alist, splitpoint+1, last)


def partition(alist, first, last):
   pivotvalue = alist[first]

   leftmark = first + 1
   rightmark = last

   done = False
   while not done:

       while leftmark <= rightmark and alist[leftmark] <= pivotvalue:
           leftmark = leftmark + 1

       while alist[rightmark] >= pivotvalue and rightmark >= leftmark:
           rightmark = rightmark -1

       if rightmark < leftmark:
           done = True
       else:
           temp = alist[leftmark]
           alist[leftmark] = alist[rightmark]
           alist[rightmark] = temp

   temp = alist[first]
   alist[first] = alist[rightmark]
   alist[rightmark] = temp

   return rightmark
```

**References**
- [[ 정렬 ] 퀵 정렬(Quick Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/244)
- [퀵 정렬(Quick Sort) - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/09/28/quicksort/)
- [6.12. The Quick Sort - Problem Solving with Algorithms and Data Structures using Python](https://runestone.academy/runestone/books/published/pythonds/SortSearch/TheQuickSort.html)
