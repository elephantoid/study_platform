---
id: boost-net-023
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

여러 네트워크 topology에 대해 간단히 소개해주세요.

## 해설

컴퓨터끼리 정보를 교환하고 교류하는 형태를 의미하는 네트워크에서 토폴로지는 **컴퓨터들의 특정한 망구성 방식**을 의미한다.

하나의 네트워크 구성 방식을 보더라도, 노드와 링크와 같은 물리적 배치로 구분하는 **물리적 토폴로지**와 노드 간의 데이터 흐름으로 구분하는 **논리적 토폴로지**로 네트워크 구성을 각각 판단할 수 있다.

> **Star**

중앙에 위치한 메인 노드를 통해 다른 노드와 소통할 수 있는 구조이다.

- `장점`: 장애 발견이 쉽고 관리가 용이함
- `단점`: 메인 노드에 장애가 발생하면 전체 네트워크 사용 불가능

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/star-topology.png)

> **Bus**

버스라는 공통 배선을 통해 노드들이 연결되어 있어서, 한 노드의 신호가 모든 노드에 전달된다. (타겟 노드만 신호에 반응을 하고 다른 노드는 무시한다.)

- `장점`: 노드 추가 및 삭제가 용이하며, 한 노드에 장애가 발생해도 다른 노드에 영향을 주지 않음
- `단점`: 공통 배선의 크기(대역폭)가 제한되어 있으므로 배선에 과부하가 걸릴 경우 네트워크 성능 저하

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/bus-topology.png)

> **Ring**

각 노드가 양 옆으로 연결된 원형 구조, 단방향으로 신호가 전달된다.

- `장점`: 단방향 구조로 단순하고, 중간에 있는 노드들이 증폭기의 역할을 해준다. (거리 제약 적어진다.)
- `단점`: 노드 추가 및 삭제가 어렵다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/ring-topology.png)

> **Mesh**

다수의 노드가 서로 연결된 형태이다. (모두 연결되면 완전 연결형, 일부만 연결되면 부분 연결형)

- `장점`: 노드의 장애에 영향받지 않으며 유연한 대처가 가능하고 안정적이다.
- `단점`: 구축 비용이 크고, 노드 추가에도 비용이 많이 든다.

![완전 연결형](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/mesh-full-topology.png)

![부분 연결형](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/mesh-part-topology.png)

**References**
- [네트워크 토폴로지 정의 및 종류 - 브릭봇](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=brickbot&logNo=220418950837)
- [토폴로지 - 풍뎅아 공부하자](https://sungks.tistory.com/268)
