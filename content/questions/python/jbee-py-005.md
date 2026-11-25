---
id: jbee-py-005
topicId: python
sourceId: jbee-interview-beginner
type: concept
difficulty: intermediate
roles:
- mle
- agent
- ds
reviewTarget:
  noteId: jbee-py-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_notes@1
  at: '2026-11-17'
---

## 문제

Celery에 대해 설명하세요.

## 해설

[Celery](http://www.celeryproject.org/)는 메시지 패싱 방식의 분산 비동기 작업 큐다. 작업(Task)은 브로커(Broker)를 통해 메시지(Message)로 워커(Worker)에 전달되어 처리된다. 작업은 멀티프로세싱, eventlet, gevent 를 사용해 하나 혹은 그 이상의 워커에서 동시적으로 실행되며 백그라운드에서 비동기적으로 실행될 수 있다.

#### Reference

* [Spoqa - Celery 를 이용한 긴 작업 처리](https://spoqa.github.io/2012/05/29/distribute-task-with-celery.html)
* [[번역]셀러리 입문하기](https://beomi.github.io/2017/03/19/Introduction-to-Celery/)
* [Python Celery with Redis](http://dgkim5360.tistory.com/entry/python-celery-asynchronous-system-with-redis)
