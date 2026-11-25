---
id: boost-ml-021
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

L1, L2 정규화에 대해 설명해주세요.

## 해설

정규화(**일반화**)의 목적은 모델이 학습 데이터에 오버피팅되지 않고 처음 보는 테스트 데이터에도 좋은 성능을 내도록 만드는 것이다.

모델의 학습은 loss 함수를 최소화하는 방향으로 진행된다.

이 때, loss 함수에 L1, L2 정규화 항 (norm) 을 더함으로써 모델은 기존의 loss 도 줄이면서 정규화 항 (모델의 피쳐값과 관련) 도 줄이는 방향으로 학습된다.

모델의 피쳐값이 줄어듦에 따라 특정 피쳐가 너무 큰 값을 갖지 않게 되면서 오버피팅을 방지할 수 있게 된다.

> **L1 정규화 (라쏘 회귀)**

L1 정규화는 특정 피쳐의 값이 매우 낮은 경우 (아웃라이어) 0에 수렴되는 특징이 있다. 특정 피쳐가 0이 되어 사라지는 것은 **feature selection** 과 동일하다고 볼 수 있다.

$$
Cost = \sum^N_{i=0} (y_i - \sum^M_{j=0} x_{ij}W_j)^2 + \lambda \sum^M_{j=0} |W_j|
$$

> **L2 정규화 (릿지 회귀)**

L2 정규화는 특정 웨이트의 값이 매우 낮아도 0에 수렴되지는 않고 가까워지는 특징이 있다. 이는 L1 정규화에 비해 강하지 않게 정규화를 실행하여 항상 선형 모델에 일반화 효과를 줄 수 있다.

$$
Cost = \sum^N_{i=0} (y_i - \sum^M_{j=0} x_{ij}W_j)^2 + \lambda \sum^M_{j=0} W_j^2
$$

loss 식에 람다 모델의 웨이트에 대한 L1 or L2 norm 을 더해줌으로써 모델의 일반화가 가능해진다.

loss 는 데이터 값과 추정 값의 차이로 모델은 loss 를 최소화하는 방향으로 학습하는데, L1 or L2 정규화를 사용하면 loss 가 웨이트의 크기만큼 커지기 때문에 데이터 값에 예측 값이 fit 해지지 않기 때문이다.

> **Norm**

Norm은 벡터의 크기를 나타내는 것으로 L1 Norm은 벡터의 절댓값 크기를 나타내고, L2 Norm은 직선 거리 (제곱의 루트) 를 나타낸다.

![Norm](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/norm.png)

위 그림에서 초록선은 L2 norm 을 의미하고, 나머지 선은 L1 norm 을 의미한다.

- **L1 loss**

$$
L1LossFunction = \sum^n_{i=1} |y_{true} - y_{predicted}|
$$

- L2 loss

$$
L2LossFunction = \sum^n_{i=1} (y_{true} - y_{predicted})^2
$$

**References**
- [딥러닝 용어 정리, L1 Regularization, L2 Regularization 의 이해, 용도와 차이 설명 - 빛나는 나무](https://light-tree.tistory.com/125)
- [L1, L2 Norm, Loss, Regularization? - 생각 정리](https://junklee.tistory.com/29)
- [릿지회귀, 라쏘회귀, 엘라스틱넷 - 대학원생이 쉽게 설명해보기](https://hwiyong.tistory.com/93)
