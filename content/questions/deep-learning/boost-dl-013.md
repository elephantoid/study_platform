---
id: boost-dl-013
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

Non-Linearity라는 말의 의미와 그 필요성은?

## 해설

비선형(non-linearity)의 뜻을 알기 위해서는 우선 선형(linearity)가 무엇인지 알아야 한다. 어떤 모델이 선형적(linearity)라고 한다면 그 모델은 변수 $x_1, x_2, ... , x_n$과 가중치 $w_1, w_2, ... , w_n$으로 $y = w_1 * x_1 + w_2 * x_2 + ... + w_n * x_n$으로 표현할 수 있으며, 가산성(Additreivityly)과 동차성(Homogeneity)을 만족해야 한다.

- **가산성**: 임의의 수 $x, y$에 대해 $f(x+y) = f(x) + f(y)$가 성립
- **동차성**: 임의의 수 $x, \alpha$에 대해 $f(\alpha x) = \alpha f(x)$가 성립

이를 만족하지 못하는 모델을 비선형 관계에 있는 모델이라고 한다.

딥러닝에서 이런 비선형 관계는 활성화 함수(activation function)을 도입함으로써 표현할 수 있다. 그럼 비선형 관계 즉, 활성화 함수가 왜 필요할까? 바로 **활성화 함수를 사용해 여러 층을 쌓아서 더 복잡한 표현을 하기 위해서**이다. 활성화 함수가 $h(x) = cx$인 선형 함수라고 생각해보자. 이 때 $n$개의 층을 쌓았다고 할 때, 모델은 $y = h^n(x) = c^nx$로 나타낼 수 있다. $c^n=k$라는 상수로 치환하면 결국 1층을 가진 신경망과 동일하다. 그렇기 때문에 비선형인 활성화 함수가 필요한 것이다.

**References**
- [[밑바닥 딥러닝] 신경망 - 코딩하는펭귄의 저장소](https://cooding-penguin.netlify.app/dl-from-scratch/neural-network/#%EB%B9%84%EC%84%A0%ED%98%95-%ED%95%A8%EC%88%98)
- [선형성 - 위키백과](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%98%95%EC%84%B1)
