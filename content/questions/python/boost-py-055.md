---
id: boost-py-055
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

Explain Inheritance in Python with an example.

## 해설

상속을 통해 상위 (부모) 클래스의 멤버 함수, 멤버 변수들을 모두 하위 (자식) 클래스가 가질 수 있다. 상위 클래스를 상속함으로써 코드 재사용성이 더 좋아지고, 관리가 용이해진다.

파이썬은 부모 클래스 A 를 자식 클래스 B 가 상속하는 **Single Inheritance**,
부모 클래스 A 를 자식 클래스 B 가 다시 B 를 자식 클래스 C 가 상속하는 **Multi-level Inheritance**,
부모 클래스 A 가 여러 자식 클래스에 상속되는 **Hierarchical Inheritance**,
하나의 자식 클래스가 여러 부모 클래스를 상속하는 **Multiple Inheritance** 가 있다.
