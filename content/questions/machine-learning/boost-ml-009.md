---
id: boost-ml-009
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

텍스트 더미에서 주제를 추출해야 합니다. 어떤 방식으로 접근해 나가시겠나요?

## 해설

> **잠재 디리클레 할당(Latent Dirichlet Allocation, LDA)**

잠재 디리클레 할당(LDA)이란 **문서의 집합에서 토픽을 찾아내는 프로세스를 뜻하는 토픽 모델링의 대표적인 알고리즘**을 말한다. LDA는 "문서들은 토픽들의 혼합으로 구성되어져 있으며, 토픽들은 확률 분포에 기반하여 단어들을 생성한다"고 가정하며, 데이터가 주어지면 LDA는 토픽을 문서가 생성되던 과정을 역추적한다.

예를 들어, 다음과 같은 예시 문장 3개가 있다고 가정하자.

```text
문서1 : 저는 사과랑 바나나를 먹어요
문서2 : 우리는 귀여운 강아지가 좋아요
문서3 : 저의 깜찍하고 귀여운 강아지가 바나나를 먹어요
```

LDA를 통해 각 문서의 **토픽 분포**와 **각 토픽 내의 단어 분포**를 추정할 수 있다.

- **각 문서의 토픽 분포**
  - 문서1 : 토픽 A 100%
  - 문서2 : 토픽 B 100%
  - 문서3 : 토픽 B 60%, 토픽 A 40%
- **각 토픽의 단어 분포**
  - 토픽A : 사과 20%, 바나나 40%, 먹어요 40%, 귀여운 0%, 강아지 0%, 깜찍하고 0%, 좋아요 0%
  - 토픽B : 사과 0%, 바나나 0%, 먹어요 0%, 귀여운 33%, 강아지 33%, 깜찍하고 16%, 좋아요 16%

LDA는 토픽의 제목을 정해주지 않지만, 이 시점에서 알고리즘의 사용자는 위 결과로부터 두 토픽이 각각 과일에 대한 토픽과 강아지에 대한 토픽이라고 판단해볼 수 있다.

**References**
- [Topic Modeling, LDA - ratsgo's blog](https://ratsgo.github.io/from%20frequency%20to%20semantics/2017/06/01/LDA/)
- [[기술면접] 잠재디리클레할당 (day3 / 201012) - huidea](https://huidea.tistory.com/130?category=879541)
- [딥 러닝을 이용한 자연어 처리 입문](https://wikidocs.net/30708)
