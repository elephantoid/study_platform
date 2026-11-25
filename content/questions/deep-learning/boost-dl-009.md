---
id: boost-dl-009
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

볼츠만 머신은 무엇인가요?

## 해설

볼츠만 머신은 가시층(Visible Layer)와 은닉층(Hidden Layer), 총 두 개의 층으로 신경망을 구성하는 방법이다.

볼츠만 머신은 모든 뉴런이 연결되어 있는 완전 그래프 형태이며, 제한된 볼츠만 머신(RBM)에서는 같은 층의 뉴런들은 연결되어 있지 않은 모양이다.

기본적으로 단층구조이며, 확률 모델이다. 분류나 선형 회귀 분석 등에 사용될 수 있다.

특히 DBN(Deep Belief Network)에서는 RBM들을 쌓아올려, 각 볼츠만 머신을 순차적으로 학습시킨다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/boltzmann-machine.png)

<div align='center'>
<img src="">
</div>
<br/>

색깔 별 cell의 역할은 아래와 같다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/boltzmann-machine-cell.png)

**References**
- [Interview Question & Answer 출근 루틴, 하루 3문제 - YongWook](https://yongwookha.github.io/MachineLearning/2021-01-29-interview-question)
- [Restricted Boltzmann Machine - 공돌이의 수학정리노트](https://angeloyeo.github.io/2020/10/02/RBM.html)
