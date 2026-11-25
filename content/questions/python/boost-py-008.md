---
id: boost-py-008
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

What is PYTHONPATH?

## 해설

모듈을 import할 때 사용되는 환경변수이다. 모듈을 import할 때마다 PYTONPATH를 조회하여 가져온 모듈이 디렉토리에 있는지 확인한다. 인터프리터는 이를 사용하여 로드할 모듈을 결정한다.

PYTHONPATH 환경 변수에 경로를 추가하면, 파이썬은 이 경로들을 `sys.path`에 추가한다. 이를 통해 파이썬 코드 내부에서 뿐만 아니라 파이썬 코드 밖에서도 `sys.path`를 조작할 수 있다. PYTHONPATH에는 `sys.path`에 추가할 여러 경로들이 들어간다. 리눅스에서는 `/foo:/bar`처럼 `:`로 두 경로를 구분하고, 윈도우에서는 `/foo;/bar`처럼 `;`로 두 경로를 구분한다. 이외에도 sys.path에는 파이썬에 포함된 여러 내장 모듈 등을 탐색하기 위한 기본 경로가 들어간다.

> **`sys.path`의 순서**

import는 `sys.path` 리스트에 들어있는 경로들을 탐색하며 불러올 파이썬 파일을 찾는다. 리스트에 들어있는 맨 처음 경로부터 탐색을 시작하여, 특정 경로에서 불러올 파일을 찾았다면 남은 경로를 더 찾아보지 않고 탐색을 중지한다.
`sys.path`의 기본값은 아래의 순서대로 추가된다.

- `.py` 파일이 속한 디렉터리의 절대 경로
- PYTHONPATH 환경 변수
- 기타 기본 경로

아래의 코드를 통해서 `sys.path`를 직접 확인할 수 있다.

```python
import sys
print(sys.path)
```

**References**
- [sys.path, PYTHONPATH: 파이썬 파일 탐색 경로 - 방성범 (Bang Seongbeom)](https://www.bangseongbeom.com/sys-path-pythonpath.html#fn:ahead)
- [Python sys module, path 정리 - 일류도 삼류에서 부터](https://smartkuma.tistory.com/entry/Python-sys-module-path-%EC%A0%95%EB%A6%AC)
