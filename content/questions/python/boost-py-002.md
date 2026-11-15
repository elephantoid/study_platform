---
id: boost-py-002
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

What are the key features of Python?

## 해설

파이썬이 주요 특징은 아래와 같다.

- **인터프리터 언어(Interpreter Language)**
  - 파이썬은 인터프리터 언어이므로, 실행하기 전에 컴파일을 할 필요가 없다.
  - 자세한 내용은 [Python an interpreted language. Explain.](#4) 참고
- **동적타이핑(Dynamic Typing)**
  - 파이썬은 실행시간에 자료형을 검사하므로, 선언할 때 변수 유형(ex.int, double, ...)을 명시할 필요가 없다.
  - `typing`이란 프로그램 내에서 변수의 데이터 타입을 정하는 것을 말한다. 데이터 타입 지정(assign)은 정적 또는 동적 타이핑으로 분류되는데, 프로그램 컴파일 시에 변수의 타입을 체크하는 C, C++과 같은 언어는 정적 타입(static typed) 언어라고 하고, 프로그램 실행 시에 타입을 체크하는 python은 동적 타입(dynamic typed) 언어이다.
- **객체 지향 프로그래밍(OOP)**
  - 파이썬은 클래스와 구성 및 상속을 함께 정의할 수 있다는 점에서 객체 지향 프로그래밍에 매우 적합하다.
- **일급객체(First-class citizen)**
  - 파이썬에서 함수와 클래스는 일급 객체이다. 일급객체는 변수나 데이터 구조 안에 담을 수 있고, 매개변수로 전달이 가능하며, 리턴값으로 사용될 수 있다는 특징을 가지고 있다.

> 이 외 특징

- 파이썬은 **들여쓰기(indentation)** 와 간결하고 쉬운 문법을 통해 빠르게 코드를 작성할 수 있다는 장점을 가지고있다.
- 변수, 인수(argument)를 미리 선언하지 않아도 **자동으로 메모리 공간 할당**되어 편리하다.
- 함수(function) 또는 **모듈**(module) 추가가 용이하여 **확장성과 이식성**이 좋다.
- 파이썬은 인터프리터로 동작하는 **스크립트 언어**이므로 다른 컴파일 언어에 비해 다소 느리다.
  - 컴파일러가 코드를 기계어로 번역해서 실행가능 파일을 만드는 것에 비해, 인터프리터는 코드를 한줄씩 실행시간마다 번역해서 실행하기 때문이다.

**References**
- [Python 시작하기 - crystalcube](https://crystalcube.co.kr/44)
- [파이썬 동적 타이핑과 캐스팅 - 스스로 배우는 코딩](https://blog.naver.com/PostView.nhn?blogId=youndok&logNo=222057656966)
- [python 리스트, 튜플, 딕셔너리 비교 - bskyvision](https://bskyvision.com/854)
- [Python 일급객체(FIRST-CLASS CITIZEN)- 홍찬기](https://hckcksrl.medium.com/python-%EC%9D%BC%EA%B8%89%EA%B0%9D%EC%B2%B4-1735746a8229)
- [인터프리터 언어와 컴파일 언어의 차이 - jhkang-dev](https://jhkang-tech.tistory.com/136)
