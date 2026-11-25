---
id: boost-dl-046
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

학습시 필요한 GPU 메모리는 어떻게 계산하는가?

## 해설

Pytorch를 기준으로 볼 때 `something.to('cuda')`로 변환하는 모든 것들을 생각해보면 된다. 보통 GPU로 올리는 것은 모델과 데이터셋이므로, <strong>(모델의 크기 + 데이터의 크기 × 배치 크기)</strong>로 학습시 필요한 메모리 크기를 계산할 수 있다.
