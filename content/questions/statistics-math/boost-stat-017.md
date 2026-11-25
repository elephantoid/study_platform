---
id: boost-stat-017
topicId: statistics-math
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-stat-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

베이지안과 프리퀀티스트 간의 입장차이를 설명해주실 수 있나요?

## 해설

베이지안은 사건의 확률을 바라볼 때, 사전 확률을 미리 염두해두고 사건의 발생에 따라 베이즈 정리로 사후 확률을 구해 다시 사전 확률을 업데이트시킨다. 즉, 베이지안은 **과거의 사건이 현재 사건에 영향을 끼친다는 입장**을 가지고 있다.

반면, 프리퀀티스트는 확률을 무한번 실험한 결과, 객관적으로 발생하는 현상의 빈도수로 바라본다. 즉, 프리퀀티스트는 **현재의 객관적인 확률에 의해서만 사건이 발생한다는 입장**을 가지고 있다.

**References**
- [베이지안(Bayesian)과 프리퀀티스트(Frequentist) 간의 입장 차이 - 내가 보려고 만든 공간](https://astralworld58.tistory.com/81)
