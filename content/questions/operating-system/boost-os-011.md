---
id: boost-os-011
topicId: operating-system
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: boost-os-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

교착상태(데드락, Deadlock)의 개념과 조건을 설명해주세요.

## 해설

교착상태란, 두 개 이상의 작업이 서로 상대방의 작업이 끝나기 만을 기다리고 있기 때문에 결과적으로 아무것도 완료되지 못하는 상태를 가리킨다. 교착상태의 조건은 아래와 같다.

- **상호배제**(Mutual exclusion) : 프로세스들이 필요로 하는 자원에 대해 배타적인 통제권을 요구한다.
- **점유대기**(Hold and wait) : 프로세스가 할당된 자원을 가진 상태에서 다른 자원을 기다린다.
- **비선점**(No preemption) : 프로세스가 어떤 자원의 사용을 끝낼 때까지 그 자원을 뺏을 수 없다.
- **순환대기**(Circular wait) : 각 프로세스는 순환적으로 다음 프로세스가 요구하는 자원을 가지고 있다.

현재 대부분의 운영체제들은 교착상태를 막는 것이 불가능하여, 운영체제마다 각기 다른 방법으로 교착상태에 대응한다. 주요 접근 방식은 `예방`, `회피`, `무시`, `발견`, `회복` 등이 있다. 이 중에서 예방은 위의 `교착상태의 조건` 중 하나를 제거하는 방식으로 진행되며, 회피는 부가적인 교착상태 회피 알고리즘을 사용한다. 또한 회복을 위해서는 "교착상태에 있는 프로세스들을 하나씩 종료해가는 방법"과 "사용되는 자원이 적은 프로세스 등을 위주로 자원을 선점할 수 있도록 하는 방법"이 쓰인다.

> **[Dining Philosophers](https://m.blog.naver.com/hirit808/221788147057)** 문제를 떠올리면, 쉽게 이해할 수 있다.

**References**
- [교착 상태 - 위키백과](https://ko.wikipedia.org/wiki/%EA%B5%90%EC%B0%A9_%EC%83%81%ED%83%9C)
- [[OS] 교착상태란 무엇인가? - 코딩팩토리](https://coding-factory.tistory.com/311)
- [KOCW 운영체제 8: 식사하는 철학자 문제, 해결 코드(Dining Philosopher Problem) - 큐의 Qriosity Log](https://m.blog.naver.com/hirit808/221788147057)
