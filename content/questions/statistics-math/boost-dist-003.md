---
id: boost-dist-003
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

카테고리 분포

## 해설

카테고리 분포(Categorical distribution)는 베르누이 분포를 확장한 개념이다. 즉 카테고리 시행(여러개의 카테고리 중 하나를 선택하는 실험)의 결과는 카테고리 분포를 따르게 된다. 카테고리 분포를 누적하면 다항분포를 얻게 된다.

카테고리 확률변수는 one-hot vector로 표현할 수 있다. 예를 들어, 주사위의 경우 $K = 6$인 카테고리 분포를 따른다고 표기할 수 있다. 눈이 2인 주사위면이 나왔다고 할때, 이때 카테고리 $RV = [0 , 1, 0, 0, 0, 0]$이 된다. $RV$안의 각 원소들은 베르누이 분포를 따르고, 각각 자신들만의 모수를 갖는다. (RV = Random Variable = 확률변수)

카테고리가 $K$개일 때, 카테고리 분포의 확률질량함수는 아래와 같다.

$$
\text{Cat}(x; \mu) = 
\begin{cases} 
\mu_1 & \text{if } x = (1, 0, 0, \dots, 0) \\
\mu_2 & \text{if } x = (0, 1, 0, \dots, 0) \\
\mu_3 & \text{if } x = (0, 0, 1, \dots, 0) \\
\vdots & \vdots \\
\mu_K & \text{if } x = (0, 0, 0, \dots, 1)
\end{cases}
$$

$$\text{Cat}(x; \mu) = \mu_1^{x_1} \mu_2^{x_2} \cdots \mu_K^{x^K} = \prod_{k = 1}^{K} \mu_k^{x^k}$$

**References**
- [카테고리 분포와 다항분포 - 계량투자 실험실](https://gem763.github.io/probability%20theory/%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC-%EB%B6%84%ED%8F%AC%EC%99%80-%EB%8B%A4%ED%95%AD%EB%B6%84%ED%8F%AC.html)
- [갈아먹는 통계 기초1.확률 분포 정리 - 갈아먹는 머신러닝](https://yeomko.tistory.com/33)
