---
id: boost-py-010
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

What are local variables and global variables in Python?

## 해설

**전역 변수(Global Variable)**는 함수 외부 또는 전역 공간에 선언된 변수이다. 프로그램의 모든 함수에서 전역변수에 접근할 수 있다. ([Whenever Python exits, why isn’t all the memory de-allocated?](#35) 참고)

**로컬 변수(Local Variable)**는 함수 내부에 선언된 변수를 말한다. 로컬 변수는 전역 공간이 아닌 로컬 공간에 있다.

```python
a=2
def add():
    b=3
    c=a+b
    print(c)
add()

# 출력: 5

# global var: a
# local var: b, c
```

`add()` 함수의 외부에서 `add()` 함수의 로컬 변수에 액세스하려고 하면 오류가 발생한다.
