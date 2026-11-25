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
  model: rule-based/extract_interview@1 + claude-opus-5-5
  at: '2026-11-25'
followUps:
- id: boost-algo-005-f1
  order: 1
  promptMd: 메모리가 8GB인 장비에서 100GB 로그 파일을 시간순으로 정렬해야 합니다. 어떻게 설계하고, 성능을 좌우하는 것은 무엇인가요?
  hintKo: 메모리에 들어가는 만큼 먼저 정렬한 뒤, 여러 파일을 한 번에 합치는 방법을 생각해 보세요.
  rubricKeywords:
  - 외부 합병 정렬(external merge sort)
  - 정렬된 run 생성
  - k-way merge
  - 최소 힙
  - 순차 I/O와 버퍼 크기
  modelAnswerKo: '외부 합병 정렬을 씁니다. 먼저 메모리에 들어가는 크기(예: 6GB)씩 읽어 정렬하고 디스크에 run으로 씁니다. 약 17개의 run이 생깁니다. 다음으로 각 run에서 블록 단위로 읽으며 최소 힙으로 k-way merge를 해 한 번에 합칩니다. 힙에는 run마다 원소 하나만 두므로 비교는 원소당 $O(\log k)$입니다.


    성능은 비교 횟수보다 I/O가 좌우합니다. run마다 입력 버퍼를 크게 잡아 순차 읽기를 늘리고, 병합을 한 번의 pass로 끝낼 수 있는지 확인합니다. run이 너무 많아 버퍼가 작아지면 여러 pass로 나눕니다. 시간이 같은 로그의 원래 순서를 지키려면 힙의 키에 run 번호를 함께 넣어 안정성을 보장합니다.'
  maxScore: 10
- id: boost-algo-005-f2
  order: 2
  promptMd: 안정 정렬이 꼭 필요한 상황을 하나 들어 설명하세요. 불안정 정렬만 쓸 수 있다면 어떻게 안정하게 만들고, 그 비용은 무엇인가요?
  hintKo: 동점을 비교 함수 안에서 처리할 수 있는지 생각해 보세요.
  rubricKeywords:
  - 타당한 상황 (여러 키 순차 정렬, 동점 순서의 재현성 등 하나)
  - 원래 인덱스를 보조 키로 비교
  - 추가 공간 O(N)과 비교 비용
  modelAnswerKo: '예를 들어 날짜로 정렬한 뒤 사용자로 다시 정렬하면, 안정 정렬에서는 사용자 안에서 날짜 순서가 유지되지만 불안정 정렬에서는 깨집니다. 추천이나 검색에서 점수가 같은 항목의 순서가 실행이나 구현에 따라 달라지면 오프라인 지표와 A/B 비교의 재현성도 떨어집니다.


    불안정 정렬만 쓸 수 있다면 각 원소에 원래 인덱스를 붙여 (키, 인덱스)를 비교합니다. 모든 키가 서로 달라지므로 결과가 하나로 정해지고 동점에서는 원래 순서가 유지됩니다. 비용은 인덱스를 담는 $O(N)$ 공간과, 동점일 때의 추가 비교입니다. 중복이 많은 입력에서 같은 값을 한꺼번에 처리하는 최적화(3-way partition 등)의 이점도 사라집니다.'
  maxScore: 10
- id: boost-algo-005-f3
  order: 3
  promptMd: 두 모델이 같은 항목들에 매긴 순위가 얼마나 다른지 보려고 순서가 뒤집힌 쌍(inversion)의 개수를 세려 합니다. 합병 정렬을 이용해 $O(N \log N)$에 구하는 방법을 설명하고, 이 값으로 계산할 수 있는 순위 상관계수를 하나 말해 보세요.
  hintKo: 정렬된 두 부분 배열을 합칠 때 역순쌍을 하나씩 세지 않고 한꺼번에 셀 수 있는 순간을 찾아보세요.
  rubricKeywords:
  - 오른쪽을 먼저 꺼낼 때 왼쪽에 남은 개수를 더함
  - 왼쪽·오른쪽·교차 역순쌍의 합
  - O(N log N)
  - Kendall tau
  modelAnswerKo: '한 모델의 순위 순서로 항목을 놓고 다른 모델의 순위를 배열로 만듭니다. 이 배열의 역순쌍 개수가 두 순위가 어긋난 쌍의 수입니다.


    역순쌍은 왼쪽 절반 내부, 오른쪽 절반 내부, 두 절반에 걸친 쌍의 합입니다. 앞의 둘은 재귀로 구합니다. 걸친 쌍은 병합할 때 셉니다. 왼쪽과 오른쪽이 각각 정렬되어 있으므로 `left[i] > right[j]`라서 오른쪽을 꺼내는 순간 왼쪽에 남은 `len(left) - i`개가 모두 `right[j]`보다 큽니다. 그 수를 더합니다. 병합은 그대로 $O(N)$이므로 전체는 $O(N \log N)$입니다. 동점이 없을 때 Kendall tau는 $1 - 4I / (N(N-1))$로 바로 계산됩니다. 동점이 있으면 tau-b처럼 동점 보정이 필요합니다.'
  maxScore: 10
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

def merge(left, right):
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:  # 같으면 왼쪽을 먼저: 안정 정렬
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    return merged + left[i:] + right[j:]
```

**References**
- [[ 정렬 ] 병합 정렬 (Merge Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/245)
- [합병정렬(Merge Sort) - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/10/03/mergesort/)
- [6.11. The Merge Sort - Problem Solving with Algorithms and Data Structures using Python](https://runestone.academy/runestone/books/published/pythonds/SortSearch/TheMergeSort.html)

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

- **복잡도 근거**: $T(N) = 2T(N/2) + O(N)$이므로 최선·평균·최악 모두 $O(N \log N)$이다. 보조 공간은 병합 배열 $O(N)$이고 재귀 스택은 $O(\log N)$이다.
- **안정 정렬**: 병합할 때 값이 같으면 왼쪽 부분 배열의 원소를 먼저 넣기 때문이다. 비교를 `<`로 바꾸면 안정성이 깨진다.
- **퀵 정렬과의 차이**: 퀵 정렬은 먼저 분할(partition)하면서 순서를 맞추고 재귀한다. 합병 정렬은 먼저 끝까지 쪼개고 합치면서(merge) 순서를 맞춘다.
- **연결 리스트**: 병합은 앞에서부터 순차 접근만 하므로 연결 리스트에 알맞다. 노드의 링크만 바꾸면 되어 병합 배열도 필요 없다. 임의 접근에 기대는 배열용 퀵 정렬 구현을 그대로 쓰면 위치를 찾을 때마다 $O(N)$이 든다.
