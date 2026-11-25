---
id: boost-algo-021
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
- id: boost-algo-021-f1
  order: 1
  promptMd: Kruskal 알고리즘이 항상 최소 신장 트리를 만든다는 것을 증명하세요.
  hintKo: 최소 간선을 포함하지 않는 MST가 있다고 가정하고 간선 하나를 바꿔 끼워 보세요.
  rubricKeywords:
  - 절단 속성(cut property)
  - 교환 논증
  - 사이클에 생기는 다른 교차 간선
  - 비용이 늘지 않음
  modelAnswerKo: '지금까지 고른 간선 집합 $A$가 어떤 MST $T$에 포함된다고 가정하고(처음에는 공집합), 다음으로 고른 간선 $e=(u,v)$를 더해도 어떤 MST에 포함됨을 보입니다. $u$가 속한 연결 요소를 $S$라 하면 $e$는 $S$와 나머지를 잇는 간선 중 가중치가 가장 작습니다. 더 작은 교차 간선이 있었다면 그것은 사이클을 만들지 않으므로 먼저 골랐을 것이기 때문입니다.


    $e \in T$이면 끝입니다. 아니면 $T \cup \{e\}$에 사이클이 생기고, 그 사이클은 $S$ 밖으로 나갔다 돌아오므로 다른 교차 간선 $f$를 포함합니다. $f$는 $A$의 간선이 아니고 $w(e) \le w(f)$입니다. $T'' = T - f + e$는 신장 트리이고 비용이 $T$보다 크지 않으므로 역시 MST이며 $A \cup \{e\}$를 포함합니다. 귀납법으로 마지막에 얻은 트리는 MST입니다.'
  maxScore: 10
- id: boost-algo-021-f2
  order: 2
  promptMd: Kruskal과 Prim 중 어느 것을 쓸지 그래프의 밀도와 데이터 형태에 따라 설명하세요.
  hintKo: 간선을 정렬하는 비용과 정점별 최소 간선을 관리하는 비용을 비교해 보세요.
  rubricKeywords:
  - Kruskal O(E log E)
  - Prim 이진 힙 O(E log V)
  - 밀집 그래프는 배열 Prim O(V^2)
  - 간선 목록·이미 정렬된 간선은 Kruskal
  modelAnswerKo: 'Kruskal은 간선 정렬이 지배해 $O(E \log E)$이고 간선 목록만 있으면 됩니다. 희소 그래프이거나 간선이 이미 정렬되어 있거나 정수 키라 선형 정렬이 가능할 때 좋습니다. 간선을 전역 순서로 보므로 중간에 멈춰 최소 신장 숲(클러스터)을 얻기도 쉽습니다.


    Prim은 한 정점에서 트리를 키우며 이진 힙으로 $O(E \log V)$입니다. 희소 그래프에서는 점근적으로 Kruskal과 같습니다. 밀집 그래프($E \approx V^2$)에서는 힙 없이 정점마다 최소 연결 비용을 배열에 두는 $O(V^2)$ 구현이 정렬 $O(V^2 \log V)$보다 낫습니다. 특히 점들 사이의 거리로 정의된 완전 그래프는 간선을 저장하지 않고 필요할 때 계산할 수 있어 메모리가 $O(V)$입니다. 인접 리스트로 주어지면 Prim, 간선 스트림이나 파일로 주어지면 Kruskal이 자연스럽습니다.'
  maxScore: 10
- id: boost-algo-021-f3
  order: 3
  promptMd: Kruskal 알고리즘을 중간에 멈추면 데이터 군집화에 쓸 수 있습니다. 어떤 군집화 방법과 같고, 장단점은 무엇인가요?
  hintKo: 연결 요소가 k개 남았을 때 멈추면 무엇이 최대가 되나요?
  rubricKeywords:
  - 단일 연결(single linkage) 계층 군집화
  - 연결 요소 k개에서 중단
  - 군집 간 최소 거리(spacing) 최대화
  - 사슬 효과(chaining)와 이상치에 약함
  - 모든 쌍 거리 O(N^2)
  modelAnswerKo: '점을 정점, 거리를 간선 가중치로 두고 연결 요소가 $k$개 남았을 때 멈추면 단일 연결(single-linkage) 계층 군집화의 결과와 같습니다. 이는 MST에서 가장 긴 간선 $k-1$개를 지운 것과 같고, 서로 다른 군집 사이의 최소 거리(spacing)를 최대화합니다.


    장점은 군집의 모양을 가정하지 않아 길거나 휘어진 군집을 찾을 수 있고, 한 번의 계산으로 모든 $k$의 계층을 얻는다는 점입니다. 단점은 사슬 효과입니다. 군집 사이에 잡음 점이 몇 개만 있어도 서로 이어집니다. 이상치는 혼자 남는 군집이 되기도 합니다. 또 모든 쌍 거리가 $O(N^2)$이라 큰 데이터에서는 근사 최근접 이웃 그래프 위에서 계산합니다. HDBSCAN은 밀도로 보정한 거리에서 MST를 만들어 이 잡음 문제를 줄입니다.'
  maxScore: 10
