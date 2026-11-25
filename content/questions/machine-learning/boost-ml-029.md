---
id: boost-ml-029
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

OLS(ordinary least square) Regression의 공식은 무엇인가요?

## 해설

**최소자승법(OLS, Ordinary Least Squares)** 이란, 산점도를 통해 데이터의 분포 그래프를 그릴때, 이 데이터들의 경향을 알기 위한 최적의 추세선을 그리기 위한 방법 중 하나이다. OLS는 근사적으로 구하려는 해와 실제 해의 오차의 제곱의 합이 최소가 되는 해를 구하는 방법이다.

OLS Regression은 회귀를 통해서 방정식의 상수 값들을 추정하는 데에 사용된다. n개의 입력값과 그에 대응하는 출력값 $(x_i, y_i)(1\leq i\leq n)$이 있고, 이 계의 방정식이 변수 $x$와 $\beta=(\beta_0, \beta_1, \cdots , \beta_k )$인 상수 $\beta$에 대한 식 $f(x, \beta)$으로 주어질 때, $\sum_i(y_i - f(x_i, \beta))^{2}$ 의 값을 최소로 만드는 $\beta$를 구하는 것이 문제의 목표이다.

추정하고자 하는 파라미터 β에 대한 표현식을 다음과 같이 구할 수 있다.

$$
{\hat {\beta}}=(\mathbf {X}^{\rm {T}}\mathbf {X})^{-1}\mathbf {X}^{\rm {T}}\mathbf {y} = {\big (} ~ {\textstyle \sum }\mathbf x_i \mathbf x_i^{\rm {T}}\,{\big )}^{-1}{\big (} ~ {\textstyle \sum }\mathbf x_i y_i ~ {\big)}
$$

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/ols.png)

예를들어, 7개 데이터의 경향을 나타내는 추세선을 `그림2`와 같이 그렸다고 하자.
이때 실제 데이터의 y값(실제값)과 추세선의 y값(예측값)의 차를 **잔차(Residual)** 라고 한다. (아래 그래프에서 잔차는 점선으로 표시)
최소자승법은 이 **잔차의 제곱의 합(RSS, Residual Sum of Squares)을 최소로 하는 (가중치 벡터를 구하는) 방법**이다.
잔차 제곱의 합은 `그림3`의 `TOTAL AREA`에 해당하는 넓이와 같다.

잔차 제곱의 합을 구하는 식은 아래와 같다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/rss.png)

파란색 추세선보다 보라색 추세선의 잔차제곱의 합이 더 작다. 따라서 파란색 추세선보다 보라색 추세선이 위 7개의 데이터를 더 잘 표현해주는 추세선임을 알 수 있다.
이렇게 잔차 제곱의 합을 최소로 하는 방법이 최소자승법이며, 최소자승법을 활용하여 데이터를 가장 잘 표현하는 선형 회귀선을 그릴 수 있다.

> **💡 OLS vs. MSE**
>
> - OLS(Ordinary Least Square): 선형 회귀 모델을 만들기 위한 선횡 최소 제곱법, 모델을 만들때 사용한다.
> - MSE(Mean Square Error): 모델 성능 평가 지표, 모델을 평가할 때 사용한다.

**References**
- [DATA-17.최소자승법(OLS)을 활용한 단순 선형 회귀 - 귀퉁이 서재](https://bkshin.tistory.com/entry/DATA-17-Regression)
- [선형회귀 - 위키백과](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%98%95_%ED%9A%8C%EA%B7%80#Ordinary_least_squares)
- [최소제곱법 - 위키백과](https://ko.wikipedia.org/wiki/%EC%B5%9C%EC%86%8C%EC%A0%9C%EA%B3%B1%EB%B2%95)
- [데이터분석 9.회귀모형 - 집밖은 위험해 OTL](https://throwexception.tistory.com/943)
