---
id: jbee-ml-001
topicId: machine-learning
sourceId: jbee-interview-beginner
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: jbee-ml-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_notes@1
  at: '2026-11-17'
---

## 문제

Cost Function에 대해 설명하세요.

## 해설

### [ 비용 함수 (Cost Function) ]
**Cost Function**이란 **데이터 셋**과 어떤 **가설 함수**와의 오차를 계산하는 함수이다. Cost Function의 결과가 작을수록 데이터셋에 더 **적합한 Hypothesis**(가설 함수)라는 의미다. **Cost Function**의 궁극적인 목표는 **Global Minimum**을 찾는 것이다.

### [ 선형회귀 (linear regression)에서의 Cost Function ]

| X   | Y   |
| --- | --- |
| 1   | 5   |
| 2   | 8   |
| 3   | 11  |
| 4   | 14  | 

위의 데이터를 가지고 우리는 우리가 찾아야할 그래프가 일차방정식이라는 것을 확인할 수 있고 `y=Wx + b`라는 식을 세울수 있고 `W(weight)`의 값과 `b(bias)`의 값을 학습을 통해 우리가 찾고자한다. 이때 **Cost Function**을 사용하는데 `W`와 `b`의 값을 바꾸어 가면서 그린 그래프와 학습 데이터의 그래프들 간의 값의 차이의 가장 작은 값 즉 **Global Minimum**을 **경사하강법(Gradient descent algorithm)**을 사용해 찾는다.

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._
