---
id: boost-dl-012
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

요즘 sigmoid 보다 ReLU를 많이 쓰는데 그 이유는?

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/activation-function.png)

우선 sigmoid와 ReLU 함수의 모양을 보자. sigmoid는 값이 큰 양수일수록 1에, 큰 음수일수록 0에 가까워진다. 반면 ReLU는 값이 양수이면 원래 값을 그대로 가져가고, 음수이면 0이다.

요즘 sigmoid보다 ReLU를 많이 쓰는 가장 큰 이유는 **기울기 소실 문제(Gradient Vanishing)** 때문이다. 기울기는 연쇄 법칙(Chain Rule)에 의해 국소적 미분값을 누적 곱을 시키는데, sigmoid의 경우 기울기가 항상 0과 1사이의 값이므로 이 값을 연쇄적으로 곱하게 되면 0에 수렴할 수 밖에 없다. 반면 ReLU는 값이 양수일 때, 기울기가 1이므로 연쇄 곱이 1보다 작아지는 것을 어느 정도 막아줄 수 있다.

다만, ReLU는 값이 음수이면, 기울기가 0이기 때문에 일부 뉴런이 죽을 수 있다는 단점이 존재한다. 이를 보완한 활성화 함수로 Leaky ReLU가 있다.

**References**
- [ML — sigmoid 대신 ReLU? 상황에 맞는 활성화 함수 사용하기 - Minkyeong Kim](https://medium.com/@kmkgabia/ml-sigmoid-%EB%8C%80%EC%8B%A0-relu-%EC%83%81%ED%99%A9%EC%97%90-%EB%A7%9E%EB%8A%94-%ED%99%9C%EC%84%B1%ED%99%94-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-c65f620ad6fd)
- [[히스] Gradient Vanishing 해결을 위한 ReLU 와 ResNet - boostcamp-ai-tech-4/peer-session](https://github.com/boostcamp-ai-tech-4/peer-session/issues/52)
- [딥러닝에서 사용하는 활성화함수 - reniew's blog](https://reniew.github.io/12/)
