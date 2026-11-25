---
id: boost-net-027
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

routing protocol을 몇 가지 설명해주세요. (ex. link state, distance vector)

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/routing.png)

패킷을 전달할 때 어느 경로로 갈지 정하는 것을 라우팅이라고 한다.

> **라우팅 경로 고정 여부**

어떤 경로로 라우팅할지를 미리 정해두냐 동적으로 정하냐에 따라 `정적 라우팅`, `동적 라우팅` 으로 구분한다.

> **내/외부 라우팅**

동적 라우팅에서 AS (Auotonomous System, 하나의 네트워크 관리자에 의해 관리되는 네트워크 집단) 를 기준으로 내부적으로 동작하냐, 외부적으로 동작하냐에 따라 `내부 라우팅` (RIP, IGRP, OSPF, EIGRP) 과 `외부 라우팅` (BGP, EGP) 으로 나눈다.

> **라우팅 테이블 관리**

동적 라우팅에서 어떤 방식으로 라우팅 테이블을 관리하느냐에 따라서도 방법이 다르다.
크게 link state, distance vector 방법이 있다.

`distance vector` 방법은 현재 위치 (단말 또는 라우터) 까지의 방향과 거리를 기록한 라우팅 테이블을 인접한 라우터들에게 전달하고 갱신한다.
메모리가 적게 들고 구성이 쉽지만, 전체 테이블 구성 시간이 길어질 수 있고 같은 경로를 반복해서 도는 루핑 문제가 발생할 수 있다. (EIGRP 는 루핑이 발생하지 않음)
distance vector 를 사용하는 프로토콜로는 RIP, EIGRP, BGP 등이 있으며, distance vector 는 `벨만-포드 알고리즘` 에 기반한다.

`link state` 방법은 인접 테이블에 정보를 전달했으면 또 그 인접 테이블들은 이 정보를 바로 인접 테이블로 넘겨, 직접 연결되지 않은 모든 라우터들도 현재 정보를 파악할 수 있다.
정확하고 루핑 문제가 없다는 장점이 있어 대형 네트워크에서 많이 사용되지만 메모리의 소모와 cpu 로드가 많다는 단점이 있다.
link state 를 사용하는 프로토콜로는 OSPF, IS-IS 등이 있으며, link state 는 `다익스트라 알고리즘`에 기반한다.

**References**
- [라우팅 프로토콜(Routing Protocol) - 자비스가 필요해](https://needjarvis.tistory.com/159)
- [라우팅 프로토콜 종류 - 개발일기](https://developmentdiary.tistory.com/494)
- [라우팅 프로토콜의 종류 - 청년 고득녕](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=nackji80&logNo=221431942767)
- [디스턴스 벡터/링크 스테이트 - 이삭이의 토스트 공장](https://toastfactory.tistory.com/286)
