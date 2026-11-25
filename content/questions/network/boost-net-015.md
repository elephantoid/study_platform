---
id: boost-net-015
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

REST와 RESTful의 개념을 설명하고 차이를 말해주세요.

## 해설

`REST`란 **Re**presentational **S**tate **T**ransfer의 약자로, <u>URI로 자원(Resource)을 명시하고 HTTP 메서드를 통해 해당 자원에 대한 CRUD(Create, Read, Update, Delete) 연산을 적용하는 것</u>을 의미한다.

여기서의 자원은 데이터베이스의 정보를 말한다. 하지만 클라이언트가 직접 데이터베이스에 접속해 변경하는 것은 매우 위험한 방식 이다. 그래서 이를 막기 위해 REST API를 사용하는 것이다. **클라이언트**가 서버에 데이터를 조회·생성·삭제·업데이트를 하겠다고 <u>HTTP 메서드로 요청</u>을 하면 **서버**는 로직에 따라 데이터베이스에 접근하여 <u>요청을 처리</u>한다.

`RESTful`은 REST 아키텍처로 구현된 웹 서비스를 나타내기 위한 용어로, "REST API를 제공하는 웹 서비스는 RESTful하다"처럼 사용된다.

> **HTTP 메서드 종류**

요청의 종류에 다라 다른 HTTP 메서드를 사용하는데 주로 사용하는 대표적인 메서드는 다음과 같다.

| 메서드 | 역할                                                    |
| :----: | :------------------------------------------------------ |
|  GET   | 데이터를 조회한다.                                      |
|  POST  | 데이터를 등록한다. 인증 작업을 거칠 때 사용하기도 한다. |
| DELETE | 데이터를 삭제한다.                                      |
|  PUT   | 데이터를 새 정보로 통째로 업데이트할 때 사용한다.       |
| PATCH  | 데이터의 특정 필드를 수정할 때 사용한다.                |

> **URI란?**

URI는 Uniform Resource Identifier의 약자로, 자원을 식별자로 취급하여 나타내는 주소를 말한다. URI의 종류로 URL과 URN이 있다. URI는 일반적으로 다음과 같은 형식을 갖고 있다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/uri.png)

**References**
- [[Network] REST란? REST API란? RESTful이란? - HeeJeong Kwon](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)
- [REST API 제대로 알고 사용하기 - NHN Cloud Meetup!](https://meetup.toast.com/posts/92)
- [URL과 URI의 의미와 차이점 (Difference between URL & URI) - Lael's World](https://blog.lael.be/post/61)
- [통합 자원 식별자 - 위키피디아](https://ko.wikipedia.org/wiki/%ED%86%B5%ED%95%A9_%EC%9E%90%EC%9B%90_%EC%8B%9D%EB%B3%84%EC%9E%90)
- [21장. 백엔드 프로그래밍: Node.js의 Koa 프레임워크 - 리액트를 다루는 기술](http://www.yes24.com/Product/Goods/79260300)
