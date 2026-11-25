---
id: boost-os-006
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

스케줄러가 무엇이고, 단기/중기/장기로 나누는 기준에 대해 설명해주세요.

## 해설

시스템 내에는 여러 개의 프로세스가 존재한다. 이 때 시간(time)과 공간(space) 즉, <u>자원을 할당할 프로세스를 선택</u>해야 하는데, 이 역할을 맡은 것을 `스케줄러`라고 한다.

스케줄러의 목적은 **시스템 성능 향상**이며 대표적인 시스템 성능 지표로 응답시간(response time), 작업 처리량(throughput), 자원 활용도(resource utilization)이 있다. **목적에 따라 다양한 성능 지표를 고려**하여 스케줄러를 선택한다.

스케줄러는 <u>발생하는 빈도와 할당하는 자원</u>에 따라 **장기/중기/단기 스케줄러**로 나눌 수 있다.

`장기 스케줄러(Long-term Scheduler)`는 시스템에 제출할 작업을 결정하는 Job Scheduling(Job → created)에서 사용하며, 시스템 내에 프로세스 수를 조절한다. 이 때 중요한 것은 CPU든 I/O든 모두 써서 효율성을 높이기 위해서 I/O bounded와 compute-bounded 프로세스들을 잘 섞어서 선택해야 한다.

`중기 스케줄러(Mid-term Scheduler)`는 메모리 할당을 결정하는 Memory Allocation(suspended ready → ready)에서 사용한다.

`단기 스케줄러(Short-term Scheduler)`는 프로세서를 할당 받을 프로세스를 결정하는 Process Scheduling(ready → running)에서 사용하며, 가장 빈번하게 발생하므로 매우 빨라야 한다.

> **응답시간 vs 작업 처리량 vs 자원 활용도**

- `응답시간(response time)`: 작업 요청으로부터 응답을 받을 때까지의 시간
- `작업 처리량(throughput)`: 단위 시간 동안 완료된 작업의 수
- `자원 활용도(resource time)`: 주어진 시간동안 자원이 활용된 시간

> **I/O Bounded 프로세스 vs Compute-bounded 프로세스**

- `I/O Bounded 프로세스`: I/O 대기시간이 긴 프로세스
- `Compute-bounded 프로세스`: CPU 사용시간이 긴 프로세스

> **스케줄링의 단계**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/scheduling-level.png)

**References**
- [[OS] Lecture 5. Process Scheduling (1/4) / 운영체제 강의 - HPC Lab. KOREATECH](https://www.youtube.com/watch?v=_gNeoGQx-Tc&list=PLBrGAFAIyf5rby7QylRc6JxU5lzQ9c4tN&index=8&ab_channel=HPCLab.KOREATECHHPCLab.KOREATECH)
