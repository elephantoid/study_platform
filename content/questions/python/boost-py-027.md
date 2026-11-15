---
id: boost-py-027
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

What is pickling and unpickling?

## 해설

우선 `직렬화(Serialization)`와 `역 직렬화(Deserialization)`의 개념을 알아야 한다. `직렬화`란 객체를 바이트 스트림(byte stream)으로 변환하여 디스크에 저장하거나 네트워크로 보낼 수 있도록 만들어주는 것을 말한다. 반대로 바이트 스트림을 파이썬 객체로 변환하는 것을 `역 직렬화`라고 한다.

**pickle 모듈**은 파이썬 객체의 직렬화와 역 직렬화를 수행하는 모듈이다. 이 때 파이썬 객체를 직렬화할 때를 `pickling`이라고 하며, 바이트 스트림을 역 직렬화할 때를 `unpickling`이라고 한다.

**References**
- [pickle — 파이썬 객체 직렬화 - Python Documentation](https://docs.python.org/ko/3/library/pickle.html)
- [The Python pickle Module: How to Persist Objects in Python - Real Python](https://realpython.com/python-pickle-module/)
