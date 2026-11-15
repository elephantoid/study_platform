---
id: boost-py-018
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

What is a lambda function?

## 해설

익명 함수(이름이 없는 함수)를 람다 함수라고 한다. 람다 함수는 `def` 키워드를 통해서 함수를 생성하는 리터럴 표기법을 **딱 한 줄의 코드로 표현**할 수 있게 해주며, `lambda 인자 : 표현식`의 형식으로 표현한다. 람다함수는 결과 부분을 return 키워드 없이 자동으로 return한다. 람다함수를 사용하면 코드가 간결해지고 메모리가 절약된다는 장점이 있다. 그러나 함수에 이름이 없고, 저장된 변수가 없기 때문에 다시 사용하기 위해서는 다시 코드를 적어주거나, 람다함수를 변수에 담아주어야한다. 따라서, 재사용할 이유가 없다면 lambda 함수를 생성하여 넘겨주는 편이 좋다.

람다함수의 표현법을 그림으로 표현하면 아래와 같다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/4-python/lambda-function.png)

```python
a = lambda x, y : x + y
print(a(5, 6))

# Output: 11
```

**References**
- [3.5 람다(lambda) - 왕초보를 위한 Python - WikiDocs](https://wikidocs.net/64)
- [4) 람다함수(익명함수) - 제대로 파이썬 - WikiDocs](https://wikidocs.net/22804)
