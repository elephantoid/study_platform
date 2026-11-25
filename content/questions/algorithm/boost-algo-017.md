---
id: boost-algo-017
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

Floyd-Warshall

## 해설

모든 지점에서 모든 지점까지의 최단 경로를 구하는 알고리즘이다.

A → B 를 거리를 구할 때, 특정 노드 X 를 중간에 거쳐 가는 값과 기존의 최단 경로 테이블 값 중 어느 것이 짧은지 비교하는 것이 핵심이다. 이 과정에서 X 를 모든 노드로 바꿔가며 진행하면 된다.

모든 노드에 대해 해당 노드를 거쳐 가는 경우를 계산하므로 플로이드-워셜 알고리즘의 시간 복잡도는 $O(V^3)$($V$: 노드 개수)이다.

다익스트라가 그리디한 방식이었다면, 플로이드-워셜은 점화식을 통해 테이블을 갱신하기 때문에 DP 를 사용하는 방식이다.

$$
D_{ab} = min(D_{ab}, D_{ak} + D_{kb})
$$

```python
INF = int(1e9) # 무한을 의미하는 값으로 10 억을 설정

# 노드의 개수 및 간선의 개수를 입력받기
n = int(input())
m = int(input())
# 2 차원 리스트 (그래프 표현) 를 만들고, 모든 값을 무한으로 초기화
graph = [[INF] * (n+1) for _ in range(n+1)]

# 자기 자신에서 자기 자신으로 가는 비용은 0 으로 초기화
for i in range(1, n+1):
	graph[i][i] = 0

# 각 간선에 대한 정보를 입력받아, 그 값으로 초기화
for _ in range(m):
	# A 에서 B 로 가는 비용은 C 라고 설정
	a, b, c = map(int, input().split())
	graph[a][b] = c

# 점화식에 따라 플로이드 워셜 알고리즘을 수행
for k in range(1, n+1):
	for a in range(1, n+1):
		for b in range(1, n+1):
			graph[a][b] = min(graph[a][b], graph[a][k] + graph[k][b])

# 수행된 결과를 출력
for a in range(1, n+1):
	for b in range(1, n+1):
		# 도달할 수 없는 경우, 무한으로 출력
		if graph[a][b] == INF:
			print("INFINITY")
		else:
			print(graph[a][b], end = ' ')
	print()
```

**References**
- [Shortest Path - Heath.log](https://velog.io/@dldydldy75/Shortest-Path)
- [플로이드 와샬 알고리즘 - 안경잡이개발자](https://blog.naver.com/ndb796/221234427842)
