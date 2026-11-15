---
id: boost-ml-024
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

앙상블 방법엔 어떤 것들이 있나요?

## 해설

![앙상블 기법](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/ensemble.png)

**앙상블(Ensemble)** 은 여러개의 모델을 조합해서 그 결과를 뽑아 내는 방법이다. "정확도가 높은 강한 모델을 하나 사용하는 것보다, 정확도가 낮은 약한 모델을 여러개 조합 하는 방식의 정확도가 높다"는 개념에서 비롯한 방법이다. `Bagging`, `Boosting`, `Stacking` 등의 방법이 있다.

**배깅(Bagging, Bootstrap Aggregation)** 이란 샘플을 여러번 뽑아(Bootstrap = 복원 랜덤 샘플링) 각 모델을 학습시켜 결과물을 집계(Aggregation)하는 방법이다. 카테고리 데이터는 투표 방식(Voting)으로 결과를 집계하며, 연속형 데이터는 평균으로 집계한다. Bagging을 사용한 대표적인 기법에는 `Random Forest` 방법이 있다. 학습 데이터가 충분하지 않더라도 충분한 학습효과를 주어 높은 bias의 underfitting 문제나, 높은 variance로 인한 overfitting 문제를 해결하는데 도움을 준다.

**부스팅(Boosting)** 이란 이전 모델의 오답에 가중치를 높게 부여하여 다음 모델을 학습하는 방법이다. 오답을 정답으로 맞추기 위해 오답에 더 집중하여 학습시키기 떄문에 일반적으로 배깅에 비해 정확도가 높다. 그러나 틀렸던 부분에 대해 반복적으로 학습하므로 오버피팅의 문제가 있으며, outlier에 취약하고, 속도가 느리다는 단점도 가지고 있다. `GBM(Gradient Boosting)` 방법이 대표적이고, `XGBoost, AdaBoost, GradientBoost` 등의 알고리즘이 존재한다.

**스태킹(Stacking)** 이란 여러 개별 모델이 예측한 결과값을 다시 학습 데이터셋으로 사용해서 모델을 만드는 방법이다. 그러나 위의 그림과 같은 기본적인 스태킹 방법은 `같은 데이터셋을 통해 예측한 결과를 기반으로 다시 학습`하므로 `오버피팅` 문제점이 있다. 따라서 스태킹에 Cross Validation 방식을 도입하여 이 문제를 해결할 수 있다. 데이터를 쪼개고 이들 중 일부만을 가지고 학습한 모델을 여러개 만들어, 그 결과들을 `메타 학습 데이터셋(meta train dataset)` 으로 사용하여 다시 학습하는 것이다. 이 방법은 많은 개별 모델의 결과를 결합하여 예측 성능을 높일 수 있다는 장점이 있다.

> **💡 배깅 vs 부스팅**  
> **배깅**은 랜덤 복원추출(부트스트랩)을 여러번 반복하여 모델을 **병렬적**으로 여러개 학습을 시킨 다음, 평균을 내는 방식이다. 반면, **부스팅**은 모든 데이터를 학습에 사용하되, 오답에 더 큰 가중치를 두어 다음 회차를 학습시키는 **순차적**인 방법이다.

**References**
- [머신러닝-11.앙상블학습: 배깅과 부스팅 - BaekKyunShin](https://bkshin.tistory.com/entry/%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D-11-%EC%95%99%EC%83%81%EB%B8%94-%ED%95%99%EC%8A%B5-Ensemble-Learning-%EB%B0%B0%EA%B9%85Bagging%EA%B3%BC-%EB%B6%80%EC%8A%A4%ED%8C%85Boosting)
- [1.앙상블 기법과 배깅, 부스팅, 스태킹 - 데이터 맛집](https://data-matzip.tistory.com/entry/%EC%95%99%EC%83%81%EB%B8%94-%EA%B8%B0%EB%B2%95-%EC%A0%95%EB%A6%AC-1-%EC%95%99%EC%83%81%EB%B8%94Ensemble-%EA%B8%B0%EB%B2%95%EA%B3%BC-%EB%B0%B0%EA%B9%85Bagging-%EB%B6%80%EC%8A%A4%ED%8C%85Boosting-%EC%8A%A4%ED%85%8C%EC%9D%B4%ED%82%B9Stacking)
