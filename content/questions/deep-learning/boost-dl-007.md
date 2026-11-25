---
id: boost-dl-007
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

하이퍼 파라미터는 무엇인가요?

## 해설

하이퍼 파라미터(Hyper-parameter)는 모델링할 때, **사용자가 직접 세팅해주는 값**을 뜻한다. 하이퍼 파라미터는 정해진 최적의 값이 없으며, 사용자의 선험적 지식을 기반으로 설정(휴리스틱)한다. 예를들어 딥러닝의 하이퍼 파라미터에는 학습률, 배치 사이즈 등이 있고, 가중치는 학습 과정에서 바뀌는 값이며 이는 파라미터에 속한다. 하이퍼 파라미터 튜닝 기법에는 Manual Search, Grid Search, Random Search, Bayesian Optimization 등이 있다. 딥러닝에서의 하이퍼 파라미터는 아래의 그림을 참고한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/hyperparameter.png)

> **파라미터 vs 하이퍼 파라미터**

파라미터와 하이퍼 파라미터를 구분하는 기준은 사용자가 직접 설정하느냐 아니냐이다. **사용자가 직접 설정하면 하이퍼 파라미터, 모델 혹은 데이터에 의해 결정되면 파라미터**이다.

딥러닝에서 하이퍼 파라미터는 `학습률, 배치 크기, 은닉층의 개수` 등이 있고, 파라미터는 `가중치, 편향` 등이 있다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/parameter-vs-hyperparameter.png)

> **용어 정리**

- 선험적 지식: 경험하지 않아도 알 수 있는 것을 말한다.
- 휴리스틱: 체계적이면서 합리적인 판단이 굳이 필요하지 않은 상황에서 사람들이 빠르게 사용할 수 있도록, 보다 용이하게 구성된 간편추론의 방법이다. '대충 어림짐작하기', '눈대중으로 맞추기' 등의 방법을 일컫는다.

**References**
- [13.파라미터(Parameter)와 하이퍼 파라미터(Hyper parameter) - 귀퉁이 서재](https://bkshin.tistory.com/entry/%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D-13-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0Parameter%EC%99%80-%ED%95%98%EC%9D%B4%ED%8D%BC-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0Hyper-parameter)
- [하이퍼파라미터(Hyperparameter) - 도리의 디지털라이프](http://blog.skby.net/%ED%95%98%EC%9D%B4%ED%8D%BC%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0-hyperparameter/)
