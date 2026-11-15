---
id: boost-dl-043
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

학습은 BCE loss로 하되 상황을 MSE loss로 보고 싶다면?

## 해설

train 과정에서 criterion 은 BinaryCrossEntropy 를 사용하고, valid 데이터를 이용한 valid loss 를 구하는 과정에서는 MeanSquaredLoss 를 사용한다.
