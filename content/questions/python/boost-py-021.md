---
id: boost-py-021
topicId: python
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
- ds
reviewTarget:
  noteId: boost-py-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

What does `[::-1]` do?

## 해설

파이썬 시퀀스 자료형은 값이 연속적으로 이어진 자료형으로, **리스트, 튜플, range, 문자열**이 있다. 시퀀스 자료형은 시퀀스 객체의 일부를 잘라낼 수 있는 **슬라이싱(slicing)**이라는 기능을 쓸 수 있다. 슬라이싱은 `seq[start:end:step]`처럼 쓸 수 있으며, `start`는 시작 인덱스, `end`는 끝 인덱스(범위에 포함하지는 않음), `step`은 인덱스 증감폭을 말한다. `step`이 양수이면 증가하고, 음수이면 감소한다.

다시 돌아와 `seq[::-1]`은 `start`와 `end`는 시작 인덱스와 끝 인덱스를 생략하였는데, 이럴 경우 전체 시퀀스를 가져오며, 증감폭이 -1이므로 `end-1`부터 시작해 `start`순으로 요소를 가져온다. 즉, `seq[::-1]`은 시퀀스를 역전(reverse)시킨다.

**References**
- [시퀀스 자료형 활용하기 - 파이썬 코딩 도장](https://dojang.io/mod/page/view.php?id=2205)
- [슬라이스 사용하기 - 파이썬 코딩 도장](https://dojang.io/mod/page/view.php?id=2208)
