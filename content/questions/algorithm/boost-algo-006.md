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
  model: rule-based/extract_interview@1 + claude-opus-5-5
  at: '2026-11-25'
followUps:
- id: boost-algo-006-f1
  order: 1
  promptMd: 원소 $N$개로 힙을 만드는 비용이 $O(N \log N)$이 아니라 $O(N)$인 이유를 증명하세요. 원소를 하나씩 삽입해 만들 때와 왜 다른가요?
  hintKo: 노드가 가장 많은 층에서 노드 하나가 하는 일의 양을 비교해 보세요.
  rubricKeywords:
  - bottom-up heapify
  - 높이 h인 노드 수 N/2^(h+1)
  - 급수의 수렴
  - 삽입은 깊이만큼 올라가 최악 O(N log N)
  modelAnswerKo: '아래에서 위로 heapify하면 높이 $h$인 노드는 최대 $\lceil N/2^{h+1} \rceil$개이고, 하나를 내려보내는 비용은 $O(h)$입니다. 총비용은 $\sum_{h=0}^{\log N} \frac{N}{2^{h+1}} O(h) = O(N \sum_h h/2^h)$이고 $\sum_h h/2^h = 2$로 수렴하므로 $O(N)$입니다.


    하나씩 삽입하면 노드가 깊이만큼 위로 올라갑니다. 노드의 절반이 깊이 약 $\log N$인 마지막 층에 있으므로 최악에는 대부분이 $\log N$만큼 움직여 $O(N \log N)$이 됩니다. 즉 bottom-up 방식은 노드가 많은 층이 적게 움직이고, 삽입 방식은 노드가 많은 층이 많이 움직입니다.'
  maxScore: 10
- id: boost-algo-006-f2
  order: 2
  promptMd: 추천 후보 1억 개의 점수가 스트림으로 들어올 때 상위 100개를 구해야 합니다. 자료구조를 고르고, 전체 정렬이나 quickselect와 비교하세요. 여러 서버에 나뉘어 있다면 어떻게 합치겠습니까?
  hintKo: 지금까지의 상위 100개 중 가장 작은 값과만 비교하면 됩니다.
  rubricKeywords:
  - 크기 k 최소 힙
  - O(N log k) 시간, O(k) 공간
  - quickselect 평균 O(N)이지만 전체 적재 필요
  - 샤드별 top-k 후 병합
  modelAnswerKo: '크기 100의 **최소 힙**을 유지합니다. 새 점수가 루트(현재 상위 100개 중 최솟값)보다 크면 루트를 교체합니다. 시간은 최악 $O(N \log k)$, 공간은 $O(k)$입니다. 순서가 무작위라면 대부분의 원소는 루트와 한 번 비교하고 버려지므로 실제 비용은 $O(N)$에 가깝습니다.


    전체 정렬은 $O(N \log N)$이고 모두 저장해야 합니다. quickselect는 평균 $O(N)$이지만 전체를 메모리에 두고 위치를 바꿔야 해서 스트림에 맞지 않습니다. 대신 점수가 이미 배열이나 GPU에 있으면 partition 기반 top-k가 유리합니다.


    샤드로 나뉘어 있으면 샤드마다 상위 100개만 구해 모은 뒤 다시 상위 100개를 뽑습니다. 전체 상위 100개에 드는 항목은 자기 샤드에서도 상위 100개 안에 들기 때문에 결과가 정확합니다.'
  maxScore: 10
- id: boost-algo-006-f3
  order: 3
  promptMd: 힙 정렬은 최악에도 $O(N \log N)$이고 제자리 정렬인데, 왜 범용 정렬의 기본값으로는 잘 쓰이지 않나요? 그래도 실제 구현에서 맡는 역할은 무엇인가요?
  hintKo: 부모에서 자식으로 갈 때 메모리 위치가 얼마나 멀어지는지 생각해 보세요.
  rubricKeywords:
  - 캐시 지역성이 나쁨
  - 퀵 정렬보다 큰 상수
  - 불안정
  - introsort의 최악 방지
  modelAnswerKo: '부모 `i`에서 자식 `2i+1`, `2i+2`로 뛰기 때문에 큰 배열에서는 접근마다 캐시 미스가 나기 쉽습니다. 또 맨 끝의 작은 값을 루트로 올렸다가 다시 거의 바닥까지 내려보내므로 비교와 이동이 많습니다. 그래서 상수 계수가 퀵 정렬보다 크고, 불안정 정렬이라 안정성이 필요한 곳에도 쓸 수 없습니다.


    실제로는 introsort가 최악을 막는 장치로 씁니다. 퀵 정렬로 시작하되 재귀 깊이가 $c \log N$을 넘으면 그 구간을 힙 정렬로 바꿔 최악을 $O(N \log N)$으로 보장합니다. 그 밖에 우선순위 큐, 스케줄러, 상위 $k$개 선택처럼 전체 순서가 필요 없는 곳에서 힙이 쓰입니다.'
  maxScore: 10
---

## 문제

Heap Sort

## 해설

힙 정렬(Heap Sort)은 완전 이진 트리로 구현되는 정렬 방식으로, 모든 노드가 최대 힙 속성(각 노드의 값이 자신의 자식 노드 값보다 크거나 같다)을 만족하도록 재귀적으로 트리 구조를 만들어 정렬을 완성하는 정렬 알고리즘이다.

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

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

- **불안정 정렬**: 루트를 배열 맨 끝과 바꾸는 먼 거리 교환에서 같은 값의 순서가 뒤집힐 수 있다.
- **`n//2-1`부터 거꾸로 도는 이유**: 0부터 세면 `i`의 자식은 `2i+1`, `2i+2`이다. 따라서 `n//2` 이후의 노드는 모두 잎이라 이미 힙이고, 마지막 내부 노드가 `n//2-1`이다.
- **두 번의 heapify**: 첫 번째 반복문은 배열 전체를 최대 힙으로 만든다. 두 번째 반복문은 최댓값을 꺼낸 뒤 줄어든 힙의 루트만 다시 내려보낸다.
- **힙 구성은 $O(N)$**: 높이 $h$인 노드는 최대 $\lceil N/2^{h+1} \rceil$개이고 하나를 내려보내는 데 $O(h)$이므로 $\sum_h \frac{N}{2^{h+1}} O(h) = O(N)$이다. 이후 $N-1$번의 추출이 $O(N \log N)$을 차지한다.
- **공간**: 보조 배열은 필요 없다. 위 코드는 재귀라 스택 $O(\log N)$을 쓰고, 반복문으로 바꾸면 $O(1)$이다.
- **쓸모**: 최댓값·최솟값 또는 상위 $k$개만 필요할 때, 그리고 모든 원소가 제자리에서 $k$칸 이내일 때(크기 $k+1$ 최소 힙으로 $O(N \log k)$) 유용하다.
