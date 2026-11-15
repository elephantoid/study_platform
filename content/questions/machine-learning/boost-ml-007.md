---
id: boost-ml-007
topicId: machine-learning
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-ml-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

LSA, LDA, SVD 등의 약자들이 어떤 뜻이고 서로 어떤 관계를 가지는지 설명할 수 있나요?

## 해설

`PCA`는 **Principle Component Analysis**의 약자로 데이터의 공분산 행렬을 기반으로 고유벡터를 생성하고 이렇게 구한 고유 벡터에 입력 데이터를 선형 변환하여 차원을 축소하는 방법이다. `SVD`는 **Singular Value Decomposition**의 약자로 PCA와 유사한 행렬 분해 기법을 사용하나 정방 행렬(square matrix)를 분해하는 PCA와 달리 행과 열의 크기가 다른 행렬에도 적용할 수 있다.

`LSA`는 **Latent Semantic Analysis**의 약자로 잠재 의미 분석을 말하며, 주로 토픽 모델링에 자주 사용되는 기법이다. LSA는 DTM(Document-Term Matrix)이나 TF-IDF(Term Frequency-Inverse Document Frequency) 행렬에 Truncated SVD를 적용하여 차원을 축소시키고, 단어들의 잠재적인 의미를 이끌어낸다. Truncated SVD는 SVD와 똑같으나 상위 n개의 특이값만 사용하는 축소 방법이다. 이 방법을 쓸 경우 원 행렬로 복원할 수 없다.

`LDA`는 **Latent Dirichlet Allocation** 혹은 **Linear Discriminant Analysis**의 약자이다. 전자는 토픽모델링에 사용되는 기법 중 하나로 LSA와는 달리 단어가 특정 토픽에 존재할 확률과 문서에 특정 토픽이 존재할 확률을 결합확률로 추정하여 토픽을 추정하는 기법을 말한다. 후자는 차원축소기법 중 하나로 분류하기 쉽도록 클래스 간 분산을 최대화하고 클래스 내부의 분산은 최소화하는 방식을 말한다.

> **Latent Dirichlet Allocation**와 관련된 자세한 내용은 [#9 텍스트 더미에서 주제를 추출해야 합니다. 어떤 방식으로 접근해 나가시겠나요?](#9)을 참고해주세요!

**References**
- [잠재 의미 분석(Latent Semantic Analysis, LSA) - 딥러닝을 이용한 자연어 처리 입문](https://wikidocs.net/24949)
- [잠재 디리클레 할당(Latent Dirichlet Allocation, LDA) - 딥러닝을 이용한 자연어 처리 입문](https://wikidocs.net/30708)
- [문서 단어 행렬(Document-Term Matrix, DTM) - 딥러닝을 이용한 자연어 처리 입문](https://wikidocs.net/24559)
- [TF-IDF(Term Frequency-Inverse Document Frequency) - 딥러닝을 이용한 자연어 처리 입문](https://wikidocs.net/31698)
- [6. 차원 축소 - 파이썬 머신러닝 완벽 가이드](http://www.yes24.com/Product/Goods/87044746?OzSrank=1)
