---
id: boost-ml-012
topicId: machine-learning
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-ml-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

회귀 / 분류시 알맞은 metric은 무엇일까?

## 해설

[#1](#1) 답변을 참고해주세요. 해당 답변에서 서술하지 않은 지표만 추가로 설명합니다.

> **회귀**

$$
R^2 = \frac{\sum (\hat{y}_l - \bar{y})}{\sum (y_i - \bar{y})^2}
$$

결정계수(Coefficient of determination)는 (회귀선에 의해 설명되는 변동)/(전체 변동)을 말하며, 독립변수의 개수가 많아질수록 결정계수가 1에 가까워진다. 회귀모형이 높은 결정계수를 갖는다면 실제로 모형이 설명력이 높은 것인지 단순히 독립변수의 개수가 많은 것인지 알기 어려워 결정계수를 신뢰할 수 없게 되는 문제가 발생한다.

$$
adj R^2 = 1 - \frac{n - 1}{(n - p - 1)(1 - R^2)}
$$

수정된 결정계수는 결정계수의 문제를 해결하기 위해 표본의 크기(n)와 독립변수의 수(p)를 고려하여 수정된 결정계수를 계산한다.

> **분류**

$$ - (y - \log (p))) + (1 - y) \log (1-p) $$

Log Loss 혹은 Binary Crossentropy는 이진 분류에서의 지표로 사용된다.

$$
LogarithmicLoss = - \frac{1}{N} \sum^N_{i=1} \sum^M_{j=1} y_{ij} * \log (p_{ij})
$$

Categorical Crossentropy는 분류해야할 클래스가 3개 이상인 멀티 클래스 분류에서의 지표로 사용된다.

**References**
- [상관계수 & 결정계수 & 수정된 결정계수 - 모찌의 맛집 통계](https://mansoostat.tistory.com/76)
- [[결정계수] R square와 adjusted R square - specialscene](https://specialscene.tistory.com/63)
- [3 Best metrics to evaluate Regression Model?](https://towardsdatascience.com/what-are-the-best-metrics-to-evaluate-your-regression-model-418ca481755b)
- [The 5 Classification Evaluation metrics every Data Scientist must know](https://towardsdatascience.com/the-5-classification-evaluation-metrics-you-must-know-aa97784ff226)
