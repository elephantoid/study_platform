---
id: boost-ml-002
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

정규화를 왜 해야할까요? 정규화의 방법은 무엇이 있나요?

## 해설

정규화는 **개별 피처의 크기를 모두 똑같은 단위로 변경하는 것**을 말한다. 정규화를 하는 이유는 **피처의 스케일이 심하게 차이가 나는 경우 값이 큰 피처가 더 중요하게 여겨질 수 있기 때문**이다. 이를 막기 위해 피처 모두 동일한 스케일로 반영되도록 하는 것이 정규화이다.

정규화하는 방법으로는 대표적으로 두 가지가 존재한다. 첫 번째 정규화 방법은 <strong>최소-최대 정규화(min-max normalization)</strong>으로 각 피처의 최소값을 0, 최대값을 1로 두고 변환하는 방법이다. 값을 $x$로, 최소값을 $min$, 최대값을 $max$로 둘 때, 정규화된 값은 $\frac{x - min}{max - min}$으로 계산할 수 있다. 두 번째 정규화 방법으로 <strong>Z-점수 정규화(z-score normalization)</strong>이 있다. 이 방법은 각 피처의 표준편차와 평균으로 값을 정규화시킨다. 정규화된 값은 $\frac{x - mean}{std}$로 계산할 수 있다.

**References**
- [정규화(Normalization) 쉽게 이해하기 - 아무튼 워라밸](http://hleecaster.com/ml-normalization-concept/)
- [2. 사이킷런으로 시작하는 머신러닝 - 파이썬 머신러닝 완벽 가이드](http://www.yes24.com/Product/Goods/87044746?OzSrank=1)
