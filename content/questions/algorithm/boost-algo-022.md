---
id: boost-algo-022
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
- id: boost-algo-022-f1
  order: 1
  promptMd: 경로 압축과 크기(랭크) 기준 합치기는 각각 무엇을 막아 주나요? 하나만 쓸 때와 둘 다 쓸 때의 복잡도를 비교하세요.
  hintKo: 최악의 입력에서 트리가 어떤 모양이 되는지 그려 보세요.
  rubricKeywords:
  - 최적화 없음 O(N)
  - 크기 기준은 높이를 O(log N)으로 제한
  - 경로 압축만 쓰면 분할 상환 O(log N)
  - 둘 다 쓰면 α(N)
  - 분할 상환
  modelAnswerKo: '최적화가 없으면 긴 쪽을 짧은 쪽 아래에 계속 붙여 한 줄 트리가 되고 `find`가 $O(N)$입니다. 크기나 랭크 기준 합치기는 애초에 트리가 높아지는 것을 막습니다. 노드의 깊이가 1 늘 때마다 속한 집합의 크기가 두 배 이상이 되므로 높이가 $O(\log N)$이고, 이는 **최악** 보장입니다. 경로 압축은 한 번 지나간 경로를 납작하게 만들어 이후 연산을 빠르게 합니다. 이것만 쓰면 한 연산의 최악은 $O(N)$일 수 있지만 분할 상환으로 $O(\log N)$입니다.


    둘을 함께 쓰면 분할 상환 $O(\alpha(N))$으로 사실상 상수입니다. 다만 개별 연산은 여전히 $O(\log N)$일 수 있습니다. 합치기를 되돌려야 하는 문제(오프라인 동적 연결성 등)에서는 경로 압축이 되돌리기를 어렵게 하므로 크기 기준 합치기만 씁니다.'
  maxScore: 10
- id: boost-algo-022-f2
  order: 2
  promptMd: 방향 그래프의 사이클을 Union-find로 검출할 수 없는 이유를 반례로 설명하고, 올바른 방법을 제시하세요.
  hintKo: 간선의 방향을 잊으면 어떤 DAG가 사이클로 보이나요?
  rubricKeywords:
  - 연결성만 보고 방향을 잃음
  - 다이아몬드 DAG 반례
  - DFS 3색(back edge)
  - Kahn 알고리즘
  modelAnswerKo: 'Union-find는 두 정점이 같은 집합인지만 알 뿐 간선의 방향을 저장하지 않습니다. $a \to b$, $a \to c$, $b \to d$, $c \to d$인 다이아몬드는 DAG이지만, 마지막 간선을 처리할 때 $c$와 $d$가 이미 같은 집합이라 사이클로 오판합니다.


    방향 그래프에서는 DFS로 정점을 미방문, 탐색 중, 완료의 세 상태로 나누고 **탐색 중**인 정점으로 가는 간선(back edge)이 있으면 사이클로 판단합니다. 완료된 정점으로 가는 간선은 사이클이 아닙니다. 또는 Kahn의 위상 정렬을 돌려 꺼낸 정점 수가 $V$보다 적으면 사이클이 있습니다. 둘 다 $O(V+E)$입니다. 실제 사이클의 경로를 보여 줘야 하면 DFS에서 부모를 기록해 되짚습니다.'
  maxScore: 10
- id: boost-algo-022-f3
  order: 3
  promptMd: LLM 학습 데이터에서 거의 같은 문서를 제거하려고 MinHash LSH로 유사한 문서 쌍을 찾았습니다. Union-find로 중복 묶음을 만들 때의 장점과 위험, 그리고 문서가 수십억 개일 때의 처리 방법을 설명하세요.
  hintKo: 유사도는 추이적인가요?
  rubricKeywords:
  - 연결 요소로 중복 묶음
  - 대표 문서 하나만 유지
  - 유사도는 추이적이지 않음 → 과잉 병합
  - 대표와의 유사도 재확인·묶음 크기 상한
  - 분산 연결 요소(라벨 전파 등)
  modelAnswerKo: '유사한 쌍을 간선으로 보고 합치면 연결 요소가 중복 묶음이 됩니다. 간선을 한 번씩 흘려 보내며 거의 상수 시간에 처리하고 쌍의 순서에 무관하며, 묶음마다 대표 하나만 남기면 됩니다.


    위험은 유사도가 추이적이지 않다는 점입니다. A와 B, B와 C가 비슷해도 A와 C는 다를 수 있어, 흔한 상용구를 매개로 거대한 묶음이 생기고 다양한 문서가 지워질 수 있습니다. LSH의 거짓 양성이 이를 더 키웁니다. 그래서 후보 쌍의 실제 Jaccard 유사도를 확인한 뒤에만 합치고, 묶음 크기 분포를 살피며, 대표와의 유사도가 기준 이상인 문서만 제거합니다.


    한 대에 부모 배열이 들어가면(수십억 개 × 8바이트 = 수십 GB) 단일 노드 Union-find가 오히려 단순하고 빠릅니다. 그보다 크면 파티션별로 Union-find를 돌려 간선을 줄인 뒤 합치거나, 최소 라벨 전파와 pointer jumping을 쓰는 분산 연결 요소 알고리즘을 씁니다.'
  maxScore: 10
