---
id: jbee-py-003
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

GIL 과 그로 인한 성능 문제에 대해 설명하세요.

## 해설

GIL 때문에 성능 문제가 대두되는 경우는 압축, 정렬, 인코딩 등 수행시간에 CPU 의 영향이 큰 작업(CPU bound)을 멀티 스레드로 수행하도록 한 경우다. 이 땐 GIL 때문에 멀티 스레드로 작업을 수행해도 싱글 스레드일 때와 별반 차이가 나지 않는다. 이를 해결하기 위해선 멀티 스레드는 파일, 네트워크 IO 같은 IO bound 프로그램에 사용하고 멀티 프로세스를 활용해야한다.

### GIL(Global Interpreter Lock)

GIL 은 스레드에서 사용되는 Lock 을 인터프리터 레벨로 확장한 개념인데 여러 스레드가 동시에 실행되는걸 방지한다. 더 정확히 말하자면 어느 시점이든 하나의 Bytecode 만이 실행되도록 강제한다. 각 스레드는 다른 스레드에 의해 GIL 이 해제되길 기다린 후에야 실행될 수 있다. 즉 멀티 스레드로 만들었어도 본질적으로 싱글 스레드로 동작한다.

![](https://cdn-images-1.medium.com/max/1600/1*hqWXEQmyMZCGzAAxrd0N0g.png)

<sup> _출처 [mjhans83 님의 python GIL](https://medium.com/@mjhans83/python-gil-f940eac0bef9)_ </sup>

### GIL 의 장점

코어 개수는 점점 늘어만 가는데 이 GIL 때문에 그 장점을 제대로 살리지 못하기만 하는 것 같으나 이 GIL 로 인한 장점도 존재한다. GIL 을 활용한 멀티 스레드가 그렇지 않은 멀티 스레드보다 구현이 쉬우며, 레퍼런스 카운팅을 사용하는 메모리 관리 방식에서 GIL 덕분에 오버헤드가 적어 싱글 스레드일 때 [fine grained lock 방식](https://fileadmin.cs.lth.se/cs/Education/EDA015F/2013/Herlihy4-5-presentation.pdf)보다 성능이 우월하다. 또한 C extension 이 GIL 을 해제하도록 구현된 경우 GIL 이 해제되므로 C library 를 사용하는 CPU bound 프로그램을 멀티 스레드로 실행하는 경우 더 빠를 수 있다.

#### Reference

* [동시성과 병렬성](https://www.slideshare.net/deview/2d4python)
* [Understanding the Python GIL](http://www.dabeaz.com/python/UnderstandingGIL.pdf)
* [Threads and the GIL](http://jessenoller.com/blog/2009/02/01/python-threads-and-the-global-interpreter-lock)
* [Python GIL](https://medium.com/@mjhans83/python-gil-f940eac0bef9)
* [Old GIL 과 New GIL](https://blog.naver.com/parkjy76/30167429369)

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._
