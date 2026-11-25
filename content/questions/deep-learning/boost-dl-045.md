---
id: boost-dl-045
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

GPU를 두개 다 쓰고 싶다. 방법은?

## 해설

Pytorch의 경우 `torch.nn.DataParallel`을 사용하여 여러 개의 GPU를 사용할 수 있다.

- `torch.device`를 **cuda**로 설정한다.
- `nn.DataParallel`을 사용하여 모델을 감싼다.
- 모델을 `model.to(device)`를 사용하여 GPU로 보낸다.

**References**
- [OPTIONAL: DATA PARALLELISM - Pytorch Tutorials](https://pytorch.org/tutorials/beginner/blitz/data_parallel_tutorial.html)
