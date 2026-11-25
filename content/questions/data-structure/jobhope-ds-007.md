---
id: jobhope-ds-007
topicId: data-structure
sourceId: jobhope-technicalnote
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: jobhope-ds-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_notes@1
  at: '2026-11-17'
---

## 문제

스택을 어떤 자료구조로 구현하는것이 좋을 것인가?

## 해설

## 스택의 특성
- **LIFO** 구조

## 스택을 다양한 자료구조로 구현한다면 ?
### Array
- **top 포인터**로 **index 접근**을 하기 때문에 속도가 **빠르다**.
- 추가적인 **메모리 소모는 없지만** 스택의 **크기가 한정적**이다.
- 크기 확장시 O(n)의 비용이 소모된다.
- push의 시간복잡도 : O(1)
- pop의 시간복잡도 : O(1)
- size의 시간복잡도 : O(1)

### 단방향 LinkedList
- **head 노드**에서 push, pop을 구현하면 O(1)의 시간복잡도가 된다.
- Array에 비해 구현에 추가적인 메모리를 소모하지만 크기를 동적으로 늘릴 수 있다.
- push의 시간복잡도 : O(1)
- pop의 시간 복잡도 : O(1)
- size의 시간 복잡도 : O(N)

### 양방향 LinkedList
- 단방향과 같은 시간복잡도
- 노드 추가시 양방향에 대한 연결 처리 때문에 속도와 메모리 비용이 요구됨.
- push의 시간복잡도 : O(1)
- pop의 시간복잡도 : O(1)
- size의 시간 복잡도 : O(N)

## 그렇다면 어떤 자료구조가 제일 효율적인가?
- 스택의 최대 크기를 확정적으로 알 수 있는 경우 Array를 이용해 구현하는 것이 좋다.
- 크기를 미리 알 수 없다면 동적 배열(확장 시 일시적으로 O(n) 비용이 들지만 분할 상환 push는 O(1))과 단방향 LinkedList(크기를 자유롭게 늘릴 수 있으나 노드마다 추가 메모리 필요) 모두 사용할 수 있으며, 캐시 효율 때문에 실무에서는 동적 배열이 흔히 쓰인다.

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._
