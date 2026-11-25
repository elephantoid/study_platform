---
id: boost-py-043
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

How can files be deleted in Python?

## 해설

os 모듈을 import 한 후 `os.remove()` 함수를 사용하여 파일을 삭제할수있다.

```python
import os
os.remove("ai-tech-interview.txt")
```

자세한 내용은 [os.remove - Python documentation](https://docs.python.org/3/library/os.html#os.remove) 참고!
