---
id: boost-py-046
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

How to add values to a python list?

## 해설

`append()`, `extend()`, `insert()` 함수를 사용하여 list에 value를 추가할 수 있다.

> **append()**

`list.append(x)` 형태로 사용하며, $O(1)$의 시간복잡도를 갖는다. 괄호 안에 값을 입력하면 새로운 요소를 list 맨 끝에 추가한다. 요소를 추가할 때는 객체로 추가하게 되는데, 입력한 값이 리스트와 같은 반복 가능한 iterable 자료형이더라도 객체로 저장한다.

```python
nums = [1, 2, 3]
nums.append(4)
print(nums) # [1, 2, 3, 4]

nums.append([5, 6])
print(nums) # [1, 2, 3, 4, [5, 6]]
```

> **extend()**

`list.extend(iterable)` 형태로 사용하며, $O(N)$ 시간복잡도를 갖는다. 입력한 iterable 자료형의 항목 각각을 list의 끝에 하나씩 추가한다. iterable 자료형으로 추가되는 것이 아니라 iterable 자료형 안에 있는 항목이 하나씩 떼어져서 추가된다. append와 동일하게 요소를 list의 끝에 추가하지만 append와 다른 점은 괄호 안에는 iterable 자료형만 올 수 있다는 것이다. iterable 자료형이 아닌 경우 TypeError가 발생한다.

```python
nums = [1, 2, 3]
nums.extend([4])
print(nums) # [1, 2, 3, 4]

nums.extend([5, 6])
print(nums) # [1, 2, 3, 4, 5, 6]
```

> **insert()**

- 시간복잡도: ``

`list.insert(i, x)` 형태로 사용하며, $O(N)$ 시간복잡도를 갖는다. list의 원하는 위치 i 앞에 추가할 값 x를 삽입할 수 있다. i는 위치를 나타내는 인덱스를 숫자를 입력한다. 음수를 입력하면 배열의 끝을 기준으로 처리된다. 추가할 값 x는 객체로 추가되며 iterable 자료형이더라도 객체로 저장된다.

```python
nums = [1, 2, 3]
nums.insert(0, 10)
print(nums) # [10, 1, 2, 3]

nums.insert(-1, 99)
print(nums) # [10, 1, 2, 99, 3]

nums.insert(len(nums), [20, 30])
print(nums) # [10, 1, 2, 99, 3, [20, 30]]
```

> **`+` 연산자**

`list_1 + list_2` 형태로 사용하며, $O(1)$ 시간복잡도를 갖는다.

```python
nums = [1, 2, 4, 6, 1, 5]
print(nums + [10, 9, 8, 7]) # [1, 2, 4, 6, 1, 5, 10, 9, 8, 7]
```

**References**
- [파이썬 append( ), extend( ), insert( ) 함수 차이 / 요소추가함수 비교 (Python) - 영지공지](https://ooyoung.tistory.com/117)
- [파이썬 자료형 별 주요 연산자의 시간 복잡도 (Big-O) - 초보몽키의 개발공부로그](https://wayhome25.github.io/python/2017/06/14/time-complexity/)
