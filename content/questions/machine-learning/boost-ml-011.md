---
id: boost-ml-011
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

다른 좋은 머신 러닝 대비, 오래된 기법인 나이브 베이즈(naive bayes)의 장점을 옹호해보세요.

## 해설

데이터에서 변수들에 대한 **조건부 독립을 가정**하는 알고리즘으로 클래스에 대한 사전 정보와 데이터로부터 추출된 정보를 결합하고, <strong>베이즈 정리(Bayes Theorem)</strong>를 이용하여 어떤 데이터가 특정 클래스에 속하는지 분류하는 알고리즘이다.

나이브 베이즈의 장단점은 다음과 같다.

| 장점                                                                       | 단점                                                                   |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 단순하고 빠르며 매우 효과적이다                                            | 모든 속성은 동등하게 중요하고 독립적이라는 알려진 결함 가정에 의존한다 |
| 노이즈와 결측 데이터가 있어도 잘 수행한다                                  | 수치 속성으로 구성된 많은 데이터셋에 대해 이상적이지 않다              |
| 훈련에 대한 상대적으로 적은 예제가 필요하지만 매우 많은 예제도 잘 수행한다 | 추정된 확률은 예측된 범주보다 덜 신뢰적이다                            |
| 예측에 대한 추정된 확률을 얻기 쉽다                                        |                                                                        |

**References**
- [쉽고 강력한 머신러닝, 나이브 베이즈 분류 (Naive Bayes Classification)- 자비스가 필요해](https://needjarvis.tistory.com/621)
- [나이브 베이즈 알고리즘의 장점과 단점 - 웹개발공작소](http://w3devlabs.net/wp/?p=17273)
- [ADP 필기 올패키지 데이터 분석 전문가](https://search.shopping.naver.com/search/all?where=all&frm=NVSCTAB&query=ADP+%ED%95%84%EA%B8%B0+%EC%98%AC%ED%8C%A8%ED%82%A4%EC%A7%80+%EB%8D%B0%EC%9D%B4%ED%84%B0+%EB%B6%84%EC%84%9D+%EC%A0%84%EB%AC%B8%EA%B0%80)
