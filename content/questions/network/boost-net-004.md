---
id: boost-net-004
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

TCP와 UDP의 차이를 설명해주세요.

## 해설

TCP와 UDP는 모두 트랜스포트 계층(4계층)의 프로토콜이다. TCP와 UDP가 **공통적**으로 가지고 있는 기능은 아래와 같다.

1. **트랜스포트 다중화/역다중화 기능**(Transport Multiplexing/Demultiplexing): `호스트 대 호스트 전달`을 `프로세스 대 프로세스 전달`로 확장
2. **무결성 검사(오류검출)**: 헤더에 오류 검출 필드를 포함

이제 TCP와 UDP 각각에 대해 알아보자.

**UDP**는 위의 가장 기본적인 두가지 기능만을 제공한다. UDP는 **비신뢰적인 서비스**로서, 프로세스에 의해서 전송된 데이터가 손상되지 않은채로 목적지에 도착하는 것을 보장하지 않는다. 또한 **비연결형 서비스**이며, 오류검출은 선택사항이다.

UDP는 비연결형 서비스이므로 연결설정이 불필요하고 연결상태가 없다. 따라서 연결을 설정하기위한 어떠한 지연이 없고, 유지해야하는 정보가 없기 때문에 더 많은 클라이언트를 수용할 수 있다. 또한 UDP의 패킷 오버헤드(8 byte per segment)가 TCP(20 byte per segment)에 비해 더 작다는 장점이 있다. 그러나 혼잡제어를 사용하지 않아, 네트워크가 폭주상태에 빠지는 것을 막을 수 없다는 단점과 신뢰적이지 않으므로, 몇몇의 정보를 잃어버릴 수 있다는 단점이 존재한다.

**TCP**는 가장 기본적인 두가지 기능도 제공하면서, 신뢰적인 데이터 전달(Reliable Data Transfer) 기능, 연결지향형 서비스, 혼잡제어(Congestion control) 등의 기능을 제공한다.

**신뢰적인 데이터 전달**은 흐름제어, 순서번호, 확인응답, 타이머 등의 기술을 사용하여 프로세스에게 데이터가 순서대로 정확히 전달되도록 하는 역할을 한다. 종단 시스템 간에 IP의 비신뢰적인 서비스를 프로세스 사이의 신뢰적인 데이터 전송 서비스로 만들수 있으며, TCP에서의 오류검출은 필수사항이다. **혼잡제어**는 보내는 쪽(송신측)의 트래픽을 조절하여 스위치/링크의 혼잡을 방지하는 역할을 한다. 이는 특정 애플리케이션을 위해 제공하는 특정 서비스가 아니라, 전체를 위한 서비스로서, 혼잡한 네트워크 링크에서 각 TCP 연결이 링크의 대역폭을 공평하게 공유하여 통과하도록 해준다.

따라서, UDP는 속도증가와 지연 감소를 위해서 많이 사용되고, TCP는 신뢰성이 중요한 경우에 사용된다. 예를들어, UDP는 동영상 전송과 같이, 몇 프레임 정도 손실되어도 괜찮은 데이터 전송에 사용되고, TCP는 몇몇의 정보도 손실되어서는 안되는 애플리케이션에 이용된다.

**References**
- [CH.03 트랜스포트 계층 - cs-special-forces-headquarters](https://github.com/LandvibeDev/cs-special-forces-headquarters/blob/main/network/CH.03%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8F%AC%ED%8A%B8%EA%B3%84%EC%B8%B5/CH.03%20%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8F%AC%ED%8A%B8%20%EA%B3%84%EC%B8%B5.md)
