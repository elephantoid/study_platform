---
id: jbee-py-007
topicId: python
sourceId: jbee-interview-beginner
type: concept
difficulty: intermediate
roles:
- mle
- agent
- ds
reviewTarget:
  noteId: jbee-py-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_notes@1
  at: '2026-11-17'
---

## 문제

메모리 누수가 발생할 수 있는 경우에 대해 설명하세요.

## 해설

> 메모리 누수를 어떻게 정의하냐에 따라 조금 다르다. `a = 1`을 선언한 후에 프로그램에서 더 이상 `a`를 사용하지 않아도 이것을 메모리 누수라고 볼 수 있다. 다만 여기서는 사용자의 부주의로 인해 발생하는 메모리 누수만 언급한다.

대표적으로 mutable 객체를 기본 인자값으로 사용하는 경우에 메모리 누수가 일어난다.

```python
def foo(a=[]):
    a.append(time.time())
    return a
```

위의 경우 `foo()`를 호출할 때마다 기본 인자값인 `a`에 타임스탬프 값이 추가된다. 이는 의도하지 않은 결과를 초래하므로 보통의 경우 `a=None`으로 두고 함수 내부에서 `if a is None` 구문으로 빈 리스트를 할당해준다.

다른 경우로 웹 애플리케이션에서 timeout 이 없는 캐시 데이터를 생각해 볼 수 있다. 요청이 들어올수록 캐시 데이터는 쌓여만 가는데 이를 해제할 루틴을 따로 만들어두지 않는다면 이도 메모리 누수를 초래한다.

클래스 내 `__del__` 메서드를 재정의하는 행위도 메모리 누수를 일으킬 수 있다. 순환 참조 중인 클래스가 `__del__` 메서드를 재정의하고 있다면 가비지 컬렉터로 해제되지 않는다.

#### Reference

* [Is it possible to have an actual memory leak?](https://stackoverflow.com/questions/2017381/is-it-possible-to-have-an-actual-memory-leak-in-python-because-of-your-code)
* [파이썬에서 메모리 누수가 발생할 수 있는 경우 - memorable](https://memorable.link/link/189)
* [약한 참조 사용하기](https://soooprmx.com/archives/5074)
