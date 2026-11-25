---
id: boost-ml-013
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

Association Rule의 Support, Confidence, Lift에 대해 설명해주세요.

## 해설

연관규칙분석(Association Analysis)은 흔히 장바구니 분석(Market Basket Analysis) 또는 서열분석(Sequence Analysis)이라고 불린다. 기업의 데이터베이스에서 상품의 구매, 서비스 등 **일련의 거래 또는 사건들 간의 규칙을 발견하기 위해 적용**하며, 연관성 분석의 평가 지표로는 Support, Confidence, Lift를 사용한다.

> **Support(지지도)**

전체 거래 중 항목 A와 항목 B를 동시에 포함하는 거래의 비율로 정의한다.

$$
지지도 = P(A \cap B) = \frac{A와 B가 동시에 포함된 거래수}{전체 거래수} = \frac{A \cap B}{전체}
$$

> **Confidence(신뢰도)**

항목 A를 포함한 거래 중에서 항목 A와 항목 B가 같이 포함될 확률이다. 연관성의 정도를 파악할 수 있다.

$$
신뢰도 = \frac{P(A \cap B)}{P(A)} = \frac{A와 B가 동시에 포함된 거래수}{A를 포함하는 거래수} = \frac{지지도}{P(A)}
$$

> **Lift(향상도)**

A가 구매되지 않았을 때 품목 B의 구매확률에 비해 A가 구매됐을 때 품목 B의 구매확률의 증가 비이다. 연관규칙 A→B는 품목 A와 품목 B의 구매가 서로 관련이 없는 경우에 향상도가 1이 된다.

$$
향상도 = \frac{P(B | A)}{P(B)} = \frac{P(A \cap B)}{P(A)P(B)} = \frac{A와 B가 동시에 포함된 거래수}{A를 포함하는 거래수 \times B를 포함하는 거래수} = \frac{신뢰도}{P(B)}
$$

---

에를 들어 어떤 슈퍼마켓에서 5명의 고객에 의해 발생된 5($N = 5$)건의 거래를 가지고, 연관규칙 X:{계란, 맥주} → Y:{기저귀}에 대해 살펴보자.

| Customer<br>ID | Transaction<br>ID |                 Items                  |
| :------------: | :---------------: | :------------------------------------: |
|      1131      |       no.1        |               계란, 우유               |
|      2094      |       no.2        |    <U>계란, 기저귀, 맥주</U>, 사과     |
|      4122      |       no.3        |        우유, 기저귀, 맥주, 콜라        |
|      4811      |       no.4        | <U>계란</U>, 우유, <U>맥주, 기저귀</U> |
|      8091      |       no.5        |         계란, 우유, 맥주, 콜라         |

$$ P(Y) = \frac{n(Y)}{N} = \frac{n \\{ no.2, no.3, no.4 \\} }{N} = \frac{3}{5} = 0.6 $$

- 지지도(Support) = $s(X→Y) = \frac{n(X\cup Y)}{N} = \frac{n \\{ no.2, no.4 \\} }{N} = \frac{2}{5} = 0.4$
- 신뢰도(Confidence) = $c(X→Y) = \frac{n(X\cup Y)}{n(X)} = \frac{n \\{ no.2, no.4 \\} }{n \\{ no.2, no.4, no.5 \\} } = \frac{2}{3} = 0.6667$
- 향상도(Lift) = $Lift(X→Y) = \frac{c(X→Y)}{s(Y)} = \frac{0.6667}{0.6} = 1.1111$

**References**
- [[R 연관규칙(Association Rule)] 지지도(support), 신뢰도(confidence), 향상도(lift), IS측도, 교차지지도 - R, Python 분석과 프로그래밍의 친구 (by R Friend)](https://rfriend.tistory.com/191)
- [ADP 필기 올패키지 데이터 분석 전문가](https://search.shopping.naver.com/search/all?where=all&frm=NVSCTAB&query=ADP+%ED%95%84%EA%B8%B0+%EC%98%AC%ED%8C%A8%ED%82%A4%EC%A7%80+%EB%8D%B0%EC%9D%B4%ED%84%B0+%EB%B6%84%EC%84%9D+%EC%A0%84%EB%AC%B8%EA%B0%80)
