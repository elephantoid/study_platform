---
id: boost-os-008
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

동기와 비동기의 차이를 설명해주세요.

## 해설

**동기**는 요청에 대한 결과를 받은 후에야 다음 요청을 진행하는 방식으로 결과를 받을 때까지 대기해야한다. 동기는 직관적인 구조이지만 비효율적이다.

**비동기**는 요청 결과에 관계 없이 바로 다음 요청을 수행하고, 결과는 `콜백` 함수를 통해 받는다. 비동기는 설계가 복잡하지만 효율적이다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/sync-async.png)

> **Blocking, Non-Blocking**

Blocking 과 Non-Blocking은 결과에 대한 관점보다는 `System Call(직접 제어할 수 없는 대상의 처리)` 의 관점으로 이해할 수 있다. Blocking은 System Call 이 완료될 때까지 Waiting Queue에서 대기한다. Non-Blocking은 System Call이 완료와 상관없이 자신의 작업을 진행한다.

**References**
- [동기(Synchronous) 작업과 비동기(Asynchronous) 작업, 그리고 블락(Blocking) 과 넌블락(Non-Blocking) 의 개념 - Jins' Dev Inside](https://jins-dev.tistory.com/entry/%EB%8F%99%EA%B8%B0Synchronous-%EC%9E%91%EC%97%85%EA%B3%BC-%EB%B9%84%EB%8F%99%EA%B8%B0Asynchronous-%EC%9E%91%EC%97%85-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EB%B8%94%EB%9D%BDBlocking-%EA%B3%BC-%EB%84%8C%EB%B8%94%EB%9D%BDNonBlocking-%EC%9D%98-%EA%B0%9C%EB%85%90)
- [Synchronous(동기) Vs Asynchronous(비동기) - Nesoy Blog](https://nesoy.github.io/articles/2017-01/Synchronized)
- [[용어정리] 동기방식&비동기방식 비교 - 고구마](https://jieun0113.tistory.com/73)
- [동기방식, 비동기방식 - fromzoo](https://velog.io/@codemcd/Sync-VS-Async-Blocking-VS-Non-Blocking-sak6d01fhx)
