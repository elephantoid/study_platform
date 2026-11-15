---
id: boost-stat-022
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

Bias를 통제하는 방법은 무엇입니까?

## 해설

![언더피팅과 오버피팅](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/underfit-right-overfit.png)

편향(Bias)는 데이터 내에 있는 모든 정보를 고려하지 않음으로 인해, 지속적으로 잘못된 것들을 학습하는 경향을 의미한다. 이는 언더피팅(Underfitting)과 관계되어 있다.

반대로 분산(Variance)는 데이터 내에 있는 에러나 노이즈까지 잘 잡아내는 highly flexible models에 데이터를 피팅시킴으로써, 실제 현상과 관계 없는 랜덤한 것들까지 학습하는 알고리즘의 경향을 의미한다. 이는 오버피팅(Overfitting)과 관계되어 있다.

![편향과 분산](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/variance-bias.png)

편향(Bias)과 분산(Variance)은 한 쪽이 증가하면 다른 한 쪽이 감소하고, 한쪽이 감소하면 다른 한쪽이 증가하는 tradeoff 관계를 가진다.

![편향과 분산의 트레이드오프 관계](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/bias-variance-tradeoff.png)

**Bias를 통제하기 위한 방법**으로는 뉴런이나 계층의 개수가 같은 모델의 크기 증가, 오류평가시 얻은 지식을 기반으로 입력 특성 수정, 정규화, 모델 구조를 수정, 학습 데이터 추가 등의 방법이 있다.

**References**
- [쉽게 이해해보는 bias-variance tradeoff - 건빵의 블로그](https://bywords.tistory.com/entry/%EB%B2%88%EC%97%AD-%EC%9C%A0%EC%B9%98%EC%9B%90%EC%83%9D%EB%8F%84-%EC%9D%B4%ED%95%B4%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-biasvariance-tradeoff)
- [Bias and Variance (편향과 분산) - 한 페이지 머신러닝](https://opentutorials.org/module/3653/22071)
- [[MLY] avoidable bias를 줄이는 방법들 - 생각많은 소심남](https://talkingaboutme.tistory.com/entry/MLY-avoidable-bias%EB%A5%BC-%EC%A4%84%EC%9D%B4%EB%8A%94-%EB%B0%A9%EB%B2%95%EB%93%A4?category=538748)
