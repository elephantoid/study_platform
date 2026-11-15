---
id: boost-os-010
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

가상 메모리에 대해 설명해주세요.

## 해설

메모리의 크기보다 큰 프로세스는 어떻게 해야 실행이될까? 이 문제를 해결하기 위한 방법으로, 프로세스에서 필요한 부분만 메모리에 올려 실행이 가능하게 동작하는 방법을 가상 메모리라고 한다. 페이지와 세그멘테이션 중 주로 페이지를 이용하는 **Demand Paging** 방법을 사용한다.

**Demand Paging** 는 프로세스에서 현재 필요한 페이지만 메모리에 올리는 방법이다. 이를 위한 페이지 테이블은 기존의 테이블에서 valid 와 modified 가 추가적으로 필요하다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/demand-paging.png)

valid 는 해당 페이지가 메모리에서 사용되고 있는지를 나타낸다. 페이지가 메모리에 없는 경우 (valid == 0) 를 **page fault** 라고 한다. 아래의 과정으로 페이지를 메모리에 할당한다.

1. 해당 페이지 valid bit 확인
2. valid 가 0 이면 CPU 인터럽트, 해당 ISR 로 이동
3. ISR 에서 backing store 를 탐색하여 해당 프로세스의 페이지 찾음
4. 해당 페이지를 빈 프레임에 할당
5. 페이지 테이블 갱신 (valid 1 로 변경)
6. 다시 프로세스 실행

여러 프로세스의 필요한 페이지를 메모리에 올리는 것은 효율적이다. 하지만 결국 한정된 자원을 쓰다보면 메모리가 꽉차는 시점이 생긴다. 이 때 어떤 페이지를 내릴지 **Page Replacement** 를 판단해야 한다.

메모리에 올라갔던 페이지가 다시 내려가면 victim page 라고 하는데, modified bit 를 확인하여 페이지가 수정되지 않은 (modified == 0) 페이지 중 랜덤하게 혹은 가장 먼저 올라온 페이지를 내릴 수 있다.

**References**
- [가상 메모리 - Hashtag](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=yeop9657&logNo=220729107141)
- [[운영체제(OS)] 15. 가상메모리 - 끄적끄적](https://velog.io/@codemcd/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9COS-15.-%EA%B0%80%EC%83%81%EB%A9%94%EB%AA%A8%EB%A6%AC)
