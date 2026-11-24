---
id: boost-algo-023
topicId: algorithm
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: boost-algo-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1 + claude-opus-5-5
  at: '2026-11-25'
followUps:
- id: boost-algo-023-f1
  order: 1
  promptMd: 위상 정렬의 결과가 유일할 조건은 무엇이고 어떻게 확인하나요? 가능한 순서 중 사전순으로 가장 앞선 것을 구하려면 무엇을 바꿔야 하나요?
  hintKo: 큐에 노드가 두 개 이상 들어 있는 순간이 무엇을 뜻하는지 생각해 보세요.
  rubricKeywords:
  - 큐의 크기가 항상 1
  - 인접한 노드 사이에 모두 간선(해밀턴 경로)
  - 최소 힙
  - O(E + V log V)
  modelAnswerKo: 'Kahn 알고리즘을 도는 동안 꺼내기 직전의 큐 크기가 항상 1이면 유일합니다. 두 개 이상이면 그 노드들 사이에 선후 관계가 없어 순서를 바꿔도 됩니다. 같은 말로, 결과에서 이웃한 모든 쌍 사이에 간선이 있어 모든 노드를 지나는 해밀턴 경로가 존재할 때 유일합니다. 이렇게 하면 결과 하나를 구한 뒤 $O(V+E)$에 확인할 수 있습니다.


    사전순으로 가장 앞선 결과는 큐 대신 최소 힙을 쓰고 진입 차수가 0인 노드 중 가장 작은 것을 매번 꺼내면 됩니다. 비용은 $O(E + V \log V)$입니다. 빌드나 데이터 파이프라인에서는 이렇게 동점을 명시적으로 처리해야 실행 순서가 재현됩니다.'
  maxScore: 10
- id: boost-algo-023-f2
  order: 2
  promptMd: 딥러닝 프레임워크의 역전파에서 위상 정렬이 하는 역할을 설명하세요. 순서를 지키지 않으면 어떤 오류가 생기나요?
  hintKo: 한 중간 값이 여러 연산의 입력으로 쓰이는 경우를 생각해 보세요.
  rubricKeywords:
  - 계산 그래프는 DAG
  - 역위상 순서로 기울기 전파
  - 여러 소비자의 기울기 합산이 끝난 뒤 전파
  - 어기면 틀린 기울기 또는 중복 전파
  modelAnswerKo: '순전파는 연산을 노드로, 텐서의 의존 관계를 간선으로 하는 DAG를 만듭니다. 역전파는 손실에서 시작해 그 **역위상 순서**로 노드를 처리합니다. 어떤 값이 여러 연산에 쓰이면(잔차 연결, 가중치 공유) 그 값의 기울기는 모든 소비 연산에서 온 기울기의 합입니다. 역위상 순서를 지키면 노드를 처리할 때 모든 소비 연산이 이미 끝나 합이 완성되어 있습니다.


    순서를 지키지 않으면 일부 경로의 기울기만 더해진 상태로 아래로 전파해 **틀린 기울기**가 되거나, 이를 고치려고 경로마다 다시 전파하면 경로 수가 지수적으로 늘어날 수 있습니다. 엔진은 보통 노드별로 아직 도착하지 않은 기울기의 수를 세고 0이 되면 실행하는데, 이것이 Kahn 알고리즘과 같습니다. 깊은 그래프에서는 재귀 DFS 대신 이런 반복 방식을 써야 재귀 한도에 걸리지 않습니다.'
  maxScore: 10
