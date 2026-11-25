---
id: boost-net-007
topicId: network
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- agent
reviewTarget:
  noteId: boost-net-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

TCP의 연결 설정 과정(3단계)과 연결 종료 과정(4단계)이 단계가 차이나는 이유가 무엇인가요?

## 해설

연결 설정 과정과 다르게, 연결 종료 과정에서 고려해야하는 경우가 존재하는데, 이는 전송중인 데이터에 대한 경우이다. 클라이언트는 아직 서버로부터 못 받은 데이터가 있을 것을 대비하여 일정시간동안 세션을 남긴다(`TIME_WAIT`). 모든 데이터를 다 보내서 더 이상 보낼 데이터가 없다는 의미의 `FIN`을 받으면, 바로 연결을 종료한다.

**References**
- [[네트워크] TCP의 연결과 종료 : 3-way-handshake & 4-way-handshake - cherishee](https://hee96-story.tistory.com/101)
