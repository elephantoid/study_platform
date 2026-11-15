---
id: boost-dl-015
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

ReLU의 문제점은?

## 해설

ReLU의 가장 큰 문제점은 바로 <strong>죽은 뉴런(Dead Neurons)</strong>이다. ReLU는 결과값이 음수인 경우 모두 0으로 취급하는데, back propagation시 기울기에 0이 곱해져 해당 부분의 뉴런은 죽고 그 이후의 뉴런 모두 죽게 된다. 이를 해결한 Leaky ReLU는 값이 음수일 때 조금의 음의 기울기를 갖도록 하여 뉴런이 조금이라도 기울기를 갖도록 한다. 또 다른 방법으로는 입력값에 아주 조금의 편향(bias)를 주어 ReLU를 왼쪽으로 조금 이동시키는 방법이 있다. 이렇게 되면 입력값은 모두 양수이므로 뉴런이 모두 활성화가 되어 뉴런이 죽지 않는다. 관련 내용은 [CS231n 6강 16:45](https://youtu.be/wEoyxE0GP2M?t=1005)를 참고!

두 번째 문제는 <strong>편향 이동(Bias Shift)</strong>이다. ReLU는 항상 0이상의 값을 출력하기 때문에 활성화값의 평균이 0보다 커 zero-centered하지 않다. 활성화값이 zero-centered되지 않으면 가중치 업데이트가 동일한 방향으로만 업데이트가 돼서 학습 속도가 느려질 수가 있다. 관련 내용은 [CS231n 6강 8:46](https://youtu.be/wEoyxE0GP2M?t=526)을 참고!

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/selu-elu.png)

이를 해결하기 위해 배치 정규화(Batch Normalization)을 사용하거나 zero-centered된 ELU, SeLU와 같은 활성화 함수를 사용한다.

**References**
- [Neural Network - Machine Learning Blog](https://nmhkahn.github.io/NN)
- [What are the disadvantages of using the ReLu when using Neural Networks? - Quora](https://www.quora.com/What-are-the-disadvantages-of-using-the-ReLu-when-using-Neural-Networks)
- [05-1. 심층 신경망 학습 - 활성화 함수, 가중치 초기화 EXCELSIOR](https://excelsior-cjh.tistory.com/177)
- [computer-vision-study-2020s/week3/week3.md - CoodingPenguin/computer-vision-study-2020s](https://github.com/CoodingPenguin/computer-vision-study-2020s/blob/master/week3/week3.md#lecture-6)
- [Activation Functions in Neural Networks - Kshitij Khurana](https://medium.com/@kshitijkhurana3010/activation-functions-in-neural-networks-ed88c56b611b)
- [A Gentle Introduction to the Rectified Linear Unit (ReLU)](https://machinelearningmastery.com/rectified-linear-activation-function-for-deep-learning-neural-networks/)
