---
id: boost-dist-006
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

t 분포

## 해설

t 분포는 정규분포와 같이 중심을 기준으로 좌우 대칭이고 종모양 형태를 갖고 중심은 0으로 고정되어 있는 분포이다.

자유도(degree of freedom, df)에 따라 종의 형태가 조금씩 변화한다.

df는 표본수와 관련이 있는 개념으로, 표본이 많아지면 표준정규분포와 거의 동일한 형태를 보인다.

$Y \sim t(n)$이면,

$$
f(y) = \frac{\Gamma\left(\frac{n+1}{2}\right)}{\Gamma\left(\frac{n}{2}\right)\cdot\sqrt{\pi n}}\cdot\left(\frac{n}{y^2+n}\right)^{\frac{n+1}{2}},\quad-\infty < y < \infty
$$

$$
E[Y] = 0 \quad Var[Y] = \frac{n}{n-2}
$$

> 감마 함수

$$
\Gamma(x) = \int_{0}^{\infty}u^{x-1}e^{-u}du
$$

**References**
- [8.5 스튜던트 t분포, 카이제곱분포, F분포 - 데이터 사이언스 스쿨](https://datascienceschool.net/02%20mathematics/08.05%20%EC%8A%A4%ED%8A%9C%EB%8D%98%ED%8A%B8%20t%EB%B6%84%ED%8F%AC,%20%EC%B9%B4%EC%9D%B4%EC%A0%9C%EA%B3%B1%EB%B6%84%ED%8F%AC,%20F%EB%B6%84%ED%8F%AC.html)
- [2.4 t-분포(t-distribution, Student's t-distribution) - Must Learning with R](https://wikidocs.net/34009)
