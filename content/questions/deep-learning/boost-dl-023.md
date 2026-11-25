---
id: boost-dl-023
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

찾은 해가 Global Minimum인지 아닌지 알 수 있는 방법은?

## 해설

Gradient Descent 방식에서 local minima에 도달함은 증명되어있으나, global minima에 도달하는 것은 보장되지 않았다. 또한, 현재 지점이 global minima인지도 알 수 없다. 딥러닝에서 다루는 문제가 convexity를 만족하지 않기 때문이다. 대신, local minima를 찾는다면, 그 지점이 곧 global minima일 가능성이 크다. [Local Minima 문제에도 불구하고 딥러닝이 잘 되는 이유는?](#14)에서 언급했듯, saddle point가 아닌 완전한 local minimum이 발생하는 경우는 희귀하다. 따라서 모든 방향에서 아래로 볼록인 local minima를 발견한다면, 그 지점이 바로 global minima일 가능성이 높다.

**References**
- [Local Minima 문제에 대한 새로운 시각 - 다크 프로그래머](https://darkpgmr.tistory.com/148)
- [0021 Gradient Descent & Momentum - Deepest Documentation](https://deepestdocs.readthedocs.io/en/latest/002_deep_learning_part_1/0021/)
