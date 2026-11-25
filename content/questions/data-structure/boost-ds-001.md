---
id: boost-ds-001
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

linked list

## 해설

linked list는 서로 떨어져 있는 데이터를 메모리 주소를 참조함으로써 이어진 것처럼 사용할 수 있다. linked list는 구조체가 이어진 형태로 존재하며, 이 구조체를 `노드`라고 부른다. 노드는 값을 담고 있는 `데이터 필드`와 다음 구조체를 가리키는 `링크 필드(포인터)`로 구성된다. 정확히는, 포인터가 다음 구조체의 주소를 담고 있다. 보통, linked list의 맨 첫 원소를 가리키는 head 포인터와 맨 마지막 원소를 가리키는 tail 포인터를 통해, 리스트의 요소에 접근하거나 수정한다. linked list는 구현 방법에 따라, single linked list와 double linked list, circular linked list 등으로 구분할 수 있다.

> **Array vs. Linked list**

array에서 중간에 값을 삽입하고 싶다면, 삽입할 위치 뒤의 모든 데이터가 한 칸씩 이동해야 한다는 단점이 있다. 또한, array가 할당받은 공간이 부족한데, 메모리상 뒤쪽의 메모리가 비어있지 않으면, 모든 데이터가 더 큰 홀로 이사를 가야 한다는 단점도 존재한다. linked list는 연속된 공간을 사용하지 않아도 되기 때문에 앞서 언급했던 array의 단점을 모두 해소할 수 있다. 그러나 N번째 데이터를 참조하고 싶을 때, 계속해서 다음 주소를 참조하는 형식으로 따라가야 하므로 메모리 참조에 시간이 오래 걸린다. 따라서 삽입과 삭제가 빈번한 경우에는 linked list를 사용하고, 참조가 빈번하게 일어날 때는 array를 쓰는 것이 바람직하다.

> **Time Complexity 비교**

|   구분   |  Array   | Linked List |
| :------: | :------: | :---------: |
| `insert` | $O(n)$ |  $O(1)$   |
| `delete` | $O(n)$ |  $O(1)$   |
|  `find`  | $O(1)$ |  $O(n)$   |

> **삽입, 삭제, 접근 방법**

- 접근: 원하는 원소가 나올때까지 링크 필드(포인터, 다음 노드)를 계속해서 탐색한다.
- 삽입: 삽입할 노드의 next에 현재 위치의 next를 연결한 후, 현재 위치의 next에 삽입할 노드의 주소를 넣어준다.
- 삭제: 삭제할 노드의 next를 앞선 노드의 next에 연결해준다.

> **기본적인 linked list 구조 (=Single linked list 구조)**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/basic-linked-list.png)
