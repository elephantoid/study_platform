---
id: boost-stat-003
topicId: statistics-math
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-stat-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

확률 모형과 확률 변수는 무엇인가요?

## 해설

**확률변수(Random Variable)** 란, 표본 공간의 각 단위 사건에 실수 값을 부여하는 변수이다. 확률변수는 어떠한 함수로 해석할 수 있으므로 `대문자 X`라고 표기한다.
무작위(Random) 실험을 했을 때, 특정 확률로 발생하는 각각의 결과를 수치적 값으로 표현하는 변수라고 할 수 있다.
또한 확률 변수에는 `이산확률변수`, `연속확률변수` 두가지 경우가 있다. `이산확률변수`는 확률변수 $X$가 취할 수 있는 값이 유한하기 떄문에 셀 수 있는 확률변수이다. 반면에 `연속확률변수`는 어떠한 두 수 사이에 반드시 다른 수가 존재하는, 셀 수 없는 범위의 확률변수를 가지는 경우에 사용된다.

주사위 굴리기 예제를 생각해보자.

```text
일단 주사위를 굴리는 상황은 어떤 수가 나올지 모르므로, 확률상황이다.
"주사위를 굴렸을 때 나오는 값"을 확률변수 X라고 할 수 있다.
1~6이 표본공간이 되고, 셀 수 있으므로 이산확률변수가 된다.
P(X=1)와 같은 식으로 표현하고, 이는 "주사위를 굴렸을 때, 1이라는 값이 나올 확률"로 해석할 수 있다.
```

**확률모형(Probability Model)** 이란 확률변수를 이용하여 데이터의 분포를 수학적으로 정의한 모형이다.
데이터 분포를 묘사하기 위해서 사용된다.
보통 **확률 분포 함수(probability distribution function)** 또는 <strong>확률 밀도 함수(probability density function)</strong>를 주로 사용하며, 이때 함수의 계수를 분포의 모수(parameter)라고 부른다.
**확률분포(Probability Distribution)** 란 표본공간에 정의된 확률을 이용하여 확률변수의 값 또는 영역에 대한 확률을 표현한 것이다.
예를 들어 가장 널리 쓰이는 확률 모형의 하나인 `가우시안 정규 분포(Gaussian normal distribution)`는 다음과 같은 수식으로 확률 밀도 함수를 정의한다.

$$
N(x ; \mu, \sigma) = \frac{1}{\sigma \sqrt{2 \pi}} e^{-\frac{(x- \mu)^2}{2 \sigma^2}}
$$

다음과 같은 함수들이 확률모형에 포함될 수 있다. (자세한 내용은 [확률통계 기초용어 - EG 공간](https://kongdols-room.tistory.com/131) 참고)

- 확률질량함수(PMF, Probability Mass Function) - 이산형
- 확률밀도함수(PDF, Probability Density Function) - 연속형
- 누적분포함수(CDF, Cumulative Distribution Function)

추가적으로 **확률 통계의 기초 용어**를 정리하면 다음과 같다. (주사위 굴리기 예제 사용)

```text
- 실험(Experiment)은 하나의 행위가 하나 이상의 결과를 도출하는 것에 대한 과정 혹은 절차를 나타낸다.
  - 예시) 주사위를 던진다.
- 결과(Outcome)는 어떤 실험에 의해 발생 가능한 결과이다. 특정 실험의 가능한 결과들은 각각 유일(unique)하다. 한번의 실험을 시행했을 때, 단 하나의 outcome만을 나타낸다.
  - 예시) 주사위의 눈 (ex. 3, 4, 6)
- 표본 공간(Sample space)은 확률 실험에서 발생할 수 있는 모든 결과로 구성된 집합(set)이다. 발생할 수 있는 모든 결과의 집합이므로, 중복된 원소를 가질 수 있다.
  - 예시) 가능한 주사위의 모든 눈 집합 (ex. Ω = {1, 2, 3, 4, 5, 6})
- 사건(Event)은 우리가 관심있는 Sample space의 부분집합이다.
  - 예시) 주사위 눈이 3이 나온다, 짝수/홀수가 나온다.
```

**References**
- [확률변수와 확률모형 - 숨니의 무작정 따라하기](https://sumniya.tistory.com/24)
- [확률변수와 확률함수 - 필로홍의 데이터 노트](https://drhongdatanote.tistory.com/49)
- [확률변수의 개념, 의미 - 로스카츠의 AI 머신러닝](https://losskatsu.github.io/statistics/random-variable/#%EC%9D%B4%EC%82%B0%ED%99%95%EB%A5%A0%EB%B6%84%ED%8F%AC)
- [확률모형이란 - notebook.community](https://notebook.community/zzsza/Datascience_School/09.%20%EA%B8%B0%EC%B4%88%20%ED%99%95%EB%A5%A0%EB%A1%A02%20-%20%ED%99%95%EB%A5%A0%20%EB%B3%80%EC%88%98/03.%20%ED%99%95%EB%A5%A0%20%EB%AA%A8%ED%98%95%EC%9D%B4%EB%9E%80)
- [확률통계 기초용어 - EG 공간](https://kongdols-room.tistory.com/131)
- [[통계학] 9. 확률변수와 확률분포- 러닝머신의 Train Data Set](https://m.blog.naver.com/nilsine11202/221378790554)
