---
id: boost-stat-020
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

아웃라이어의 판단하는 기준은 무엇인가요?

## 해설

<strong>이상치(outlier)</strong>는 전체 데이터의 패턴에서 벗어난 이상한 값을 가진 데이터를 말한다. 이상치는 모델의 성능에 영향을 미치므로 이를 탐지하는 것은 정말 중요하다.

이상치를 탐지하는 방법 중 하나로 **IQR(Inter Quantile Range) 기법**이 있다. IQR 기법을 사용하기 위해서는 우선 데이터를 오름차순으로 정렬하고 25%, 50%, 75%, 100%로 4등분을 한다. 이 75% 지점과 25% 지점의 값의 차이를 IQR이라고 한다. 이 IQR에 1.5를 곱한 값을 75% 지점의 값에 더하여 최대값을, 25% 지점의 값에서 빼서 최소값을 계산한다. 이 때 최소값보다 작거나 최대값보다 큰 값을 이상치라고 판단한다.

또 다른 탐지 방법으로는 **Z-score를 계산하는 방식**이 있다. Z-score는 데이터가 평균에서 얼마나 떨어져 있는지를 나타내는 지표로, 임계값을 설정하여 Z-score이 이 값보다 크다면 이상치로 판단한다. 하지만 Z-score 방식은 데이터가 가우시안 분포를 따른다고 가정하기 때문에 데이터가 가우시안 분포가 아닐 경우 별도의 변환이 필요하다.

**References**
- [A Brief Overview of Outlier Detection Techniques - Towards Data Science](https://towardsdatascience.com/a-brief-overview-of-outlier-detection-techniques-1e0b2c19e561)
- [IQR 방식을 이용한 이상치 데이터(Outlier) 제거 - Hwi's ML doc](https://hwi-doc.tistory.com/entry/IQR-%EB%B0%A9%EC%8B%9D%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9D%B4%EC%83%81%EC%B9%98-%EB%8D%B0%EC%9D%B4%ED%84%B0Outlier-%EC%A0%9C%EA%B1%B0)
- [[데이터전처리] Outlier(이상치/이상값/특이값/특이치 등) 탐지 방법(detection method) : 2. Z-score 방식 with - Clary K](https://claryk.tistory.com/5)