---

## 문제

Union-find

## 해설

`유니온-파인드(Union-find)` 혹은 `서로소 집합(Disjoint Sets)` 자료구조는 서로소 부분 집합들로 나눠진 원소들에 대한 정보를 다루는 자료구조이다. 유니온-파인드 자료구조는 다음과 같이 합집합(Union)과 찾기(Find) 연산을 제공한다.

- **합집합(Union)**: 두 개의 집합을 하나의 집합으로 합친다.
  - 서로 연결할 두 노드 A, B가 있다고 할 때, A와 B의 루트 노드인 A'과 B'을 찾는다.
  - A'을 B'의 부모 노드로 혹은 B'을 A'을 부모 노드로 설정한다.
- **찾기(Find)**: 노드가 속한 집합을 반환한다.

구현 방법은 [개선된 서로소 집합 알고리즘 (경로 압축) - 이것이 취업을 위한 코딩테스트다](https://github.com/ndb796/python-for-coding-test/blob/master/10/3.py) 구현 코드를 참고!

> **유니온-파인드 자료구조의 활용**

유니온-파인드 자료구조를 이용해 <u><strong>무방향 그래프 내에서의 사이클</strong>을 판별</u>할 수 있다. 합집합 연산은 그래프의 간선으로 대응된다고 할 때, 다음과 같은 알고리즘으로 사이클을 판별할 수 있다.

- 간선으로 연결된 두 노드의 루트 노드를 확인한다.
- 만약 루트 노드가 서로 다르다면 합집합 연산을 수행한다.
- 만약 루트 노드가 같다면 사이클이 발생했다고 판단한다.

구현 방법은 [서로소 집합을 활용한 사이클 판별 - 이것이 취업을 위한 코딩테스트다](https://github.com/ndb796/python-for-coding-test/blob/master/10/4.py) 구현 코드를 참고!

**References**
- [서로소 집합 자료 구조 - 위키백과](https://ko.wikipedia.org/wiki/%EC%84%9C%EB%A1%9C%EC%86%8C_%EC%A7%91%ED%95%A9_%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0)
- [Chapter 10. 그래프 이론 - 이것이 취업을 위한 코딩테스트다](http://www.yes24.com/Product/Goods/91433923)

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.count = n              # 집합의 개수

    def find(self, x):
        root = x
        while self.parent[root] != root:
            root = self.parent[root]
        while self.parent[x] != root:   # 경로 압축: 지나온 노드를 루트에 직접 연결
            self.parent[x], x = root, self.parent[x]
        return root

    def union(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False            # 이미 같은 집합 (무방향 그래프라면 사이클)
        if self.size[a] < self.size[b]:
            a, b = b, a
        self.parent[b] = a          # 작은 쪽을 큰 쪽에 붙인다
        self.size[a] += self.size[b]
        self.count -= 1
        return True
```

- **복잡도**: 아무 최적화가 없으면 트리가 한 줄로 길어져 한 연산이 $O(N)$이다. 크기(또는 랭크) 기준 합치기만으로 $O(\log N)$, 경로 압축까지 쓰면 연산 $M$번에 $O((M + N)\,\alpha(N))$이다. $\alpha$(역 아커만 함수)는 현실적인 $N$에서 4 이하라 사실상 상수이다.
- `find`를 반복문으로 쓰면 긴 트리에서도 재귀 한도에 걸리지 않는다.