- id: boost-algo-023-f3
  order: 3
  promptMd: 에이전트가 세운 계획이 도구 호출들의 의존 관계로 주어졌습니다. 최대한 병렬로 실행하고, 전체 소요 시간을 예측하며, 잘못된 계획(사이클)을 사용자에게 설명하려면 어떻게 하겠습니까? 동시 실행 수가 제한되거나 일부 호출이 실패할 때의 처리도 포함하세요.
  hintKo: 지금 진입 차수가 0인 노드들은 서로 어떤 관계인가요?
  rubricKeywords:
  - 진입 차수 0인 작업을 동시에 실행
  - 완료될 때마다 진입 차수 감소
  - 임계 경로(최장 경로) DP
  - DFS로 사이클 경로 복원
  - 동시 실행 수 제한·실패 전파
  modelAnswerKo: 'Kahn 알고리즘을 실행기로 씁니다. 진입 차수가 0인 작업들은 서로 의존하지 않으므로 동시에 실행하고, 하나가 끝날 때마다 후속 작업의 진입 차수를 줄여 0이 되면 바로 시작합니다. 층마다 모두 끝나기를 기다리는 방식보다 느린 작업 하나가 무관한 작업을 막지 않습니다.


    병렬 자원이 무한하다면 전체 시간의 하한은 임계 경로의 길이입니다. 위상 순서로 $finish[v] = t_v + \max_{(u,v)} finish[u]$를 계산해 $O(V+E)$에 구합니다. 동시 실행 수가 제한되면 이는 하한일 뿐이고 최적 스케줄링은 일반적으로 NP-hard라 임계 경로가 긴 작업부터 실행하는 휴리스틱을 씁니다.


    꺼낸 작업 수가 전체보다 적으면 사이클이 있습니다. 남은 노드에는 사이클 뒤에 매달린 작업도 섞여 있으므로, 남은 부분에서 DFS로 back edge를 찾아 실제 사이클 경로를 보여 주고 계획을 다시 세우게 합니다. 실패한 작업의 후속 작업은 취소하고, 부작용이 있는 호출은 재시도해도 안전하도록 만듭니다.'
  maxScore: 10
---

## 문제

Topological Sort

## 해설

`위상 정렬(Topological Sort)`란 <u><strong>사이클이 없는 방향 그래프(DAG)</strong>의 모든 노드를 선행 순서를 지키며 순서대로 나열하는 것</u>이다. 위상 정렬의 대표적인 예로 대학교 선수과목이 있다. 위상 정렬 알고리즘은 다음과 같다.

- 진입차수가 0인 노드를 큐에 넣는다.
- 큐가 빌 때가지 다음을 반복한다.
  - 큐에서 요소를 꺼내 해당 노드에서 출발하는 간선을 그래프에서 제거한다.
  - 새롭게 진입차수가 0이 된 노드를 큐에 넣는다.

만약 모든 노드를 방문하기 전에 큐가 빈다면 사이클이 존재한다고 판단할 수 있다. 왜냐하면 사이클이 존재하는 경우 사이클을 형성하는 노드들의 진입차수가 항상 1 이상이므로 큐에 넣을 수가 없기 때문이다.

구현 방법은 [위상 정렬 - 이것이 취업을 위한 코딩테스트다](https://github.com/ndb796/python-for-coding-test/blob/master/10/6.py) 구현 코드를 참고!

> **💡 진입 차수(in-degree)**  
> 노드의 관점에서 들어오는 간선의 개수를 진입 차수(in-degree)라고 한다.

**References**
- [[알고리즘] 위상 정렬(Topological Sort)이란](https://gmlwjd9405.github.io/2018/08/27/algorithm-topological-sort.html)
- [위상정렬 - 위키백과](https://ko.wikipedia.org/wiki/%EC%9C%84%EC%83%81%EC%A0%95%EB%A0%AC)

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

- **전제**: DAG(Directed Acyclic Graph)에서만 존재한다. 사이클 위의 노드들은 서로가 서로보다 앞서야 하므로 순서를 정할 수 없다.
- **시간 복잡도**: $O(V + E)$. 진입 차수를 구하고, 각 노드를 큐에 한 번 넣고 빼며, 각 간선을 한 번 제거한다. 공간도 (그래프를 제외하고) $O(V)$이다.
- **유일하지 않을 수 있다**: 서로 선후 관계가 없는 노드들은 순서를 바꿔도 되므로 결과가 여러 개일 수 있다.
- **다른 방법**: DFS의 종료 순서를 뒤집어도 위상 순서가 된다. 이때 탐색 중인 노드로 가는 간선(back edge)이 있으면 사이클이다.

```python
from collections import deque

def topological_sort(graph):        # graph[v]: v 다음에 와야 하는 노드들, 노드 0..n-1
    n = len(graph)
    indegree = [0] * n
    for v in range(n):
        for w in graph[v]:
            indegree[w] += 1

    q = deque(v for v in range(n) if indegree[v] == 0)
    order = []
    while q:
        v = q.popleft()
        order.append(v)
        for w in graph[v]:
            indegree[w] -= 1
            if indegree[w] == 0:
                q.append(w)

    if len(order) < n:              # 남은 노드는 사이클에 있거나 사이클 뒤에 있다
        raise ValueError("사이클이 있어 위상 정렬할 수 없다")
    return order
```
