---
id: boost-stat-010
topicId: statistics-math
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-stat-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

평균(mean)과 중앙값(median)중에 어떤 케이스에서 뭐를 써야할까요?

## 해설

- `평균(mean)`: 모든 관측값의 합을 자료의 개수로 나눈 것
- `중앙값(median)`: 전체 관측값을 크기 순서로 배열했을 때 가운데 위치하는 값

평균은 전체 관측값이 골고루 반영되므로 대표값으로서 가치가 있다. 평균 근처에 **표본이 몰려 있는 상황에서 대표값으로 유용**하지만 극단적인 값에 영향을 많이 받는다.

중앙값에서는 관측값을 크기 순서로 배열할 때 관측값의 위치가 중요하고, 가운데 위치한 관측값 이외의 관측값들의 크기는 중요하지 않다. 따라서 평균과는 달리 중앙값은 관측값들의 변화에 민감하지 않고 특히 아주 큰 관측값이나 아주 작은 관측값(즉, outlier)에 영향을 받지 않는다. 중앙값이 유용한 경우는 **표본의 편차, 혹은 왜곡이 심하게 나타나는 경우**이다.

**References**
- [평균(average, mean) vs. 중간값(median) | 통계상의 오류가능성 - 슈퍼짱짱](https://leedakyeong.tistory.com/entry/%ED%8F%89%EA%B7%A0-%EC%A4%91%EC%95%99%EA%B0%92-%EC%B5%9C%EB%B9%88%EA%B0%92-%EB%B9%84%EA%B5%90-Mean-VS-Median-VS-Mode)
- [[기초통계] 평균 중앙값 최빈값 비교 (Mean VS Median VS Mode) - Peter Hwang](https://blog.naver.com/ricemankr/220796823014)
