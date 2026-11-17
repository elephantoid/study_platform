---
id: boost-ds-015
topicId: data-structure
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: boost-ds-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

heap(binary heap)

## 해설

최대값 및 최소값을 찾아내는 연산을 빠르게 하기 위해 고안된 완전 이진 트리를 기본으로 한 자료구조로서 다음의 속성을 만족한다.

> A가 B의 부모 노드이면, A의 키값과 B의 키값 사이에는 대소관계가 성립한다.

heap의 종류에는 [min heap](#7-1), [max heap](#7-2)이 있다.

각 노드의 자식 노드의 최대 개수는 힙의 종류에 따라 다르지만, 대부분의 경우는 자식 노드의 개수가 최대 2개인 이진 힙(binary heap)을 사용한다.

힙에서는 가장 높은(혹은 가장 낮은) 우선순위를 가지는 노드가 항상 루트 노드에 오게 되는 특징이 있으며, 이를 응용하여 우선순위 큐와 같은 추상적 자료형을 구현할 수 있다.

> <strong>이진 힙(binary heap)</strong>

이진 힙은 다음과 같은 두 가지 특징을 갖는다. 트리를 T, 임의 내부 노드를 v라고 하면 다음과 같다.

1. 루트 노드를 제외한 각 내부 노드는 `key(T.parent(v)) < key(v)` 또는 `key(T.parent(v)) > key(v)`이다. (즉, 키 값은 오름차순이거나 내림차순이다.)
2. 마지막 왼쪽 결합 노드들의 레벨을 제외한 다른 모든 레벨들은 완전 이진 트리를 형성한다.

힙 리스트(heap list)로 표현할 때 i번째 노드의 왼쪽 자식 노드의 위치는 2i가 되며, i번째 노드의 오른쪽 자식 노드의 위치는 2i+1이고, 또한 i번째 노드의 부모 노드의 위치는 i/2가 된다.

이진 힙의 시간복잡도는 $O(\log n)$이다.

**References**
- [힙 (자료 구조) - 위키백과](<https://ko.wikipedia.org/wiki/%ED%9E%99_(%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0)>)
