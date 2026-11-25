---
id: boost-os-009
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

메모리 관리 전략에는 무엇이 있는지 간략히 설명해주세요.

## 해설

제한된 메모리 크기를 효율적으로 사용하기 위해 메모리 관리 전략이 필요하다.

> **스왑**

프로세스가 실행되기 위해서는 메모리에 올라가야한다. 실행되어야 하는 여러 프로세스 중, 기존에 메모리에 올라간 프로세스를 보조 기억장치 (HDD, SSD) 로 보내는 것을 swap-out, 보조 기억장치에 있던 프로세스를 메모리에 올리는 것을 swap-in 이라고 한다. 어떤 프로세스를 swap-out 시킬지에 대한 대표적인 방법으로는 round-robin 이 있다.

더 자세한 설명은 [15. Swapping에 대해 설명해주세요](#15)을 참고!

> **압축**

메모리에 프로세스들을 올리다보면 아래 사진과 같이 빈 공간(free) 이 생긴다. 이 공간을 fragmentation(단편화) 이라고 한다. 현재 메모리에서 프로세스와 단편화를 파악하고 프로세스가 연속적으로 메모리 주소에 할당되게 단편화를 없애는 방법을 압축이라 한다. 압축은 효율적이지 못하기 때문에 좋은 메모리 관리 방법이 아니다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/fragmentation.png)

> **페이징**

메모리에 연속적으로 프로세스를 할당하지 않고, 메모리를 페이지라는 단위로 물리적으로 나눠서 페이지에 프로세스를 올리는 방법이다. 프로세스가 페이지 크기보다 크다면 여러 페이지를 사용한다.
페이지 크기보다 작은 프로세스가 할당되면 내부적으로 공간이 남는 내부 단편화가 발생할 수 있다.

> **세그멘테이션**

페이징은 물리적 단위로 메모리를 나눴다면, 세그멘테이션은 논리적 단위로 메모리를 나눈다. 이를 위해 세그멘테이션 테이블을 사용하고, 테이블에는 시작주소인 base 와 최대 크기인 limit 가 포함되어 있다.
세그멘테이션은 세그멘트 간에 할당되지 않은 공간이 남는 외부 단편화가 발생할 수 있다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/segmentation.png)

**References**
- [[CS 기초 - 운영체제] 메모리 관리 전략 - deannn.log](https://velog.io/@deannn/CS-%EA%B8%B0%EC%B4%88-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC-%EC%A0%84%EB%9E%B5)
- [스와핑이란? - 양햄찌가 만드는 세상](https://jhnyang.tistory.com/103)
- [[운영체제(OS)] 14. 세그멘테이션 - 끄적끄적](https://velog.io/@codemcd/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9COS-14.-%EC%84%B8%EA%B7%B8%EB%A9%98%ED%85%8C%EC%9D%B4%EC%85%98)
