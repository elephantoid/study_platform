---
id: boost-ds-007
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

queue

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/queue.png)

**FIFO (First In First Out)** 구조의 자료형으로 출구(front)와 입구(rear or back)가 따로 존재하여 먼저 입력된 데이터가 먼저 반환된다.

`push` 명령으로 rear 에 자료를 넣는다. rear += 1 되어 다음에 데이터를 받을 메모리를 가리켜야 한다. `pop` 명령으로 front 에서 데이터를 빼낸다. front += 1 되어 다음에 데이터를 반환할 메모리를 가리켜야 한다.

queue 는 CPU 연산처리 작업대기, 프린터 인쇄, 프로세스 관리 등 들어온 순서를 보장해야하는 경우 사용된다. 이외에도 BFS 알고리즘 등에 사용된다.

queue 의 rear 가 기리키는 공간에 데이터가 있는데 데이터를 push 하는 경우 `overflow`, 반대로 front 가 가리키는 공간에 데이터가 없는데 pop 하는 경우를 `underflow` 라고 한다.

**References**
- [[자료구조] 스택, 큐는 무엇인가? - 마이구미](https://mygumi.tistory.com/357)
- [[자료구조] 스택(Stack), 큐(Queue), 덱(Deque) - Choiiis](https://velog.io/@choiiis/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%8A%A4%ED%83%9DStack%EA%B3%BC-%ED%81%90Queue)
