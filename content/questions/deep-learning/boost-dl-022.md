---
id: boost-dl-022
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

GD(Gradient Descent)가 Local Minima 문제를 피하는 방법은?

## 해설

Local minima 문제를 피하는 방법으로는 **Momentum, Nesterov Accelerated Gradient(NAG), Adagrad, Adadelta, RMSprop, Adam** 등이 있다.

**SGD**는 Stochastic Gradient Descent으로, 하나 혹은 여러개의 데이터를 확인한 후에 어느 방향으로 갈 지 정하는 가장 기초적인 방식이다.

**Momentum**이란 관성을 의미하며, 이전 gradient의 방향성을 담고있는 `momentum` 인자를 통해 흐르던 방향을 어느 정도 유지시켜 local minima에 빠지지 않게 만든다. 즉, 관성을 이용하여, 학습 속도를 더 빠르게 하고, 변곡점을 잘 넘어갈 수 있도록 해주는 역할을 수행한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/momentum.png)

**Nesterov Accelerated Gradient(NAG)** 는 모멘텀과 비슷한 역할을 수행하는 `Look-ahead gradient `인자를 포함하여, $a$ 라는 `accumulate gradient`가 gradient를 감소시키는 역할을 한다. 모멘텀과 다른 점은, 미리 한 스텝을 옮겨가본 후에 어느 방향으로 갈지 정한다는 것이다.

**Adagrad**란 뉴럴넷의 파라미터가 많이 바뀌었는지 적게 바뀌었는지 확인하고, 적게 변한건 더 크게 변하게 하고, 크게 변한건 더 작게 변화시키는 방법이다. Adagrad는 `sum of gradient squares`($G_t$)를 사용하는데, 이는 그래디언트가 얼만큼 변했는지를 제곱해서 더하는 것이므로 계속 커진다는 문제가 발생한다. $G_t$가 계속 커지면 분모가 점점 무한대에 가까워지게 되어, $W$ 업데이트가 되지 않게 되어, 뒤로 갈수록 학습이 점점 안되는 문제점이 발생한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/adagrad.png)

**Adadelta**는 `Exponential Moving Average(EMA)`를 사용하여, Adagrad의 $G_t$가 계속 커지는 현상을 막을 수 있다. EMA는 현재 타임스텝으로부터 `윈도우 사이즈만큼의 파라미터 변화(그래디언트 제곱의 변화)를 반영`하는 역할을 하는데, 이전의 값을 모두 저장하는 것이 아닌, `이전 변화량에 특정 비율을 곱해 더한 인자`를 따로 두는 방식이다. Adadelta는 learning rate가 없다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/adadelta.png)

(**Momentum**의 더 자세한 내용은 [모멘텀의 수식을 적어 본다면?](#17-3) 참고)  
(**SGD, RMSprop, Adam**에 대한 설명은 [SGD, RMSprop, Adam에 대해서 아는대로 설명한다면?](#17) 참고)

**References**
- [딥러닝 기초 Optimization-Gradient Descent Methods - Sally blog](https://bsm8734.github.io/posts/bc-d012-2-dlbasic-optimization-gradient-descent-methods/)
- [NeuralNetwork (3) Optimazation2 - Cornor's Blog](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/<https://wjddyd66.github.io/dl/NeuralNetwork-(3)-Optimazation2/>)
