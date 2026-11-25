---
id: boost-py-015
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

What is the difference between Python Arrays and lists?

## 해설

Python에서는 array과 list가 동일한 방식으로 데이터를 저장한다. 차이점은, 배열은 단일 데이터 타입 요소만 포함할 수 있는 반면, 리스트에는 다양한 타입의 요소들이 들어갈 수 있다는 것이다. array의 선언 방법은 `arrayName = array(type, [Values])`처럼 자료형을 정하고, 지정한/동일한 자료형만을 넣을 수 있도록 되어있다. list은 변수에 `[]`로 여러 타입의 변수를 묶어서 선언할 수 있다.

array에서 사용할 수 있는 타입은 아래와 같다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/4-python/array-type.png)

```python
import array as arr

My_Array=arr.array('i',[1,2,3,4])
My_list=[1,'abc',1.20]
print(My_Array)
print(My_list)

# Output: array(‘i’, [1, 2, 3, 4]) [1, ‘abc’, 1.2]
```

**References**
- [파이썬[Python] 036 Array(배열) 사용하기 - SmartLeader 끔손](https://appia.tistory.com/125)
