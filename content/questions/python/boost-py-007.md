---
id: boost-py-007
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

What is namespace in Python?

## 해설

namespace는 이름 지정 충돌(naming conflicts)을 피하기 위해 이름이 고유한지 확인하는 데 사용되는 이름 지정 시스템(naming system)이다. 네임스페이스(namespace, 이름공간)란 프로그래밍 언어에서 특정한 객체(Object)를 이름(Name)에 따라 구분할 수 있는 범위를 의미한다. 파이썬 내부의 모든것은 객체로 구성되며 이들 각각은 특정 이름과의 매핑 관계를 갖게 되는데 이 매핑을 포함하고 있는 공간을 네임스페이스라고 한다.

네임스페이스가 필요한 이유는 다음과 같다. 프로그래밍을 수행하다보면 모든 변수 이름과 함수 이름을 정하는 것이 중요한데 이들 모두를 겹치지 않게 정하는 것은 사실상 불가능하다. 따라서 프로그래밍언어에서는 네임스페이스라는 개념을 도입하여, 특정한 하나의 이름이 통용될 수 있는 범위를 제한한다. 즉, **소속된 네임스페이스가 다르다면 같은 이름이 다른 개체를 가리키도록 하는 것이 가능**하다.

> **파이썬 네임스페이스의 특징**

- 네임스페이스는 딕셔너리 형태로 구현된다.
- 모든 이름 자체는 문자열로 되어있고 각각은 해당 네임스페이스의 범위에서 실제 객체를 가리킨다.
- 이름과 실제 객체 사이의 매핑은 가변적(Mutable)이므로 런타임동안 새로운 이름이 추가될 수 있다.
- 빌트인 네임스페이스는 함부로 추가하거나 삭제할 수 없다.

> **파이썬 네임스페이스의 3가지 분류**

- `빌트인 네임스페이스(build-in namespace)`: 기본 내장 함수 및 기본 예외들의 이름들이 소속된다. 파이썬으로 작성된 모든 코드 범위가 포함된다.
- `전역 네임스페이스(global namespace)`: 모듈별로 존재하며, 모듈 전체에서 통용될 수 있는 이름들이 소속된다.
- `지역 네임스페이스(local namespace)`: 함수 및 메서드 별로 존재하며, 함수 내의 지역 변수들의 이름들이 소속된다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/4-python/namespace.png)

**References**
- [[Python] 네임스페이스 개념 정리 - Hyungcheol Noh's Blog](https://hcnoh.github.io/2019-01-30-python-namespace)
