---
id: boost-py-051
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

What is the process of compilation and linking in python?

## 해설

파이썬 파일(`.py`)를 실행하면, 소스 코드는 바이트 코드(byte code)로 변환되며, `.pyc`, `.pyo` 파일 형식으로 저장된다. 이 때 소스 코드를 바이트 코드로 변환하는 과정을 **컴파일(compilation) 단계**라고 한다.

파이썬 가상머신(Python Virtual Machine)이 바이트 코드를 기계어(machine code)로 변환하여 어떤 운영체제든 실행할 수 있도록 한다. 이 때 우리의 코드와 인터프리터가 필요한 라이브러리를 연결시키는 과정이 있는데, 이를 **링크(linking) 단계**라고 한다.

참고로 dis 모듈을 사용하여 소스 코드가 어떤 바이트 코드로 변환되는지 확인할 수 있다.

```python
import dis

def mult(a, b):
    return a*b

dis.dis(mult)
# output:
# 4           0 LOAD_FAST                0 (a)
#             2 LOAD_FAST                1 (b)
#             4 BINARY_MULTIPLY
#             6 RETURN_VALUE
```

**References**
- [Compiling and Linking in Python - Net-informations.com](http://net-informations.com/python/iq/linking.htm)
- [What is the process of compilation and linking in python? - tutorialspoint](https://www.tutorialspoint.com/what-is-the-process-of-compilation-and-linking-in-python)
- [Python Compilation/Interpretation Process - stackoverflow](https://stackoverflow.com/questions/3299648/python-compilation-interpretation-process)
- [How does Python work? - towards data science](https://towardsdatascience.com/how-does-python-work-6f21fd197888)
- [Is Python interpreted or compiled? Yes. - Ned Batchelder](https://nedbatchelder.com/blog/201803/is_python_interpreted_or_compiled_yes.html)
- [Can Python be compiled? is it compiled or interpreted? - astateofdata](https://www.astateofdata.com/python-programming/can-python-be-compiled/)
