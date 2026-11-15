---
id: boost-py-023
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

What’s the difference between iterator and iterable?

## 해설

```python
lst = [1, 2]            # iterable 객체 : 리스트
lst_iter = iter(lst)    # iterator 객체

print(next(lst_iter))   # 1
print(next(lst_iter))   # 2
print(next(lst_iter))   # StopIteration 예외 발생
```

iterable 객체는 `iter` 함수에 인자로 전달 가능한, 반복 가능한 객체를 말한다. 예를 들면, 리스트(list), 딕셔너리(dictionary), 집합(set), 문자열(string) 등이 있다.

iterable 객체를 `iter` 함수의 인자로 넣으면 iterable 객체를 순회할 수 있는 객체를 반환하는데, 이것이 iterator 객체이다. iterator 객체를 `next` 함수의 인자로 주면 iterable 객체의 요소의 값을 차례대로 반환한다. 만약 iterable 객체를 모두 순회했다면, _StopIteration_ 예외를 발생시킨다. 만약 다시 순회를 하고 싶다면 `iter` 함수로 새로운 iterator 객체를 생성해주면 된다.

**References**
- [🐍 제너레이터(Generator) - 코딩하는펭귄의 저장소](https://cooding-penguin.netlify.app/python/generator/)
- [Iterable 과 Iterator - 파이썬 - 기본을 갈고 닦자!](https://wikidocs.net/16068)
