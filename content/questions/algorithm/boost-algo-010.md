---
id: boost-algo-010
topicId: algorithm
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: boost-algo-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

Divide and Conquer

## 해설

분할 정복(Divide and Conquer)은 문제를 **분할**해서 분할한 문제를 **해결**한 다음 결과를 **조합**하는 알고리즘이다. 큰 문제를 작은 문제로 분할한다는 관점에서 하향식 접근 방법으로 문제를 푼다고 볼 수 있다.

- **분할**: 문제를 동일한 유형의 여러 하위 문제로 나누는 것
- **해결**: 가장 작은 단위의 하위 문제를 해결하는 것
- **조합**: 하위 문제에 대한 결과를 원래 문제에 대한 결과로 조합하는 것

분할 정복 알고리즘은 보통 재귀를 사용하여 구현한다. 다음은 분할 정복의 대표적인 문제인 피보나치 수열 코드이다.

```python
def fibb(n):
  if n <= 1:
    return 1
  return fibb(n-1) + fibb(n-2)
```

**References**
- [Divide-and-conquer algorithm - Wikipedia](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm)
- [22장. 분할 정복 - 파이썬 알고리즘 인터뷰](http://www.yes24.com/Product/Goods/91084402)
