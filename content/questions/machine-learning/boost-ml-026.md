---
id: boost-ml-026
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

좋은 모델의 정의는 무엇일까요?

## 해설

한 줄로 요약하자면, 좋은 모델은 **데이터의 패턴을 잘 학습한 모델**로서, **한번도 본적 없는 데이터에 대해 옳은 판단을 내리는 모델**이 좋은 모델이라고 할 수 있다.

머신러닝, 딥러닝 등을 사용하여 모델을 생성하는 이유는 `기계가 사람 대신 어떠한 결정을 내리기 위함`이다. 따라서 모델은 `결정을 대신하는 기계, 결정기`라고 볼 수 있다.
이 관점에서, 좋은 결정(옳은 결정)을 내리는 모델이 좋은 모델이다. 주어진 학습 데이터에 과적합된 모델의 경우, 주어진 데이터와 조금만 다른 데이터가 들어오면 제대로 분류하지 못하는 상황이 발생된다.
그러므로 **모델의 일반화**가 이루어져, 새로운 데이터에 대해서도 적정한 수준의 성능을 보이는 모델이 좋은 모델이라고 할 수 있다.

예를들어, 예측이 목적이라면, 실제 정답과 예측 값의 차이(loss, cost, error)를 최소화 하는 모델이 가장 좋은 모델이다. 또한 확률을 추정하는 경우에는 가능성(likelihood)을 최대화하는 모델이 좋은 모델이라고 할 수 있다.

**References**
- [머신러닝의 모델평가와 모델선택, 알고리즘 선택 - 텐서플로우 블로그](https://tensorflow.blog/%EB%A8%B8%EC%8B%A0-%EB%9F%AC%EB%8B%9D%EC%9D%98-%EB%AA%A8%EB%8D%B8-%ED%8F%89%EA%B0%80%EC%99%80-%EB%AA%A8%EB%8D%B8-%EC%84%A0%ED%83%9D-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%84%A0%ED%83%9D-1/)
- [3.머신러닝의 주요 개념-모델 - Aiden](https://isme2n.github.io/devlog/2017/10/27/machine-learning-3/)
- [모델 학습 방법과 일반화 성능 - 인생의 굴레에서1](https://dragsoseumon.tistory.com/34)
