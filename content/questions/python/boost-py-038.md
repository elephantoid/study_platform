---
id: boost-py-038
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

What does this mean: `*args`, `**kwargs`? And why would we use it?

## 해설

`*args`는 함수에 전달되는 argument의 수를 알 수 없거나, list나 tuple의 argument들을 함수에 전달하고자 할 때 사용한다.

파이썬에서는 어디서부터 어디까지 `*args`에 담아야 할지 알 수 없기 때문에, 일반 변수를 앞에 두고 그 뒤에 `*args`를 지정해 주어야 한다.

```python
def name(*args):
    print(args)

name("샐리", "펭귄", "히스", "원딜")
# output: ('샐리', '펭귄', '히스', '원딜')
```

`**kwargs`는 함수에 전달되는 keyword argument의 수를 모르거나, dictionary의 keyword argument들을 함수에 전달하고자 할 때 사용한다.

`*args`와 `**kwargs`를 함께 사용하는 경우 `*args`를 `**kwargs`보다 앞에 두어야 한다.

```python
def name(**kwargs):
    print(kwargs)

name(sally="샐리", penguin="펭귄", heath="히스", adc="원딜")
# output: {'sally': '샐리', 'penguin': '펭귄', 'heath': '히스', 'adc': '원딜'}
```

일반 변수, `*args`, `**kwargs`를 모두 사용하는 경우 다음과 같은 순서를 따른다.

```python
def function_name(일반변수, *args, **kwargs)
```

**References**
- [[Python] \*args와 \*\*kwargs - Jun94](https://velog.io/@hj8853/Python-args%EC%99%80-kwargs)
