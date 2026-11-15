---
id: boost-dl-014
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

ReLU로 어떻게 곡선 함수를 근사하나?

## 해설

ReLU는 양수일 때 <!-- $y=x$ --> <img style="transform: translateY(0.1em); background: white;" src="https://render.githubusercontent.com/render/math?math=y%3Dx">인 선형 함수와 음수일 때 <!-- $y=0$ --> <img style="transform: translateY(0.1em); background: white;" src="https://render.githubusercontent.com/render/math?math=y%3D0">인 선형 함수 두 개를 결합된 형태이다. 그렇지만 ReLU는 선형 함수가 갖는 가산성을 만족하지 못하기 때문에 비선형 함수로 볼 수 있다. 하지만 ReLU가 어떻게 곡선 함수를 근사할 수 있을까?

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/relu-approximate.png)

ReLU를 여러 개 결합하면, 특정 지점에서 특정 각도만큼 선형 함수를 구부릴 수 있다. 이 성질을 이용하여 곡선 함수 뿐만 아니라 모든 함수에 근사를 할 수 있게 된다.

**References**
- [활성화 함수(Activation function) 설명 (Sigmoid, ReLU, LeakyReLU, tanh) - 별보는두더지](https://mole-starseeker.tistory.com/m/39)
- [Q2) Sigmoid 보다 ReLu를 많이 쓰는 이유? - JINSOL KIM](https://gaussian37.github.io/math-question-q2/)
- [How do ReLU Neural Networks approximate any continuous function? - towards data science](https://towardsdatascience.com/how-do-relu-neural-networks-approximate-any-continuous-function-f59ca3cf2c39)
- [Finally, an intuitive explanation of why ReLU works](https://towardsdatascience.com/if-rectified-linear-units-are-linear-how-do-they-add-nonlinearity-40247d3e4792)
