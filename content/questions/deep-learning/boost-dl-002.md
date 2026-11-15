---
id: boost-dl-002
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

Cost Function과 Activation Function은 무엇인가요?

## 해설

> **cost function**

모델은 데이터에 대해 현재 예측을 얼마나 잘하고 있는지 알아야 학습 방향을 어느 방향으로, 얼마나 개선할지 판단할 수 있다.

이 때, 예측 값과 데이터 값의 차이에 대한 함수를 **cost function**(MSE, CrossEntropy 등) 이라고 한다.

**cost function** 을 최소화함으로써 모델을 적절한 표현력을 갖추도록 학습시킬 수 있다.

> **activation function**

데이터를 예측하기 위해 선형 모델을 사용할 수 있다. 하지만 선형 모델의 경우 복잡한 데이터에 대해서는 적절한 예측을 못한다. 따라서 이를 처리하기 위해 **비선형 모델**이 필요하다.

선형 모델을 비선형 모델로 만들어주는 역할을 하는 함수가 바로 활성화 함수 **activation function**(Sigmoid, ReLU 등) 이다.

비선형 함수인 활성화 함수가 선형 함수와 결합됨으로써 선형 모델은 비선형 모델이 된다.

선형 모델은 깊게 쌓을 수 없다. 깊게 쌓아도 하나의 층을 잘 튜닝한 것과 다르지 않기 때문이다.

비선형 모델은 깊게 쌓을 수 있다. 선형으로 만들었다가 비선형으로 만드는 작업을 계속 반복할 수 있기 때문이다. 이로 인해 모델은 복잡한 데이터에 대해 더 표현력이 좋아질 수 있다.

활성화 함수는 입력 값에 대해 더 높게 혹은 더 낮게 만들 수 있기 때문에 활성화 함수라고 불린다.

**References**
- [5. 결과 값을 비교하는 방식(Cost function) - 대소니](https://daeson.tistory.com/166)
- [Activation Functions에 대해 알아보자 - Steve-Lee's Deep Insight](https://deepinsight.tistory.com/113)
- [활성화 함수(activation function)을 사용하는 이유 - 프라이데이](https://ganghee-lee.tistory.com/30)
