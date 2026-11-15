---
id: boost-ml-010
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

SVM은 왜 반대로 차원을 확장시키는 방식으로 동작할까요? SVM은 왜 좋을까요?

## 해설

SVM(Support Vector Machine)은 데이터가 사상된 공간에서 **경계로 표현**되며, 공간상에 존재하는 **여러 경계 중 가장 큰 폭을 가진 경계를 찾는다.**

![SVM](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/svm.png)

- $B_1$: 결정 경계
- $b_{11}$: plus-plane
- $b_{12}$: minus-plane

SVM의 장단점은 다음과 같다.

| 장점                                              | 단점                                                                  |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| 분류와 회귀에 모두 사용할 수 있다.                | 데이터 전처리와 매개변수 설정에 따라 정확도가 달라질 수 있다.         |
| 신경망 기법에 비해 과적합 정도가 낮다.            | 예측이 어떻게 이루어지는지에 대한 이해와 모델에 대한 해석이 어렵다.   |
| 예측의 정확도가 높다.                             | 대용량 데이터에 대한 모델 구축 시 속도가 느리며,메모리 할당량이 크다. |
| 저차원과 고차원 데이터에 대해서 모두 잘 작동한다. |                                                                       |

> **마진(Margin)**

마진(Margin)은 plus-plane과 minus-plane 사이의 거리를 의미하며, **최적의 결정 경계는 마진을 최대화**한다.

SVM은 선형 분류뿐만 아니라 **비선형 분류**에도 사용되는데, 비선형 분류에서는 입력자료를 다차원 공간상으로 맵핑할 때 <strong>커널 트릭(kernel trick)</strong>을 사용하기도 한다. 원공간(Input Space)의 데이터를 선형분류가 가능한 고차원 공간(Feature Space)으로 매핑한 뒤 두 범주를 분류하는 초평면을 찾는다. (Kernel-SVM)

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/input-space-and-feature-space.png)

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/kernel-svm.png)

> **커널 트릭(Kernel Trick)**

커널 함수를 이용하여 **차원 공간(low dimensional space)을 고차원 공간(high dimensional space)으로 매핑해주는 작업**을 커널트릭이라 한다.

커널 함수의 종류는 다음과 같다.

![커널 함수의 종류](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/kernel-function.png)

**References**
- [서포트 벡터 머신 (Support Vector Machine) - ratsgo's blog](https://ratsgo.github.io/machine%20learning/2017/05/23/SVM/)
- [Kernel-SVM - ratsgo's blog](https://ratsgo.github.io/machine%20learning/2017/05/30/SVM3/)
- [Support Vector Machine (SVM)의 개념 - butter_shower](https://butter-shower.tistory.com/7)
- [Support Vector Machine (SVM, 서포트 벡터 머신) - Excelsior-JH](https://excelsior-cjh.tistory.com/66)
- [서포트 벡터 머신(Support Vector Machine) 쉽게 이해하기 - 아무튼 워라벨](http://hleecaster.com/ml-svm-concept/)
- [ADP 필기 올패키지 데이터 분석 전문가](https://search.shopping.naver.com/search/all?where=all&frm=NVSCTAB&query=ADP+%ED%95%84%EA%B8%B0+%EC%98%AC%ED%8C%A8%ED%82%A4%EC%A7%80+%EB%8D%B0%EC%9D%B4%ED%84%B0+%EB%B6%84%EC%84%9D+%EC%A0%84%EB%AC%B8%EA%B0%80)
