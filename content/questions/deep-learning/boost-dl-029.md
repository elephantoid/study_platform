---
id: boost-dl-029
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

Dropout의 효과는?

## 해설

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/dropout-nn.png)

드롭아웃(Dropout)은 <strong>설정된 확률 $p$만큼 은닉층(hidden layer)에 있는 뉴런을 무작위로 제거하는 방법</strong>으로, 오버피팅을 방지하기 위한 방법 중 하나이다. (정확히는 출력을 0으로 만들어 더이상의 전파가 되지 않도록 한다.) 드롭아웃(Dropout)은 학습 때마다 무작위로 뉴런을 제거하므로 매번 다른 모델을 학습시키는 것으로 해석할 수 있다. 그리고 추론 시 출력에 제거 확률 $p$를 곱함으로써 앙상블 학습에서 여러 모델의 평균을 내는 효과를 얻을 수 있다.

**References**
- [3.13. 드롭아웃(dropout) - Dive into Deep Learning](https://ko.d2l.ai/chapter_deep-learning-basics/dropout.html)
- [An Intuitive Explanation to Dropout - towards data science](https://towardsdatascience.com/an-intuitive-explanation-to-dropout-749c7fb5395c)
