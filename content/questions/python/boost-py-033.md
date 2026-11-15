---
id: boost-py-033
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

What is the purpose of is, not and in operators?

## 해설

`is`는 객체 비교 연산자(identity operator)로 두 변수가 참조하는 객체의 id가 같을 경우 **True**를 반환한다. 보통 두 변수가 참조하는 객체가 동일한 객체인지 확인할 때 사용한다.

```python
a = [1, 2, 3]
b = a
c = a.copy()

print(a is b) # True
print(a is c) # False
```

`not`은 단항 논리 연산자(logical operator)로 뒤에 오는 boolean 값을 뒤집는다. 뒤에 오는 값이 **True**이면 **False**를, **False**이면 **True**를 반환한다.

```python
print(not True)   # False
print(not False)  # True
```

`in`은 멤버 연산자(membership operator)로, 요소 a와 시퀀스 b가 있는 지를 확인하고 싶을 때 `a in b`로 표현하며 만약 a가 b 안에 있다면 **True**를, 없으면 **False**를 반환한다.

```python
b = "abc"
print("a" in b) # True
print("z" in b) # False
```

**References**
- [Python Operators - w3schools](https://www.w3schools.com/python/python_operators.asp)
