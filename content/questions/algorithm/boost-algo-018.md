---
id: boost-algo-018
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
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

Bellman-Ford

## 해설

다익스트라 알고리즘은 간선이 음수인 경우 음수 사이클에 빠질 수 있기 때문에 사용할 수 없다. 벨만 포드 알고리즘을 사용하면 음수 사이클을 찾을 수 있다.

기본적인 개념은 **모든 엣지**를 거치면서 최단거리를 찾는 것이다. 이 작업을 모든 노드에 대해 진행한다. 시간 복잡도는 $O(VE)$($V$: 노드 개수, $E$: 엣지 개수) 이다.

1. 출발 노드를 설정한다.
2. 최단 거리 테이블을 출발 노드는 0 나머지는 INF 로 초기화한다.
3. 모든 $E$를 확인하며 테이블 값보다 (현재 노드 최단거리 + 현재노드에서 해당 노드로 가는 거리)가 작다면 테이블을 갱신하는 것을 $V-1$번 반복한다.

이후 음수 사이클을 확인하기 위해서는 3의 과정을 한 번만 더 수행한다. 이 때, 테이블이 갱신된다면 음수 사이클이 있는 것이다.

다익스트라 알고리즘은 최적의 해를 찾는데 비해, 벨만 포드 알고리즘은 모든 간선을 모든 노드 개수만큼 반복하는 점에서 비효율적이다. 하지만 음수 사이클을 처리할 수 있는 점이 특징이다.

```python
import sys
input = sys.input.readline
INF = int(1e9)

def bf(start):
  dist[start] = 0
  for i in range(n):
    for j in range(m):
      cur = edges[j][0]
      next_node = edges[j][1]
      cost = edges[j][2]
      if dist[cur] != INF and dist[next_node] > dist[cur] + cost:
        dist[next_node] = dist[cur] + cost
        if i == n - 1:
          return True
  return False

n, m = map(int, input().split())
edges = []
dist = [INF] * (n+1)

for _ in range(m):
  a, b, c = map(int, input().split())
  edges.append(a, b, c)

start = 1
negative_cycle = bf(start)

if negative_cycle:
  print("negative cycle")
else:
  for i in range(2, n+1):
    if dist[i] == INF:
      print("INF")
    else:
      print(dist[i])
```

**References**
- [[Python] 최단 경로 - 벨만 포드(Bellman-Ford) 알고리즘 구현하기 - younge.log](https://velog.io/@younge/Python-%EC%B5%9C%EB%8B%A8-%EA%B2%BD%EB%A1%9C-%EB%B2%A8%EB%A7%8C-%ED%8F%AC%EB%93%9CBellman-Ford-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)
- [[알고리즘] 벨만-포드 알고리즘(Bellman-Ford Algorithm) - 딥러닝 공부방](https://deep-learning-study.tistory.com/587)
