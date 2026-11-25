---
id: boost-net-010
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

HTTP와 HTTPS에 대해서 설명하고 차이점에 대해 설명해주세요.

## 해설

HTTP란 **서버/클라이언트 모델을 따라 데이터를 주고받기 위한 프로토콜**이다. 즉, HTTP는 인터넷에서 하이퍼텍스트를 교환하기 위한 통신 규약으로, 80번 포트를 사용하고 있다. 따라서 HTTP 서버가 80번 포트에서 요청을 기다리고 있으며, 클라이언트는 80번 포트로 요청을 보내게 된다.

HTTP는 1989년 팀 버너스 리(Tim Berners Lee)에 의해 처음 설계되었으며, WWW(World-Wide-Web) 기반에서 세계적인 정보를 공유하는데 큰 역할을 하였다.

HTTPS는 **HTTP에 데이터 암호화가 추가된 프로토콜**이다. HTTPS는 HTTP와 다르게 443번 포트를 사용하며, 네트워크 상에서 중간에 제3자가 정보를 볼 수 없도록 공개키 암호화를 지원하고 있다.

HTTP는 암호화가 추가되지 않았기 때문에 보안에 취약한 반면, HTTPS는 안전하게 데이터를 주고받을 수 있다. 하지만 HTTPS를 이용하면 암호화/복호화의 과정이 필요하기 때문에 HTTP보다 속도가 느리다. 또한 HTTPS는 인증서를 발급하고 유지하기 위한 추가 비용이 발생하다.

개인 정보와 같은 민감한 데이터를 주고받아야 한다면 HTTPS를 이용해야 하지만, 단순한 정보 조회 등 만을 처리하고 있다면 HTTP를 이용하면 된다.

**References**
- [[Web] HTTP와 HTTPS 및 차이점 - MangKyu's Diary](https://mangkyu.tistory.com/98)
