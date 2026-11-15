---
id: boost-net-025
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

data encapsulation이 무엇인가요?

## 해설

data encapsulation 은 데이터를 보내는 송신측에서 데이터를 생성하는 방법으로, 네트워크 계층에서 상위 계층에서부터 하위 계층으로 내려올 때마다 각 계층의 헤더를 붙여 보내는 데이터로 만들어낸다.

반대로 데이터를 받는 수신측에서는 데이터를 받은 후에 계층을 거슬러 올라가면서 헤더를 떼내며 데이터를 파악한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/data-encapsulation.png)

**References**
- [[network] 캡슐화 & 역캡슐화 (encalsulation & decapsulation) - CHAEN](https://ychae-leah.tistory.com/20)
- [[네트워크] TCP/ IP 캡슐화 - jhkang-dev](https://jhkang-tech.tistory.com/20)
