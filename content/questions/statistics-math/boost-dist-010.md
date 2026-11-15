---
id: boost-dist-010
topicId: statistics-math
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-dist-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

베타 분포

## 해설

베타 분포는 두 모수 $a$, $b$ 에 대한 **베타 함수**를 나타내는 연속확률분포이다.

베타 함수는 이항 계수(조합, combination 으로도 불림) 를 나타내는 함수인데, 이항 계수는 팩토리얼로 이루어져있기 때문에 베타 함수는 감마 함수로 나타낼 수 있다.

베타 분포의 값은 $0 \sim 1$사이이며 감마 분포와 마찬가지로 베이지안 추정을 위해 사용된다.

$$
Beta(x; a, b) = \frac{\Gamma(\alpha + \beta )}{\Gamma ( \alpha ) \Gamma ( \beta )} x^{\alpha - 1} (1 - x)^{\beta - 1}
$$

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/beta-distribution.png)

**References**
- [갈아먹는 통계 기초 [1] 확률 분포 정리 - 갈아먹는 머신러닝](https://yeomko.tistory.com/33)
- [8.7 베타분포, 감마분포, 디리클레분포 - datascience school](https://datascienceschool.net/02%20mathematics/08.07%20%EB%B2%A0%ED%83%80%EB%B6%84%ED%8F%AC,%20%EA%B0%90%EB%A7%88%EB%B6%84%ED%8F%AC,%20%EB%94%94%EB%A6%AC%ED%81%B4%EB%A0%88%20%EB%B6%84%ED%8F%AC.html)
