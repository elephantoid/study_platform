---
id: jobhope-os-002
topicId: operating-system
sourceId: jobhope-technicalnote
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: jobhope-os-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_notes@1
  at: '2026-11-17'
---

## 문제

동시성과 병렬성에 대해 설명하세요.

## 해설

## 동시성(Concurrency)
- **싱글 코어**에서 **멀티 스레드**를 동작시키기 위한 방식
- 한 번에 여러 스레드를 다룬다.
- 하나의 코어에서 여러 개의 스레드가 번갈아가면서 실행된다.
- 동시에 실행되는 것처럼 보이지만 실제로는 시분할하여 번갈아가며 실행한다.
- 병렬성을 보장하지 않는다.
- 논리적 관점

## 병렬성(Parallelism)
- **멀티 코어**에서 **멀티 스레드**를 동작시기기 위한 방식
- 한 번에 여러 스레드를 실행한다.
- 다중 코어에서 각 코어들이 동시에 실행된다.
- 동시성을 필요로 한다.
- 물리적 관점

## 동시성과 병렬성
![동시성과병렬성](https://user-images.githubusercontent.com/21440957/65752705-4a2f0080-e148-11e9-8650-733f72ae967b.png)
