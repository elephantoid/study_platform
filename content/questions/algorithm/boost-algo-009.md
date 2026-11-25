---
id: boost-algo-009
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
- id: boost-algo-009-f1
  order: 1
  promptMd: 길이가 1자에서 1만 자까지 제각각인 문자열 1천만 개를 사전순으로 정렬하려 합니다. 고정 길이 정수에 쓰던 LSD 기수 정렬을 그대로 쓰면 어떤 문제가 있나요? MSD 방식과 비교해 선택하고, MSD의 약점은 어떻게 보완하겠습니까?
  hintKo: 두 문자열의 순서를 정하는 데 실제로 봐야 하는 글자 수를 생각해 보세요.
  rubricKeywords:
  - LSD는 최대 길이만큼 pass, 짧은 문자열 채우기
  - MSD는 구별되는 접두까지만 봄
  - MSD는 버킷별 카운트 배열 비용
  - 작은 버킷은 다른 정렬로 전환 (또는 3-way 문자열 퀵 정렬)
  modelAnswerKo: 'LSD는 가장 낮은 자리부터 모든 자리를 처리하므로 최대 길이 1만 번의 pass가 필요하고, 짧은 문자열은 끝에 가장 작은 빈 문자가 있는 것처럼 다뤄야 합니다. 대부분이 짧아도 모든 pass에서 전체를 훑어 비효율적입니다(길이별로 나누어 해당 자리가 있는 문자열만 참여시키면 줄일 수는 있습니다).


    MSD는 첫 글자로 나눈 뒤 같은 버킷 안에서만 다음 글자를 봅니다. 버킷에 하나만 남으면 멈추므로 순서를 구별하는 접두까지만 읽고, 앞글자가 빨리 갈리는 데이터에 유리합니다. 길이가 제각각이면 MSD를 고릅니다. 약점은 작은 버킷이 매우 많아지면 버킷마다 알파벳 크기의 카운트 배열을 초기화하는 비용이 커지고, 공통 접두가 길면 재귀가 깊어지는 것입니다. 작은 버킷은 삽입 정렬이나 비교 정렬로 바꾸고, 유니코드는 바이트 단위로 다루거나 3-way 문자열 퀵 정렬을 써서 보완합니다.'
  maxScore: 10
- id: boost-algo-009-f2
  order: 2
  promptMd: 32비트 부호 없는 정수 1천만 개를 LSD 기수 정렬로 정렬합니다. 진법 $b$를 $2^8$로 할지 $2^{16}$으로 할지 어떻게 정하겠습니까?
  hintKo: pass 수와 카운트 배열의 크기가 서로 반대로 움직입니다.
  rubricKeywords:
  - pass 수 d = ceil(32/r)
  - O(d(N+b))
  - 카운트 배열과 캐시·TLB
  - 벤치마크
  modelAnswerKo: '한 자리를 $r$비트로 하면 $b = 2^r$이고 pass 수는 $\lceil 32/r \rceil$, 비용은 $O(\lceil 32/r \rceil (N + 2^r))$입니다. $r=8$이면 4번의 pass에 카운트 256칸, $r=16$이면 2번의 pass에 카운트 65,536칸입니다. $N=10^7$에서는 두 경우 모두 $b \ll N$이라 식만 보면 $r=16$이 유리합니다.


    하지만 실제로는 메모리가 좌우합니다. 카운트 65,536칸은 4바이트 기준 256KB로 L1 캐시를 넘고, 결과를 65,536개의 위치에 흩어 쓰면 캐시와 TLB 미스가 늘어납니다. 256개의 쓰기 위치는 그 부담이 훨씬 작습니다. 그래서 흔히 8비트나 11비트(3번의 pass)를 고르고, 쓰기 버퍼 같은 최적화 여부까지 포함해 대상 하드웨어에서 벤치마크해 정합니다.'
  maxScore: 10
