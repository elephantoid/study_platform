---
id: boost-stat-007
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

신뢰 구간의 정의는 무엇인가요?

## 해설

구간 추정에서 <strong>모수가 a 에서 b 사이에 있을 것으로 추정(신뢰구간)</strong>하고 <strong>그 확률(%, 신뢰수준)</strong>을 구한다.

![신뢰수준과 신뢰구간](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/1-statistics-math/confidence-level.png)

**신뢰구간(Confidence Interval)** 은 모집단의 모수(parameter)가 위치해 있을 것으로 신뢰할 수 있는 구간이다.
모수가 어느 범위 안에 있는지를 확률적으로 보여주는 방법이라고 할 수 있다.
신뢰구간을 구하는 이유는 모수의 신뢰성을 가늠하기 위함이다.

추가적으로, 신뢰구간에 대한 정확한 해석은 모평균을 포함할 확률이 95%가 되는 구간이 아닌, 같은 방법으로 100번 표본을 추출했을 때, 함께 계산되는 100개의 신뢰구간 중 모평균을 포함한 신뢰구간들의 숫자가 95개정도 된다라고 해야한다. 왜냐면, 모평균은 이미 정해져 있는 값이므로 전자의 해석을 사용할 수 없기 때문이다.

**신뢰수준**은 방법의 정확도, 참값을 구하기 위한 작업을 많이 반복했을 때, 참값이 특정 범위에 있는 비율이다.

**모수(Parameter)** 는 모집단의 특성을 보여주는 값이다. 예를들어, 평균, 분산 등의 고정인 값이 있을 수 있다.

**References**
- [COMPUTATAIONAL PREDICTION - Minkoo Seo blog](http://mkseo.pe.kr/stats/?p=763)
- [신뢰구간 - 위키백과](https://ko.wikipedia.org/wiki/%EC%8B%A0%EB%A2%B0_%EA%B5%AC%EA%B0%84)
- [신뢰구간의 의미 - 공돌이의 수학정리노트](https://angeloyeo.github.io/2021/01/05/confidence_interval.html)
