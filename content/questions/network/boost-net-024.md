---
id: boost-net-024
topicId: network
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- agent
reviewTarget:
  noteId: boost-net-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

subnet mask에 대해서 설명해주세요.

## 해설

> **IP 주소와 서브네팅 (subnetting)**

IPv4 의 경우 $2^{32}$의 숫자로 주소를 표현하고, 이를 국가, 회사 등 잘게 나눠 어느 영역을 쓰게할 것인지 결정한다.

한정된 자원이기 때문에 효율적으로 노드에 주소를 할당하는게 중요하다. 이를 위해 IP 를 쪼개는, 네트워크 파트 + 호스트 파트로 구성하는 서브네팅을 활용한다.

기본적으로 IP 주소에 따라 5 개의 클래스로 구분된다. 각 클래스에 따라 네트워크 파트와 호스트 파트가 정해진다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/5-network/network-class.png)

위와 같은 클래스 구조와 더불어 더욱 효율적인 서브네팅을 위해서 사용하는 방법이 서브넷 마스크이다.

> **서브넷 마스크 (subnet mask)**

할당된 IP 주소는 기본적으로 네트워크 파트와 호스트 파트가 정해져있다.

효율적인 주소 관리를 위해 내부적으로 호스트 파트를 새로운 네트워크 파트와 호스트 파트로 나눌 수 있다. 이 때 서브넷 마스크를 활용할 수 있다.

만약 C 클래스인 192.12.16.1 IP, 255.255.255.0 서브넷 마스크(호스트 파트)가 할당되었을 때 기존의 서브넷 마스크인 마지막 8 비트를 1111 0000 으로 바꾼다면, 4 비트만큼의 네트워크 파트 (그룹), 4 비트만큼의 호스트 (멤버) 를 할당할 수 있다. 이렇게 된다면 동일 네트워크 간에는 커뮤니케이션이 자유롭지만, 다른 네트워크 간에는 라우터를 거쳐야 커뮤니케이션을 할 수 있다.

어떤 기업을 생각해보자. 서브넷 마스크로 추가적인 서브네팅을 안한다면 인사팀, 재무팀 등등 여러 팀들이 모두 같은 네트워크 파트를 지니므로 서로에게 접근할 수 있다. 이럴 때 서브넷 마스크를 활용한 서브네팅으로 효율적으로 IP 를 관리할 수 있다.

**References**
- [IP 주소 및 서브넷 마스크 - 보안전문가가 되자](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=hatesunny&logNo=220790654612)
- [[Network] IP주소 클래스(A,B,C class)란? Limky 삽질 블로그](https://limkydev.tistory.com/168?category=954021)
- [서브네팅 목적 및 개념 - 트레비스의 IT 라이프](https://travislife.tistory.com/53)
