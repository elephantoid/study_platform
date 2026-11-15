---
id: boost-ml-008
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

Markov Chain을 고등학생에게 설명하려면 어떤 방식이 제일 좋을까요?

## 해설

> **마코프 체인(Markov Chain)**

마코프 체인이란 <strong>마코프 성질을 지닌 이산 확률 과정(Discrete-time Stochastic Process)</strong>을 말한다.

> **마코프 성질(Markov Property)**

$n+1$회의 상태(state)는 오직 $n$회에서의 상태, 혹은 그 이전 일정 기간의 상태에만 영향을 받는 것을 의미한다. 예를 들면 동전 던지기는 독립 시행이기 때문에 $n$번째의 상태가 앞이던지 뒤이던지 간에 $n+1$번째 상태에 영향을 주지 않는다. 하지만 1차 마코프 체인은 $n$번째 상태가 $n+1$번째 상태를 결정하는데에 영향을 미친다. (시간 $t$에서의 관측은 단지 최근 $r$개의 관측에만 의존한다는 가정을 하고 그 가정하에서 성립한다.)

![마코프 체인](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/markov-chain.png)

정리하면 마코프 체인은 **확률변수(random variable)가 어떤 상태(state)에 도달할 확률이 오직 바로 이전 시점의 상태(state)에 달려 있는 경우**를 가리킨다.

예를 들어, 오늘의 날씨가 어제의 날씨에만 의존하면 1차 마코프 체인, 이틀 전까지의 날씨에만 의존하면 2차 마코프 체인이다.

> **마코프 모델(Markov Model)**

마코프 **모델은 위의 가정하에 확률적 모델을 만든 것으로써 가장 먼저 각 상태를 정의**하게 된다. 상태(state)는 $V = v_1, ... , v_m$로 정의하고, m개의 상태가 존재하게 되는 것이다. 그 다음은 <strong>상태 전이 확률(State transition Probability)</strong>을 정의할 수 있다. 상태 전이 확률이란 각 상태에서 각 상태로 이동할 확률을 말한다. 상태 전이 확률 $a_{ij}$는 상태 $v_i$에서 상태 $v_j$로 이동할 확률을 의미한다. 아래의 식은 상태 전이 확률을 식으로 나타낸 것과 그 아래는 확률의 기본 정의에 의한 상태 전이 확률의 조건이다.

![상태 전이 확률](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/state-transition-probability.png)

그리고 상태와 상태 전이 확률을 정리하여 <strong>상태 전이도(state transition diagram)</strong>으로도 표현할 수 있다.

![상태 전이도](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/state-transition-diagram.png)

**References**
- [Markov Chain - MLWiki](https://sites.google.com/site/machlearnwiki/RBM/markov-chain)
- [[기술면접] Markov Chain, Gibbs Sampling, 마르코프 체인, 깁스 샘플링 (day2 / 201010) - huidea](https://huidea.tistory.com/128?category=879541)
- [(Bayes 학습)(4)마르코프 연쇄-(1) - 정보사회학연구소](http://piramvill2.org/?p=905)
