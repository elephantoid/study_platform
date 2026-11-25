---
id: boost-py-036
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

What is a dictionary in Python?

## 해설

딕셔너리는 **key값과 그에 대응하는 value값을 얻을 수 있는 컬렉션**을 말한다. 딕셔너리는 데이터가 들어온 순서가 상관이 없고, 인덱싱이 되어 있어 key값으로 요소에 접근하여 데이터(= value) 수정이 가능하다. 하지만, key값은 고유 값이므로 key값 중복은 불가능하다. 주로 자체적으로 만든 key값으로 데이터에 접근하고 싶을 때 딕셔너리 컬렉션을 사용한다.

딕셔너리의 뜻은 사전이다. 영한 사전에서 각 영단어(ex. beautiful)에 대응하는 단어(ex. 아름다운)가 나오는 것처럼, 영단어가 key값이고 그에 대응하는 단어를 value값으로 볼 수 있다.

> **특징1** : 딕셔너리는 {, }를 사용하여 선언하며 { key1 : value1, key2 : value2, ... } 로 요소를 나타낸다.

- key값으로 변하지 않는 값을 사용하고, value값으로 변하는 값과 변하지 않는 값 둘 다 사용할 수 있다.
- key값으로 리스트를 사용하면, 값이 변할 가능성이 있기 때문에 인터프리터에서 type error를 발생시킨다.

```python
ex1 = {'name':'Groot', 'lover':'penguin', 'feature':'really cute'}

# 딕셔너리 생성자로 집합을 생성하는 경우
ex2 = dict(name='Groot', lover='penguin', feature='really cute')

# key값은 변하지 않는 값, value값은 변하지 않는 값과 변하는 값 둘 다 가능
ex3 = {[10, 3]:'birthday'}	# type error!
```

> **특징2** : 딕셔너리는 딕셔너리 쌍(key : value)을 추가하거나 제거할 수 있다.

- 추가 : dict_ex[ 새로운 key값 ] = 그에 대응하는 value값으로 추가할 수 있다.
- 제거 : del 키워드를 이용해 특정 쌍을 제거할 수 있다.
  - 딕셔너리 앞에 del 키워드를 쓰면 딕셔너리가 완전히 제거된다.

```python
ex = {'Kevin':180, 'Anna':165, 'Penelope':175}

# 새로운 딕셔너리 쌍 추가
ex['Groot'] = 100
print(ex)		# {'Kevin': 180, 'Anna': 165, 'Penelope': 175, 'Groot': 100}

# del 키워드로 딕셔너리 쌍 제거
del ex['Penelope']
print(ex)		# {'Kevin': 180, 'Anna': 165, 'Groot': 100}

# del 키워드로 딕셔너리 완전 제거
del ex
print(ex)       	# name error!
```

> **특징3** : 딕셔너리의 key값은 중복될 수 없다.

- key값은 고유값이므로 2개 이상의 key값이 존재할 수 없다.
  - key값에 해당하는 value값을 어떤 걸 불러야할지 모르기 때문.
- key값이 중복될 경우 하나를 제외한 나머지 것들이 모두 무시된다.
  - key값에 대입한 최근의 value값을 불러온다.

```python
ex = {'name': 'Groot', 'lover': 'Penguin', 'feature': 'cute', 'feature': 'handsome'}

print(ex)  # {'name': 'Groot', 'lover': 'Penguin', 'feature': 'handsome'}
```

**References**
- [Python Dictionaries - w3schools](https://www.w3schools.com/python/python_dictionaries.asp)
