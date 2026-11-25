---
id: boost-dl-020
topicId: deep-learning
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-dl-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

Back Propagation에 대해서 쉽게 설명 한다면?

## 해설

역전파 알고리즘은 Loss에 대한 입력값의 기울기(미분값)를 출력층 layer에서부터 계산하여 거꾸로 전파시키는 것이다.

이렇게 거꾸로 전파시켜서 최종적으로 출력층에서의 output값에 대한 입력층에서의 input data의 기울기 값을 구할 수 있다.

이 과정에서 **chain rule**이 이용된다.

출력층 바로 전 layer에서부터 기울기(미분값)을 계산하고 이를 점점 거꾸로 전파시키면서 전 layer들에서의 기울기와 서로 곱하는 형식으로 나아가면 최종적으로 출력층의 output에 대한 입력층에서의 input의 기울기(미분값)을 구할 수가 있다. 이를 그림으로 나타내면 아래와 같다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/backpropagation.png)

역전파 알고리즘이 해결한 문제가 바로 파라미터가 매우 많고 layer가 여러개 있을때 가중치w와 b를 학습시키기 어려웠다는 문제이다.

이는 역전파 알고리즘으로 각 layer에서 기울기 값을 구하고 그 기울기 값을 이용하여 Gradient descent 방법으로 가중치w와 b를 update시키면서 해결되었다.

**References**
- [딥러닝 역전파 backpropagation이란? - 프라이데이](https://ganghee-lee.tistory.com/31)
- [3.14. 순전파(forward propagation), 역전파(back propagation), 연산 그래프 - Dive into Deep Learning](https://ko.d2l.ai/chapter_deep-learning-basics/backprop.html)
