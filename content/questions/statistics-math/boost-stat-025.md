---
id: boost-stat-025
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

출장을 위해 비행기를 타려고 합니다. 당신은 우산을 가져가야 하는지 알고 싶어 출장지에 사는 친구 3명에게 무작위로 전화를 하고 비가 오는 경우를 독립적으로 질문했습니다. 각 친구는 2/3로 진실을 말하고 1/3으로 거짓을 말합니다. 3명의 친구가 모두 “그렇습니다. 비가 내리고 있습니다”라고 말했습니다. 실제로 비가 내릴 확률은 얼마입니까?

## 해설

![확률 구하는 방법 시각화](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/facebook-probability.png)

출장지에 비가 내릴 때 $p$, 내리지 않을 때를 $1-p$라고 하자. 출장지에 비가 내리는데( $p$ ) 모든 친구가 비가 내린다라고 한다면 모든 친구가 진실을 말하는 것( $\frac{8}{27}$ )이다. 이 경우 확률은 $\frac{8p}{27}$이다.

출장지가 비가 내리지 않는데( $(1-p)$ ) 모든 친구가 비가 내린다라고 한다면 모든 친구가 거짓을 말하는 것( $\frac{1}{27}$ )이다. 이 경우 확률은 $\frac{(1-p)}{27}$이다.

![베이즈 법칙 적용](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/facebook-bayes-rule.png)

위에서 계산한 확률을 위의 식에 대입하고 식을 정리하면 아래와 같다.

$$
Pr(raining | Yes) = \frac{\frac{8p}{27}}{\frac{8p}{27} + \frac{(1-p)}{27}} = \frac{8p}{8p + (1-p)} = \frac{8p}{7p+1}
$$

만약 출장지에 비가 올 확률이 25%라면 실제로 출장지에 비가 내릴 확률은 약 72.7%이다.

**References**
- [페이스북 데이터 사이언스 직무 인터뷰 - glassdoor](https://www.glassdoor.com/Interview/You-re-about-to-get-on-a-plane-to-Seattle-You-want-to-know-if-you-should-bring-an-umbrella-You-call-3-random-friends-of-y-QTN_519262.htm)
- [Solving Facebook's raining in Seattle interview question - Youtube](https://www.youtube.com/watch?v=NM91QI2uUqI)
