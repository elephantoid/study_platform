---
id: boost-stat-008
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

p-value를 모르는 사람에게 설명한다면 어떻게 설명하실 건가요?

## 해설

p-value를 알기 위해서는 먼저 1종 오류를 알아야 한다. 여기서 1종 오류란 **귀무가설이 참인데 기각한 경우**을 말한다. 귀무가설이란 기존의 주장을 말하며, 이와 반대로 새로운 주장을 대립가설이라고 한다.

예를 들어, 어느 제약회사에서 치료약 A를 개발했다. 기존에는 치료약 A가 없었으므로 귀무가설은 "치료약 A가 효과가 없다"라고 설정한다. 반대로 대립가설은 "치료약 A는 효과가 있다"로 설정한다. 회사에서는 검정을 한 결과, 귀무가설을 기각하고 대립가설을 채택했다. 치료약 A는 판매되었고 높은 매출을 기록했다. 그런데 알고보니 치료약 A가 효과가 없다는 것이 밝혀졌다. 참인 귀무가설을 기각했기에 이는 1종 오류가 일어났다고 볼 수 있다.

다시 돌아와서 p-value는 **1종 오류를 범할 확률**을 말한다. 예를 들어, p-value가 5%라면, 100번 중 5번 1종 오류가 발생한다는 말이다. 검정을 할 때는 유의 수준 $\alpha$를 정하는데, 이것이 1종 오류의 상한선이 된다. 그래서 유의 수준보다 p-value가 작다면 실험의 오류가 상한선보다 작으므로 귀무가설을 기각하고 대립가설을 채택한다. 만약 크다면 상한선을 넘었으므로 귀무가설을 채택한다.

**References**
- [p-value의 의미 - 공돌이의 수학정리노트](https://angeloyeo.github.io/2020/03/29/p_value.html)
- [p-value란 무엇인가 - 진화하자 어디에도 소속되지 않기](https://adnoctum.tistory.com/332)
- [통계, 기본 개념을 정리해보자 - 이지훈](https://brunch.co.kr/@jihoonleeh9l6/34)
- [유의수준(Significance Level)과 p값(p-value) - 통계학과 사색의 공간](https://m.blog.naver.com/vnf3751/220830413960)
