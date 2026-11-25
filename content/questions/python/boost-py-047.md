---
id: boost-py-047
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

How to remove values to a python list?

## 해설

`remove()`, `pop()` 함수를 사용하여 list에 value를 삭제할 수 있다.

> **remove()**

`remove()`는 지우고자 하는 인덱스가 아닌, 값을 입력하는 방식이다. 만약 지우고자 하는 값이 리스트 내에 2개 이상이 있다면 순서상 가장 앞에 있는 값을 지우게 된다. 값을 삭제할 때 삭제된 값을 반환하지 않는다. `remove()`는 시간복잡도 $O(N)$를 갖는다.

```python
example = [1, 2, 3, 4, 5, 1]
example.remove(1)
print(example)  # [2, 3, 4, 5, 1]
```

> **pop()**

`pop()`은 리스트에서 지우고자 하는 값의 인덱스를 받아서 지우는 방식이다. 값을 삭제할 때 삭제된 값을 반환한다. 인덱스를 지정하지 않으면 리스트의 마지막 요소가 삭제되며 반환된다. `pop()`은 시간복잡도 $O(N)$를 갖는다.

```python
example = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(example.pop())  # 10
print(example)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

example = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(example.pop(3)) # 4
print(example)  # [1, 2, 3, 5, 6, 7, 8, 9, 10]
```

> **del**

`del list[i]` 형태로 사용하며, 시간복잡도 $O(N)$을 갖는다. 값을 삭제할 때 삭제된 값을 반환하지 않는다.

```python
example = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
del example[7]
print(example)  # [1, 2, 3, 4, 5, 6, 7, 9, 10]

example = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
del example[7:]
print(example)  # [1, 2, 3, 4, 5, 6, 7]
```

**References**
- [파이썬 자료형 별 주요 연산자의 시간 복잡도 (Big-O) - 초보몽키의 개발공부로그](https://wayhome25.github.io/python/2017/06/14/time-complexity/)
