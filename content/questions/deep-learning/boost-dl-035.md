---
id: boost-dl-035
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

모멘텀의 수식을 적어 본다면?

## 해설

Momentum 방식은 말 그대로 Gradient Descent를 통해 이동하는 과정에 일종의 `관성`을 주는 것이다.

현재 Gradient를 통해 이동하는 방향과는 별개로, 과거에 이동했던 방식을 기억하면서 그 방향으로 일정 정도를 추가적으로 이동하는 방식이다.

$$
v_t = \gamma v_{t-1} + \eta\nabla_{\theta}J(\theta)
$$

$$
\theta = \theta - v_t
$$

이 때, $v_t$는 time step t에서의 이동 벡터이며, $\gamma$는 얼마나 momentum을 줄 것인지에 대한 momentum term이다.

**References**
- [Gradient Descent Optimization Algorithms 정리 - Beomsu Kim's Blog](http://shuuki4.github.io/deep%20learning/2016/05/20/Gradient-Descent-Algorithm-Overview.html)
