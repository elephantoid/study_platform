---
id: boost-dl-037
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

어느 정도 돌아가는 녀석을 작성하기까지 몇시간 정도 걸릴까?

## 해설

간단한 MNIST 분류기를 MLP+CPU 버전으로 numpy로 만든, 참고 코드([deeplearning_from_scratch - youbeebee](https://github.com/youbeebee/deeplearning_from_scratch/blob/master/ch4.%EC%8B%A0%EA%B2%BD%EB%A7%9D%20%ED%95%99%EC%8A%B5/4.5.%ED%95%99%EC%8A%B5%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98%20%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0.py))의 경우, 15 에폭 기준 0.9 이상의 정확도가 나온다고 한다. 이 100줄 가량의 코드를 작성하는데 걸리는 시간은 사람마다 다르겠지만, 구조를 정확히 알고있다면 오래걸려도 30분 내에는 작성할 수 있을 것이라 생각한다. 그러나 pretrain되지 않은 모델의 경우, 학습시간이 꽤 오래걸린다고 한다.

**References**
- [3.6.2.신경망의 추론 처리 - 밑바닥부터 시작하는 딥러닝(도서)](http://m.yes24.com/Goods/Detail/34970929)
