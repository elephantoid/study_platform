---
id: boost-py-045
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

What advantages do NumPy arrays offer over (nested) Python lists?

## 해설

numpy array는 하나의 데이터 타입만 정의가 가능하다. Python list와 달리 다이나믹 타이핑을 지원하지 않으며, C의 Array를 사용하여 배열을 생성하기 때문에 속도가 빠르다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/4-python/numpy-array.png)

Python list는 데이터 주소값을 저장하고 데이터를 가져올 때는 해당 주소에 가서 데이터를 가져온다. 반면 Numpy array는 C의 배열과 유사하여 연속된 주소를 가지고 있어 데이터를 가져올 때는 순서대로 가져오면 되기 때문에 메모리를 효율적으로 사용한다.

Numpy에 대한 내용은 [#66. Numpy](#66) 참고!

**References**
- [[python] numpy array 특징과 사용법 - 밀래의 코딩북](https://firework-ham.tistory.com/31)
