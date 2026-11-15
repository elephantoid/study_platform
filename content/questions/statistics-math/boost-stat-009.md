---
id: boost-stat-009
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

R square의 의미는 무엇인가요?

## 해설

<strong>결정계수(R square)</strong>는 선형 회귀 모델에서 데이터에 대해 회귀선이 얼마나 잘 설명하는지에 대한 설명력을 의미한다. 결정계수는 0~1 의 값을 가질 수 있고, 만약 값이 1 이라면 회귀선으로 모든 데이터를 다 설명할 수 있다고 이해할 수 있다.

참고로 결정계수는 다음의 식으로 구할 수 있다.

$$
R^2 = SSE/SST = 1 - SSR/SST
$$

- SSE(**E**xplained **S**um of **S**quares) = $\sum(\text{추정값 - 관측값 평균})^2$
- SST(**T**otal **S**um of **S**quares) = $\sum(\text{관측값 - 관측값 평균})^2$
- SSR(**R**esidual **S**um of **S**quares) = $SSR = \sum(\text{관측값 - 추정값})^2$

관측값은 실제 데이터의 값을 말하며, 추정값은 회귀 모델을 통해 나온 값을 말한다. 회귀 모델의 성능을 평가하는 방법은 결정계수 외에도 MAE, MSE, RMSE 가 있다.

**References**
- [결정계수의 의미와 계산 방법](https://m.blog.naver.com/tlrror9496/222055889079)
- [회귀분석에서 R스퀘어의 정확한 의미](https://m.blog.naver.com/PostView.nhn?blogId=will84&logNo=220348748198&proxyReferer=https:%2F%2Fwww.google.com%2F)
- [모델 성능 평가](https://heung-bae-lee.github.io/2020/01/09/machine_learning_03/)
