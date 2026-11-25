---
id: boost-py-006
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

How is memory managed in Python?

## 해설

Python은 모든 것을 객체로 관리한다. 객체가 더이상 필요하지 않으면 파이썬 메모리 관리자가 자동으로 객체에서 메모리를 회수하는 방식을 사용하므로, 파이썬은 **동적 메모리 할당** 방식을 사용한다고 말할 수 있다. <strong>힙(heap)</strong>은 동적할당을 구현하는데 사용된다. 힙을 사용하여 동적으로 메모리를 관리하면, 필요하지 않은 메모리를 비우고 재사용할 수 있다는 장점이 있다. 모든 파이썬 객체 또는 자료구조는 **python private heap** 공간에서 관리되며, 프로그래머는 이 공간에 접근할 수 없고, 대신 파이썬 인터프리터가 대신해서 관리한다.

> **더 자세히보기**

파이썬 객체에 대한 힙 공간 할당을 담당하는 것을 **파이썬 메모리 관리자(Python Memory Manager)** 라고 부른다. Python 메모리 관리자에는 객체별 할당자가있기 때문에 int, string 등과 같은 특정 객체에 대해 메모리를 명확하게 할당 할 수 있다. 또한, 사용되지 않는 모든 메모리를 재활용하고 힙 공간에서 사용할 수 있도록 하는 **내장 Garbage Collector(GC)** 를 가지고 있다.

**References**
- [[메모리 관리] 파이썬(Python)에서 메모리 관리하기 - DEVLOG/개발일기](https://deepwelloper.tistory.com/130)
- [파이썬 런타임과 메모리 관리 - muchogusto](https://velog.io/@muchogusto/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EB%9F%B0%ED%83%80%EC%9E%84%EA%B3%BC-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC)
