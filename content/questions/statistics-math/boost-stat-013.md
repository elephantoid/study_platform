---
id: boost-stat-013
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

어떨 때 모수적 방법론을 쓸 수 있고, 어떨 때 비모수적 방법론을 쓸 수 있나요?

## 해설

표본의 통계량(평균, 표준편차 등)을 통해 모집단의 모수(모평균, 모표준편차 등)를 추정하는 방법을 통계적 추론이라고 한다.

모집단이 어떤 분포를 따른다는 가정 하에 통계적 추론을 하는 방법을 모수적 방법이라 하는데, 표본의 수가 30개 이상일 때 중심극한 정리에 의해 정규분포를 따르므로 **모수적 방법론**을 사용한다.

반대로, 모집단의 분포를 가정하지 않는 비모수적 방법은, 표본의 수가 30개 미만이거나 정규성 검정에서 정규 분포를 따르지 않는다고 증명되는 경우 **비모수적 방법론**을 사용한다.

**References**
- [어떨 때 모수적 방법론을 쓸 수 있고, 어떨 때 비모수적 방법론을 쓸 수 있나요? - 내가 보려고 만든 공간](https://astralworld58.tistory.com/80)
