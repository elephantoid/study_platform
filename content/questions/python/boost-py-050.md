---
id: boost-py-050
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

How is Multithreading achieved in Python?

## 해설

파이썬에서 멀티 쓰레드를 구현하는 방법은 `threding 모듈(High level)`을 사용하거나 `thread 모듈(Low level)`을 사용하는 방법이 있다. 현재 thread 모듈은 deprecated 되어 threading 모듈을 사용하는 것을 권장한다.

멀티스레딩을 사용하면 당연히 속도가 빨라질 것이라 생각할 수 있지만, 파이썬의 GIL(Global Interpreter Lock) 정책으로 인해, 멀티스레딩을 사용한다 하더라도, 속도는 싱글스레드와 별반 다르지 않다.

하나의 자원에 여러 프로세스가 아무런 규칙없이 접근하면, 자원 동기화 문제가 발생할 수 있다. 이를 방지하기 위해서 자원에 lock을 두는데, Python은 모든 자원의 lock을 global하게 관리하고 있다. 한번에 하나의 스레드만 자원에 접근할 수 있다는 것이다. 이로인해, 자원을 공유하는 여러 스레드를 동시에 실행시킨다고 해도, 결국 GIL 때문에 한번에 하나의 스레드만 실행되는 것이다.

> **💡 멀티스레딩이 유용한 경우**  
> GIL은 cpu 동작에 대해서만 적용된다. 쓰레드가 cpu 동작을 마치고 I/O 작업을 실행하는 동안에는 다른 쓰레드가 cpu 동작을 동시에 실행할 수 있다. 따라서 cpu 동작이 많지 않고 I/O동작이 더 많은 프로그램에서는 멀티 쓰레드만으로 성능적으로 큰 효과를 얻을 수 있다.

**References**
- [[Python] 파이썬 멀티 쓰레드(thread)와 멀티 프로세스(process) by Nathan Kwon](https://monkey3199.github.io/develop/python/2018/12/04/python-pararrel.html)
- [[운영체제] Concurrency : locks- blackinkgj](https://blackinkgj.github.io/Locks/)
- [What is GIL in Python language?](#67)
