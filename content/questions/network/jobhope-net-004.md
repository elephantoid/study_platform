---
id: jobhope-net-004
topicId: network
sourceId: jobhope-technicalnote
type: concept
difficulty: intermediate
roles:
- agent
reviewTarget:
  noteId: jobhope-net-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_notes@1
  at: '2026-11-17'
---

## 문제

포트와 소켓에 대해 설명하세요.

## 해설

## 포트
- 네트워크를 통해 데이터를 주고받는 프로세스를 식별하기 위해 호스트 내부적으로 프로세스가 할당받는 고유한 값
- 하나의 IP Address 내에 개별적으로 부여된 통신 프로세스
- 숫자로 표현되기 때문에 **포트 넘버**라고도 한다.
- 프로세스는 데이터를 보내기 전에 포트 번호를 할당 받아서 보내야 한다.
- 보통 1 ~ 1024번 까지는 시스템이 주로 사용하고 1025 ~ 65535번 사이의 포트를 사용한다.

## 소켓
- 두 시스템 사이의 네트워크 연결을 나타내는 객체
- 소켓을 열기 위해선 호스트에 할당된 IP주소, 포트 넘버, 프로토콜이 필요하다. 
 - **IP주소**, **포트 넘버**, **프로토콜**로 소켓을 정의할 수 있지만 이것이 소켓을 유일하게 식별하진 않는다.
- 보내는 쪽과 받는 쪽 모두 소켓을 열어야 한다.
- 하나의 프로세스가 같은 포트를 가지고 여러 개의 소켓을 열 수 있다.

## 참조
[오바나딩요님 블로그](https://blog.naver.com/PostView.nhn?blogId=myca11&logNo=221389847130&categoryNo=24&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView)
