---
id: boost-dist-005
topicId: statistics-math
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-dist-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

가우시안 정규 분포

## 해설

평균을 중심으로 좌우가 대칭인 종 모양을 그리는 정규분포이다. 정규 분포의 확률 밀도 함수와 그 그래프는 아래와 같다.

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} exp(- \frac{(x - \mu)^2}{2 \sigma^2}), -\infty < x < \infty, -\infty < \mu < \infty, \sigma > 0
$$

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/gaussian-normal-distribution.png)

정규 분포 식에서 변수는 $x$이다. $\sigma$와 $\mu$는 그래프를 종모양으로 만드는데 사용된다. $\mu$는 확률 변수 $X$의 평균이고 $\mu$는확률 변수 $X$의 표준 편차이다. 종 모양의 그래프는 평균을 기준으로 좌우 대칭을 이룬다. 표준 편차가 높을 수록 그래프는 완만한 곡선 형태를 띄게 된다.

**References**
- [갈아먹는 통계 기초1.확률 분포 정리 - 갈아먹는 머신러닝](https://yeomko.tistory.com/33)
