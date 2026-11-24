---
id: boost-algo-016
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

Dijkstra

## 해설

**한 노드**에서 **다른 모든 노드**까지의 최단 거리를 구하는 최단 경로 알고리즘으로 그리디 알고리즘을 사용한다. 단, cost (거리) 는 반드시 음수가 없어야 한다. 이러한 특성 때문에 GPS 길찾기 등에 응용된다.

기본 다익스트라 알고리즘은 출발 노드에서 다른 노드로 가는 최단 거리를 기록하는 최단 거리 테이블과 해당 노드 방문 여부를 살피는 visited 테이블을 사용한다.

> **동작 방식**

최단 거리 테이블에 출발 노드는 0, 나머지 노드는 INF 로 초기화한다.

1. 먼저 출발 노드를 방문(visited[start] = True)하고 출발 노드에서 갈 수 있는 다른 노드들까지의 거리를 최단 거리 테이블에 기록한다.
2. 아직 방문하지 않은 노드 중 최단 거리 테이블의 값이 가장 작은 노드를 방문한다(visited에 기록).
3. 해당 노드와 연결된 노드 중 방문하지 않은 노드에 대해 현재까지 거리 + 방문하지 않은 노드까지 거리가 최단 거리 테이블의 거리보다 짧다면 최단 거리 테이블을 갱신한다.
4. 모든 노드에 방문할 때까지 2 와 3 과정을 반복한다.

위 알고리즘의 시간 복잡도는 $O(V^2)$ ($V$ : 노드 개수) 이다. 모든 노드에 대해 방문하고 테이블을 모두 살펴보기 때문이다. 이를 개선하기 위해 최단 거리를 찾을 때 `우선순위 큐`를 사용하고 큐에서 꺼낸 거리보다 최단거리 테이블의 값이 더 작다면 방문한 것으로 간주한다. `우선순위 큐`를 사용한 시간 복잡도는 $O(ElogV)$ ($V$: 노드 개수, $E$: 엣지 개수) 이다.

```python
import heapq
import sys
input = sys.stdin.readline
INF = float("inf")

# 노드 개수, 간선 개수 입력받기
n, m = map(int, input().split())
# 시작 노드 번호 입력받기
start = int(input())
# 각 노드에 연결되어 있는 노드에 대한 정보를 담는 리스트 만들기
graph = [[] for i in range(n+1)]
# 최단 거리 테이블을 모두 무한으로 초기화
distance = [INF] * (n+1)

# 모든 간선 정보 입력받기
for _ in range(m):
    a, b, c = map(int, input().split())
    # a 번 노드에서 b 번 노드로 가는 비용이 c 라는 의미
    graph[a].append((b, c))

def dijkstra(start):
    q = []
    # 시작 노드로 가기 위한 최단 경로는 0 으로 설정하여, 큐에 삽입
    heapq.heappush(q, (0, start))
    distance[start] = 0
    while q: # 큐가 비어있지 않다면
        # 가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
        dist, now = heapq.heappop(q)
        # 현재 노드가 이미 처리된 적이 있는 노드면 무시
        if distance[now] < dist:
            continue
        # 현재 노드와 연결된 다른 인접한 노드들을 확인
        for to_other in graph[now]:
            cost = dist + to_other[1]
            if distance[to_other[0]] > cost:
                distance[to_other[0]] = cost
                heapq.heappush(q, (cost, to_other[0]))

# 다익스트라 알고리즘 수행
dijkstra(start)

# 모든 노드로 가기 위한 최단 거리를 출력
for i in range(1, n+1):
    # 도달할 수 없는 경우, 무한으로 출력
    if distance[i] == INF:
        print("INFINITY")
    else:
        print(distance[i])
```

**References**
- [Shortest Path - Heath.log](https://velog.io/@dldydldy75/Shortest-Path)
- [이것이 코딩테스트다 - 나동빈](https://book.naver.com/bookdb/book_detail.nhn?bid=16439154)

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._
