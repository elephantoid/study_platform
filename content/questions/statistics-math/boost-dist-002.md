---
id: boost-dist-002
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

이항 분포

## 해설

베르누이 시행을 $N$번 시행한 것을 말한다. 예를 들어, 동전 던지기를 10번 던져서 앞면이 나온 횟수를 확률 변수로 둔다. 마찬가지로 시행 결과가 횟수로 나오므로 이산확률변수이다.

- `pmf` : $Bin(x;N, \theta) = \binom{N}{x} \theta^N (1-\theta)^{N-x}$
- `expectation` : $E[X] = N\theta$
- `variance` : $Var[X] = N\theta ( 1-\theta)$

**References**
- [확률분포 : 베르누이분포, 이항분포, 카테고리분포, 다항분포 - Fall in Machine-Learning](https://imjuno.tistory.com/entry/basicdistribution)
- [8.2 베르누이분포와 이항분포 - 데이터 사이언스 스쿨](https://datascienceschool.net/02%20mathematics/08.02%20%EB%B2%A0%EB%A5%B4%EB%88%84%EC%9D%B4%EB%B6%84%ED%8F%AC%EC%99%80%20%EC%9D%B4%ED%95%AD%EB%B6%84%ED%8F%AC.html)
