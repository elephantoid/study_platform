---
id: boost-algo-012
topicId: algorithm
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: boost-algo-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

Greedy Algorithm

## 해설

그리디 알고리즘은 현재 단계에서 최선의 방법을 선택하는 알고리즘이다. 가장 큰 값만 선택, 가장 작은 값만 선택 등 한 가지 방법을 정해놓고 다음 단계로 나아가서도 같은 방식으로 문제를 해결한다. 단, 그리디 알고리즘이 적용하기 위해서는 항상 적용될 수 있는지 정당성을 확인해야 한다.

가장 적은 동전 개수를 거슬러주는 동전 거스름돈 문제를 생각해보자.

1, 5, 10원의 거스름돈이 있다면, **큰 값 먼저 그리디하게** 10원짜리 동전 먼저 되는대로 주고, 다음으로 5원, 남는 돈은 1원으로 처리할 수 있다. 이 경우, 값이 큰 동전들은 값이 작은 동전으로 나눠질 수 있으므로 작은 동전으로 새로운 단위를 만들 수 없기 때문에 그리디 알고리즘이 성립한다.

만약 위 문제에서 거스름돈이 1, 7, 10원이라면 어떻게 될까? 14원을 거슬러주기 위해 그리디 알고리즘을 쓴다면 10원 1개, 1원 4개 총 5개의 동전을 쓸 것이다. 하지만 올바른 답은 7원 2개 총 2개가 필요하다. 이 경우, 10원은 7원으로 나눠질 수 없기 때문에 동적 프로그래밍 알고리즘을 사용하는게 적합하다.

그리디 알고리즘은 다익스트라 알고리즘 등에도 활용 가능하며, 정렬 등과 함께 사용되는 경우가 많다.

**References**
- [Greedy - Heath.log](https://velog.io/@dldydldy75/Greedy-Algorithm)
- [이것이 코딩테스트다 - 나동빈](https://book.naver.com/bookdb/book_detail.nhn?bid=16439154)
- [탐욕(그리디) 알고리즘(greedy algorithm) - zero cho](https://www.zerocho.com/category/Algorithm/post/584ba5c9580277001862f188)
