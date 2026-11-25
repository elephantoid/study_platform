---
id: boost-py-054
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

How to import modules in python?

## 해설

```python
import [패키지/모듈]
from [패키지] import [모듈/변수/함수/클래스]
from [모듈] import [변수/함수/클래스]
```

`import` 키워드를 사용하여 모듈을 가져올 수 있다. 세 가지 방법으로 모듈을 가져올 수 있다.

```python
import numpy        # importing using the original module name
import numpy as np  # importing using an alias name
from numpy import * # imports everything present in the numpy module
```

```python
from numpy import argmax as arm # 이런거도 된다
nums = [1, 2, 3, 4, 5]
print(arm(nums)) # 4
```

**References**
- [45.4 패키지에서 from import 응용하기 - 파이썬 코딩 도장](https://dojang.io/mod/page/view.php?id=2450)
