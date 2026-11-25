---
id: boost-os-015
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

Swapping에 대해 설명해주세요.

## 해설

스와핑(Swapping)이란, **주기억장치(메인메모리)에 적재한 하나의 프로세스와 보조기억장치(하드디스크)에 적재한 다른 프로세스의 메모리를 교체하는 기법**이다.

프로세스가 실행되기 위해서는, 프로세스의 명령어와 명령어가 접근하는 데이터가 메모리에 적재되어있어야 한다. 메모리가 부족하면, 메모리 내에 존재하던 기존 프로세스를 backing store(하드디스크, 보조기억장치)라는 공간으로 내릴 수 있다.(=쫒아낸다) 그리고 다시 필요할 때 메모리에 불러와서 사용할 수도 있다. 필요없는 데이터를 backing store에 저장하는 것을 swap out, 필요한 데이터를 메모리에 올리는 것을 swap in이라고 한다. (메모리 기준으로 in, out) **프로세스 단위로 swap in, swap out하는 것**을 swapping이라고 한다.

> **표준 스와핑과 페이지 단위 스와핑**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/swapping.png)

스와핑을 사용하면, 실제 물리 메모리보다 더 많은 프로세스를 수용할 수 있다. 스와핑의 가장 중요한 역할은 프로세스의 수를 조절하여, 다중 프로그래밍의 정도(degree of muliprogramming)를 조절 할 수 있다는 것이다. 유휴 상태가 오래 지속되는 프로세스가 스와핑에 적합하며, swap out 될 대상 프로세스는 스와퍼(swapper)라고 불리는 **중기 스케쥴러**(medium-term scheduler)에 의해 선정된다. 주의할 점은, 스와핑이라는 개념이 프로세스가 종료되어 그 주소 공간을 디스크로 내쫓는 것이 아니라, 특정한 이유로 수행 중인 프로세스의 주소 공간을 일시적으로 메모리에서 디스크로 내려놓는 것을 의미한다는 것이다.

그러나 위와 같이 프로세스 단위로 스와핑하는 표준 스와핑 방법은 최근에 많이 사용되지 않는다. 메모리와 저장장치 사이에 프로세스 전체를 이동시키는 것이 힘들기 때문이다. 대신, 페이지 단위 스와핑을 이용한다.

> **Backing Store**

스왑 영역(swap area)라고도 부르며, 디스크 내에 파일 시스템과는 별도로 존재하는 일정 영역을 말한다. 프로세스가 수행중인 동안에만 디스크에 일시적으로 저장하는 공간이므로 저장 기간이 상대적으로 짧은 저장공간이다. 다수의 사용자 프로세스를 담을 수 있을 만큼 충분히 큰 저장공간이어야 하고 어느 정도의 접근 속도가 보장되어야 한다는 특징이 있다.

**References**
- [[운영체제]Swapping 스와핑(swap 스왑)이란? - 양햄찌가 만드는 세상](https://jhnyang.tistory.com/103)
- [운영체제에서 스와핑(swapping) - 노는 게 제일 좋아](https://luv-n-interest.tistory.com/478)
- [os/CH.07 메모리 관리 - cs-special-forces-headquarters](https://github.com/LandvibeDev/cs-special-forces-headquarters/blob/main/os/CH.07%20%EB%A9%94%EB%AA%A8%EB%A6%AC%20%EA%B4%80%EB%A6%AC/CH07%20%EB%A9%94%EB%AA%A8%EB%A6%AC%20%EA%B4%80%EB%A6%AC%201b36c524aebc4550908d46538a87c73e.md)
