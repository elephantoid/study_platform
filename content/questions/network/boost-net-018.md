---
id: boost-net-018
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

IPv4와 IPv6 차이를 설명해주세요.

## 해설

IPv4와 IPv6는 **인터넷 프로토콜(IP)의 버전**을 말하며, IPv4는 IP의 4번째 버전, IPv6는 IP의 6번째 버전을 말한다. 이 때 인터넷 프로토콜은 호스트 간 패킷 교환 네트워크에서 패킷(Packet) 혹은 데이터그램(Datagram)으로 불리는 정보를 주고받는데 사용하는 프로토콜을 말한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/ipv4-ipv6.png)

`IPv4`는 헤더에 options이 존재하고, fragmentation/reassembly 기능을 제공해 MTU(Maximum Transport Unit)을 넘는 큰 데이터그램을 쪼개 전송을 하고 도착지에서 재조합을 한다. 또한 checksum 비트도 존재하여 매 라우터마다 checksum 비트를 갱신한다.

반면 `IPv6`는 빠른 속도를 위해 fragmentation/reassembly 기능을 제공하지 않으며, 데이터그램의 우선순위를 설정할 수 있는 priority 비트가 존재한다.

**References**
- [Chapter 4. Network Layer - Computer Networking: A Top-Down Approach](http://www.yes24.com/Product/Goods/24320296?OzSrank=2)
