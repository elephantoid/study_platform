---
id: boost-dist-008
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

F 분포

## 해설

F 분포는 독립적인 $\chi^2$ 변수의 비가 따르는 분포이다.

$$
Q_1 \sim \chi^2(n_1), \quad Q_2 \sim \chi^2(n_2) \quad \Rightarrow \quad \frac{Q_1/n_1}{Q_2/n_2} \sim F(n_1, n_2)
$$

**References**
- [8.5 스튜던트 t분포, 카이제곱분포, F분포 - 데이터 사이언스 스쿨](https://datascienceschool.net/02%20mathematics/08.05%20%EC%8A%A4%ED%8A%9C%EB%8D%98%ED%8A%B8%20t%EB%B6%84%ED%8F%AC,%20%EC%B9%B4%EC%9D%B4%EC%A0%9C%EA%B3%B1%EB%B6%84%ED%8F%AC,%20F%EB%B6%84%ED%8F%AC.html)
- [2.5 카이제곱 분포와 F분포 - Must Learning with R](https://wikidocs.net/34010)
