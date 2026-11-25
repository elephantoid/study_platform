---
id: boost-dl-006
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

오버피팅일 경우 어떻게 대처해야 할까요?

## 해설

> **Early Stopping**

training loss는 계속 낮아지더라도 validation loss는 올라가는 시점을 overfitting으로 간주하여 학습을 종료하는 방법이다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/early-stopping.png)

> **Parameter Norm Penalty / Weight Decay**

비용함수에 제곱을 더하거나($L_2 Regularization$) 절댓값을 더해서($L_1 Regularization$) weight의 크기에 페널티를 부과하는 방법을 말한다.

$$
total cost = loss(D ; W) + \frac{\alpha}{2} \lVert W \rVert^2_2
$$

> **Data augmentation**

훈련 데이터의 개수가 적을 때, 데이터에 인위적으로 변화를 주어 훈련 데이터의 수를 늘리는 방법이다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/data-augmentation.png)

> **Noise robustness**

노이즈나 이상치같은 엉뚱한 데이터가 들어와도 흔들리지 않는(robust 한) 모델을 만들기 위해 input data나 weight에 일부러 노이즈를 주는 방법을 말한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/noise-robustness.png)

> **Label smoothing**

모델이 Ground Truth를 정확하게 예측하지 않아도 되게 만들어 주어 정확하지 않은 학습 데이터셋에 치중되는 경향(overconfident)을 막아주는 방법이다.

> **Dropout**

각 계층 마다 일정 비율의 뉴런을 임의로 정해 drop 시키고 나머지 뉴런만 학습하도록 하는 방법을 말한다. 매 학습마다 drop 되는 뉴런이 달라지기 때문에 서로 다른 모델들을 앙상블 하는 것과 같은 효과가 있다. dropout은 **학습 시에만 적용**하고, 추론 시에는 적용하지 않는다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/dropout.png)

> **Batch normalization**

활성화함수의 활성화값 또는 출력값을 정규화하는 방법이다. 각 hidden layer에서 정규화를 하면서 입력분포가 일정하게 되고, 이에 따라 Learning rate을 크게 설정해도 괜찮아진다. 결과적으로 학습속도가 빨라지는 효과가 있다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/batch-normalization.png)

**References**
- [인공신경망 ( ANN ) #6-3 최적화 : 오버피팅 방지( weight decay, droupout ) / 하이퍼파라미터 최적화 - 엄범](https://umbum.dev/222)
- [딥러닝6. Dropout & Early stopping을 통한 최적화 - 살아가는동안](https://m.blog.naver.com/jeonghj66/222004874975)
- [[딥러닝개념] 딥러닝 효과적으로 학습하기(2) (ft. regularization) - WE GONNA MAKE IT](https://wegonnamakeit.tistory.com/9)
- [[Label Smoothing] 요약 정리 - Computer Vision :)](https://cvml.tistory.com/9)
- [문과생도 이해하는 딥러닝 (10) - 배치 정규화 - 데이터 분석하는 문과생, 싸코](https://sacko.tistory.com/44)
