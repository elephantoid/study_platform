---
id: boost-ml-023
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

XGBoost을 아시나요? 왜 이 모델이 캐글에서 유명할까요?

## 해설

**XGBoost(eXtreme Gradient Boosting)** 이란, 트리 기반의 앙상블 학습에서 가장 각광받고 있는 알고리즘 중 하나이다. Kaggle 경연대회에서 상위를 차지한 많은 과학자들이 XGBoost를 이용하면서 널리 알려졌다. GBM에 기반하고 있지만, GBM의 단점인 느린 수행시간 및 과적합 규제(Regularization) 부재 등의 문제를 해결해서 각광받고 있다.

XGBoost의 장점은 다음과 같다.

- 분류와 회귀영역에서 **뛰어난 예측 성능**을 발휘한다.
- XGBoost는 병렬처리를 사용하여, GBM 대비 **빠른 수행시간**을 보인다.
- **Regularization, Early Stopping** 기능을 통해 오버피팅을 방지할 수 있다.
- Tree Pruning(가지치기) 제공한다. 미리 정해둔 max_depth까지만 split하고 pruning을 하고, 거꾸로 올라가면서 positive gain이 없는 노드를 삭제한다.
- 자체적으로 결측치를 처리해준다.
- 매 iteration마다 교차검증을 수행한다.

**GBM(Gradient Boosting Algorithm)** 이란 회귀분석 또는 분류 분석을 수행할 수 있는 **예측모형**이며 예측모형의 **앙상블 방법론** 중 **부스팅** 계열에 속하는 알고리즘이다. LightGBM, CatBoost, XGBoost는 모두 GBM을 기반으로 만들어졌다. (자세한 내용은 [Gradient Boosting Algorithm의 직관적인 이해 - DeepPlay](https://3months.tistory.com/368) 참고)

> **💡 boosting 이라는 테크닉 자체가 sequential 한데 어떻게 병렬처리를 할까?**  
> 세가지 가능성이 제기된다. 나뉜 분기마다 각각 병렬처리하거나, 분기가 나뉘는 지점 계산을 병렬처리 하거나, 처음부터 feature별 정렬을 통해 병렬처리를 할 수 있다. (자세한 내용은 [XGBoost의 병렬처리가 어떻게 가능할까? - GoLab](http://machinelearningkorea.com/2019/07/25/xgboost-%EC%9D%98-%EB%B3%91%EB%A0%AC%EC%B2%98%EB%A6%AC%EA%B0%80-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B0%80%EB%8A%A5%ED%95%A0%EA%B9%8C/) 참고)

**References**
- [머신러닝 알고리즘-XGBoost - RosyPark](https://rosypark.tistory.com/59)
- [Gradient Boosting Algorithm의 직관적인 이해 - DeepPlay](https://3months.tistory.com/368)
