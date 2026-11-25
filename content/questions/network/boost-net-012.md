---
id: boost-net-012
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

HTTP GET과 POST 메서드를 비교/설명해주세요.

## 해설

> **GET**

GET은 **클라이언트에서 서버로 어떠한 리소스로부터 정보를 요청하기 위해 사용되는 메서드**이다. GET을 통한 요청은 URL 주소 끝에 파라미터로 포함되어 전송되며, 이 부분을 쿼리 스트링(query string)이라고 부른다.

방식은 URL 끝에 `?`를 붙이고 그다음 `변수명1=값1&변수명2=값2...` 형식으로 이어 붙이면 된다. 예를 들면 `www.example.com/show?name1=value1&name2=value2`이다. 서버에서는 `name1`과 `name2`라는 파라미터 명으로 각각 `value1`과 `value2`의 파라미터 값을 전달받을 수 있다.

> **POST**

POST는 **클라이언트에서 서버로 리소스를 생성하거나 업데이트하기 위해 데이터를 보낼 때 사용되는 메서드**이다. POST는 전송할 데이터를 HTTP 메시지 body 부분에 담아서 서버로 보낸다.(body의 타입은 Content-Type 헤더에 따라 결정된다.)

GET에서 URL의 파라미터로 보냈던 `name1=value1&name2=value2`가 body에 담겨 보내진다 생각하면 된다. POST로 데이터를 전송할 때 길이 제한이 따로 없어 용량이 큰 데이터를 보낼 때 사용하거나 GET처럼 데이터가 외부적으로 드러나는 건 아니라서 보안이 필요한 부분에 많이 사용된다. POST를 통한 데이터 전송은 보통 HTML form을 통해 서버로 전송된다.

> **GET과 POST의 차이점**

- 사용목적: GET은 서버의 리소스에서 데이터를 요청할 때, POST는 서버의 리소스를 새로 생성하거나 업데이트할 때 사용한다.
- 요청에 body 유무: GET은 URL 파라미터에 요청하는 데이터를 담아 보내기 때문에 HTTP 메시지에 body가 없다. POST는 body에 데이터를 담아 보내기 때문에 당연히 HTTP 메시지에 body가 존재한다.
- 멱등성(idempotent): GET 요청은 멱등이며, POST는 멱등이 아니다.

> **💡멱등이란?**  
> 멱등의 사전적 정의는 연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 의미한다. GET은 리소스를 조회한다는 점에서 여러 번 요청하더라도 응답이 똑같을 것이다. 반대로 POST는 리소스를 새로 생성하거나 업데이트할 때 사용되기 때문에 멱등이 아니라고 볼 수 있다.(POST 요청이 발생하면 서버가 변경될 수 있다.)

**References**
- [[네트워크] get 과 post 의 차이 - 인생의 로그캣](https://noahlogs.tistory.com/35)
