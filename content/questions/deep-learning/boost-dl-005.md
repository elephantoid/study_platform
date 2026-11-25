---
id: boost-dl-005
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

알고있는 Activation Function에 대해 알려주세요. (Sigmoid, ReLU, LeakyReLU, Tanh 등)

## 해설

> **Sigmoid**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/sigmoid.png)

sigmoid 함수는 $s(z) = \frac{1}{1 + e^{-z}}$로, 입력을 0~1 사이의 값으로 바꿔준다.

입력 값이 크거나 작을 때 기울기가 0에 가까워지는 `saturation` 문제가 있다. 이는 `gradient vanishing` 문제를 야기하므로 요즘에는 활성화 함수로서 잘 사용되지 않는다.

또한 값이 `zero-centered` 가 아니기 때문에 입력값의 부호에 그대로 영향을 받으므로 경사하강법 과정에서 정확한 방향으로 가지 못하고 지그재그로 움직이는 문제가 있다. ([12-3 참고](#12-3))

> **Tanh**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/tanh.png)

tanh 함수는 입력을 -1~1 사이의 값으로 바꿔준다. sigmoid 함수와 마찬가지로 `saturation` 문제가 있다.

**> ReLU**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/relu.png)

ReLU 함수는 $f(x) = max(0, x)$으로, 입력이 양수면 그대로, 음수면 0을 출력한다. 계산 효율과 성능에서 뛰어난 성능을 보여 가장 많이 사용되는 활성화 함수이다. 양의 입력에 대해서는 `saturation` 문제가 발생하지 않는다. 음의 입력 값에 대해서는 어떤 업데이트도 되지 않는 `Dead ReLU` 문제가 발생한다.

> **Leaky ReLU**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/leaky-relu.png)

>

Leaky ReLU는 $f(x) = max(0.01x, x)$으로, ReLU 와 마찬가지로 좋은 성능을 유지하면서 음수 입력이 0이 아니게 됨에 따라 `Dead ReLU` 문제를 해결하였다.

**References**
- [Activation Functions에 대해 알아보자 - Steve-Lee's Deep Insight](https://deepinsight.tistory.com/113)
- [[신경망] 6. 활성화 함수 (Activation Function) - 분석벌레의 공부방](https://analysisbugs.tistory.com/55)
