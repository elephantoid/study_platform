---
id: boost-dl-028
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

Batch Normalization의 효과는?

## 해설

![배치 정규화(Batch Normalization) 수식](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/batch-normalization-formula.png)

배치 정규화(Batch Normalization)은 학습 시 **미니배치 단위로 입력의 분포가 평균이 0, 분산이 1이 되도록 정규화**한다. 더불어 $\gamma$로 스케일과 $\beta$로 이동 변환을 수행한다. 이렇게 배치 정규화를 사용하면 다음과 같은 효과를 얻을 수 있다.

- `장점 1` 기울기 소실/폭발 문제가 해결되어 큰 학습률을 설정할 수 있어 학습속도가 빨라진다.
- `장점 2` 항상 입력을 정규화시키기 때문에 가중치 초깃값에 크게 의존하지 않아도 된다.
- `장점 3` 자체적인 규제(Regularization) 효과가 있어 Dropout이나 Weight Decay와 같은 규제 방법을 사용하지 않아도 된다.

**References**
- [Batch Normalization - Steve-Lee's Deep Insight](https://deepinsight.tistory.com/116)
- [Understanding Batch Normalization for Neural Networks - towards data science](https://towardsdatascience.com/understanding-batch-normalization-for-neural-networks-1cd269786fa6)
- [Batch Normalization - 라온 피플](https://m.blog.naver.com/laonple/220808903260)
- [[Deep Learning] Batch Normalization (배치 정규화) - 꾸준희](https://eehoeskrap.tistory.com/430)
