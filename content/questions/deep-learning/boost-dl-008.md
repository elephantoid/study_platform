---
id: boost-dl-008
topicId: deep-learning
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-dl-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

Weight Initialization 방법에 대해 말해주세요. 그리고 무엇을 많이 사용하나요?

## 해설

딥러닝에서 가중치를 잘 초기화하는 것은 기울기 소실이나 local minima 등의 문제를 야기할 수 있기 때문에 중요하다.

> **LeCun Initialization**

딥러닝의 대가 LeCun 교수님이 제시한 초기화 방법으로 들어오는 노드 수에 대해 정규 분포와 균등 분포를 따르는 방법이 있다.

- **정규 분포를 따르는 방법**

$$
W \sim N(0, Var(W)), \quad Var(W) = \sqrt{\frac{1}{n_{in}}}
$$

- **균등 분포를 따르는 방법**

$$
W \sim U(- \sqrt{\frac{1}{n_{in}}}, + \sqrt{\frac{1}{n_{in}}})
$$

> **Xavier Initialization**

LeCun 방법과 비슷하지만 들어오는 노드 수와 나가는 노드 수에 의존하고, 적절한 상수값도 발견하여 사용한 방법이다.

- **정규 분포를 따르는 방법**

$$
W \sim N(0, Var(W)), \quad Var(W) = \sqrt{\frac{2}{n_{in} + n_{out}}}
$$

- **균등 분포를 따르는 방법**

$$
W \sim U(- \sqrt{\frac{6}{n_{in} + n_{out}}}, + \sqrt{\frac{6}{n_{in} + n_{out}}})
$$

sigmoid 나 tanh 함수와는 좋은 결과를 보여주지만 ReLU 함수와 사용할 경우 0에 수렴하는 문제가 발생한다.  
따라서 `sigmoid` 나 `tanh` 함수와 주로 많이 사용한다.

> **He Initialization**

`ReLU` 와 함께 많이 사용되는 방법으로, LeCun 방법과 같지만 상수를 다르게 하였다. 들어오는 노드만 고려한다.

- **정규 분포를 따르는 방법**

$$
W \sim N(0, Var(W)), \quad Var(W) = \sqrt{\frac{2}{n_{in}}}
$$

- **균등 분포를 따르는 방법**

$$
W \sim U(- \sqrt{\frac{6}{n_{in}}}, + \sqrt{\frac{6}{n_{in}}})
$$

**References**
- [가중치 초기화 (Weight Initialization) - reniew's blog](https://reniew.github.io/13/)
