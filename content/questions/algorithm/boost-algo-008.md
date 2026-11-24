---
id: boost-algo-008
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
- id: boost-algo-008-f1
  order: 1
  promptMd: 비교 기반 정렬이 최악의 경우 $\Omega(N \log N)$보다 빠를 수 없음을 증명하세요. 계수 정렬은 왜 이 하한에 걸리지 않나요?
  hintKo: 비교 결과에 따라 갈라지는 결정 트리의 잎이 몇 개여야 하는지 생각해 보세요.
  rubricKeywords:
  - 결정 트리
  - 잎 N! 이상
  - 2^h >= N!
  - log N! = Θ(N log N)
  - 계수 정렬은 비교 모델이 아님
  modelAnswerKo: '비교 정렬의 실행은 각 내부 노드가 비교 하나이고 결과에 따라 좌우로 갈라지는 이진 결정 트리로 나타낼 수 있습니다. 서로 다른 원소 $N$개의 입력 순열 $N!$가지는 각각 다른 재배치를 요구하므로 잎이 적어도 $N!$개 있어야 합니다. 높이 $h$의 이진 트리는 잎이 최대 $2^h$개이므로 $h \ge \log_2 N!$입니다. $N!$의 큰 쪽 절반 인수가 모두 $N/2$ 이상이므로 $\log_2 N! \ge (N/2)\log_2(N/2) = \Omega(N \log N)$입니다. 최악의 비교 횟수는 트리의 높이이므로 하한이 성립합니다.


    계수 정렬은 값을 배열 인덱스로 직접 써서 한 번의 연산으로 $k$갈래로 나눕니다. 즉 비교 모델의 알고리즘이 아니고, 대신 키가 작은 범위의 정수라는 추가 가정을 씁니다.'
  maxScore: 10
- id: boost-algo-008-f2
  order: 2
  promptMd: 계수 정렬에서 결과를 채울 때 입력을 앞에서부터 읽으면 무엇이 달라지나요? 그 차이가 문제가 되는 상황을 설명하세요.
  hintKo: 정렬된 값만 보면 차이가 없습니다. 값에 딸린 레코드를 생각해 보세요.
  rubricKeywords:
  - 값의 순서는 여전히 맞음
  - 같은 키의 순서가 뒤집혀 불안정
  - 기수 정렬이 깨짐
  - 시작 위치 누적합을 쓰면 앞에서부터도 안정
  modelAnswerKo: '누적합이 각 값의 마지막 자리를 가리키고 거기서부터 앞으로 채우므로, 입력을 앞에서부터 읽으면 먼저 나온 원소가 뒤쪽 자리에 들어갑니다. 값 자체는 올바르게 정렬되지만 같은 키를 가진 레코드의 순서가 뒤집혀 불안정 정렬이 됩니다.


    기수 정렬의 자릿수별 정렬로 쓰면 결과가 틀립니다. 낮은 자리에서 맞춘 순서가 높은 자리 정렬에서 같은 숫자끼리 유지되어야 하는데 그것이 뒤집히기 때문입니다. 앞에서부터 읽고 싶다면 누적합을 각 값의 **시작** 위치로 만들고(exclusive prefix sum) 쓸 때마다 1씩 늘리면 안정성이 유지됩니다.'
  maxScore: 10
