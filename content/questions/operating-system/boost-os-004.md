---
id: boost-os-004
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

Thread-safe에 대해 설명해주세요. (hint: critical section)

## 해설

`스레드 안전(Thread-safe)`이란 <u>멀티 스레드 프로그래밍에서 일반적으로 어떤 함수나 변수, 객체를 여러 스레드가 동시에 접근해도 프로그램 실행에 문제가 없음</u>을 뜻한다. 즉, 멀티 스레드 환경에서 여러 쓰레드가 동시에 동일한 코드를 실행시켰을 때 올바른 결과를 얻는 것을 말한다.

```python
import threading
from threading import Thread

def increase_count():
    global count
    for _ in range(1000000):
        count += 1


if __name__=="__main__":
    count = 0

    # 스레드 생성
    thread_a = Thread(target=increase_count, name="thread a")
    thread_b = Thread(target=increase_count, name="thread b")

    # 스레드 실행
    thread_a.start()
    thread_b.start()

    # 스레드 종료
    thread_a.join()
    thread_b.join()

    print("최종 count:", count)
```

다음은 스레드 안전하지 않은 경우의 코드이다. 사용자가 원하는 결과는 스레드가 함수를 실행한 수에 1000000을 곱한 값이 count의 값이 되는 것이다. 하지만 다음 코드를 실행하면, count는 2000000가 아닌 1448523이 나온다. (실행할 때마다 값이 달라진다)

왜 그럴까? 바로 <u>두 스레드가 count 변수를 공유하고 있기 때문</u>이다. 이 때 공유 자원에 접근하는 코드 영역을 `임계 영역(critical section)`이라고 하며, 둘 이상의 프로세스가 동시에 임계 영역에 접근하는 것을 막는 것을 `상호 배제(mutual exclusion)`라고 한다.

파이썬에서는 threading 모듈에 있는 Lock 객체로 상호 배제를 시킬 수 있다. 다음 코드를 실행하면 최종 count는 우리가 원했던 2000000이 나온다.

```python
import threading
from threading import Thread

def increase_count():
    lock.acquire()
    global count
    for _ in range(1000000):
        count += 1
    lock.release()


if __name__=="__main__":
    count = 0

    # 스레드 락 생성
    lock = threading.Lock()

    # 스레드 생성
    thread_a = Thread(target=increase_count, name="thread a")
    thread_b = Thread(target=increase_count, name="thread b")

    # 스레드 실행
    thread_a.start()
    thread_b.start()

    # 스레드 종료
    thread_a.join()
    thread_b.join()

    print("최종 count:", count)
```

**References**
- [스레드 안전 - 위키백과](https://ko.wikipedia.org/wiki/%EC%8A%A4%EB%A0%88%EB%93%9C_%EC%95%88%EC%A0%84)
- [[OS] Lecture 6. Process Synchronization and Mutual Exclusion (1/7) - Introduction / 운영체제 강의 - HPC Lab. KOREATECH](https://www.youtube.com/watch?v=wdaf2gy83uU&list=PLBrGAFAIyf5rby7QylRc6JxU5lzQ9c4tN&index=12&ab_channel=HPCLab.KOREATECHHPCLab.KOREATECH)
