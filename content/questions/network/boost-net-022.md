---
id: boost-net-022
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

노트북으로 `www.google.com`에 접속을 했습니다. 요청을 보내고 받기까지의 과정을 자세히 설명해주세요.

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/browser-access-trip.png)

> **1단계**

웹 사이트에 접속하기 위해서는 **노트북의 IP주소, 1-hop 라우터의 IP 주소, DNS 서버 주소**가 필요하다. 이를 알아 내기 위해 DHCP query가 담긴 IP 데이터그램을 1-hop 라우터에게 전송한다. DHCP 서버가 내장된 라우터가 노트북의 IP주소, 자신의 IP주소, DNS 서버의 IP주소를 담은 DHCP ACK를 다시 노트북에게 전송한다.

- DNS란 **D**omain **N**ame **S**ystem의 약자로 `www.google.com`과 같은 도메인 주소를 IP 주소로 바꿔주는 시스템을 말한다.
- DHCP 서버는 보통은 라우터에 DHCP 서버가 내장되어 있으며 DHCP 서버에 연결된 클라이언트에게 자동적으로 IP주소를 할당한다. 자세한 내용은 [#28](#28)을 참고!

> **2단계**

DNS 서버에 DNS query를 보내기 전에 **1-hop 라우터의 MAC 주소**가 필요하므로 ARP query를 브로드캐스트 방식으로 전송하여 router의 MAC주소를 알아낸다.

- ARP란 **A**ddress **R**esolution **P**rotocol의 약자로, MAC 주소와 IP 주소를 1:1 매핑하기 위해 사용된다.

> **3단계**

`www.google.com`에 요청을 보내기 위해서는 `www.google.com`의 IP주소가 필요하므로, DNS query가 담긴 IP 데이터그램을 DNS 서버에 전송하고 `www.google.com`의 IP 주소를 클라이언트인 노트북에게 전송한다.

> **4단계**

TCP 소켓을 생성하고 3-way handshake로 연결을 생성한다. HTTP 요청을 보내고 응답을 받아 브라우저에 렌더링을 하면 Google 웹페이지를 브라우저에서 확인할 수 있다.

**References**
- [Chapter 6.7. Life of a web request - Computer Networking: A Top-Down Approach](http://www.yes24.com/Product/Goods/24320296?OzSrank=2)
- [ARP 쉽게 이해하기 - 네트워크 엔지니어 환영의 AWS 기술블로그](https://aws-hyoh.tistory.com/entry/ARP-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)
