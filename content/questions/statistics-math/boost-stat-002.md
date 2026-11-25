---
id: boost-stat-002
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

샘플링(Sampling)과 리샘플링(Resampling)이 무엇이고 리샘플링의 장점을 말씀해주세요.

## 해설

샘플링이란 **표본추출**을 의미하는 것으로, 모집단 전체에 대한 추정치(estimate)를 얻기 위해 임의의 sample을 뽑아내는 것이다.
모집단 전체에 대한 조사는 불가능하기 때문에 sample을 이용하여 모집단에 대한 추론(inference)을 하게되는 것이다.
하지만 표본은 모집단을 닮은 모집단의 mirror image 같은 존재이지만, 모집단 그 자체일수는 없다.
따라서 표본에는 반드시 모집단의 원래 패턴에서 놓친 부분, 즉 **noise가 존재할 수 밖에 없다.**

리샘플링은 **모집단의 분포 형태를 알 수 없을 때 주로 사용하는 방법**이다.
즉, 모분포를 알 수 없으므로 일반적인 통계적 공식들을 사용하기 힘들 때, 현재 갖고 있는 데이터를 이용하여 모분포와 비슷할 것으로 추정되는 분포를 만들어 보자는 것이다.
리샘플링은 **가지고 있는 샘플에서 다시 샘플 부분집합을 뽑아서 통계량의 변동성(variability of statistics)을 확인하는 것**이라고 할 수 있다.
즉, 같은 샘플을 여러 번 사용해서 성능을 측정하는 방식이다. 가장 많이 사용되는 방법이며 종류로는 K-fold 교차 검증, 부트스트래핑이 있다.

리샘플링은 표본을 추출하면서 원래 데이터 셋을 복원하기 때문에 이를 통해서 모집단의 분포에 어떤 가정도 필요 없이 표본만으로 추론이 가능하다는 장점이 있다.

**References**
- [(데이터과학 인터뷰 질문)(2) 샘플링과 리샘플링, 1편 - CHAOS & PATTERN : 데이터 사이언스 블로그](https://cnp-0717.tistory.com/7?category=838077)
- [샘플링과 리샘플링의 차이는 무엇일까? - 김감귤](https://kejdev.github.io/posts/sampling-resampling/)
- [resampling을 이용한 방법 (bootstrapping) - 진화하자 - 어디에도 소속되지 않기](https://adnoctum.tistory.com/296)
- [샘플링과 리샘플링 - Wriggling](https://trampled-worm.tistory.com/91)
