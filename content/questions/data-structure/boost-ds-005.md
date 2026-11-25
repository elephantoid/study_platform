---
id: boost-ds-005
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

hash table

## 해설

해시 테이블은 (Key, Value)로 데이터를 저장하는 자료구조 중 하나로 빠르게 데이터를 검색할 수 있는 자료구조이다. 해시 테이블이 빠른 검색속도를 제공하는 이유는 내부적으로 배열(버킷)을 사용하여 데이터를 저장하기 때문이다. 해시 테이블은 각각의 Key값에 해시함수를 적용해 배열의 고유한 index를 생성하고, 이 index를 활용해 값을 저장하거나 검색하게 된다. 여기서 실제 값이 저장되는 장소를 버킷 또는 슬롯이라고 한다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/hash-table.png)

예를 들어, `(Key, Value)쌍` 구조를 가지는 데이터 `("John Smith", "521-1234")`를 크기가 16인 해시 테이블에 저장한다고 하자. 그러면 먼저 `index = hash_function("John Smith") % 16` 연산을 통해 index 값을 계산한다. 그리고 `array[index] = "521-1234"` 로 value를 저장하게 된다. 이러한 구조로 데이터를 저장하면 Key값으로 데이터를 찾을 때 해시 함수를 1번만 수행하면 되므로 매우 빠르게 데이터를 저장/삭제/조회할 수 있다. 해시테이블의 평균 시간복잡도는 O(1)이다.

> **해시(Hash)값이 충돌하는 경우**

만약 "John Smith"를 해시 함수를 돌려 나온 값과 "Sandra Dee"를 해시 함수를 돌려 나온 값이 동일하다면, 아래와 같이 해결할 수 있다.

**해결방법 1: Separate Chaining(분리 연결법)**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/7-data-structure/separate-chaining.png)

동일한 버킷의 데이터에 대해 자료구조를 활용해 추가 메모리를 사용하여 다음 데이터의 주소를 저장하는 방법이다. 동일한 해시 값을 가지면, 동일한 버킷 안에 엔트리를 할당해줘야한다. 이 때, 버킷 내부의 엔트리 값들은 linked list 형태로 이어준다. 이러한 Chaining 방식은 해시 테이블의 확장이 필요없고 간단하게 구현이 가능하며, 손쉽게 삭제할 수 있다는 장점이 있다. 하지만 데이터의 수가 많아지면 동일한 버킷에 chaining되는 데이터가 많아지며 그에 따라 캐시의 효율성이 감소한다는 단점이 있다.

**해결방법 2: Open Addressing(개방주소법)**

Open Addressing이란 추가적인 메모리를 사용하는 Chaining 방식과 다르게 비어있는 해시 테이블의 공간을 활용하는 방법이다. Open Addressing을 구현하기 위한 대표적인 방법으로는 3가지 방식이 존재한다.

- **Linear Probing**: 현재의 버킷 index로부터 고정폭 만큼씩 이동하여 차례대로 검색해 비어 있는 버킷에 데이터를 저장한다.
- **Quadratic Probing**: 해시의 저장순서 폭을 제곱으로 저장하는 방식이다. 예를 들어 처음 충돌이 발생한 경우에는 1만큼 이동하고 그 다음 계속 충돌이 발생하면 2^2, 3^2 칸씩 옮기는 방식이다.
- **Double Hashing Probing**: 해시된 값을 한번 더 해싱하여 해시의 규칙성을 없애버리는 방식이다. 해시된 값을 한번 더 해싱하여 새로운 주소를 할당하기 때문에 다른 방법들보다 많은 연산을 하게 된다.

충돌을 방지하는 방법들은 데이터의 규칙성(클러스터링)을 방지하기 위한 방식이지만 공간을 많이 사용한다는 치명적인 단점이 있다. 만약 테이블이 꽉 차있는 경우라면 테이블을 확장해주어야 하는데, 이는 매우 심각한 성능의 저하를 불러오기 때문에 가급적이면 확정을 하지 않도록 테이블을 설계해주어야 한다. (통계적으로 해시 테이블의 공간 사용률이 70% ~ 80%정도가 되면 해시의 충돌이 빈번하게 발생하여 성능이 저하되기 시작한다고 한다.) 또한 해시 테이블에서 자주 사용하게 되는 데이터를 Cache에 적용하면 효율을 높일 수 있다. 자주 hit하게 되는 데이터를 캐시에서 바로 찾음으로써 해시 테이블의 성능을 향상시킬 수 있다.

> **시간 복잡도**

삽입, 삭제, 탐색에 대해 해시 충돌이 일어나지 않는 경우에 $O(1)$, 충돌이 일어난다면 최악의 경우에 $O(N)$의 시간 복잡도를 가진다.

왜냐하면 해시 충돌로 인해서 하나의 버킷에 여러 엔트리가 연결되어있는 경우에 모든 엔트리를 탐색해야할 수 있기 때문이다.

**References**
- [[자료구조] 해시테이블(HashTable)이란? - MangKyu's Diary](https://mangkyu.tistory.com/102)
