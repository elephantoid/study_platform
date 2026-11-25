---
id: boost-net-016
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

소켓(Socket)이 무엇인가요? 자신 있는 언어로 간단히 소켓 생성 예시를 보여주세요.

## 해설

`소켓(Socket)`이란 <u>Application 프로세스와 end-to-end 통신을 제공하는 Transport 프로토콜 사이의 인터페이스</u>을 말한다. 즉, Application에서 Transport 프로토콜을 쓰기 위한 API를 말한다.

소켓은 크게 UDP와 TCP 두 종류로 분류할 수 있다. 자세한 내용은 [#4. TCP와 UDP의 차이를 설명해주세요.](#4)을 참고!

파이썬으로 TCP에서의 소켓과 UDP에서의 소켓 생성 코드를 구현하면 다음과 같다. 소켓을 생성한다고 바로 통신을 할 수 없으며 실제 통신을 하기 위해는 바인딩, 연결 등 추가 작업이 필요하다.

> **TCP**

- TCP Client

```python
from socket import *

server_name = "example.com"
server_port = 1234

client_socket = socket(AF_INET, SOCKET_STREAM)  # 소켓 생성
client_socket.connect((server_name, server_port)) # 서버에 연결 요청
```

- TCP Server

```python
from socket import *

server_port = 1234

server_socket = socket(AF_INET, SOCKET_STREAM)  # 소켓 생성
server_socket.bind(('', server_port)) # 소켓에 주소 바인딩
server_socket.listen(1) # 클라이언트 연결 대기

(client_socket, client_address) = server_socket.accept()  # 클라이언트 연결 수락
```

> **UDP**

- UDP Client

```python
from socket import *

server_name = "example.com"
server_port = 1234

client_socket = socket(AF_INET, SOCK_DGRAM) # 소켓 생성
```

- UDP Server

```python
from socket import *

server_port = 1234
server_socket = socket(AF_NET, SOCK_DGRAM)  # 소켓 생성
server_socket.bind(('', server_port)) # 소켓에 주소 바인딩
```

**References**
- [Chapter 2. Application Layer - Computer Networking: A Top-Down Approach](http://www.yes24.com/Product/Goods/24320296?OzSrank=2)
