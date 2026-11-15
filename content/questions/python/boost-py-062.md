---
id: boost-py-062
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

Does python make use of access specifiers?

## 해설

파이썬은 다른 언어와 달리 private, protected 등의 접근 제한자를 직접 명시하지 않고 변수명을 통해 접근 제어를 한다.

접두사 _ 가 한 개 있는 경우에는 protected, 접두사 _ 가 두 개 있는 경우에는 private, 접두사 _ 가 없거나 접미사 _ 가 두 개 이상 있는 경우에는 public 이다.

**References**
- [[python] 접근 제어자 - 불곰](https://brownbears.tistory.com/112)
- [public, private, protect의 차이점 - Eureka Developer](https://eurekadeveloper.tistory.com/entry/public-private-protect%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90)
