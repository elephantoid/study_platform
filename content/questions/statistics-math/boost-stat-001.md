---
id: boost-stat-001
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

고유값(eigen value)와 고유벡터(eigen vector)이 무엇이고 왜 중요한지 설명해주세요.

## 해설

정방행렬 $(n \times n)$인 $A$는 임의의 벡터 $(n \times 1)$인 $x$의 방향과 크기를 변화시킬 수 있다.

수많은 벡터 $x$중 어떤 벡터들은 $A$에 의해 선형 변환되었을 때에도 원래 벡터와 평행한 경우가 있다. **이렇듯 $Ax$가 원래 $x$에 상수 $\lambda$를 곱한 것과 같을 때의 $x$를 고유 벡터, 람다를 고유값이라 한다.**

$$
Ax = \lambda x
$$

아래처럼 $x_1$은 $A$에 의해 변환되었음에도 $x_1$과 평행하다. 따라서 $x_1$은 고유벡터이다.

![고유벡터](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/eigen-vector.png)

고유값과 고유벡터를 통해 $A$를 고유값과 고유벡터들로 분해하는 **고유값 분해(eigen decomposition)**, 정방행렬 뿐만 아닌 $m \times n$행렬도 분해할 수 있는 **특이값 분해(SVD)**, 데이터들을 차원 축소시킬 때 가장 원래 의미를 잘 보존시키는 **주성분 분석(PCA)** 등에 활용할 수 있으므로 중요하다.

**References**
- [고유값과 고유 벡터 - 러너게인](https://twlab.tistory.com/46)
- [머신러닝 - 19. 고유값(eigenvalue), 고유벡터(eigenvector), 고유값 분해(eigen decomposition) - 귀퉁이 서재](https://bkshin.tistory.com/entry/%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D-19-%ED%96%89%EB%A0%AC)
- [[선형대수학 #4] 특이값 분해(Singular Value Decomposition, SVD)의 활용 - 다크 프로그래머](https://darkpgmr.tistory.com/106)
- [주성분 분석(PCA) - 공돌이의 수학정리노트](https://angeloyeo.github.io/2019/07/27/PCA.html)
