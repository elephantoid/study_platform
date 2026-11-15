---
id: boost-dist-004
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

다항 분포

## 해설

성공확률이 $\theta$인 베르누이 시행을 n번 반복했을 때의 성공횟수가 이항분포를 따르는 것처럼, 성공확률이 $\theta=(\theta_1 ... \theta_k)$인 카테고리 시행을 $n$번 반복했을 때의 각 카테고리별 성공횟수는 다항분포(Multinomial distribution)을 따르게 된다.

$$
\left( \begin{matrix} 
\text{베르누이 분포} \\
\downarrow \\
\text{이항 분포}
\end{matrix} \right)
\approx
\left( \begin{matrix} 
\text{카테고리 분포} \\
\downarrow \\
\text{다항 분포}
\end{matrix} \right)
$$

다항분포의 수식은 아래와 같다.

$$
\text{Mu}(x; N, \mu) = \binom{N}{x} \prod_{k=1}^{K} \mu_k^{x_k} = \binom{N}{x_1, \cdots, x_K} \prod_{k=1}^{K} \mu_k^{x_k}
$$

> 예를들어, 주사위를 10번 던졌을 때, 1이 1번, 2가 2번, 3이 1번, 4가2번, 5가 3번, 6이 1번 나오는 확률을 계산하고자 한다. 이를 벡터로 나타내면 $(1, 2, 1, 2, 3, 1)$이 된다. 6번을 던졌을 때 $x$ 벡터처럼 나올 조합을 계산해야하며, 수식은 아래와 같다.

$$\binom{N}{x_{1}, \cdots , x_{K}} = \frac{N!}{x_{1}!, \cdots, x_{K}!} $$

**References**
- [카테고리 분포와 다항분포 - 계량투자 실험실](https://gem763.github.io/probability%20theory/%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC-%EB%B6%84%ED%8F%AC%EC%99%80-%EB%8B%A4%ED%95%AD%EB%B6%84%ED%8F%AC.html)
- [갈아먹는 통계 기초1.확률 분포 정리 - 갈아먹는 머신러닝](https://yeomko.tistory.com/33)
