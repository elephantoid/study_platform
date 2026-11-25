---
id: boost-dist-001
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

베르누이 분포

## 해설

우선 베르누이 시행이란 결과가 두 가지 중 하나만 나오는 것을 말한다. 베르누이 확률변수는 시행결과가 $0$ 또는 $1$이 나오므로 이산확률변수이다.

- `pmf` : $Bern(x;\theta) = \theta^x(1-\theta)^{1-x}$
- `expectation` : $E[X] = \theta$
- `variance` : $Var[X] = \theta ( 1-\theta)$

**References**
- [확률분포 : 베르누이분포, 이항분포, 카테고리분포, 다항분포 - Fall in Machine-Learning](https://imjuno.tistory.com/entry/basicdistribution)
- [8.2 베르누이분포와 이항분포 - 데이터 사이언스 스쿨](https://datascienceschool.net/02%20mathematics/08.02%20%EB%B2%A0%EB%A5%B4%EB%88%84%EC%9D%B4%EB%B6%84%ED%8F%AC%EC%99%80%20%EC%9D%B4%ED%95%AD%EB%B6%84%ED%8F%AC.html)
