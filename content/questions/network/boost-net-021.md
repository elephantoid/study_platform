---
id: boost-net-021
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

SMTP가 무엇인가요?

## 해설

`SMTP(Simple Mail Transfer Protocol)`은 **인터넷에서 이메일을 보내기 위해 사용하는 TCP/IP 프로토콜**을 말한다. 사용하는 TCP Port 번호는 25번이다.

SMTP는 다음의 명령어를 사용하여 메일을 주고 받는다.

- MAIL 명령: 주소 반환 확립
- RCPT 명령: 메시지 수신자 확립
- DATA 명령: 메시지 텍스트의 첫 신호를 제공

**References**
- [간이 우편 전송 프로토콜 - 위키백과](https://ko.wikipedia.org/wiki/%EA%B0%84%EC%9D%B4_%EC%9A%B0%ED%8E%B8_%EC%A0%84%EC%86%A1_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)
