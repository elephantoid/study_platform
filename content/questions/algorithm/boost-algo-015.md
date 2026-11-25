---
id: boost-algo-015
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

Shortest Path

## 해설

한 노드에서 다른 노드로 가는 엣지에 cost 가 있는 그래프가 주어졌을 때, 한 지점 → 목표 지점 또는 모든 지점 → 모든 지점까지 cost 가 가장 적게 드는 최단 경로를 찾는 문제이다.

대표적인 알고리즘으로 `Dijkstra`, `Floyd-Warshall`, `Bellman-Ford` 가 있다.
