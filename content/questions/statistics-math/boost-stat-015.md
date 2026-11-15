---
id: boost-stat-015
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

통계에서 사용되는 bootstrap의 의미는 무엇인가요.

## 해설

**부트스트랩(Bootstrap)** 은 가설검증을 하거나 metric을 계산하기 전에 random sampling을 적용하는 방법이다. 모수의 분포를 추정하는 방법 중 하나는, 현재 가진 표본에서 추가적으로 표본을 복원추출하고 각 표본에 대한 통계량을 다시 계산하는 것이다.
부트스트랩이 여기에 해당하며, 여러번의 무작위 추출을 통해, 평균의 신뢰구간을 구할 수 있다.

200개로만 통계량을 구하는 것이 아니라 200개를 기준으로 복원 추출하여 새로운 통계량을 구하는 것을 예시로 들 수 있다.

> **머신러닝에서 부트스트램의 의미**

머신러닝에서 부트스트랩은 아래와 같이 해석될 수 있다.

- 랜덤 샘플링을 통해 학습 데이터를 늘리는 방법
- 여러 모델을 학습시켜 추론 결과의 평균을 사용하는 방법(=앙상블)

> **복원추출이란?**

복원추출(Sampling with replacement)이란 확률을 구할 때, 추출했던 것을 원래대로 돌려놓고 다시 추출하는 방법을 말한다.

**References**
- [부트스트랩에 대하여 - Learning Carrot](https://learningcarrot.wordpress.com/2015/11/12/%EB%B6%80%ED%8A%B8%EC%8A%A4%ED%8A%B8%EB%9E%A9%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC-bootstrapping/)
- [DATA - 12. 부트스트랩](https://bkshin.tistory.com/entry/DATA-12)
- [복원추출 - 사이언스올](https://www.scienceall.com/%EB%B3%B5%EC%9B%90-%EC%B6%94%EC%B6%9Csampling-with-replacement/)
