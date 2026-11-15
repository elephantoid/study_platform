---
id: boost-net-011
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

CORS가 무엇인가요?

## 해설

교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)는 **추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제**이다.

CORS 체제는 브라우저와 서버 간의 안전한 교차 출처 요청 및 데이터 전송을 지원한다. 최신 브라우저는 XMLHttpRequest 또는 Fetch와 같은 API에서 CORS를 사용하여 교차 출처 HTTP 요청의 위험을 완화한다.

> **CORS의 동작 원리**

1. 기본적으로 웹은 다른 출처의 리소스를 요청할 때는 HTTP 프로토콜을 사용하여 요청을 하는데, 이때 브라우저는 요청 헤더 (request header)에 `Origin` 필드에 요청을 보내는 출처를 담아 전송한다.
2. 서버는 요청에 대한 응답을 하는데, 응답 헤더(response header)에 `Access-Control-Allow-Origin`이라는 값에 '이 리소스를 접근하는 것이 허용된 출처'를 내려준다.
3. 이후 응답을 받은 브라우저는 자신이 보냈던 요청의 Origin과 서버가 보내준 응답의 `Access-Control-Allow-Origin`을 비교해 본 후 이 응답이 유효한 응답인지 아닌지를 결정한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/cors.png)

**References**
- [CORS란 무엇인가 ? - pilyeooong.log](https://velog.io/@pilyeooong/CORS%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)
- [교차 출처 리소스 공유 - 위키백과](https://ko.wikipedia.org/wiki/%EA%B5%90%EC%B0%A8_%EC%B6%9C%EC%B2%98_%EB%A6%AC%EC%86%8C%EC%8A%A4_%EA%B3%B5%EC%9C%A0)
