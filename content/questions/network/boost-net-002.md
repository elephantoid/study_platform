---
id: boost-net-002
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

OSI 7계층와 TCP/IP 계층의 차이를 설명해주세요.

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/osi-7-layer.png)

(`네트워크 인터페이스 계층`: TCP/IP 5계층에서 물리계층과 링크계층을 하나로 묶은 것)

OSI 7계층은 TCP/IP 계층의 애플리케이션 계층을 더 세분화한 것이다. TCP/IP 계층과 다른, 응용계층, 표현계층과 세션계층에 대해서 설명하고 나머지는 [[#1] CP/IP의 각 계층을 설명해주세요.](#1)을 참고한다.

> **응용 계층**(Application Layer)

사용자 또는 애플리케이션이 네트워크에 접근할 수 있도록 해주는 계층이다. 사용자를 위한 인터페이스를 지원하며, 사용자에게 보이는 유일한 계층이다. 메일 전송, 인터넷 접속 등의 작업을 수행할 수 있다.

> **표현 계층**(Presentation Layer)

응용계층으로부터 전달받거나 전송하는 데이터의 인코딩 및 디코딩이 이루어지는 계층이다. 응용 계층에서 데이터를 이해할 수 있도록, 응용프로그램에 맞춰 변환하게 된다. 예를들어, JPEG, TIFF, GIF, MPEG 등의 다양한 포맷을 구분하게 된다.

> **세션 계층**(Session Layer)

응용프로세스가 통신을 관리하기 위한 방법을 정의한다. 네트워크상 양쪽의 연결을 관리/지속시키는 역할과 세션을 만들거나 없애는 역할을 담당하는 계층이다. 통신하는 사용자들을 동기화하고 오류복구를 진행한다. 통신연결은 포트를 기반으로 구성하여 연결되며, OS가 세션계층에 속한다.

**References**
- [네크워크의 기본 OSI7 계층 - reakwon 티스토리](https://reakwon.tistory.com/59?category=300675)
- [IT관련 용어 - [OSI 7계층] 이란? - pst8627 블로그](https://blog.naver.com/PostView.nhn?blogId=pst8627&logNo=221670903384)
