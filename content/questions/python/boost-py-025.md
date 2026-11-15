---
id: boost-py-025
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

What is the difference between range & xrange?

## 해설

> _파이썬2에서는 `range`와 `xrange` 모두 존재하지만, 파이썬3부터는 `range`가 내부적으로 `xrange`로 동작하도록 바뀌어서 `range`만 존재한다. 그러므로 **파이썬2**를 기준으로 `range`와 `xrange`를 설명한다._

`range` 객체는 입력으로 받은 정수 범위의 값을 요소로 같는 리스트를 말한다. 그러므로 `range(3)`과 ` [0, 1, 2]`는 완전히 동일하다.

```python
# python2
r = range(5)
print(r)            # [0, 1, 2, 3, 4]
print(type(r))      # <type 'list'>
```

`xrange`는 제너레이터 객체로, 오직 루프를 돌때만 해당 범위의 정수를 하나씩 반환한다. 제너레이터에 관한 설명은 [여기](#28)에서!

```python
#python2
r = xrange(5)
print(r)            # xrange(5)
print(type(r))      # <type 'xrange'>

for i in r:
    print i,
# >> 0 1 2 3 4
```

**References**
- [python range() 와 xrange() 차이 - ㅍㅍㅋㄷ](https://bluese05.tistory.com/57)
- [[python] range, xrange 차이 - 코딩장이](https://itholic.github.io/python-range-xrange/)
- [range() vs xrange() in Python - GeeksforGeeks](https://www.geeksforgeeks.org/range-vs-xrange-python/)
