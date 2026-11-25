---
id: boost-py-028
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

What are the generators in python?

## 해설

제너레이터(Generator)란 Iterator 객체를 간단히 만들 수 있는 함수를 말한다. 제너레이터는 다음과 같이 1) yield문과 함수, 2) 표현식 형태로 만들 수 있다.

> **방법 1. yield문과 함수**

- 제너레이터 함수 정의

```python
def generator_list(value):
    for i in range(value):
        # 값을 반환하고 여기를 기억
        yield i
```

- 제너레이터 객체 생성 및 next 함수로 호출

```python
gen = generator_list(2)
print(next(gen))    # 0
print(next(gen))    # 1
print(next(gen))    # StopIteration 에러 발생
```

> **방법 2. 표현문**

```python
value = 2
gen = (i for i in range(value))
print(next(gen))    # 0
print(next(gen))    # 1
print(next(gen))    # StopIteration 에러 발생
```

그럼 왜 리스트 대신 제너레이터를 사용할까? 리스트를 사용하면 리스트의 크기만큼 메모리에 공간이 할당된다. 반면 제너레이터는 말그대로 next 함수로 호출될 때 값을 생성하고 해당 값만 메모리에 올린다! 즉, 메모리를 절약할 수 있다. 작은 데이터라면 상관없지만 큰 데이터에서는 제너레이터 사용이 필수이다.

**References**
- [🐍 제너레이터(Generator) - 코딩하는펭귄의 저장소](https://cooding-penguin.netlify.app/python/generator/)
- [How to Use Generators and yield in Python - Real Python](https://realpython.com/introduction-to-python-generators/)
