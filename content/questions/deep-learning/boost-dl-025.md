---
id: boost-dl-025
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

Validation 세트가 따로 있는 이유는?

## 해설

모델을 학습시키고 test 데이터를 통해 모델의 일반화 성능을 파악하고, 다시 모델에 새로운 시도를 하고 test 데이터를 통해 모델의 성능을 파악한다고 생각해보자.

이 경우, 모델은 결국 test 데이터에도 오버피팅이 되어 다시 처음 보는 데이터를 주면 좋은 성능을 보장할 수 없게 된다.

이 문제를 막기 위해 validation 세트를 사용한다. validation 세트를 통해 모델의 성능을 평가하고 하이퍼파라미터 등을 수정하는 것이다.

즉, train 데이터로 모델을 학습시키고 valid 데이터로 학습된 모델의 성능 평가를 하고 더 좋은 방향으로 모델을 수정한다. 그리고 최종적으로 만들어진 모델로 test 데이터를 통해 최종 성능을 평가한다.

**References**
- [test와 validation - ML Basics](https://wikidocs.net/31019)
