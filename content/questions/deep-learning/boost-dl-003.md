---
id: boost-dl-003
topicId: deep-learning
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-dl-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

Tensorflow, PyTorch 특징과 차이가 뭘까요?

## 해설

|    구분     |     Tensorflow     |       PyTorch       |
| :---------: | :----------------: | :-----------------: |
|  패러다임   |   Define and Run   |    Define by Run    |
| 그래프 형태 | Static graph(정적) | Dynamic graph(동적) |

Tensorflow와 Pytorch의 가장 큰 차이점은 딥러닝을 구현하는 패러다임이 다르다는 것이다. Tensorflow는 **Define-and-Run**인 반면에, Pytorch는 **Define-by-Run**이다.

<strong>Define and Run (Tensorflow)</strong>은 코드를 직접 돌리는 환경인 세션을 만들고, placeholder를 선언하고 이것으로 계산 그래프를 만들고(Define), 코드를 실행하는 시점에 데이터를 넣어 실행하는(Run) 방식이다. 이는 계산 그래프를 명확히 보여주면서 실행시점에 데이터만 바꿔줘도 되는 유연함을 장점으로 갖지만, 그 자체로 비직관적이다.

<strong>Define by Run (PyTorch)</strong>은 선언과 동시에 데이터를 집어넣고 세션도 필요없이 돌리면 되기때문에 코드가 간결하고 난이도가 낮은 편이다.

두 프레임워크 모두 계산 그래프를 정의하고 자동으로 그래디언트를 계산하는 기능이 있다. 하지만 Tensorflow의 계산 그래프는 정적이고 Pytorch는 동적이다.

즉 Tensorflow에서는 계산 그래프를 한 번 정의하고 나면 그래프에 들어가는 입력 데이터만 다르게 할 수 있을 뿐 같은 그래프만을 실행할 수 있다. 하지만 PyTorch는 각 순전파마다 새로운 계산 그래프를 정의하여 이용한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/static-dynamic-graph.png)

**References**
- [PyTorch - 위키백과](https://ko.wikipedia.org/wiki/PyTorch)
- [3. PyTorch VS TensorFlow - Dev](https://dev-jm.tistory.com/4)
