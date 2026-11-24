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
  model: rule-based/extract_interview@1 + claude-opus-5-5
  at: '2026-11-25'
followUps:
- id: boost-algo-004-f1
  order: 1
  promptMd: 모든 원소가 정렬된 위치에서 최대 $k$칸까지만 떨어져 있는 배열이 있습니다. 삽입 정렬의 비용은 얼마이고, $k$가 커지면 어떤 방법으로 바꾸겠습니까?
  hintKo: 역순쌍의 개수로 비용을 세어 보세요. 다음으로 나갈 최솟값이 있을 수 있는 범위도 생각해 보세요.
  rubricKeywords:
  - O(Nk)
  - 역순쌍(inversion) 수에 비례
  - 크기 k+1 최소 힙
  - O(N log k)
  modelAnswerKo: '삽입 정렬의 이동 횟수는 역순쌍의 개수와 같습니다. 원소마다 역순쌍을 이루는 상대가 $O(k)$개이므로 전체 비용은 $O(Nk)$입니다. $k$가 작은 상수면 사실상 선형이라 삽입 정렬이 좋은 선택입니다.


    $k$가 커지면 크기 $k+1$의 최소 힙을 씁니다. 다음으로 출력할 최솟값은 아직 출력하지 않은 앞쪽 $k+1$개 안에 반드시 있으므로, 힙에서 하나를 꺼내고 다음 원소를 넣는 일을 반복하면 $O(N \log k)$ 시간, $O(k)$ 공간에 끝납니다. 이 방법은 늦게 도착한 이벤트가 섞인 스트림처럼 전체를 메모리에 올릴 수 없을 때도 쓸 수 있습니다.'
  maxScore: 10
- id: boost-algo-004-f2
  order: 2
  promptMd: 점근적으로 더 빠른 정렬이 있는데도 실제 표준 라이브러리가 작은 구간을 삽입 정렬로 처리하는 이유는 무엇인가요? 전환 기준 크기는 어떻게 정하겠습니까?
  hintKo: Big-O가 숨기는 상수와 하드웨어를 생각해 보세요.
  rubricKeywords:
  - 상수 계수
  - 캐시 지역성
  - 재귀·함수 호출 비용
  - 벤치마크로 결정
  - Timsort 또는 introsort
  modelAnswerKo: 'Big-O는 $N$이 충분히 클 때의 증가율만 말합니다. 작은 $N$에서는 상수 계수가 지배합니다. 삽입 정렬은 재귀 호출, 피벗 선택, 보조 배열 할당이 없고 인접한 메모리를 순서대로 읽어 캐시와 분기 예측에 유리합니다. 또 일부가 정렬된 입력에서는 선형에 가깝습니다.


    그래서 Timsort는 짧은 run을 (이진) 삽입 정렬로 늘리고, introsort 구현은 작은 구간을 남겨 두었다가 삽입 정렬로 마무리합니다. 전환 크기는 보통 수십 개 이하인데 이론값이 아니라 원소 크기, 비교 비용, 캐시에 좌우되므로 대상 데이터와 하드웨어에서 벤치마크해 정합니다. 너무 크게 잡으면 구간마다 $O(m^2)$ 비용이 다시 커집니다.'
  maxScore: 10
- id: boost-algo-004-f3
  order: 3
  promptMd: 삽입할 위치를 이진 탐색으로 찾으면 삽입 정렬이 $O(N \log N)$이 되나요? 이 변형은 언제 의미가 있나요?
  hintKo: 비교 횟수와 이동 횟수를 따로 세어 보세요.
  rubricKeywords:
  - 비교는 O(N log N)
  - 이동은 여전히 O(N^2)
  - 비교 비용이 클 때 유리
  - 안정성을 위해 upper bound 위치
  modelAnswerKo: '아닙니다. 비교 횟수는 $O(N \log N)$으로 줄지만 배열에서는 삽입할 자리를 만들기 위해 원소를 밀어야 하므로 이동이 여전히 최악 $O(N^2)$입니다. 연결 리스트를 쓰면 이동은 없어지지만 임의 접근이 안 되어 이진 탐색의 이점이 사라집니다.


    이 변형은 긴 문자열이나 사용자 정의 비교 함수처럼 비교가 이동보다 훨씬 비쌀 때 의미가 있습니다. 대신 정렬된 입력에서도 비교를 $O(\log N)$번씩 하므로 최선이 $O(N)$이 아니게 됩니다. 안정성을 지키려면 같은 값들의 오른쪽 끝(upper bound)에 삽입해야 합니다.'
  maxScore: 10
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

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

- **최선 $O(N)$의 조건**: 입력이 이미 정렬되어 있으면 원소마다 비교 한 번으로 끝난다. 일반적으로 비용은 역순쌍(inversion) 개수를 $I$라 할 때 $O(N + I)$이다. 최악은 역순 입력으로 $I = N(N-1)/2$이다.
- **안정성과 공간**: 앞의 값이 **더 클 때만** 자리를 바꾸므로 안정 정렬이다. 제자리 정렬이라 보조 공간은 $O(1)$이다.
- **작은 배열에서 빠른 이유**: 재귀 호출과 분할 비용이 없고 인접한 메모리만 건드린다. 그래서 실제 라이브러리는 작은 구간에서 삽입 정렬로 바꾼다(Timsort의 짧은 run, introsort의 마지막 단계).
