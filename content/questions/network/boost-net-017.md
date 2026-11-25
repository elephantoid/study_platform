---
id: boost-net-017
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

Socket.io와 WebSocket의 차이를 설명해주세요.

## 해설

> **WebSocket**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/web-socket.png)

`WebSocket`은 <u>서버와 브라우저 간 연결을 유지한 상태로 데이터를 교환할 수 있도록 하는 **프로토콜**</u>을 말한다.

전형적인 브라우저 렌더링 방식은 HTTP 요청에 대한 응답을 받아 브라우저 화면을 깨끗히 지우고 받은 내용을 새로 표시하는 방식인데, 내용을 지우고 다시 그리면 브라우저의 깜박임이 생기게 된다. 이러한 깜박임 없이 필요한 부분만 다시 그리는 상호작용 방식의 수요가 생겼다.

이러한 상호작용을 구현하기 위해 Pooling, Long Pooling, Streaming 등 다양한 방식을 사용했지만 요청을 보내고 응답을 보내는 **단방향 메시지 교환 규칙을 준수**하였기 때문에 상호작용하는 웹페이지를 구현하는 것은 매우 어려웠다.

이보다 쉽게 구현하기 위해 **브라우저와 서버 간 양방향 메시지 송수신 규칙**이 필요했고 이것이 WebSocket이다.

> **Socket.io**

`socket.io`는 <u>서버와 브라우저의 양방향 통신을 가능하게 하는 **모듈**</u>을 말한다. WebSocket의 경우 정말 좋은 기술이지만 오래된 브라우저의 경우 지원을 하지 않는 경우가 있다. 이런 경우 socket.io는 서버와 브라우저의 종류와 버전을 파악하여 가장 적합한 기술을 선택해 양방향 통신이 가능하도록 한다.

**References**
- [WebSocket과 Socket.io - NAVER D2](https://d2.naver.com/helloworld/1336)
- [웹소켓 - 위키백과](https://ko.wikipedia.org/wiki/%EC%9B%B9%EC%86%8C%EC%BC%93)
- [웹소켓 - 모던 JavaScript 튜토리얼](https://ko.javascript.info/websocket)
- [websocket, socket.io를 이용한 양방향 통신 - zych1751](http://www.secmem.org/blog/2019/08/17/websocket-socketio/)
- [10.5 Node.js(Express)와 Socket.io - PoiemaWeb](https://poiemaweb.com/nodejs-socketio)
