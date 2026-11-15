---
id: boost-dl-004
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

Data Normalization은 무엇이고 왜 필요한가요?

## 해설

**Data Normalization(데이터 정규화)이란** feature들의 분포(scale)을 조절하여 균일하게 만드는 방법이다. 데이터 정규화가 필요한 이유는 데이터 feature 간 scale 차이가 심하게 날 때, 큰 범위를 가지는 feature(ex. 가격)가 작은 범위를 가지는 feature(ex. 나이)보다 더 강하게 모델에 반영될 수 있기 때문이다.

즉, 데이터 정규화는 모든 데이터 포인트가 동일한 정도의 스케일(중요도)로 반영되도록 하는 역할을 수행하며, 아래와 같은 장점을 얻을 수 있다.

- 학습속도가 개선된다.
- 노이즈가 작아지므로 오버피팅을 억제시킨다.
- 데이터를 덜 치우치게 만드므로, 좋은 성능을 보인다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/data-normalization.png)

> **Regularization, Normalization, Standardization**

**Regularization(정규화, 규제)** 란 모델에 제약(penalty)를 주어 모델의 복잡성을 낮추고, 이를 통해 오버피팅을 방지하는 방법이다. 제약을 사용하면 학습 정확도(train accuracy)는 조금 낮아질 수 있지만, 테스트 정확도(test accuracy)를 높일 수 있다. 정규화에는 `Drop out, Early Stopping, Weight decay(Parameter Norm Penalty)`와 같은 방법이 존재한다.

(자세한 Regularization 방법은 [reference](https://bsm8734.github.io/posts/bc-d012-3-dlbasic-optimization-regularization/) 참고)

**Normalization, Standardization**은 모두 데이터의 범위(scale)을 축소하는 방법이다.(re-scaling) 데이터의 범위 재조정이 필요한 이유는 `데이터의 범위가 너무 넓은 곳에 퍼져있을 때(scale이 크다면), 데이터셋이 outlier를 지나치게 반영`하여 오버피팅이 될 가능성이 높기 때문이다. 두 방법은 scale 조절 방식에 차이가 존재한다.

**Normalization(정규화)** 방법에는 Batch Normalization, Min-Max Normalization 등이 있다.

- `Batch Normalization`: 적용시키려는 레이어의 통계량, 분포를 정규화시키는 방법이다.
- `Min-Max Normalization`: 모든 데이터 중에서 가장 작은 값을 0, 가장 큰 값을 1로 두고, 나머지 값들은 비율을 맞춰서 모두 0과 1 사이의 값으로 스케일링하는 방법이다. 모든 feature들의 스케일이 동일하지만, 이상치(outlier)를 잘 처리하지 못한다. 식은 아래와 같다.

$$
x= {{x - x_{min}} \over {x_{max} - x_{min}}}
$$

**Standardization(표준화)** 란 표준화 확률변수를 구하는 방법이다. 이는 `z-score를 구하는 방법`을 의미한다. z-score normalization이라 불리기도 한다.

- `Z-score`: 관측값이 평균 기준으로 얼마나 떨어져있는지 나타낼 때 사용한다. 각 데이터에서 데이터 전체의 평균을 빼고, 이를 표준편차로 나누는 방식이다. 이상치(outlier)를 잘 처리하지만, 정확히 동일한 척도로 정규화 된 데이터를 생성하지는 않는다. 식은 아래와 같다.

$$
z-score = {{x-{\mu}} \over {\sigma}}
$$

**References**
- [딥러닝 기초 Optimization_Regularization - Sally blog](https://bsm8734.github.io/posts/bc-d012-3-dlbasic-optimization-regularization/)
- [머신 러닝\_Normalization, Standardization, Regularization 비교 - 프로그래밍 학습 블로그](https://m.blog.naver.com/qbxlvnf11/221476122182)
- [정규화(Normalization) 쉽게 이해하기 - 아무튼 워라벨](http://hleecaster.com/ml-normalization-concept/)
- [정규화(Normalization)의 목적과 방법들 - Deep Learning with Writing](https://mole-starseeker.tistory.com/31)
- [데이터 일반화 vs 표준화 (Normalization and Standardization of Data) - 컴퓨터와 수학, 몽상 조금](https://skyil.tistory.com/50)
