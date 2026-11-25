---
id: boost-net-006
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

TCP의 3-way-handshake와 4-way-handshake를 비교 설명해주세요.

## 해설

**핸드셰이크**(Handshake)란, 호스트 간 데이터를 전송하기 전에 먼저 정확한 전송을 보장하기 위해 상대방 컴퓨터와 사전에 세션을 수립하는 과정을 의미한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/3-way-handshake.png)

**3-way handshake**는 TCP의 연결을 초기화 할 때 사용한다. 양쪽 모두 데이터를 전송할 준비가 되었다는 것을 보장하고, 실제로 데이터 전달이 시작하기전에 한쪽이 다른 쪽이 준비되었다는 것을 알수 있도록 한다. 양쪽 모두 상대편에 대한 초기 순차일련변호를 얻을 수 있도록 한다. 절차는 다음과 같다.

1. 접속 요청 프로세스가 연결 요청 메시지 전송한다.(SYN)
2. 접속 요청을 받은 프로세스가 요청을 수락한다는 확인 메시지를 보낸다. (ACK) 동시에 접속 요청을 받은 프로세스도 접속 요청을 한 프로세스에 연결 요청을 보낸다.(SYN) → (SYN + ACK)
3. 마지막으로 접속 요청 프로세스가 수락 확인을 보내 연결을 맺는다.(ACK)

단순히 응답을 주고받는데 2-way Handshake면 충분해보이지 않는가? 왜 3-way 일까? TCP/IP 통신은 양방향성 connection이다. 위의 그림의 1번 과정에서 클라이언트가 연결 요청을 SYN으로 보내면, 서버는 클라이언트가 요청한 SYN에 대한 대답(ACK)과 함께, 자신도 연결하겠다는 요청의 의미로 SYN을 보내고, 클라이언트로부터 요청에 대한 대답(과정 3)을 받아야한다. 이 과정은 2-way handshaked에서는 성립될 수 없다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/4-way-handshake.png)

**4-way handshake**는 세션을 종료하기 위해 수행되는 절차이다. 구체적인 과정은 다음과 같다.

1. 클라이언트가 연결을 종료하겠다는 FIN 플래그를 전송한다.
2. 서버는 일단 확인메시지를 보내고 자신의 통신이 끝날때까지 기다리는데, 이 상태가 `TIME_WAIT` 상태이다.
3. 서버가 통신이 끝났으면 연결이 종료되었다고 클라이언트에게 FIN 플래그를 전송한다.
4. 클라이언트는 확인했다는 메시지를 보낸다.

> **💡 `CLOSE_WAIT` 와 `TIME_WAIT` 상태란 무엇일까?**  
> `TIME_WAIT` 상태로 대기하는 이유는, 세션 종료후, 혹시나 네트워크에 아직 라이브 패킷이 존재할수도 있기때문이다.

> **💡 용어**
>
> - **SYN**(Synchronization): 연결요청, 세션을 설정하는데 사용되며 초기에 시퀀스 번호를 보낸다.
> - **ACK**(Acknowledgement): 보낸 시퀀스 번호에 TCP 계층에서의 길이 또는 양을 더한 것과 같은 값을 ACK에 포함하여 전송한다.
> - **FIN**(Finish) : 세션을 종료시키는데 사용되며 더 이상 보낸 데이터가 없음을 표시한다.

**References**
- [[네트워크] 3-way / 4-way Handshake 란? - 방구의 개발냄새](https://bangu4.tistory.com/74)
- [TCP의 3 way Handshake과 4 way Handshake - 자비스가 필요해](https://needjarvis.tistory.com/157)
- [3-way handshake 4-way handshake는 왜 필요할까? - 안 평범한 개발자의 하루](https://unordinarydays.tistory.com/172)
