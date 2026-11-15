---
id: boost-py-067
topicId: python
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
- ds
reviewTarget:
  noteId: boost-py-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

What is GIL in Python language?

## 해설

멀티쓰레딩을 할 때, 공유 자원에 대해 여러 쓰레드가 동시에 접근한다면 갱신된 내용이 유실되는 등의 문제가 발생할 수 있다. 이를 막기 위해 파이썬은 GIL (Global Interpreter Lock) 을 통해 python interpreter 에 한 쓰레드만 접근하여 모든 자원을 사용할 수 있게 한다.

정확히는 멀티 쓰레드가 bytecode(=instruction) 한 라인씩을 들고 있기 때문에, 한 쓰레드의 bytecode 한 줄에 대해서만 GIL 은 허용한다.

**References**
- [[python] GIL, Global interpreter Lock은 무엇일까? - 수학과의 좌충우돌 프로그래밍](https://ssungkang.tistory.com/entry/python-GIL-Global-interpreter-Lock%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C)
- [왜 Python에는 GIL이 있는가 - 개발새발블로그](https://dgkim5360.tistory.com/entry/understanding-the-global-interpreter-lock-of-cpython)
