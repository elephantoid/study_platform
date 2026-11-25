---
id: boost-stat-006
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

공분산과 상관계수는 무엇일까요? 수식과 함께 표현해주세요.

## 해설

공분산은 확률변수 X의 편차(평균으로부터 얼마나 떨어져 있는지)와 확률변수 Y의 편차를 곱한 것의 평균값이다.

$$
Cov(X, Y) = E((X - \mu_X)(Y-\mu_Y))
$$

공분산은 두 변수 간에 양의 상관관계가 있는지, 음의 상관관계가 있는지 정도를 알려준다. 하지만 상관관계가 얼마나 큰지는 제대로 반영하지 못한다.

공분산의 문제는 확률변수의 단위 크기에 영향을 많이 받는다는 것이다. 이를 보완할 수 있는 것이 바로 상관계수이다.

상관계수는 확률변수의 절대적 크기에 영향을 받지 않도록 공분산을 단위화시킨 것이다. 즉, 공분산에 각 확률변수의 분산을 나눠주었다.

$$
\rho = \frac{Cov(X, Y)}{\sqrt{Var(X) \cdot Var(Y)}}, \quad -1 ≤ \rho≤ 1
$$

상관계수는 양의 상관관계가 있는지 음의 상관관계가 있는지 알려줄 뿐만 아니라, 그 상관성이 얼마나 큰지도 알려준다. 1 또는 -1에 가까울수록 상관성이 큰 것이고, 0에 가까울수록 상관성이 작은 것이다.

**References**
- [공분산과 상관계수의 이해.txt - bskyvision](https://bskyvision.com/398)
- [공분산(Covariance)과 상관계수(Correlation) - Serious Archive](https://destrudo.tistory.com/15)
