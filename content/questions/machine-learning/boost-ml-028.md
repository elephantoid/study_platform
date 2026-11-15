---
id: boost-ml-028
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

스팸 필터에 Logistic Regression을 많이 사용하는 이유는 무엇일까요?

## 해설

스팸 필터는 메일이 스팸 메일인지 아닌지에 대한 확률을 계산하여, 메일을 **분류(Classification)** 하는 문제이다. 로지스틱 회귀는 회귀를 바탕으로 데이터가 어떤 범주에 속할 확률을 0과 1 사이의 값으로 예측하고 그 확률에 따라 가능성이 더 높은 범주에 속하는 것으로 분류(Classification)해주는 지도 학습 알고리즘이다. 특히 **입력값이 아무리 크거나 작아도 0에서 1 사이의 값으로 맵핑**시킨다는 점에서 분류문제에 적합하다. 따라서 로지스틱 회귀가 스팸필터에 많이 사용된다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/linear-and-logistic-regression.png)

> **분류문제에서 로지스틱 회귀가 적절한 이유**

로지스틱 회귀는 **시그모이드 함수(sigmoid function)** 를 통해 선형함수를 0과 1 사이의 함수로 바꾼 것이며, S자 형태를 보인다.
시그모이드 함수의 정의는 아래와 같다.

$$
S(x) = \frac{1}{1 + e^{-x}} = \frac{e^x}{e^x+1}
$$

로지스틱 회귀의 가설함수는 다음과 같다.

$$
H(X) = \frac{1}{1 + e^{-(Wx+b)}} = sigmoid(Wx+b) = \sigma (Wx+b)
$$

x값이 아무리 +, -로 작아지거나 커져도 항상 0과 1 사이의 값을 반환한다. 확률은 **0에서 1사이의 범위 내에 들어와야하므로** 이러한 형태가 적합하다.

이렇게 H(x)의 값이 0과 1사이로 나오면, 위의 Hypothesis 함수로 regression을 한 결과값이 threshold(ex.0.5) 이상인 경우엔 1로 분류하고, threshold 보다 작으면 0으로 분류하면 되기 떄문이다.

> **분류문제에서 선형회귀가 적합하지 않은 이유**

`그림1`과 같이 주어진 데이터를 표현하는 그래프를 그려, 적절한 지점을 기준으로 두 그룹으로 분류할 수 있다.

이때 `그림2`의 `new` 데이터가 새로 들어왔다고 해보자. 그래프는 새로운 데이터 `new`의 영향을 받아, 아래로 기울어진 형태로 업데이트되어, `그림3`의 붉은색 그래프 형태가 된다.
이렇게 되면, 원래는 1로 잘 분류되던 것들의 예측값이 기존 threshold 아래로 내려가게되어, 0으로 분류되어버리는 문제가 발생한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/classification-and-linear-regression.png)

선형회귀 함수는 어떤 입력값이 들어오느냐에 따라 **0과 1 사이의 범위를 벗어나기도** 한다.

또한, `H(x) = 100x`라는 가설함수(Hypothesis function)이 있다고 하자. x가 0.01 이상인 경우는 모두 1로 x가 0 이하인 경우는 모두 0으로 분류하게 된다. 이처럼 **x값에 너무 민감하게 반응**하는 모델이 만들어질 수 있다. 연산상으로는 매우 작은 값만 바뀌어도 아예 분류자체가 바뀌어버린다.

더 나아가, 선형모델은 확률이 아닌, 점들의 보간(interpolate)만으로 이루어지므로 확률로 해석할 수 없다. 예측값이 확률이 아니기 때문에 한 클래스와 다른 **클래스를 구분할 수 있는 의미 있는 임계값이 없다.** 또한 다중 클래스를 가지는 분류문제로 확장할 수 없다는 문제점도 있다. 이러한 문제점들 때문에, 분류문제에서 선형 회귀 모델은 적합하지 못하다.

**References**
- [4.2 Logistic Regression - TooTouch](https://tootouch.github.io/IML/logistic_regression/)
- [5)로지스틱회귀 - 딥러닝을 이용한 자연어 처리 입문](https://wikidocs.net/22881)
- [모두를 위한 딥러닝(sung kim)lec5-Logistic Classification - cdjs의 코딩 공부방](https://cding.tistory.com/55)
