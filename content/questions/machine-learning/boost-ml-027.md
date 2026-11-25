---
id: boost-ml-027
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

50개의 작은 의사결정 나무는 큰 의사결정 나무보다 괜찮을까요? 왜 그렇게 생각하나요?

## 해설

50개의 작은 의사결정 나무는 앙상블에서 `Bagging` 기법을 사용한 모델로 볼 수 있다. 따라서 Bagging의 대표적인 방법인 `Random Forest` 방법이 왜 좋은지 설명하는 것으로, 왜 50개의 작은 의사결정 나무가 더 나은지 설명하고자 한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/random-forest-bagging.png)

큰 트리는 작은 편향(bias)와 큰 분산(variance)를 갖기 때문에, 매우 깊이 성장한 트리는 훈련데이터에 대해 과적합(overfitting)하게 된다. Random Forest 방식으로 학습하면, 트리들의 편향은 그대로 유지하면서, **여러 데이터셋/여러 경우에 대해 학습하기 떄문에 분산을 감소**시킬 수 있다. 또한 한 개의 결정트리의 경우, train 데이터에 있는 노이즈에 대해 매우 민감하지만, 여러 트리들을 만들면서 평균을 내면, **노이즈에 대해 강인**해질 수 있다. 따라서 하나의 깊은/큰 의사결정 나무보다 50개의 작은 의사결정 나무가 더 좋은 모델을 완성시킨다고 할 수 있다.

> **Bagging(Bootstrap Aggregating)**

Bagging은 Bootstrap(반복, 복원추출)하고, 이를 Aggregation(집계)하는 방법이다. 원래 데이터셋에 대해서 여러개의 작은 데이터셋 N개를 샘플링해서 만든다음, 각각의 데이터를 작은 모델 N개로 학습을 시킨다. 그 다음 학습된 N개의 모델을 모두 하나로 합쳐서 최종적인 모델로 사용하는 방법론을 의미한다. 결국, 병렬적으로 데이터를 나누어 여러 개의 모델을 동시에 학습시키는 방법이다.

> **Random Forest**

Random Forest는 여러 의사 결정 나무를 생성한 후에 다수결(hard voting) 또는 평균(soft voting)에 따라 출력을 예측하는 알고리즘이다. 즉 의사 결정 나무와 bagging을 혼합한 형태라고 볼 수 있다. Random Forest의 특징은 bootstrap을 이용하여 학습 데이터셋에서 다양한 샘플을 추출하여 일부만 한번의 학습에 사용한다는 것이다. 데이터 샘플링 및 변수 선택을 통해 의사 결정 나무의 다양성을 확보할 수 있다. 이를 통해 예측의 변동성이 줄어들고, 과적합을 방지할 수 있어 결측치에 대해 강건하다는 장점을 가진다. 그러나 데이터의 수가 많아지면 의사결정나무에 비해 속도가 크게 떨어지고, 결과에 대한 해석이 어렵다는 단점이 있다.

**References**
- [Bagging, Boosting, Bootstrapping - 곽동현, New Sight](https://newsight.tistory.com/247)
- [Bagging(Bootstrap aggregating, 배깅)알고리즘 - InCastle](https://m.blog.naver.com/PostView.nhn?blogId=ysd2876&logNo=221219689884&proxyReferer=https:%2F%2Fwww.google.com%2F)
- [머신러닝: Random Forest 특징, 개념, 장점, 단점](https://jjeongil.tistory.com/908)
