---
id: boost-os-014
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

Context Switching이 무엇인지 설명하고 과정을 나열해주세요.

## 해설

Context Switching이란, 현재 실행중인 프로세스의 정보를 저장하고 다른 프로세스를 실행시킬 때 발생한다. CPU는 하나의 프로세스 정보만 기억할 수 있기 때문에, 다른 프로세스를 실행하기 위해서는, 기존에 실행중이던 프로세스의 상태 또는 레지스터 값(Context)을 PCB에 저장해야 한다. 기존의 값을 저장한 후, 다음 실행시킬 프로세스의 상태와 레지스터값을 PCB에서 읽어와서 레지스터에 적재하는 작업을 Context Switching 이라 한다.

Context Switching 과정은 다음과 같다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/context-switching.png)

1. Interrupt나 시스템 호출에 의해 context switching 요구
2. User Mode에서 Kernel Mode로 변경
3. 기존 프로세스의 현재 context를 PCB에 저장
4. 다음에 실행할 프로세스의 상태정보를 PCB에서 복구한 후 다음 프로세스를 실행
5. Kernel Mode에서 User Mode로 변경

> **Context Switching이 발생하는 상황**

Context Switching은 인터럽트 발생 시에 발생하고, 인터럽트는 실행 중인 CPU 사용 할당 시간을 모두 소모하거나, 입출력을 위해 대기하는 경우에 발생하며, 프로세스의 CPU 제어권이 다른 프로세스에게 이양되는 상황으로 볼 수 있다. 따라서, 프로세스 상태와도 관련이 있으며, 3가지 상태 변화에 따라 인터럽트가 발생한다. Context Switch를 하는 주체는 OS 스케줄러이다.

1. `running` → `ready`
2. `ready` → `running`
3. `running` → `waiting`

> **PCB(Process Control Block)**

프로세스를 관리하는데 있어 필요한 정보(메타 데이터)를 담고있는 운영체제 커널의 자료구조이다. 프로세스가 생성될 때마다 고유의 PCB가 생성되며, 프로세스가 완료되면 PCB는 제거된다. PCB에는 `Process ID`, `Process State`(ex. ready, running), `Program Counter`(다음 instruction), `Register 값`, `Pointer`, `CPU scheduling/Memory/Process information` 등의 정보가 포함된다.

> **Thread 단위의 Context Switching**

Process는 Thread보다 Context Switching 오버헤드가 크다. Thread는 Stack 영역을 제외한 모든 메모리를 공유하기 때문이다.

**References**
- [os/CH.05 프로세스 관리 - cs-special-forces-headquarters](https://github.com/LandvibeDev/cs-special-forces-headquarters/blob/main/os/CH.05%20%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%20%EA%B4%80%EB%A6%AC/CH.05%20%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%20%EA%B4%80%EB%A6%AC.md)
- [OS - Context Switch(컨텍스트 스위치)가 무엇인가? - 기본기를 쌓는 정아마추어 코딩블로그](https://jeong-pro.tistory.com/93)
- [[Context Switching] 프로세스와 쓰레드에서의 컨텍스트 스위칭 - 은비로운 개발일기](https://agh2o.tistory.com/12)
- [Context Switching - 지식덤프](http://jidum.com/jidums/view.do?jidumId=442)
- [[OS] PCB와 Context Switching - require('develop')](https://m.blog.naver.com/adamdoha/222019884898)
