---
id: boost-ml-020
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

K-means의 대표적 의미론적 단점은 무엇인가요? (계산량 많다는것 말고)

## 해설

K-means 는 특성이 비슷한 데이터를 같은 그룹으로 묶어주는 클러스터링 알고리즘으로, k 개의 군집 개수를 정하고 군집의 중심점을 예측하여 각 데이터와 거리를 비교한 후 군집을 결정한다.

**K-means 알고리즘의 단점**은 다음과 같다.

- K 를 몇 개로 설정하냐에 따라 성능이 달라진다.
- K 개 군집의 중심점을 예측하여야 하는데, 어디를 중심점으로 두냐에 따라 성능이 달라진다.
- 데이터가 잘 모여있는 경우에 효과적이지, 노이즈가 많은 경우 효과적이지 않다.

**References**
- [머신러닝 - 7. K-평균 클러스터링(K-means Clustering) - 귀퉁이 서재](https://bkshin.tistory.com/entry/%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D-7-K-%ED%8F%89%EA%B7%A0-%EA%B5%B0%EC%A7%91%ED%99%94-K-means-Clustering)
