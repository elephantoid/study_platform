---
id: boost-stat-019
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

missing value가 있을 경우 채워야 할까요? 그 이유는 무엇인가요?

## 해설

missing value를 처리하는 방법에는 크게 4가지가 있다.

1. `그대로 놔두기`: 누락된 데이터를 그대로 놔두는 방법이다.
2. `삭제하기`: 누락된 데이터를 제거하는 방법이다. 그러나 중요한 정보를 가진 데이터를 잃을 위험이 있다.
3. `특정 값으로 채우기`: 0, 빈번한 값, 지정한 상수값으로 채우기
4. `예측하여 채우기`: K-means, 평균값, 중앙값으로 대체하는 것

1번 방법을 사용하여, 데이터가 누락된 채로 놔둔다고 가정하자.
일부 xgboost같은 알고리즘은 결측값을 고려하여 잘 학습한다.
그러나 **결측치를 처리하는 로직이 없는 알고리즘(ex. sklearn의 LinearRegression)은 누락된 데이터 때문에 엉망이 될 수 있다.**
따라서 결측치를 처리해주어야한다.

2번 방법을 사용하여, 누락된 데이터를 제거한다고 해보자. 제거하는 방법은 가장 쉬운 방법이다. 그러나 만약 100명 중 한명의 특징(feature)이 누락된 상태이므로, 해당 특징을 전부 삭제한다면 중요한 특성을 잃어버리는 결과를 초래하게 된다.

3번, 4번 방법을 사용하여 결측치를 채운다고 해보자. 결측치를 채움으로서, 중요한 정보를 잃지않고 특성을 유지할 수 있다. 그러나 만약 100명 중 99명의 특징이 누락된 상태라고 한다면, 해당 특징을 어떠한 값으로 채우는 행위가 무의미할 것이다.

따라서 **결측치 상태나 비율, 어떤 모델을 사용할 것인지**에 따라서 결측치 대응 방법이 달라질 수 있다.

**References**
- [누락 데이터(Missing value)를 처리하는 7가지 방법 - 밥먹는 개발자](https://dining-developer.tistory.com/19)
