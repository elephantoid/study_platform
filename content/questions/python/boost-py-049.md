---
id: boost-py-049
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

What is the difference between deep and shallow copy?

## 해설

Shallow copy는 **새로운 객체(변수)를 만든 후에 원본에 접근할 수 있는 참조(reference)를 입력**한다. 이런 경우 서로 다른 변수명이지만 본질적으로 서로 같은 대상을 의미하므로 하나의 변수 역시 수정이 된다.

가변형(mutable) 자료형에 대해서 적용이 가능하다. 가변형(mutable) 자료형은 같은 주소에서 값(value)이 변경 가능하기 때문에 얕은 복사가 가능하다. 반면 불변형(immutable) 자료형은 본질적으로 변경이 불가능하므로 재배정을 통해 변수를 바꾼다. 따라서 재배정이 이루어지므로 객체가 서로 달라진다.

```python
a = [1, 2, 3, 4, 5]
b = a    # shallow copy
a[1] = 10
print(a, b) # [1, 10, 3, 4, 5] [1, 10, 3, 4, 5]
```

Deep copy는 **새로운 객체(변수)를 만든 뒤에 원본의 복사본을 변수에 입력**한다. 서로 값만 같을 뿐 본질적으로 서로 다르기 때문에 한 변수가 수정될 시 다른 변수가 수정되지 않는다.

```python
a = [1, 2, 3, 4, 5]
b = a[:]    # deep copy
a[1] = 10
print(a, b) # [1, 10, 3, 4, 5] [1, 2, 3, 4, 5]
```

```python
import copy
a = [1, 2, 3, 4, 5]
b = copy.deepcopy(a)    # deep copy
a[1] = 10
print(a, b) # [1, 10, 3, 4, 5] [1, 2, 3, 4, 5]
```

**References**
- [[Python]Shallow copy & Deep copy - 박현희](https://velog.io/@hyoniii_log/PythonShallow-copy-Deep-copy/)
