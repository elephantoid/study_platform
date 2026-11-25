---
id: boost-py-005
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

What is pep 8?

## 해설

PEP(Python Enhancement Proposal)는 Python 코드를 포맷하는 방법을 지정하는 규칙 집합이다. 다른 사람과 원활하게 협업하려면 공통된 스타일 공유가 필요하며, 일관성 있는 스타일은 나중에 수정하기도 쉽다. PEP8은 파이썬 코드를 어떻게 구성할 지 알려주는 스타일 가이드로서의 역할을 한다. Python formatting tool에는 `black`, `flake8`, `autopep8`, `yamf` 등이 있다.

> **PEP8 스타일 가이드 예시**

- whitespace
  - 한 줄의 문자 길이가 79자 이하여야 한다.
  - 함수와 클래스는 빈 줄 두개로 구분한다.
- naming
  - 함수, 변수, 속성 : `lowercase_underscore`
  - 보호(protected) 인스턴스 속성 : `_leading_underscore`
  - 비공개(private) 인스턴스 속성 : `__double_leading_undersocre`

**References**
- [파이썬 PEP8 스타일 가이드 - 초보몽키의 개발공부로그](https://wayhome25.github.io/python/2017/05/04/pep8/)
