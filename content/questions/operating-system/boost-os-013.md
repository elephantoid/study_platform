---
id: boost-os-013
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

외부 단편화와 내부 단편화에 대해 설명해주세요.

## 해설

**메모리 단편화(Memory Fragmentation)** 는 RAM에서 메모리의 공간이 작은 조각으로 나뉘어져 사용가능한 메모리가 존재하지만, 할당이 불가능한 상태를 말한다. 자세히 설명하자면, 어떤 태스크가 메모리를 할당받기 위해서는, 연속된 메모리 공간이 필요하다. 그러나 메모리 단편화가 일어나면, 할당되지 않은 메모리의 총량이 충분해도, 이들이 작은 메모리 파편(Memory Fragment)으로 존재하고 있기 때문에 메모리 할당이 불가능한 상황이 발생한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/memory-fragmentation.png)

**내부 단편화(Internal Fragmentation)** 란, 메모리를 할당할 때 프로세스가 필요한 양보다 더 큰 메모리가 할당되어서 프로세스에서 사용하는 메모리 공간이 낭비 되는 상황을 말한다. 예를 들어, 메모장을 켰는데 OS가 4kb를 할당해주었다고 해보자. 그런데 실제로는 1kb만큼만 사용했다고 한다면, 필요 이상으로 프로세스가 메모리를 할당받았으므로 내부 단편화가 3kb만큼 생겼다고 할 수 있다.

**외부 단편화(External Fragmentation)** 란, 작은 메모리가 중간중간에 존재해서 메모리 공간은 충분하지만 실제로 할당할 수 없는 상황을 말한다. 메모리가 할당되고 해제되는 작업이 반복될 때 작은 메모리가 중간에 생기게 된다. 이를 hole이라고 부른다. 이렇게 중간에 끼인 hole들이 많아지면, 메모리 낭비로 인해, 총 가용공간이 충분하더라도 새로운 태스크가 메모리를 할당받지 못하는 상황이 올 수 있다.  
예를 들어, 위의 그림처럼 메모리의 할당과 해제의 반복으로 인해 메모리 중간에 빈 hole들이 만들어졌다고 해보자. 현재 모든 hole의 총합은 16MB 이고, 9MB짜리 프로세스를 할당하고자 한다. 빈 메모리의 공간중에 제일 큰 빈 메모리(hole)의 크기가 9MB 보다 작을 때, 외부 단편화가 일어났다고 할 수 있다.

> **메모리 할당 방법**

메모리 할당 방법은 크게 연속할당 방식과 불연속 할당 방식으로 나뉠 수 있다. **연속할당 방식**에는 `고정분할 방식`, `가변분할 방식`이 있고, **불연속 할당 방식**에는 `페이징 기법`과 `세그멘테이션 기법`, `페이지드 세그멘테이션`(Paged Segmentations) 기법 등이 있다.

- **압축(Compaction)기법**

주기적으로 삭제 공간을 회수하여, 메모리 공간을 정리하는 방식이다. 그러나 비용이 많이 든다는 단점이 있다.

- **페이징(Paging)기법**: 가상메모리사용, 외부 단편화 해결, 내부 단편화 존재

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/paging.png)

쉽게말해, 프로세스를 일정한 단위로 잘라서 사용하자는 방식이다. 프로세스의 주소 공간을 동일한 크기의 페이지 단위로 나누어 물리적 메모리의 서로 다른 위치에 페이지들을 저장하는 방식을 말한다. 이때, 논리(가상) 메모리의 단위는 페이지(page), 물리 메모리의 단위는 프레임(frame)이라고 부른다.

페이징 기법을 사용하면 연속적이지 않은 공간도 활용할 수 있기 때문에 외부 단편화 문제를 해결할 수 있다. 대신 페이지 단위에 알맞게 꽉채워 쓰는게 아니므로 내부 단편화 문제는 여전히 존재한다. 페이지 단위를 작게하면 내부 단편화 문제도 해결할 수 있겠지만 대신 page mapping 과정이 많아지므로 오히려 효율이 떨어질 수 있다.

- **세그멘테이션(Segmentation)기법**: 가상메모리사용, 내부 단편화 해결, 외부 단편화 존재

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/segmentation-method.png)

하나의 프로세스를 구성하는 주소 공간은 일반적으로 코드, 데이터, 스택 등의 의미 있는 단위들로 구성되며, 이렇게 기능적인 구조를 하나의 세그먼트 단위로 삼아, 분할하여 저장된다. 즉, 페이징기법에서 가상메모리를 같은 크기의 단위로 분할했지만 세그멘테이션 기법에서는 가상메모리를 서로 크기가 다른 논리적 단위인 세그먼트로 분할해서 메모리를 할당하여 실제 메모리 주소로 변환을 하게 된다. 각 세그먼트는 연속적인 공간에 저장되어 있다. 세그먼트들의 크기가 다르기 때문에 미리 분할해 둘 수 없고 메모리에 적재될 때 빈 공간을 찾아 할당해야한다. 마찬가지로 mapping을 위해 세그먼트 테이블이 필요하다.

프로세스가 필요한 메모리 만큼 할당해주기 때문에 내부단편화는 일어나지 않으나 여전히 중간에 프로세스가 메모리를 해제하면 생기는 hole, 즉 외부 단편화 문제는 여전히 존재한다.

**References**
- [메모리 단편화(Memory Fragmentation)가 무엇이고 왜 발생하는가? - 기본기를 쌓는 정아마추어 코딩블로그](https://jeong-pro.tistory.com/91)
- [os/CH.07 메모리 관리 - cs-special-forces-headquarters](https://github.com/LandvibeDev/cs-special-forces-headquarters/blob/main/os/CH.07%20%EB%A9%94%EB%AA%A8%EB%A6%AC%20%EA%B4%80%EB%A6%AC/CH07%20%EB%A9%94%EB%AA%A8%EB%A6%AC%20%EA%B4%80%EB%A6%AC%201b36c524aebc4550908d46538a87c73e.md)
- [메모리 단편화(Memory Fragmentation)가 무엇이고 왜 발생하는가? - 기본기를 쌓는 정아마추어 코딩블로그](https://jeong-pro.tistory.com/91)
