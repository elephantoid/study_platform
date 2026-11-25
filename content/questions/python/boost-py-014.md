---
id: boost-py-014
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

Is indentation required in python?

## 해설

Python은 Indentation(들여쓰기)이 필요하다. 파이썬은 `{}`을 사용하여 영역을 지정하지 않고, 들여쓰기를 사용하여 코드블록을 지정하기 때문에 파이썬에서 들여쓰기는 문법적인 강제사항이다. `if, for, class, def` 등의 모든 코드는 들여쓰기 블록 내에서 지정된다. 들여쓰기의 방법은 1칸, 2칸, 4칸, 탭 등 여러가지 방식이 있다. 일반적으로 파이썬은 네 개의 공백 문자를 사용하여 들여쓰기를 수행한다.

코드가 정확하게 들여쓰여지지 않으면 실행되지 않고 오류도 발생한다. 중요한 것은 같은 블록 내에서는 들여쓰기 칸 수가 같아야한다는 것이다. 들여쓰기 규칙 위반시에는 `IndentationError: unexpected indent` 에러를 출력한다.

**References**
- [제 01장 첫번째 계단밟기 02. 들여쓰기(indent) - Python 계단밟기](https://wikidocs.net/20368)
