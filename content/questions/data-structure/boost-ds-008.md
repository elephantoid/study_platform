---
id: boost-ds-008
topicId: data-structure
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: boost-ds-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

circular queue

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/circular-queue.png)

크기가 N 인 queue 에서 모든 원소를 다 채우면 rear 는 N-1 을 가리킨다. 이 때, pop 으로 제일 처음 원소를 제거하면 queue 에 남은 공간 1개가 생긴다. 하지만 rear 는 마지막을 가리키고 있기 때문에 더이상 원소를 추가할 수 없다. 이 문제를 해결하기 위해 원형 형태의 `circular queue` 를 사용한다. queue 와 같이 FIFO 구조의 자료형이다.

동작 방식은 다음과 같다.

- 처음에는 front 와 rear 가 같은 메모리를 가리킨다.
- 데이터를 입력하기 위해 rear 는 메모리가 꽉찼는지 검사한다. 꽉찬 경우는 rear 다음 번의 메모리가 front 를 가리키는 경우 (rear + 1 == front) 인데, 꽉차지 않았다면 데이터를 입력하고 rear 는 다음 메모리로 이동한다.
- 데이터를 반환하기 위해 front 는 메모리가 비었는지 검사한다. 빈 경우에는 현재 front 위치와 rear 위치가 같은 경우 (rear == front) 인데, 비지 않았다면 데이터를 반환하고 front 는 다음 메모리로 이동한다.

**References**
- [[자료구조] 큐(QUEUE)와 원형큐(CIRCULAR QUEUE) 개념과 구현 - reakwon](https://reakwon.tistory.com/30)
