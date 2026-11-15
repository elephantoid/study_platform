---
id: boost-py-042
topicId: python
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
- ds
reviewTarget:
  noteId: boost-py-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

What are Python packages?

## 해설

> **모듈**

모듈은 파이썬 코드를 논리적으로 묶어서 관리하고 사용할 수 있도록 하는 것으로, 보통 하나의 파이썬 `.py` 파일이 하나의 모듈이 된다. 모듈 안에는 함수, 클래스, 혹은 변수들이 정의될 수 있으며, 실행 코드를 포함할 수도 있다.

모듈에 관한 자세한 내용은 [#9. 모듈](#9) 참고!

> **패키지**

패키지는 특정 기능과 관련된 여러 모듈을 묶은 것으로 패키지는 모듈에 namespace를 제공한다. 패키지는 하나의 디렉토리에 놓여진 모듈들의 집합을 가리키는데, 그 디렉토리에는 일반적으로 `__init__.py` 라는 패키지 초기화 파일이 존재한다.

패키지는 모듈들의 컨테이너로서 패키지 안에는 또다른 서브 패키지를 포함할 수도 있다. 파일시스템으로 비유하면 패키지는 일반적으로 디렉토리에 해당하고, 모듈은 디렉토리 안의 파일에 해당한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/4-python/package.png)

패키지들의 모음인 라이브러리에 대한 내용은 [#52. 라이브러리](#52) 참고!

**References**
- [파이썬 패키지와 모듈 알아보기 - 승톨](https://velog.io/@seanlion/pythonmodule)
- [패키지 - 예제로 배우는 파이썬 프로그래밍](http://pythonstudy.xyz/python/article/18-%ED%8C%A8%ED%82%A4%EC%A7%80)
