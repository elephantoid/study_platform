---
id: boost-os-001
topicId: operating-system
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: boost-os-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

프로세스와 스레드의 차이(Process vs Thread)를 알려주세요.

## 해설

<strong>프로그램(Program)</strong>이란 파일이 저장 장치에 저장되어 있지만 메모리에 올라가 있지 않은 정적인 상태를 말한다.

<strong>프로세스(Process)</strong>란 운영체제로부터 시스템 자원을 할당받는 작업의 단위로 메모리에 올라와 실행되고 있는 프로그램의 인스턴스(독립적인 개체)를 의미한다.

> **할당받는 시스템 자원의 예**

- CPU 시간
- 운영되기 위해 필요한 주소 공간
- Code, Data, Stack, Heap의 구조로 되어 있는 독립된 메모리 영역

> **프로세스의 특징**

- 프로세스는 각각 독립된 메모리 영역(Code, Data, Stack, Heap의 구조)을 할당받는다.
- 프로세스당 최소 1개의 스레드(메인 스레드)를 가지고 있다.
- 각 프로세스는 별도의 주소 공간에서 실행되며, 한 프로세스는 다른 프로세스의 변수나 자료구조에 접근할 수 없다.
- 한 프로세스가 다른 프로세스의 자원에 접근하려면 프로세스 간의 통신(IPC, Inter-Process Communication)을 사용해야 한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/process.png)

<strong>스레드(Thread)</strong>란 프로세스가 할당받은 자원을 이용하는 실행의 단위로 프로세스와는 다른 더 작은 실행 단위 개념이다. 스레드는 프로세스의 코드에 정의된 절차에 따라 실행되는 특정한 수행 경로이다.

> **스레드의 특징**

- 스레드는 프로세스 내에서 각각 Stack 영역만 따로 할당받고 Code, Data, Heap 영역은 공유한다.
- 스레드는 한 프로세스 내에서 동작되는 여러 실행의 흐름으로, 프로세스 내의 주소 공간이나 자원들(힙 공간 등)을 같은 프로세스 내에 스레드끼리 공유하면서 실행된다.
- 같은 프로세스 안에 있는 여러 스레드들은 같은 힙 공간을 공유한다. 반면에 프로세스는 다른 프로세스의 메모리에 직접 접근할 수 없다.
- 각각의 스레드는 별도의 레지스터와 스택을 갖고 있지만, 힙 메모리는 서로 읽고 쓸 수 있다.
- 한 스레드가 프로세스 자원을 변경하면, 다른 이웃 스레드(sibling thread)도 그 변경 결과를 즉시 볼 수 있다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/thread.png)

**References**
- [[OS] 프로세스와 스레드의 차이 - Heee's Development Blog](https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html)
- [프로세스와 스레드의 차이 - 개발장](https://velog.io/@raejoonee/%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%99%80-%EC%8A%A4%EB%A0%88%EB%93%9C%EC%9D%98-%EC%B0%A8%EC%9D%B4)
