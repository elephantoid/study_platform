---
id: boost-py-040
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

Explain split(), sub(), subn() methods of “re” module in Python.

## 해설

파이썬에서 정규표현식을 사용하기 위해 “re” 모듈을 사용한다. 문자열 수정을 위해 Python의 “re” 모듈은 3 가지 메서드를 제공한다.

- `re.split(pattern, string, maxplit=0)`: pattern을 구분자로 string을 분리하여 list로 반환한다.

```python
re.split('<[^<>]*>', '<html> Wow <head> header </head> <body> Hey </body> </html>')
# output: ['', ' Wow ', ' header ', ' ', ' Hey ', ' ', '']
```

- `re.sub(pattern, repl, string, count=0)`: string에서 pattern과 일치하는 부분에 대하여 repl로 교체하여 결과 문자열을 반환한다.

```python
re.sub('\d{4}', 'XXXX', '010-1234-5678')
# output: '010-XXXX-XXXX'
```

- `re.subn(pattern, repl, string, count=0)`: sub와 동일하나, 결과로 (결과문자열, 매칭횟수)를 튜플로 반환한다.

```python
re.subn('\d{4}', 'XXXX', '010-1234-5678')
# output: ('010-XXXX-XXXX', 2)
```

**References**
- [파이썬 – 정규식표현식(Regular Expression) 모듈 - devanix](https://devanix.tistory.com/296)
- [파이썬 정규표현식(re) 사용법 - 05. 주석, 치환, 분리 - YW & YY's Python, Machine & Deep Learning](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/<https://greeksharifa.github.io/%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9D(re)/2018/08/04/regex-usage-05-intermediate/>)
