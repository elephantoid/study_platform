---
id: boost-net-030
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

delay, timing(jitter), throughput 차이를 설명해주세요.

## 해설

위 세가지 개념은 모두 네트워크의 성능과 관련되어 있다.

> **delay**

하나의 데이터 패킷이 출발 지점에서 도착 지점에 도착한 시간을 의미한다.

딜레이는

- `Processing Delay (처리 지연)`: 라우터가 들어온 패킷의 헤더를 확인하고 처리하는데 걸리는 시간
- `Queueing Delay (큐 지연)`: 라우터가 다른 패킷을 처리하느라 패킷이 라우터의 큐에서 대기하는 시간
- `Transmission Delay (전송 지연)`: 라우터의 성능 (전송 속도) 에 따라 패킷이 논리회로를 통과할 때까지 걸리는 시간
- `Propagation Delay (전파 지연)`: 라우터간 거리에 의해 발생하는 지연 시간

의 합으로 계산된다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/network-delay.png)

> **timing(jitter)**

delay 의 변동을 (변화량 수준) 의미한다. 같은 스위치가 아닌 경우 패킷마다 대기 시간이 달라지므로 지터가 생긴다.

> **throughput**

지정된 시간동안 실제로 전송된 정보량을 의미한다.

데이터가 지나갈 수 있는 통로의 크기인 bandwidth 와 헷갈릴 수 있는데, bandwidth 가 크더라도 실제로 전송된 정보량이 적으면 throughput 이 적은 것이다.

**References**
- [Network의 4가지 종류 - 공대생의 개발 노트](https://corona-world.tistory.com/47)
- [4. 네트워크의 delay, loss, throughput - 나도 잘 모름](https://snnchallenge.tistory.com/98)
- [[네트워크]latency, bandwidth와 throughput 개념 정리 - 코딩 세상](https://darkstart.tistory.com/141)
- [Latency Delay Jitter 의 명쾌한 비교](https://sensechef.com/1156)
