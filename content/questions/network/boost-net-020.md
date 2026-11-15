---
id: boost-net-020
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

라우터와 스위치, 허브의 차이를 설명해주세요.

## 해설

(여기서의 네트워크는 LAN(Local Area Network)를 말합니다.)

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/router-switch-hub.png)

`라우터(Router)`는 Network Layer 3계층 장비로 **네트워크 사이를 연결하는 장치**이다. 최종 도착지의 네트워크에 도착할 수 있도록 적절한 경로를 설정하여 패킷을 전송한다.

`스위치(Switch)`는 Data Link Layer 2계층 장비로 **네트워크 내에서 패킷을 전송하는 장치**를 말한다. 스위치로 요청이 들어오면 IP 주소에 대응되는 MAC 주소를 찾아 해당 MAC 주소로 패킷을 전송한다. 만약 IP 주소에 대응되는 MAC 주소가 없다면 허브처럼 브로드캐스트 방식으로 패킷을 전송하고 IP 주소와 MAC 주소를 대응시킨 테이블을 갱신시킨다.

`허브(Hub)`는 Physical Layer 1계층 장비로 **여러 기기를 연결하여 네트워크를 만들어주는 장치**이다. 패킷을 받으면 연결된 모든 기기에 패킷을 전송한다.

> **💡 브로드캐스트(Broadcast)란?**  
> 브로드캐스트란 LAN에 있는 모든 네트워크 장비들에게 보내는 통신이다.

**References**
- [허브, 라우터, 공유기, 스위치의 개념과 차이점 - Easy is Perfect](http://melonicedlatte.com/network/2019/12/21/154500.html)
- [네트워크 스위치와 허브, 라우터는 어떻게 다른 걸까 - IT WORLD](https://www.itworld.co.kr/news/167585)
- [라우터 그리고 스위치 - HelloWorld](https://server-engineer.tistory.com/582)
