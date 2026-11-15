---
id: boost-py-057
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

What is monkey patching in Python?

## 해설

주로 테스트를 위해 많이 사용되는 방법으로, 어떤 클래스나 모듈의 일부 (함수나 변수 등) 를 로컬에서 런타임으로만 instance 를 통해 수정하는 방법을 말한다.

예시로 heath.py 파일의 A 클래스에 a 라는 함수가 있는데, 다른 파일에서 A 를 import 하여 a 함수 대신 new_a 를 할당하여 사용하는 방법이 있다.

```python
from heath import A

A.a = new_a
my_A = A() # A 클래스 객체 할당
my_A.a # new_a 가 동작
```

**References**
- [Python - Monkey Patch - IT 초보](https://newbiestory.tistory.com/60)
