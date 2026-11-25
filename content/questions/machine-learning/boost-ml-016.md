---
id: boost-ml-016
topicId: machine-learning
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-ml-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

인공신경망(deep learning이전의 전통적인)이 가지는 일반적인 문제점은 무엇일까요?

## 해설

딥러닝 이전의 인공신경망은 선형적으로만 회귀, 분류를 수행하기 때문에 레이어를 깊게 쌓지 못했고, 때문에 XOR 문제 같은 복잡한 문제를 풀지 못하는 문제점이 있었다.

![XOR 문제](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/xor.png)

하지만 시그모이드와 같은 비선형 함수를 선형 모델에 추가하여 XOR 문제를 해결하고, 편미분 체인룰을 사용한 오차역전파 방법으로 모델을 업데이트할 수 있게 되면서 레이어를 깊게 쌓은 딥러닝 인공신경망이 발전하였다.

**References**
- [1.2 딥러닝 이전: 머신 러닝의 간략한 역사 - 텐서 플로우 블로그](https://tensorflow.blog/%EC%BC%80%EB%9D%BC%EC%8A%A4-%EB%94%A5%EB%9F%AC%EB%8B%9D/1-2-%EB%94%A5%EB%9F%AC%EB%8B%9D-%EC%9D%B4%EC%A0%84-%EB%A8%B8%EC%8B%A0-%EB%9F%AC%EB%8B%9D%EC%9D%98-%EA%B0%84%EB%9E%B5%ED%95%9C-%EC%97%AD%EC%82%AC/)
- [모두를 위한 딥러닝 - Sung Kim](https://www.youtube.com/watch?v=n7DNueHGkqE&list=PLlMkM4tgfjnLSOjrEJN31gZATbcj_MpUm&index=22)
