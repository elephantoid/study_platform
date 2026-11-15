---
id: boost-dist-007
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

카이제곱 분포

## 해설

정규 분포의 제곱합은 $\chi^2$ 분포를 따른다.

$$
Z \sim N(0, 1) \quad \Rightarrow \quad Z^2 \sim \chi^2(df=1) \quad \Rightarrow \quad \sum_{i=1}^{n}Z^2_i \sim \chi^2(df=n)
$$

**References**
- [8.5 스튜던트 t분포, 카이제곱분포, F분포 - 데이터 사이언스 스쿨](https://datascienceschool.net/02%20mathematics/08.05%20%EC%8A%A4%ED%8A%9C%EB%8D%98%ED%8A%B8%20t%EB%B6%84%ED%8F%AC,%20%EC%B9%B4%EC%9D%B4%EC%A0%9C%EA%B3%B1%EB%B6%84%ED%8F%AC,%20F%EB%B6%84%ED%8F%AC.html)
- [2.5 카이제곱 분포와 F분포 - Must Learning with R](https://wikidocs.net/34010)