- id: boost-algo-009-f3
  order: 3
  promptMd: 음수가 섞인 정수와 IEEE 754 부동소수점 점수를 비트 단위 기수 정렬로 정렬하려면 키를 각각 어떻게 바꿔야 하나요? $-0.0$과 NaN은 어떻게 되는지도 설명하세요.
  hintKo: 비트를 부호 없는 정수로 읽었을 때의 순서가 원래 값의 순서와 같아지도록 바꿔 보세요.
  rubricKeywords:
  - '정수: 부호 비트 반전 또는 오프셋·부호 분리'
  - 양수 float은 비트 순서가 값 순서
  - 음수 float은 모든 비트 반전 (양수는 부호 비트만)
  - NaN과 -0.0의 위치 또는 처리 정책
  modelAnswerKo: '가능합니다. 비트 패턴을 부호 없는 정수로 읽은 순서가 값의 순서와 같아지도록 키를 바꾸고, 정렬 뒤 되돌리면 됩니다.


    2의 보수 정수는 음수의 최상위 비트가 1이라 양수보다 크게 읽히므로 부호 비트만 뒤집습니다. IEEE 754 부동소수는 지수부가 가수부보다 앞에 있어 양수끼리는 비트 순서가 값 순서와 같습니다. 음수는 절댓값이 클수록 비트 값이 커서 순서가 반대입니다. 따라서 양수는 부호 비트만 뒤집고 음수는 모든 비트를 뒤집습니다. 이렇게 하면 $-0.0$은 $+0.0$ 앞에 놓이고 NaN은 양 끝으로 가므로, NaN을 미리 걸러낼지 정책을 정해야 합니다.'
  maxScore: 10
---

## 문제

Radix Sort

## 해설

기수 정렬(Radix Sort)은 입력값의 자릿수(d) 각각에 대해 카운팅 정렬을 적용하여 입력 데이터의 최댓값인 k가 커질수록 효율이 떨어지는 카운팅 정렬의 단점을 보완한 정렬 알고리즘이다. 10진법으로 표현된 입력값에 기수 정렬을 적용하면 k 값이 9로 작아진다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/radix-sort.png)

> **시간 복잡도**

$$
O(d(N + b))
$$

($d$: 입력값의 자릿수, $b$: 진법의 크기. 10진법처럼 $b$가 상수이면 $O(dN)$)

> **파이썬 구현**

```python
def get_digit(number, d, base):
    return (number//base**d) % base

def counting_sort_with_digit(A, d, base):
    k = base - 1
    B = [-1] * len(A)
    C = [0] * (k + 1)
    for a in A:
        C[get_digit(a, d, base)] += 1
    for i in range(k):
        C[i+1] += C[i]
    for j in reversed(range(len(A))):
        B[C[get_digit(A[j], d, base)]-1] = A[j]
        C[get_digit(A[j], d, base)] -= 1
    return B

def radix_sort(list, base=10):  # 0 이상의 정수만
    if any(x < 0 for x in list):
        raise ValueError("음수는 지원하지 않는다")
    max_value = max(list, default=0)
    d = 0
    # 자릿수를 로그로 구하면 부동소수 오차로 1000의 자릿수가 3이 될 수 있다
    while base**d <= max_value:
        list = counting_sort_with_digit(list, d, base)
        d += 1
    return list
```

**References**
- [[ 정렬 ] 기수 정렬 (Radix Sort) (C++) - 얍문's Coding World..](https://yabmoons.tistory.com/248)
- [카운팅 정렬, 래딕스 정렬 - ratsgo's blog](https://ratsgo.github.io/data%20structure&algorithm/2017/10/16/countingsort/)

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

- **자릿수별 정렬은 반드시 안정 정렬이어야 한다**: 높은 자리가 같은 두 수의 순서는 앞서 낮은 자리에서 정한 순서 그대로 남아야 한다. 안정 정렬이 아니면 결과가 틀린다. 기수 정렬 전체도 안정 정렬이다.
- **LSD와 MSD**: LSD는 낮은 자리부터, MSD는 높은 자리부터 정렬한다. LSD는 모든 수를 같은 횟수로 처리해 흐름이 일정하고 구현이 단순하다(데이터에 따른 분기가 없다). 대신 1600000과 1을 비교할 때도 모든 자리를 거친다. MSD는 앞자리에서 갈라진 묶음을 따로 처리해 끝까지 보지 않아도 되지만 묶음별 재귀와 관리 비용이 든다.
- **공간**: 단계마다 결과 배열과 카운트 배열이 필요해 $O(N + b)$이다.
- **키의 종류**: 정수와 고정 길이 문자열에 바로 쓸 수 있다. 음수는 부호 비트를 뒤집거나 최솟값만큼 밀어서, 부동소수는 IEEE 754 비트를 순서가 보존되는 정수로 바꿔서 정렬할 수 있다.
