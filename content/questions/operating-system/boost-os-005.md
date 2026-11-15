---
id: boost-os-005
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

뮤텍스와 세마포어의 차이를 설명해주세요.

## 해설

`상호배제(Mutual Exclusion, Mutex)`는 **한 스레드/프로세스가 임계 영역에 있으면 다른 스레드/프로세스가 못 들어오도록 막는 것**을 말한다. 상호배제는 다음과 같이 수행된다.

1. 임계 영역 진입 전 다른 스레드/프로세스가 임계 영역에 안에 있는지 검사한다.
2. 없다면 임계 영역에 진입하여 공유 자원에 접근한다. 있다면 기다린다.
3. 끝나면 임계 영역을 벗어나 다른 프로세스에게 임계 영역에 벗어났음을 알린다.

`세마포어(Semaphore)`는 현재 **공유 자원에 접근할 수 있는 스레드/프로세스의 수를 나타내는 값을 두어 상호배제를 하는 방법**을 말한다. 세마포어는 변수로 음이 아닌 정수 S(여러 개가 존재 가능)와, 함수로 초기화 연산, P(검사), V(증가) 연산이 있으며, 다음과 같이 수행된다.

1. 변수 S를 초기화 연산을 통해 초기화 시킨다.
2. P 함수를 실행하여 S가 0보다 큰지 검사한다.
3. 만약 0보다 크다면, S를 1 감소시키고 임계 영역에 진입하여 공유 자원에 접근한다.
4. 크지 않다면, 스레드/프로세스를 Ready Queue에 넣어 대기시킨다.
5. 임계 영역에서 나온 스레드/프로세스는 V 함수를 실행하여 Ready Queue에 스레드/프로세스가 있는지 체크한다. 만약 있다면, 그 중 1개를 임계 영역에 진입시킨다. 없다면, S를 1 증가시킨다.

**References**
- [뮤텍스(Mutex)와 세마포어(Semaphore)의 차이 - Worth spreading](https://worthpreading.tistory.com/90)
- [[OS] Lecture 6. Process Synchronization and Mutual Exclusion (1/7) - Introduction / 운영체제 강의 - HPC Lab. KOREATECH](https://www.youtube.com/watch?v=wdaf2gy83uU&list=PLBrGAFAIyf5rby7QylRc6JxU5lzQ9c4tN&index=12&ab_channel=HPCLab.KOREATECHHPCLab.KOREATECH)
- [[OS] Lec 6. Process Synchronization and Mutual Exclusion (5/7) - Semaphore (OS supported Sol. 2) - HPC Lab. KOREATECH](https://www.youtube.com/watch?v=CitsUz-Dx7A&list=PLBrGAFAIyf5rby7QylRc6JxU5lzQ9c4tN&index=16&ab_channel=HPCLab.KOREATECHHPCLab.KOREATECH)
