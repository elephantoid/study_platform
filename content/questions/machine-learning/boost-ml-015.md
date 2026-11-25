---
id: boost-ml-015
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

머신러닝(machine)적 접근방법과 통계(statistics)적 접근방법의 둘간에 차이에 대한 견해가 있나요?

## 해설

머신러닝적 접근방법과 통계적 접근방법의 차이는 두 방법의 주 목적이 다르다는 것이다.

머신러닝적 접근방법은 모델의 **예측 성공률**을 높이는게 목적이다.  
따라서 모델의 신뢰도나 정교한 가정보다는 다양한 피쳐를 사용하여 (오버피팅을 감안하더라도) 높은 예측률을 달성하고자 한다.

통계적 접근방법은 분포와 가정을 통해 **신뢰 가능하고 정교한** 모델을 만드는게 목적이다.

따라서 모형을 복잡하지 않고 단순하게 만들고, 어떤 피쳐가 어떤 원인을 주는지 알 수 있도록 한다.

**References**
- [머신러닝과 전통적 통계학의 차이 - Hyunseok Choi](https://medium.com/@hyunseok/%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D%EA%B3%BC-%EC%A0%84%ED%86%B5%EC%A0%81-%ED%86%B5%EA%B3%84%ED%95%99%EC%9D%98-%EC%B0%A8%EC%9D%B4-a560f0708db0)
- [Machine Learning과 전통적 통계분석 방법의 차이](https://ek-koh.github.io/data%20analysis/ML-diff/)
