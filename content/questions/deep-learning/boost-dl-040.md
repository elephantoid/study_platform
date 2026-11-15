---
id: boost-dl-040
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

간단한 MNIST 분류기를 TF, PyTorch 등으로 작성하는데 몇시간이 필요한가?

## 해설

TF 나 Pytorch 를 몇 번 사용해본 사람이라면 도큐먼트 참고도 하고 적당히 구글링도 하면, MNIST 분류기의 `데이터 다운로드, 데이터셋, 데이터로더, 모델 세팅, 학습, 추론` 를 구현하는데 2시간이 걸리지 않을 것이라 생각한다.

강력한 성능을 내는 모델도 이러한 프레임워크를 사용하면 빠른 시간 내에 구현해낼 수 있음에 감사하고, 추상화가 잘 된 함수들일지라도 안에서는 어떤 동작을 하는지 알고 사용해야한다.
