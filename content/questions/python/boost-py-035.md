---
id: boost-py-035
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

Whenever Python exits, why isn’t all the memory de-allocated?

## 해설

다른 객체나 전역 네임스페이스에서 참조되는 객체를 순환 참조하는 파이썬 모듈은 항상 해제되지는 않는다. 또한 C 라이브러리가 예약한 메모리의 해당 부분을 해제하는 것은 불가능하다. 그러므로 파이썬 종료 시, 모든 메모리가 해제되지는 않는다.

> **💡 순환 참조(Circular Reference)**  
> 두 객체가 서로 참조하는 경우를 말한다.

> **💡 전역 네임스페이스(Global Namespace)**  
> 네임스페이스(namespace)란 프로그래밍 언어에서 특정 객체를 이름에 따라 구분할 수 있는 범위를 의미한다. 전역 네임스페이스는 import한 모듈들의 이름을 포함하며, 스크립트가 끝날 때까지 지속된다.

**References**
- [Releasing memory in Python - Net-informations.com](http://net-informations.com/python/iq/memory.htm)
- [Whenever you exit Python, is all memory de-allocated? - BYTES](https://bytes.com/topic/python/answers/972248-whenever-you-exit-python-all-memory-de-allocated)
- [Circular References in Python - hearsaysocial](http://engineering.hearsaysocial.com/2013/06/16/circular-references-in-python/)
- [[Python] 네임스페이스 개념 정리 - Hyungcheol Noh's Blog](https://hcnoh.github.io/2019-01-30-python-namespace)
- [네임스페이스 - 제대로 파이썬](https://wikidocs.net/23109)
