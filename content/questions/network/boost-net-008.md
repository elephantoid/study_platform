---
id: boost-net-008
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

만약 Server에서 FIN 플래그를 전송하기 전에 전송한 패킷이 Routing 지연이나 패킷 유실로 인한 재전송 등으로 인해 FIN 패킷보다 늦게 도착하는 상황이 발생하면 어떻게 될까요?

## 해설

클라이언트에서 세션을 종료시킨 후 뒤늦게 도착하는 패킷이 있다면 이 패킷은 Drop되고 **데이터는 유실**될 것이다.

A 클라이언트는 이러한 현상에 대비하여 Client는 Server로부터 `FIN`을 수신하더라도 일정시간동안 세션을 남겨놓고 잉여 패킷을 기다리는 과정을 거치게 되는데 이 과정을 `TIME_WAIT` 라고 한다. 일정시간이 지나면, 세션을 만료하고 연결을 종료시키며, `CLOSE` 상태로 변화한다.

**References**
- [[네트워크] 3-way / 4-way Handshake 란? - 방구의 개발냄새](https://bangu4.tistory.com/74)
