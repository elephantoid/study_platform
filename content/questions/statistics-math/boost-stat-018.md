---
id: boost-stat-018
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

검정력(statistical power)은 무엇일까요?

## 해설

|        　        | 귀무가설 H0 참 |    귀무가설 H0 거짓    |
| :--------------: | :------------: | :--------------------: |
| 귀무가설 H0 채택 | 옳은 결정(1-α) |     제 2종 오류(β)     |
| 귀무가설 H0 기각 | 제 1종 오류(α) | 옳은 결정(1-β), 검정력 |

검정력은 대립가설 H1이 참인 경우 귀무가설 H0를 기각(대립가설 H1을 채택)할 확률이다.

![검정력](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/hypothesis.png)

**References**
- [검정력(power)의 의미 및 수식 -
  Curycu's Box](https://m.blog.naver.com/PostView.nhn?blogId=hancury&logNo=220854934914&proxyReferer=https:%2F%2Fwww.google.com%2F)
- [통계적 검정: 검정력(power)과 Type 1, 2 Error(1, 2 종 오류) - 코딩하고, ](https://niceguy1575.tistory.com/entry/%ED%86%B5%EA%B3%84%EC%A0%81-%EA%B2%80%EC%A0%95-%EA%B2%80%EC%A0%95%EB%A0%A5power%EA%B3%BC-Type-1-2-Error1-2-%EC%A2%85-%EC%98%A4%EB%A5%98)
