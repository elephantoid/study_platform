---
id: boost-stat-004
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

누적 분포 함수와 확률 밀도 함수는 무엇인가요? 수식과 함께 표현해주세요.

## 해설

확률 변수 $X$가 임의의 실수 집합 $B$에 포함되는 사건의 확률이 다음과 같이 어떤 음이 아닌 함수 $f$의 적분으로 주어진다고 하자.

$$
P(X \in B) = \int_{B} f(x) dx
$$

이 때의 $X$를 연속확률변수라고 하며, 함수 $f(x)$를 <strong>확률 밀도 함수(Probability Density Function, PDF)</strong>라고 한다. 단, 실수 집합 $B$가 실수 전체일 경우 실수 전체에 대한 확률밀도함수의 적분은 1을 만족해야 한다.

$$
P(X \in R) = \int_{R} f(x) dx = 1
$$

<strong>누적 분포 함수(Cumulative Distribution Function, CDF)</strong>는 확률변수가 특정 값보다 작거나 같을 확률을 나타내는 함수이다. 특정 값을 $a$라고 할 때, 누적 분포 함수는 다음과 같이 나타낼 수 있다.

$$
F(a) = P(X ≤ a) = \int^a_{-\infty} f(x) dx
$$

확률 밀도 함수와 누적 분포 함수는 **미분과 적분의 관계**를 갖는다. 확률 밀도 함수를 음의 무한대에서 특정값 $a$까지 적분을 하면, $a$에 대한 누적 분포 함수를 얻을 수 있다. 반대로 누적 분포 함수를 미분하면 확률 밀도 함수를 얻을 수 있다.

**References**
- [확률및통계 강의노트 - 홍영훈 교수님](https://sites.google.com/site/hong0108/)
- [확률 분포 함수와 확률 밀도 함수의 의미 - groovallstar.log](https://velog.io/@groovallstar/%ED%99%95%EB%A5%A0-%EB%B6%84%ED%8F%AC-%ED%95%A8%EC%88%98%EC%99%80-%ED%99%95%EB%A5%A0-%EB%B0%80%EB%8F%84-%ED%95%A8%EC%88%98%EC%9D%98-%EC%9D%98%EB%AF%B8)
