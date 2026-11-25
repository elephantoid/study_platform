---
id: boost-dist-009
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

감마 분포

## 해설

감마 분포는 **감마 함수**를 사용하여 전체 **k번의 사건**이 일어날 때까지 **걸리는 시간**을 나타내는 연속 확률분포이다.

$\theta$와 $k$는 감마 분포의 모수이다.

감마 분포는 $0 \sim \infty$까지 값을 가질 수 있으며 모수의 베이지안 추정을 위해 사용된다.

$$
f(x, k, \theta) = x^{k-1}\frac{e^{-x / \theta}}{\theta^k \Gamma (k)} \quad \text{for x > 0}
$$

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/gamma-distribution.png)

**감마 함수**  
**팩토리얼**을 함수로 일반화한 것

$$
\Gamma (z) = \int_0^\infty t^{z-1} e^{-t} dt \ (\Re \ z > 0)
$$

$$
\Gamma (n) = (n - 1)!
$$

**References**
- [갈아먹는 통계 기초 [1] 확률 분포 정리 - 갈아먹는 머신러닝](https://yeomko.tistory.com/33)
- [8.7 베타분포, 감마분포, 디리클레분포 - datascience school](https://datascienceschool.net/02%20mathematics/08.07%20%EB%B2%A0%ED%83%80%EB%B6%84%ED%8F%AC,%20%EA%B0%90%EB%A7%88%EB%B6%84%ED%8F%AC,%20%EB%94%94%EB%A6%AC%ED%81%B4%EB%A0%88%20%EB%B6%84%ED%8F%AC.html)
