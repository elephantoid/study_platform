---
id: jbee-db-005
topicId: data-engineering-sql
sourceId: jbee-interview-beginner
type: concept
difficulty: intermediate
roles:
- ds
reviewTarget:
  noteId: jbee-db-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_notes@1
  at: '2026-11-17'
---

## 문제

Statement vs PreparedStatement에 대해 설명하세요.

## 해설

우선 속도 면에서 `PreparedStatement`가 빠르다고 알려져 있다. 이유는 쿼리를 수행하기 전에 이미 쿼리가 컴파일 되어 있으며, 반복 수행의 경우 프리 컴파일된 쿼리를 통해 수행이 이루어지기 때문이다.

`Statement`는 보통 SQL 문자열에 값을 직접 이어 붙여 쿼리를 만들고, `PreparedStatement`는 `?` 바인드 변수를 사용해 값을 바인딩한다. `PreparedStatement`가 파싱 타임을 줄여주는 것은 분명하다.

하지만 성능을 고려할 때 시간 부분에서 가장 큰 비중을 차지하는 것은 테이블에서 레코드(row)를 가져오는 과정이고 SQL 문을 파싱하는 시간은 이 시간의 10 분의 1 에 불과하다. 그렇기 때문에 `SQL Injection` 등의 문제를 보완해주는 `PreparedStatement`를 사용하는 것이 옳다.

#### 참고 자료

* http://java.ihoney.pe.kr/76

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._
