---
id: boost-stat-014
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

“likelihood”와 “probability”의 차이는 무엇일까요?

## 해설

<strong>확률(Probability)</strong>은 어떤 시행(trial)에서 특정 결과(sample)가 나올 가능성을 말한다. 즉, 시행 전 모든 경우의 수의 가능성은 정해져 있으며 그 총합은 1(100%)이다.

<strong>가능도(Likelihood)</strong>은 어떤 시행(trial)을 충분히 수행한 뒤 그 결과(sample)를 토대로 경우의 수의 가능성을 도출하는 것을 말한다. 아무리 충분히 수행해도 어디까지나 추론(inference)이기 때문에 가능성의 합이 1이 되지 않을수도 있다.

PDF(probability density function)에서는 **확률변수**를 변수로 보기 때문에 총합이 1이지만, likelihood function에서는 **분포의 모수**를 변수로 보기 때문에 총합이 1이 되지 않을수도 있다.

**References**
- [가능도(Likelihood)와 확률(Probability)의 차이 - JMAN's SW Lab.](https://swjman.tistory.com/104)
