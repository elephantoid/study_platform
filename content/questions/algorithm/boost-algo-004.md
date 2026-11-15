---
id: boost-algo-004
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

Insertion Sort

## 해설

삽입 정렬(Insertion Sort)은 배열의 모든 요소를 배열의 시작부터 끝까지 현재 배열의 요소들과 비교해 가면서 적절한 위치에 삽입하는 정렬 알고리즘이다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/insertion-sort.png)

> **시간 복잡도**

- 최악의 경우(Worst): $O(N^2)$
- 평균적인 경우(Average): $O(N^2)$
- 최선의 경우(Best): $O(N)$

> **파이썬 구현**

```python
def insertion_sort(collection):
    for index in range(1, len(collection)):
        while 0 < index and collection[index] < collection[index - 1]:
            collection[index], collection[
                index - 1] = collection[index - 1], collection[index]
            index -= 1

    return collection
```

**References**
- [[ 정렬 ] 삽입 정렬 (Insertion Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/243)
- [삽입정렬(Insertion Sort) - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/09/06/insmersort/)
- [6.9. The Insertion Sort - Problem Solving with Algorithms and Data Structures using Python](https://runestone.academy/runestone/books/published/pythonds/SortSearch/TheInsertionSort.html)
