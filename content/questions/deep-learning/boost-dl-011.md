---
id: boost-dl-011
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

뉴럴넷의 가장 큰 단점은 무엇인가? 이를 위해 나온 One-Shot Learning은 무엇인가?

## 해설

사람은 처음 보는 물건 (새 레이블) 에 대해 조금만 봐도 다른 것과 이 물건을 구분해낼 수 있다. 하지만 뉴럴넷은 이 물건을 구분해내기 위해서는 이 물건에 대한 많은 데이터를 학습해야한다.

**One-shot Learning** 은 뉴럴넷도 새로운 레이블을 지닌 데이터가 적을 때 (one-shot 에서는 한 개) 에도 모델이 좋은 성능을 내도록 사용되는 방법이다.

이를 위해서는 기존에 다른 레이블의 많은 데이터를 학습하여 데이터의 특성을 잘 이해하는 **pretrained** 모델이 필요하다.

학습된 모델에 새로운 레이블의 데이터 하나 던져 주면 모델은 데이터의 특성에 대한 이해를 바탕으로 이 레이블에 대해서도 이해를 하게 된다.

**References**
- [One-shot learning (siamese network) - sji](https://aimaster.tistory.com/48)
- [One shot learning, Siamese Network 이해 - Deep Play](https://3months.tistory.com/507)
