---
id: boost-dl-019
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

GD 중에 때때로 Loss가 증가하는 이유는?

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/cost-gradient-optima.jpeg)

minima에 들어갔다가 나오는 경우일 것이다. 실제로 사용되는 GD에서는 local minima 문제를 피하기 위해 Momentum 등의 개념을 도입한 RMSprop, Adam 등의 optimization 전략을 사용한다.

각 optimization 전략에 따라 gradient가 양수인 방향으로도 parameter update step을 가져가는 경우가 생길 수 있으며, 이 경우에는 Loss가 일시적으로 증가할 수 있다.

(자세한 내용은 [#17. SGD, RMSprop, Adam에 대해서 아는대로 설명한다면?](#17) 참고)

**References**
- [Interview Question & Answer 출근 루틴, 하루 3문제 - YongWook](https://yongwookha.github.io/MachineLearning/2021-01-29-interview-question)
