---
id: boost-ds-006
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

stack

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/stack.png)

**LIFO (Last In First Out)** 구조의 자료형으로 한 쪽으로만 데이터를 넣고 뺄 수 있다. `push` 명령으로 데이터를 넣고, `pop` 명령으로 가장 마지막에 들어간 데이터를 빼낸다.

stack 은 브라우저의 뒤로가기 기능, ctrl + z (되돌리기), 지역 변수와 매개변수를 저장하는 stack 메모리 등에 사용된다. 이외에도 DFS 알고리즘 등 다양한 곳에 사용되는 자료형이다.

stack 에 데이터가 꽉 차서 더 넣을 공간이 없는데 데이터를 push 하는 경우 `overflow`, 반대로 데이터가 없는데 pop 하는 경우를 `underflow` 라고 한다.

**References**
- [[자료구조] 스택, 큐는 무엇인가? - 마이구미](https://mygumi.tistory.com/357)
- [[자료구조] 스택(Stack), 큐(Queue), 덱(Deque) - Choiiis](https://velog.io/@choiiis/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%8A%A4%ED%83%9DStack%EA%B3%BC-%ED%81%90Queue)
