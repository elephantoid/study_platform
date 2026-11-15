---
id: boost-dl-030
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

BN 적용해서 학습 이후 실제 사용시에 주의할 점은? 코드로는?

## 해설

학습 과정에서는 미니 배치의 평균과 분산을 계산하여 배치 정규화를 적용하지만, 추론 시에는 학습 데이터 전체에 대한 평균과 분산을 계산하여 적용을 해야 한다. 왜냐하면 사용자가 설정한 배치의 크기에 따라 추론 결과가 변할 수도 있기 때문이다.

**References**
- [Batch Normalization (ICML 2015) - SanghyukChun's Blog](http://sanghyukchun.github.io/88/)
