---
id: boost-net-005
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

TCP와 UDP의 헤더를 비교해주세요.

## 해설

**UDP segment**의 간략한 구조는 아래와 같다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/udp-segment.png)

애플리케이션 데이터는 UDP 데이터그램의 데이터 필드에 위치한다. UDP 헤더는 2바이트(16비트)씩 구성된 4개의 필드를 가진다. UDP 헤더는 `출발지 포트번호`, `목적지 포트번호`, `체크섬`, `길이`로 이루어져있다.

- **포트번호**는 (목적지) 호스트가 (역다중화 기능을 수행하는) 정확한 프로세스에게 애플리케이션 데이터를 넘기게 하기 위해 사용된다.
- **체크섬**(checksum)은 세그먼트에 오류가 발생했는지를 검사하기 위해 사용되며, 체크섬은 UDP 세그먼트 이외에 IP 헤더의 일부 필드도 계산한다.(가상헤더) UDP 헤더와 데이터를 모두 포함하여 체크하게 된다.
- **길이**는 헤더를 포함하는 UDP 세그먼트의 길이(바이트 단위)를 나타낸다. UDP헤더와 데이터를 합친 길이를 나타낸다.

---

**TCP segment**의 간략한 구조는 아래와 같다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/tcp-segment.png)

TCP 소켓은 4개의 다른 요소들의 집합에 의해 식별된다.(`출발지 IP`, `출발지 포트번호`, `목적지 IP`, `목적지 포트번호`) 따라서 IP를 제외한 `출발지/도착지 포트번호`(각 16 bit)와 `sequence number`(32 bit), `ack number`(32 bit)를 합쳐, 기본적으로 20 byte의 헤더를 가지게 되며, 옵션을 포함하면 최대 60 byte의 헤더를 가질 수 있다. 다른 출발지 주소를 가지는 세그먼트는, 다른 소켓을 통해서 프로세스에 전달된다. UDP와 다르게, TCP 세그먼트는 출발지 주소가 다르면, 다른 소켓으로 전달된다.

- **포트번호**는 IP 정보와 결합하여 출발지, 도착지를 구분하기 위해 사용된다.
- **Sequence Number**는 SYN 패킷을 보낼때, 동기화를 위해 사용되는 번호이다. 초기 Sequence Number를 ISN이라 부르며, 여기에는 랜덤한 수가 담긴다.
- **Ack Number**는 ACK 패킷을 보낼 때 동기화를 위해 사용되는 번호이다.

**References**
- [CH.03 트랜스포트 계층 - cs-special-forces-headquarters](https://github.com/LandvibeDev/cs-special-forces-headquarters/blob/main/network/CH.03%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8F%AC%ED%8A%B8%EA%B3%84%EC%B8%B5/CH.03%20%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8F%AC%ED%8A%B8%20%EA%B3%84%EC%B8%B5.md)
