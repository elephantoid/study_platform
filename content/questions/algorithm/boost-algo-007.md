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
  model: rule-based/extract_interview@1 + claude-opus-5-5
  at: '2026-11-25'
followUps:
- id: boost-algo-007-f1
  order: 1
  promptMd: 값의 종류가 몇 개뿐이라 중복이 아주 많은 배열을 정렬할 때 퀵 정렬이 $O(N^2)$이 될 수 있습니다. 왜 그런지 설명하고, 해결 방법을 제시하세요.
  hintKo: pivot과 같은 값들이 분할 뒤 어느 쪽으로 가는지 보세요. 난수 pivot으로 해결되나요?
  rubricKeywords:
  - 같은 값이 한쪽으로 쏠림
  - 난수 pivot으로 해결되지 않음
  - 3-way partition(Dutch national flag)
  - 서로 다른 값이 k개면 평균 O(N log k)
  modelAnswerKo: 'pivot과 같은 값을 모두 한쪽으로 보내는 분할(예: Lomuto 방식)에서는 전부 같은 값일 때 매번 $N-1$과 0으로 나뉘어 $O(N^2)$이 됩니다. 어떤 원소를 골라도 값이 같으므로 난수 pivot으로는 해결되지 않습니다.


    해결책은 두 가지입니다. 첫째, 양쪽 포인터가 pivot과 **같은 값에서도 멈춰** 교환하게 하면(Hoare 방식) 같은 값이 양쪽으로 나뉘어 균형이 유지됩니다. 둘째, 3-way partition으로 작은 값, 같은 값, 큰 값의 세 구간으로 나누고 같은 값 구간은 재귀에서 뺍니다. 서로 다른 값이 $k$개면 평균 $O(N \log k)$이고, 모두 같으면 $O(N)$입니다. 범주형 컬럼이나 양자화된 점수처럼 중복이 많은 데이터에서 중요합니다.'
  maxScore: 10
- id: boost-algo-007-f2
  order: 2
  promptMd: 외부 사용자가 입력을 보낼 수 있는 서비스에서 퀵 정렬을 씁니다. 고정 pivot, median-of-three, 난수 pivot, introsort를 최악의 경우 관점에서 비교하고 무엇을 고를지 설명하세요.
  hintKo: 공격자가 구현을 알고 있다고 가정해 보세요.
  rubricKeywords:
  - 고정 pivot은 정렬 입력에서 O(N^2)
  - median-of-three도 공격 입력 존재
  - 난수 pivot은 기대 O(N log N)
  - introsort는 최악 O(N log N) 보장
  - 재귀 깊이와 스택
  modelAnswerKo: '첫 원소 같은 고정 pivot은 정렬되거나 역순인 흔한 입력에서 $O(N^2)$입니다. median-of-three는 그런 입력을 막지만 결정적이므로 공격자가 최악 입력을 만들 수 있습니다. 난수 pivot은 어떤 입력에서도 **기대** 시간이 $O(N \log N)$이라, 난수를 예측하지 못하는 공격자는 최악을 유도할 수 없습니다. 다만 최악 자체는 남아 있습니다. introsort는 깊이가 $c \log N$을 넘으면 힙 정렬로 바꿔 최악 $O(N \log N)$을 **보장**합니다.


    외부 입력이라면 검증된 표준 라이브러리(introsort, pdqsort, Timsort 등)를 고르고 입력 크기도 제한합니다. 직접 구현한다면 난수 pivot, 중복 처리, 작은 쪽만 재귀해 스택을 $O(\log N)$으로 묶는 것까지 넣습니다.'
  maxScore: 10
- id: boost-algo-007-f3
  order: 3
  promptMd: 응답 시간 1천만 건에서 p95를 구하려 합니다. 전체를 정렬하지 않고 구하는 방법과 복잡도를 설명하세요. 데이터가 계속 들어오는 스트림이라면 어떻게 바꾸겠습니까?
  hintKo: 퀵 정렬의 분할 뒤에는 한쪽만 보면 됩니다.
  rubricKeywords:
  - quickselect
  - 평균 O(N), 최악 O(N^2)
  - median of medians로 최악 O(N)
  - 스트림은 근사 분위수 스케치(t-digest, KLL, GK)
  modelAnswerKo: 'quickselect를 씁니다. 분할한 뒤 찾는 순위가 있는 쪽만 계속 보면 기대 비용이 $N + N/2 + N/4 + \dots$ 꼴이라 $O(N)$입니다. pivot이 나쁘면 최악 $O(N^2)$이므로 난수 pivot을 쓰고, 최악 보장이 필요하면 median of medians로 $O(N)$을 얻습니다(상수가 커서 실무에서는 드뭅니다).


    스트림에서는 정확한 분위수를 적은 메모리로 구할 수 없으므로 t-digest, KLL, Greenwald-Khanna 같은 분위수 스케치를 씁니다. 이들은 서버마다 만든 요약을 합칠 수 있어(GK는 병합 시 오차에 주의) 분산 집계에 맞습니다. 서버별 p95의 평균은 전체 p95가 아니라는 점도 주의해야 합니다.'
  maxScore: 10
