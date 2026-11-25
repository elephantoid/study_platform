---
id: boost-stat-023
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

로그 함수는 어떤 경우 유용합니까? 사례를 들어 설명해주세요.

## 해설

우선 **단위 수가 너무 큰 값들을 바로 회귀분석 할 경우 결과를 왜곡할 우려가 있으므로 이를 방지하기 위해 사용**된다.

예를들어, 나이와 재산보유액의 관계를 회귀분석으로 푼다고 했을 때, 재산보유액의 숫자가 굉장히 클 수 있다.
재산보유액에 로그를 취할 경우, 데이터의 왜도와 첨도를 줄일 수 있어 정규성이 높아지는 효과를 얻는다.

또한 **비선형관계의 데이터를 선형으로 만들기 위해** 사용된다.

예를들어, 기하급수적으로 늘어나는 제곱 형식의 그래프에 자연로그를 취하면 그 관계가 직선(선형)이 된다.

> **로그함수 주의사항**

로그 함수는 0~1 사이에서는 음수값을 가지므로, $log(1+x)$와 같은 방법으로 처리해주어야한다.

> **왜도(skewness)와 첨도(Kurtosis)**

- 왜도는 데이터가 한쪽으로 치우친 정도이다.
- 첨도는 분포가 얼마나 뾰족한지를 나타내는 정도이다.

**References**
- [로그함수를 취하는 이유 - 당도](https://dangdo.tistory.com/44)
