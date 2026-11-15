---
id: boost-ml-022
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

Cross Validation은 무엇이고 어떻게 해야하나요?

## 해설

**cross validation(교차검증)이란** train(학습) 데이터로 학습한 모델이, 학습에 사용되지 않은 validation(검증) 데이터를 기준으로 얼마나 잘 동작하는지 확인하는 것이다. 여기서 주의할 점은 train 데이터셋과 validation 데이터셋에는 test 데이터셋이 포함되면 안된다는 것이다.

교차검증을 통해 얻을 수 있는 **장단점**은 아래와 같다.

- 적은 데이터에 대한 validation 신뢰성을 높일 수 있다.
- 모든 데이터셋을 훈련에 활용할 수 있으므로 데이터 편중을 막을 수 있다. (k-fold 경우)
- 검증 결과에 따라 더 일반화된 모델을 만들 수 있다.
- 모델 학습에 오랜 시간이 소요된다.

교차검증 기법의 **종류**는 아래와 같다. (validation 데이터셋을 어떻게 지정하느냐에 따라 달라진다.)

- 홀드 아웃 교차검증(Holdout Cross Validation)
- K-겹 교차검증(K-fold Cross Validation)
- 계층별 k-겹 교차검증(Stratified K-Fold Cross Validation)

> **홀드 아웃 교차검증**

홀드아웃 교차검증방법은 일정한 비율의 validation 데이터셋 하나를 지정하여 검증 데이터셋으로 사용하는 것이다. 홀드아웃 교차검증을 사용하는 경우, 두가지 문제점이 존재한다.

1. validation 데이터셋으로 지정된 부분의 데이터가 학습셋으로 사용되지 않는다는 문제
2. validation 데이터셋에 편향되도록 모델을 조정하게 된다는 문제

이를 해결하기 위해 k-겹 교차검증이 등장했다.

> **k-겹 교차검증**

k-겹 교차검증 방법은 train 데이터를 k개의 fold로 나누어, 그 중 하나의 fold를 validation 데이터셋으로 삼아 검증하는 방법을 k번 반복하여, 그 평균을 결과로서 사용하는 방법이다. 세부적인 동작방법은 다음과 같다.

1. train 데이터셋을 k개의 fold로 나누고, 그 중 하나를 validation 데이터셋으로 지정한다.
2. validation 데이터셋을 제외한 나머지 폴드들을 train 데이터셋으로 사용하여 모델을 학습한다.
3. 학습한 모델을 1번에서 지정해둔 validation 데이터셋으로 검증하고, 그 검증 결과를 저장해둔다.
4. 모델을 초기화한 후, 기존 validation 데이터셋이 아닌 다른 fold를 validation 데이터셋으로 지정하고, 2번 과정부터 다시 수행한다.
5. 모든 fold들이 한번씩 validation 데이터셋으로 사용된 후에는, 저장해둔 검증결과의 평균을 내어, 그것을 최종 validation 결과로 사용한다.

그러나 k-겹 교차검증 방법은 랜덤하게 validation 데이터셋을 지정하게 되므로, 편향된 데이터로 이뤄진 폴드가 생성될 수 있다는 단점이 있다. 이를 해결하기 위해서 계층별 k-겹 교차검증 방법이 등장했다.

> **계층별 k-겹 교차검증**

계층별 k-겹 교차검증 방법은 k-겹 교차검증 방법에서 fold를 나눌때, 랜덤하게 fold를 지정하는 것이 아닌, 각 클래스별 비율을 고려하여 fold를 구성하는 방법이다.

![계층별 k-겹 교차검증](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/stratified-kfold.png)

> **💡 왜 test 데이터셋 만으로 검증하면 안될까?**  
> 모든 train 데이터셋을 학습하고, test 데이터셋으로 검증한 결과를 확인한다고 하자. 개발자는 test 데이터셋 점수를 높이기 위해, test 데이터셋에 편향되도록 모델을 튜닝하게 될 것이다. 그러나 중요한 것은 test 데이터셋에 대한 정확도를 높이는 것 뿐만아니라, 모델의 일반적인 정확도를 높이는 것이다. 어떤 데이터가 들어와도 일정하게 높은 정확도를 보여주는 모델이 좋은 모델이라 할 수 있으므로, validation 데이터셋과 test 데이터셋을 분리하여 검증하는 과정을 통해, 모델을 일반화시켜야 한다.

**References**
- [딥러닝기초 Optimization - Sally](https://bsm8734.github.io/posts/bc-d012-1-dlbasic-optimization/)
- [교차검증(CV, Cross Validation)이란? - unhochoi](https://wooono.tistory.com/105)