---

## 문제

Kruskal

## 해설

Kruskal 알고리즘이란 **간선 선택**을 기반으로 하는 알고리즘으로, 이전 단계에서 만들어진 신장 트리와는 상관없이 무조건 최소 간선만을 선택하는 방법이다. 매 단계마다 사이클을 만들지 않는 최소 간선을 채택하면 된다.

Kruskal 알고리즘은 탐욕적인 방법(greedy method)을 이용하여, 네트워크(가중치를 간선에 할당한 그래프)의 모든 정점을 최소 비용으로 연결하는 최적 해답을 구하는 방법이다. MST(최소 비용 신장 트리)가 **최소 비용의 간선으로 구성**되며, **사이클을 포함하지 않는다**는 조건에 근거하여, 최적해를 보장할 수 있다. 각 단계에서 사이클을 이루지 않는 최소 비용 간선을 선택하면 된다.

주의할 점은 다음 간선을 `이미 선택된 간선들의 집합`에 추가할 때 사이클을 생성하는지를 체크해야 한다는 것이다. 새로운 간선이 `이미 다른 경로에 의해 연결되어 있는 정점들`을 연결할 때 사이클이 형성된다. 즉, 추가할 새로운 간선의 양끝 정점이 같은 집합에 속해 있으면, 사이클이 형성된다. 따라서, 추가하고자 하는 간선의 양끝 정점이 같은 집합에 속해 있는지를 먼저 검사해야 하고, 이때 `union-find 알고리즘`을 사용하여 검사할 수 있다.

Kruskal 알고리즘의 동작방법은 아래와 같다.

- 그래프의 간선들을 가중치의 오름차순으로 정렬한다.
- 정렬된 간선 리스트에서 순서대로 사이클을 형성하지 않는 간선을 선택한다.
- 즉, 가장 낮은 가중치를 먼저 선택한다.
- 사이클을 형성하는 간선을 제외한다.
- 해당 간선을 현재의 MST(최소 비용 신장 트리)의 집합에 추가한다.

Kruskal 알고리즘의 시간 복잡도는 $O(e \log_2 e)$이다.

> **Kruskal 알고리즘 수행 단계**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/8-algorithm/kruskal.png)

**References**
- [[알고리즘] Kruskal 알고리즘 이란 - heejeong Kwon](https://gmlwjd9405.github.io/2018/08/29/algorithm-kruskal-mst.html)

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

- **시간 복잡도의 근거**: 간선 정렬이 $O(E \log E)$이고, Union-find 연산 $O(E)$번은 경로 압축과 크기 기준 합치기를 함께 쓰면 거의 상수인 $O(\alpha(V))$씩이다. 따라서 정렬이 전체를 지배한다. 단순 그래프에서는 $E \le V^2$이므로 $O(E \log E) = O(E \log V)$이다. 간선이 이미 정렬되어 있으면 $O(E\,\alpha(V))$이다.
- **그리디인데 최적인 이유**: 그리디가 항상 최적은 아니지만 여기서는 **절단 속성(cut property)**이 보장한다. 정점을 두 무리로 나눌 때 그 사이를 잇는 최소 간선은 어떤 MST에 반드시 포함된다.

```python
def kruskal(n, edges):              # edges: (가중치, u, v), 정점 0..n-1
    parent = list(range(n))
    size = [1] * n

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]   # 경로 압축(path halving)
            x = parent[x]
        return x

    mst, total = [], 0
    for w, u, v in sorted(edges):
        ru, rv = find(u), find(v)
        if ru == rv:                # 이미 같은 집합: 사이클
            continue
        if size[ru] < size[rv]:
            ru, rv = rv, ru
        parent[rv] = ru
        size[ru] += size[rv]
        mst.append((u, v, w))
        total += w
        if len(mst) == n - 1:       # 다 이었으면 조기 종료
            break
    return mst, total               # len(mst) < n - 1 이면 연결 그래프가 아니다
```
