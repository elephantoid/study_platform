---
id: boost-dl-026
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

Test 세트가 오염되었다는 말의 뜻은?

## 해설

test 데이터는 한 번도 학습에서 본 적 없는 데이터여야 한다. 그런데 train 데이터가 test 데이터와 흡사하거나 포함되기까지한다면 test 데이터는 더이상 학습된 모델의 성능 평가를 객관적으로 하지 못한다.

이렇듯 test 데이터가 train 데이터와 유사하거나 포함된 경우에 test 세트가 오염되었다고 말한다.

**References**
- [7. Data Leakage - 분리수거장](https://m.blog.naver.com/hongjg3229/221811766581)
