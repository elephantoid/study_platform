---
id: boost-dl-042
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

마지막 레이어 부분에 대해서 설명 한다면?

## 해설

MNIST 분류기는 Convolution 레이어를 깊게 쌓으며 숫자 이미지의 작은 특징부터 큰 특징까지 파악한다.

마지막 레이어, `Fully connected 레이어`는 이미지 데이터의 특징을 취합하여 10개의 숫자 중 적절한 숫자로 분류하는 역할을 한다.

만약 더 많은 레이블에 대해 분류해야 한다면 마지막 레이어의 out dimension 을 그에 맞게 설정하면 된다.
