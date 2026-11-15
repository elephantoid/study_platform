---
id: boost-dl-024
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

Training 세트와 Test 세트를 분리하는 이유는?

## 해설

모델은 데이터에 대해 예측값을 만들고 정답과 비교하며 업데이트되면서 학습이 된다. 그런데 학습 데이터에 대해서는 좋은 성능을 낸다 하더라도 본 적 없는 데이터에 대해서는 잘 대응하지 못하는 **오버피팅** 문제가 생긴다면 좋은 모델이 아니다.

이를 막기 위해 학습된 모델이 처음 보는 데이터에도 강건하게 성능을 내는지 판단하기 위한 수단으로 test 세트를 따로 만든다.

**References**
- [test와 validation - ML Basics](https://wikidocs.net/31019)
