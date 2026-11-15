---
id: boost-py-066
topicId: python
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
- ds
reviewTarget:
  noteId: boost-py-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

Is python numpy better than lists?

## 해설

파이썬의 리스트는 각 원소들의 값을 직접 사용하지 않고 원소들의 주소를 참조하는 방식을 사용하기 때문에 원소들의 타입이 정해지지 않아 편리하지만 메모리를 많이 사용하고 느리다는 단점이 있다.

반면, 넘파이는 C 기반으로 구현되어 원소들의 타입을 미리 설정하여 메모리를 적게 사용하고 빠르다. 또한 행렬과 선형대수에 편리한 함수들을 제공한다는 장점도 있다.
