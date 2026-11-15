---
id: boost-ml-019
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

여러분이 서버를 100대 가지고 있습니다. 이때 인공신경망보다 Random Forest를 써야하는 이유는 뭘까요?

## 해설

**랜덤 포레스트**는 여러 결정 트리를 앙상블하여 하나의 모델로 구성하는 방법이다. 랜덤 포레스트에서는 각 서버를 모델의 특성을 이해하는 단일 결정 트리 (Decision tree) 로 **병렬**적이게 구성할 수 있다.

반면, **인공신경망**은 하나의 서버 자체가 모델의 특성을 모두 이해하는 end-to-end 구조로 **직렬**적이게 구성된다.

따라서 서버가 100대 있을 때는, 이를 병렬적으로 활용할 수 있는 **랜덤 포레스트**를 사용한다.

**References**
- [Random Forest(랜덤 포레스트) 개념 정리 - Codesigner's Dev Story](https://eunsukimme.github.io/ml/2019/11/26/Random-Forest/)
- [의사결정나무 - ratsgo's blog](https://ratsgo.github.io/machine%20learning/2017/03/26/tree/)
- [출근 루틴, 하루 3문제 - Man-About-Town](https://yongwookha.github.io/MachineLearning/2021-01-29-interview-question)
