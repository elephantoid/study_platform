---
id: boost-ml-003
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

Local Minima와 Global Minimum에 대해 설명해주세요.

## 해설

![Maxima와 Minima](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/local-minima-global-minima.png)

비용 함수(cost function)에서의 **Global Minimum**은 에러가 최소화되는 즉, 우리가 찾고자 하는 지점을 말하며, **Local Minima**는 에러가 최소가 될 수 있는 후보가 되는 지점 중 Global Minimum을 뺀 지점을 말한다. Local Minima는 자칫 에러가 **최소화되는 지점을 찾았다고 착각**할 수 있기에 함정에 비유할 수 있다. 이를 해결하기 위해 Momentum과 같은 최적화 알고리즘을 사용하거나 학습률(learning rate)를 잘 조절하여 Local Minima에서 벗어날 수 있다.

**References**
- [Local Minima 문제에 대한 새로운 시각 - 다크 프로그래머](https://darkpgmr.tistory.com/148)
- [Minima - Hong's](https://jihongl.github.io/2017/09/18/minima/)
