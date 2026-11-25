---
id: boost-dl-033
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

SGD에서 Stochastic의 의미는?

## 해설

SGD는 Loss Function을 계산할 때 전체 train dataset을 사용하는 Batch Gradient Descent와 다르게 일부 조그마한 데이터의 모음(mini-batch)에 대해서만 loss function을 계산한다.

`Stochastic`은 **mini-batch가 전체 train dataset에서 무작위로 선택된다**는 것을 의미한다.

**References**
- [Gradient Descent Optimization Algorithms 정리 - Beomsu Kim's Blog](http://shuuki4.github.io/deep%20learning/2016/05/20/Gradient-Descent-Algorithm-Overview.html)
