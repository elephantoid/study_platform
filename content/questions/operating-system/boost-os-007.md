---
id: boost-os-007
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

CPU 스케줄러인 FCFS, SJF, SRTF, RR, Priority Scheduling에 대해 간략히 설명해주세요.

## 해설

> **스케줄링 정책**

스케줄링 정책(scheduling policy)에 따라 스케줄러를 **선점/비선점**과 **정적/동적 우선순위**로 나눌 수 있다.

- `비선점 스케줄링(Non-preemptive scheduling)`: 할당 받을 자원을 스스로 반납할 때까지 사용한다. 이는 Context Switching 부하가 적다는 장점이 있지만, 우선순위가 높은 프로세스가 들어올 경우 우선순위가 역전되어 우선순위가 낮은 프로세스의 처리 시간이 늘어나 평균 응답시간이 증가한다는 단점이 있다.

- `선점 스케쥴링(Preemptive Scheduling)`: 타의에 의해 자원을 빼앗길 수 있다. 비선점 스케줄링과 다르게 Context Switching 부하가 크지만, 응답성이 높으므로 real-time system, time-sharing system에 적합하다.

- `정적 우선순위(Static Priority)`: 프로세스 생성 시 결정된 우선순위가 유지된다. 이는 구현을 쉽게 하고, Context Switching이 덜 일어나기 때문에 부하가 적다. 하지만 시스템 환경 변화에 대한 대응이 어렵다.

- `동적 우선순위(Dynamic Priority)`: 프로세스의 상태 변화에 따라 우선순위를 변경한다. 구현이 복잡하지만 시스템 환경 변화에 유연하게 대응이 가능하다.

> **대표적인 스케줄러**

`FCFS(First Come First Service)`는 비선점 스케줄러로, **Ready Queue에 먼저 도착한 프로세스를 먼저 처리**한다. 자원을 효율적으로 사용할 수 있어 일괄 처리 시스템에 적합하다. 하지만 만약 수행시간이 긴 프로세스가 먼저 도착하면 다른 프로세스의 대기시간이 길어지는 Convoy Effect로 인해 평균 응답시간이 길다는 단점이 있다.

`RR(Round Robin)`은 선점 스케줄러로, Ready Queue에 먼저 도착한 프로세스를 처리한다는 점에서 FCFS와 같지만 **자원 사용 시간(time quantum)이 있다는 점**에서 차이가 있다. 프로세스가 할당된 시간이 지나면 자원을 반납하게 하여 특정 프로세스의 자원 독점을 방지한다.

`SJF(Shortest Job First)`는 비선점 스케줄러로, **CPU burst time이 가장 작은 프로세스를 먼저 처리**한다. 가장 실행시간이 적은 프로세스를 먼저 처리하기 때문에 대기 시간을 줄일 수 있지만, 실행시간을 예측한다는 점에서 비현실적이며 계속해서 짧은 프로세스만 처리하므로 긴 프로세스는 뒤로 밀린다는 단점이 있다.

`SRTF(Shortest Remaining Time First)`는 선점 스케줄러로, **잔여 실행 시간이 더 적은 프로세스를 먼저 처리**한다. SJF의 장점을 극대화 했으나, 프로세스 생성 시 총 실행 시간 예측이 필요하고 잔여 시간을 계속 추적해야 해서 overhead가 크고 구현 및 사용이 비현실적이다.

`Priority Scheduling`은 각 프로세스에 지정된 우선순위를 기준으로 **높은 우선순위를 가진 프로세스를 먼저 처리**한다. 이 방식의 단점은 계속해서 우선순위가 높은 프로세스가 들어오면 그 프로세스를 먼저 처리하므로 낮은 프로세스는 뒤로 밀리는 starvation 문제가 발생한다. 이는 일정 시간 이상 기다리면 프로세스의 우선순위를 높여주는 aging 방식으로 해결할 수 있다.

**References**
- [[OS] Lecture 5. Process Scheduling (2/4) - FCFS, RR / 운영체제 강의 - HPC Lab. KOREATECH](https://www.youtube.com/watch?v=r1JVA7yOPAM&list=PLBrGAFAIyf5rby7QylRc6JxU5lzQ9c4tN&index=9&ab_channel=HPCLab.KOREATECHHPCLab.KOREATECH)
- [[OS] Lecture 5. Process Scheduling (3/4) - SPN, SRTN, HRRN / 운영체제 강의 - HPC Lab. KOREATECH](https://www.youtube.com/watch?v=keY9Wi7scEs&list=PLBrGAFAIyf5rby7QylRc6JxU5lzQ9c4tN&index=10&ab_channel=HPCLab.KOREATECHHPCLab.KOREATECH)
- [CPU Scheduling, Process 이해하기 - 어쩐지 오늘은](https://zzsza.github.io/development/2018/07/29/cpu-scheduling-and-process/)
