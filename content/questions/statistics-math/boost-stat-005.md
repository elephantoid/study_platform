---
id: boost-stat-005
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

조건부 확률은 무엇인가요?

## 해설

조건부 확률은 사건 $A$가 일어났다는 전제 하에 사건 $B$가 일어날 확률이다. 이는 $P(B|A) = P(B \cap A) / P(A)$로 표현 가능하다. 조건부 확률은 **베이즈 정리**와도 이어지며, 조건부 확률을 이용한 가장 유명한 문제는 [몬티홀 문제](https://terms.naver.com/entry.naver?docId=3569086&cid=58944&categoryId=58970)가 있다.

> **베이즈 정리**

베이즈 정리를 통해 가능도(Likelihood)와 증거(Evidence)를 바탕으로 사전확률을 사후확률로 업데이트한다.

![베이즈 정리](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/probability.png)

- $D$: 새로 관찰되는 데이터
- $\theta$: 모델에서 계산하고 싶어하는 모수 (가설)
- 사후확률(Posterior): 데이터를 관찰했을 때, 이 가설이 성립할 확률 (데이터 관찰 이후 측정하기 때문에 사후확률)
- 사전확률(Prior): 가설에 대해 사전에 세운 확률 (데이터 관측 이후 사후확률이 사전확률이 된다.)
- 가능도(Likelihood): 현재 주어진 모수 (가정) 에서 이 데이터가 관찰될 가능성
- 증거(Evidence): 데이터 전체의 분포

**References**
- [조건부 확률 - Truth in Engineering](https://m.blog.naver.com/PostView.nhn?blogId=mykepzzang&logNo=220834864348&proxyReferer=https:%2F%2Fwww.google.com%2F)
- [통계학 맛보기 - Heath](https://velog.io/@dldydldy75/%EB%B2%A0%EC%9D%B4%EC%A6%88-%ED%86%B5%EA%B3%84%ED%95%99-%EB%A7%9B%EB%B3%B4%EA%B8%B0)
