---
id: boost-stat-021
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

필요한 표본의 크기를 어떻게 계산합니까?

## 해설

먼저 **모집단의 크기 $N$** 을 구하고, **신뢰수준 $z$** 와 **오차범위 $e$** 를 얼마로 할지 선정하여 표본의 크기를 구할 수 있다.

$$
\frac{\frac{z^2 \times p(1-p)}{e^2}}{1 + (\frac{z^2 \times p(1-p)}{e^2 N})}
$$

참고로 신뢰수준은 표본추출을 반복했을 때 얼마나 그 결과를 신뢰할 수 있는지에 대한 정도로 95% 를 주로 사용한다.

오차범위는 작을 수록 모집단의 특성에 대한 유용한 정보를 제공하지만 모집단에 대한 추론이 틀릴 가능성도 높아지므로 10% 를 넘지 않게 한다.

**References**
- [필요한 설문 응답자수(표본크기) 계산하기 - LearnX](https://learnx.tistory.com/entry/%ED%95%84%EC%9A%94%ED%95%9C-%EC%84%A4%EB%AC%B8-%EC%9D%91%EB%8B%B5%EC%9E%90%EC%88%98%ED%91%9C%EB%B3%B8%ED%81%AC%EA%B8%B0-%EA%B3%84%EC%82%B0%ED%95%98%EA%B8%B0)
- [표본크기의 결정 - Data Scream](https://datascream.co.kr/77)
