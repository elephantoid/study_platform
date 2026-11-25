---
id: boost-stat-016
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

모수가 매우 적은 (수십개 이하) 케이스의 경우 어떤 방식으로 예측 모델을 수립할 수 있을까요?

## 해설

> _모수는 모집단의 수가 아닌, 평균, 표준편차 등의 모집단의 특징을 말합니다. 여기서는 모집단의 수로 잘못 쓰인 것으로 보이며, 데이터가 적은 경우라 가정하고 답변을 작성하였습니다._

표본이 매우 작은 경우 표본평균의 분포가 정규분포를 따른다고 가정할 수 없으므로 **비모수적 방법**을 채택하여 예측 모델을 수립할 수 있다. 하지만 중심극한정리에 의해 표본의 크기가 30보다 클 경우 표본평균이 정규분포를 따른다고 가정할 수 있으므로, 이 경우에는 모수적 방법을 사용한다.

**References**
- [모수, 큰 수의 법칙, 그리고 중심극한정리 - Kyoyoung Chu](https://chukycheese.github.io/data%20science/parameter-clt/)
- [퍼널에서 모수 용어 질문요? - 인프런, cco](https://www.inflearn.com/questions/34568)
- [[통계이론] 모수적 방법 vs 비모수적 방법](https://zzanhtt.tistory.com/18)
