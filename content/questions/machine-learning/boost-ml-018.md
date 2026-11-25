---
id: boost-ml-018
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

ROC 커브에 대해 설명해주실 수 있으신가요?

## 해설

ROC 커브는 **이진분류 모델의 성능**을 나타내는 지표이다.

모델이 참이라고 예측하는 경우는 **FPR** (False Positive Rate, 실제 값이 거짓일 때) 과 **TPR** (True Positive Rate, 실제 값이 참일 때) 두 경우로 나뉜다.  
FPR 과 TPR 을 그래프에서 x 축, y 축으로 동시에 표현한 ROC 커브를 통해 모델이 얼마나 옳은 값을 잘 예측하는지 알 수 있게 된다.

![ROC 커브](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/2-machine-learning/roc.png)

ROC 커브가 좌상단과 가까운 경우 좋은 모델이라고 판단할 수 있다. 모델이 FPR 은 낮게, TPR 은 높게 예측하기 때문이다.

**References**
- [ROC curve - 공돌이의 수학 정리 노트](https://angeloyeo.github.io/2020/08/05/ROC.html)