---

## 문제

Quick Sort

## 해설

퀵 정렬(Quick Sort)는 pivot을 기준으로 pivot 앞에는 pivot보다 작은 값, 뒤에는 큰 값이 오도록 하여 배열을 분할하고, 분할된 두 개 배열 각각에 재귀적으로 이 과정을 반복해 정렬을 완성하는 정렬 알고리즘이다. 합병 정렬과 달리 보조 배열 없이 제자리에서 분할하고 캐시 지역성이 좋아 대개는 효율적이지만, pivot이 계속 최솟값이나 최댓값으로 선택되면 복잡도가 $O(n^2)$이 될 수도 있다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/quick-sort.png)

위의 과정이 퀵 정렬을 1회 실시하고 나서의 결과이다. 54(pivot)를 기준으로 두 개의 배열로 나뉜다. 그림은 첫 원소를 pivot으로 골랐고, 아래 코드는 임의의 원소를 골라 첫 자리로 옮긴 뒤 같은 방식으로 나눈다.

> **시간 복잡도**

- 최악의 경우(Worst): $O(N^2)$
- 평균적인 경우(Average): $O(N \log N)$
- 최선의 경우(Best): $O(N \log N)$

> **파이썬 구현**

```python
import random

def quickSort(alist):
    quickSortHelper(alist, 0, len(alist) - 1)

def quickSortHelper(alist, first, last):
    while first < last:
        splitpoint = partition(alist, first, last)
        # 작은 쪽만 재귀하고 큰 쪽은 반복: 최악에도 재귀 깊이 O(log N)
        if splitpoint - first < last - splitpoint:
            quickSortHelper(alist, first, splitpoint - 1)
            first = splitpoint + 1
        else:
            quickSortHelper(alist, splitpoint + 1, last)
            last = splitpoint - 1

def partition(alist, first, last):
    # 임의의 pivot: 정렬된 입력에서도 한쪽으로 쏠리지 않게 한다
    p = random.randint(first, last)
    alist[first], alist[p] = alist[p], alist[first]
    pivotvalue = alist[first]

    leftmark = first + 1
    rightmark = last
    while True:
        # 같은 값에서도 멈춰야 중복이 많은 입력이 반으로 나뉜다
        while leftmark <= rightmark and alist[leftmark] < pivotvalue:
            leftmark += 1
        while leftmark <= rightmark and alist[rightmark] > pivotvalue:
            rightmark -= 1
        if leftmark > rightmark:
            break
        alist[leftmark], alist[rightmark] = alist[rightmark], alist[leftmark]
        leftmark += 1
        rightmark -= 1

    alist[first], alist[rightmark] = alist[rightmark], alist[first]
    return rightmark
```

**References**
- [[ 정렬 ] 퀵 정렬(Quick Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/244)
- [퀵 정렬(Quick Sort) - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/09/28/quicksort/)
- [6.12. The Quick Sort - Problem Solving with Algorithms and Data Structures using Python](https://runestone.academy/runestone/books/published/pythonds/SortSearch/TheQuickSort.html)

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

- **안정성**: 같은 값의 원래 순서가 정렬 뒤에도 유지되면 안정 정렬(버블·삽입·합병·계수·기수), 그렇지 않으면 불안정 정렬(선택·퀵·힙)이다. 퀵 정렬은 멀리 떨어진 두 원소를 바꾸므로 불안정하다.
- **빠른 이유**: 먼 거리 교환으로 한 번에 여러 역순쌍을 없애고, 분할이 배열을 순차적으로 훑어 캐시 효율이 좋다.
- **pivot을 중간 위치로 고정하면 해결되나**: 정렬된 입력은 피하지만 그 위치에 최솟값이나 최댓값이 오도록 만든 입력에서는 여전히 $O(N^2)$이다. 난수 pivot도 최악을 없애는 것이 아니라 특정 입력이 항상 최악이 되는 일을 막는다. pivot 개선책은 `jobhope-algo-009` 카드에 있다.
- **공간**: 작은 쪽만 재귀하면 스택은 최악에도 $O(\log N)$이다.