- id: boost-algo-008-f3
  order: 3
  promptMd: 64비트 사용자 ID 100만 개를 정렬해야 합니다. 계수 정렬을 쓸 수 없는 이유를 말하고, 어떤 방법을 쓸지 선택 기준과 함께 설명하세요.
  hintKo: k와 N을 비교하고, 키를 여러 조각으로 나누는 방법을 생각해 보세요.
  rubricKeywords:
  - k = 2^64로 메모리 불가
  - 기수 정렬 O(d(N+b))
  - 비교 정렬 O(N log N)과 비교
  - 좌표 압축은 정렬이 필요
  modelAnswerKo: '카운트 배열이 값의 범위 $k \approx 2^{64}$만큼 필요해 메모리에 올릴 수 없습니다. $k = O(N)$일 때만 계수 정렬이 선형입니다.


    대안은 키를 자릿수로 나누는 기수 정렬입니다. 8비트씩 나누면 카운트 배열이 256칸이고 8번의 안정적인 계수 정렬로 $O(8(N+256))$입니다. $N=10^6$이면 비교 정렬은 원소당 약 $\log_2 N \approx 20$번의 비교가 필요하므로 정수 키에서는 기수 정렬이 유리할 수 있지만, 여러 번의 메모리 이동과 캐시 미스가 있어 벤치마크로 확인합니다. 좌표 압축으로 범위를 줄이는 방법은 압축 자체에 정렬이 필요하므로 정렬 목적에는 순환 논리입니다. 순서가 필요 없고 중복 제거나 집계만 필요하다면 해시가 더 낫습니다.'
  maxScore: 10
---

## 문제

Counting Sort

## 해설

계수 정렬(Counting Sort)은 입력값의 빈도를 세어서 이를 결과 리스트의 인덱스로 활용하고 입력 리스트의 요소값에 해당하는 결과 리스트 인덱스 위치에 채워 넣는 방식으로 정렬을 완성하는 정렬 알고리즘이다. 값의 범위(k)가 커질수록 복잡도가 크게 높아진다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/counting-sort.png)

> **동작 원리**

1. 각 데이터의 개수를 모두 count 한다.
2. 최솟값부터 각 값까지의 count 누적합을 구한다.
3. 새로운 배열에 누적합의 개수를 줄여주며 저장한다.

> **시간 복잡도**

$$
O(N+k)
$$

($k$: 값의 범위 크기, 즉 최댓값 - 최솟값 + 1)

> **파이썬 구현**

```python
def counting_sort(A):
    if not A:
        return []
    lo, hi = min(A), max(A)  # 최솟값만큼 밀어 음수도 인덱스로 쓴다
    B = [None] * len(A)
    C = [0] * (hi - lo + 1)

    for a in A:
        C[a - lo] += 1

    for i in range(1, len(C)):
        C[i] += C[i - 1]

    for a in reversed(A):  # 뒤에서부터: 안정 정렬
        C[a - lo] -= 1
        B[C[a - lo]] = a

    return B
```

**References**
- [[ 정렬 ] 카운팅 정렬(Counting Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/249)
- [카운팅 정렬, 래딕스 정렬 - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/10/16/countingsort/)
- [Counting Sort in C++ - prepinsta](https://prepinsta.com/cpp-program/counting-sort/)

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

**비교 정렬의 하한과 계수 정렬**

비교만으로 정렬하는 알고리즘은 결정 트리로 나타낼 수 있다. 내부 노드는 비교 한 번, 잎은 최종 순열 하나다. 서로 다른 원소 $N$개의 순열 $N!$개를 모두 구별해야 하므로 잎은 $N!$개 이상이고, 높이 $h$인 이진 트리의 잎은 $2^h$개 이하이다.

$$
2^h \ge N! \;\Rightarrow\; h \ge \log_2 N! \ge \frac{N}{2}\log_2\frac{N}{2} = \Omega(N \log N)
$$

따라서 어떤 비교 정렬도 최악의 경우 $\Omega(N \log N)$번 비교해야 한다. 계수 정렬은 원소를 비교하지 않고 값을 배열 인덱스로 쓰기 때문에 이 하한의 적용을 받지 않는다.

- **복잡도**: 빈도를 세는 데 $O(N)$, 누적합에 $O(k)$, 결과를 채우는 데 $O(N)$으로 시간은 $O(N + k)$이다. 결과 배열 $N$과 카운트 배열 $k$로 공간도 $O(N + k)$이다. $k$가 $N$보다 훨씬 크면 메모리와 시간이 모두 낭비된다.
- **안정성**: 누적합은 각 값이 놓일 **마지막** 자리를 가리킨다. 입력을 뒤에서부터 읽어 그 자리부터 채우면 같은 값의 원래 순서가 유지된다.
