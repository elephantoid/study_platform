---
id: boost-net-028
topicId: network
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- agent
reviewTarget:
  noteId: boost-net-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

이더넷(ethernet)이 무엇인가요?

## 해설

이더넷은 근거리 유선 통신을 위해 사용되는 네트워킹 방법으로 [CSMA/CD](https://security-nanglam.tistory.com/193)프로토콜을 사용한다. IEEE 802.3 에 표준으로 정의되었다.

> **장점**

- 적은 용량의 데이터를 보낼 때 성능이 좋다.
- 비용이 적고 관리가 쉽다.
- 구조가 단순하다.

> **단점**

- 캐리어 충돌이 발생할 수 있다.
- 충돌이 발생하면 지연이 생긴다.

CSMA/CD 방법을 간략히 말하자면 버스 구조로 통신을 하는데 캐리어라는 네트워킹 상의 신호를 감지하여 캐리어가 없으면 정보를 보내는 방식이다.

**References**
- [[네트워크] 이더넷(Ethernet) - DevOwen](https://devowen.com/351)
- [[네트워크] 이더넷? \_ Ethernet에 대하여 - 낭람](https://security-nanglam.tistory.com/192)
