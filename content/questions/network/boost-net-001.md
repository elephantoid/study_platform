---
id: boost-net-001
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

TCP/IP의 각 계층을 설명해주세요.

## 해설

TCP/IP는 인터넷에서 표준으로 사용되고 있는 네트워크 프로토콜(규칙)을 의미한다. TCP/IP는 IP(Internet Protocol)을 중심으로 한 여러 프로토콜의 집합체로, TCP/IP 5계층 혹은 TCP/IP 4계층(링크계층과 물리계층을 하나의 계층으로 보는 경우)으로 불린다.

TCP/IP는 크게 5개의 계층으로 구성된다.

> **애플리케이션 계층**(Application Layer, L5)

네트워크 애플리케이션과 애플리케이션 계층 프로토콜이 있는 곳이다. HTTP, SMTP, FTP와 같은 많은 프로토콜을 포함한다. 도메인 주소를 32비트 네트워크 주소로 변환하는 기능을 위한 DNS(Domain Name Server)를 지원한다. 애플리케이션 계층 패킷을 **메시지**(message)라고 한다.

> **트랜스포트 계층**(Transport Layer, L4)

네트워크 계층에서 보내온 데이터 정렬, 오류 정정 등을 수행하고 신뢰할 수 있는 통신을 확보한다. TCP/UDP 같은 프로토콜이 이 계층에 위치한다. TCP, UDP에 대한 내용은 [[#4] TCP와 UDP의 차이를 설명해주세요.](#4) 을 참고한다. 트랜스포트 계층 패킷을 **세그먼트**(segment)라고 한다.

> **네트워크 계층**(Network Layer/IP Layer, L3)

다른 네트워크에 있는 목적지에 데이터를 전송하는 역할을 수행한다. 즉, 네트워크 간의 통신을 가능하게 해주는 역할을 수행한다. 이를 위해, 라우터(router) 장비와 IP 프로토콜(오직 하나만 존재), 라우팅 프로토콜이 사용된다. 라우터는 다른 네트워크와 통신하기 위해 경로를 설정하고 논리주소를 결정하는 역할을 수행한다.(경로설정) 네트워크 계층의 패킷을 **데이터그램**(datagram)이라 한다.

> **링크 계층**(Data Link Layer, L2)

네트워크 기기 간 데이터 전송 및 물리 주소를 결정하는 역할을 수행한다. 주로 건물이나 특정 지역을 범위로 하는 네트워크인 랜(LAN)에서 데이터를 정상적으로 주고받기 위해 필요한 계층이다. 데이터 링크 계층에서는 일반적으로 이더넷(Ethernet) 프로토콜이 사용되며, 스위치(switch) 같은 장치가 사용된다. 링크 계층 패킷을 **프레임**(frame)이라 한다.

> **물리 계층**(Physical Layer, L1)

물리적인 연결과 전기 신호 변환/제어를 담당하여, 이진 데이터를 전기 신호로 변환한다. 또한 컴퓨터와 네트워크 장비를 물리적으로 연결하여, 하나의 노드에서 다른 노드로 **비트를** 이동시키는 역할을 수행한다. 물리 계층의 프로토콜들은 링크(실제 전송매체 ex.광케이블)에 의존한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/tcp-ip-hierarchy.png)

**References**
- [CH.01 컴퓨터 네트워크와 인터넷 - LandvibeDev/cs-special-forces-headquarters](https://github.com/LandvibeDev/cs-special-forces-headquarters/blob/main/network/CH.01%EC%BB%B4%ED%93%A8%ED%84%B0%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EC%99%80%EC%9D%B8%ED%84%B0%EB%84%B7/CH.01%20%EC%BB%B4%ED%93%A8%ED%84%B0%20%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EC%99%80%20%EC%9D%B8%ED%84%B0%EB%84%B7.md)
- [[네트워크] TCP/IP 5계층에서 일어나는 일 (1) - 코알라일락's BLOG](https://zion830.tistory.com/104)
