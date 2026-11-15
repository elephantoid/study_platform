---
id: boost-dl-034
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

미니배치를 작게 할때의 장단점은?

## 해설

> **장점**

- 한 iteration의 계산량이 적어지기 때문에 step 당 속도가 빨라진다.
- 적은 Graphic Ram으로도 학습이 가능하다.

> **단점**

- 데이터 전체의 경향을 반영하기 힘들다. 업데이트를 항상 좋은 방향으로 하지만은 않는다.

(batch size에 관련된 논문은 [Batch Size in Deep Learning - hyeonseob](https://blog.lunit.io/2018/08/03/batch-size-in-deep-learning/) 참고)

**References**
- [[호기심] mini-batch는 왜 사용하는가? - 담백한오늘](https://dambaekday.tistory.com/1)
