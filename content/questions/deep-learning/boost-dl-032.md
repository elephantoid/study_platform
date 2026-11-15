---
id: boost-dl-032
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

SGD, RMSprop, Adam에 대해서 아는대로 설명한다면?

## 해설

> **SGD**

Loss Function을 계산할 때 전체 train set을 사용하는 것을 Batch Gradient Descent 라고 한다. 그러나 이렇게 계산을 할 경우 한번 step을 내딛을 때 전체 데이터에 대해 Loss Function을 계산해야 하므로 너무 많은 계산량이 필요하다.

이를 방지하기 위해 보통은 Stochastic Gradient Descent(SGD)라는 방법을 사용한다. 이 방법에서는 loss function을 계산할 때 전체 데이터(batch) 대신 데이터 한 개 또는 일부 조그마한 데이터의 모음(mini-batch)에 대해서만 loss function을 계산한다.

**데이터 한 개**를 사용하는 경우를 <strong>Stochastic Gradient Descent(SGD)</strong>, <strong>데이터의 일부(mini-batch)</strong>를 사용하는 경우를 <strong>mini-batch Stochastic Gradient Descent(mini-batch SGD)</strong>라고 하지만 **오늘날의 딥러닝에서 일반적으로 통용되는 SGD는 mini-batch SGD이다.**

이 방법은 batch gradient descent 보다 다소 부정확할 수는 있지만, 훨씬 계산 속도가 빠르기 때문에 같은 시간에 더 많은 step을 갈 수 있으며 여러 번 반복할 경우 보통 batch의 결과와 유사한 결과로 수렴한다.

또한, SGD를 사용할 경우 Batch Gradient Descent에서 빠질 local minima에 빠지지 않고 더 좋은 방향으로 수렴할 가능성도 있다.

> **RMSprop**

RMSProp은 딥러닝의 대가 제프리 힌톤이 제안한 방법으로서, Adagrad의 단점을 해결하기 위한 방법이다.

Adagrad의 식에서 gradient의 제곱값을 더해나가면서 구한 $G_t$부분을 합이 아니라 지수평균으로 바꾸어서 대체한 방법이다.

이렇게 대체를 할 경우 Adagrad처럼 $G_t$가 무한정 커지지는 않으면서 최근 변화량의 변수간 상대적인 크기 차이는 유지할 수 있다.

식으로 나타내면 다음과 같다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/rmsprop.png)

> **Adam**

Adam(Adaptive Moment Estimation)은 RMSProp과 Momentum 방식을 합친 것 같은 알고리즘이다.

이 방식에서는 Momentum 방식과 유사하게 지금까지 계산해온 기울기의 지수평균을 저장하며, RMSProp과 유사하게 기울기의 제곱값의 지수평균을 저장한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/adam.png)

다만, Adam에서는 m과 v가 처음에 0으로 초기화되어 있기 때문에 학습의 초반부에서는 $m_t, v_t$가 0에 가깝게 bias 되어있을 것이라고 판단하여 이를 unbiased 하게 만들어주는 작업을 거친다.

$m_t, v_t$의 식을 ∑ 형태로 펼친 후 양변에 expectation을 씌워서 정리해보면, 다음과 같은 보정을 통해 unbiased 된 expectation을 얻을 수 있다.

이 보정된 expectation들을 가지고 gradient가 들어갈 자리에 $\widehat{m_t}, G_t$가 들어갈 자리에 $\widehat{v_t}$를 넣어 계산을 진행한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/adam-conclusion.png)

**References**
- [Gradient Descent Optimization Algorithms 정리 - Beomsu Kim's Blog](http://shuuki4.github.io/deep%20learning/2016/05/20/Gradient-Descent-Algorithm-Overview.html)
- [딥러닝 Optimization 함수 정리 - rueki](https://rueki.tistory.com/187)
