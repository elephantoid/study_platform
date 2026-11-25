---
id: boost-os-003
topicId: operating-system
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: boost-os-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

캐시의 지역성에 대해 설명해주세요.

## 해설

**캐시 메모리**는 CPU의 처리 속도와 메모리의 속도 차이로 인한 병목현상을 완화하기 위해 사용하는 고속 버퍼 메모리이다. 주기억장치에 있는 데이터를 액세스하려면 비교적 오랜 시간이 걸리게 되는데 이를 줄이기 위해 데이터를 빠르게 액세스할 수 있도록 중간에 캐시 메모리를 두는 것이다. 주기억장치 내에서 자주 읽고 쓰는 데이터의 일부를 캐시 메모리에 불러와 속도 차이를 줄이고, 주기억장치와 CPU 간 신호 교환에 이용되는 Memory Bandwidth를 I/O 사용에 집중할 수 있게 만든다.

캐시 메모리는 `적중률(Hit rate)`을 극대화하기 위해 데이터 `지역성(Locality)의 원리`를 사용한다. 지역성의 전제조건으로는 프로그램은 모든 코드나 데이터를 균등하게 액세스하지 않는다는 특성을 기본으로 한다. 즉, `지역성(Locality)`이란 기억 장치 내의 정보를 균일하게 액세스하는 것이 아닌 어느 한순간에 특정 부분을 집중적으로 참조하는 특성이다.

**데이터 지역성**은 대표적으로 `시간적 지역성(Temporal Locality)`, `공간적 지역성(Spatial Locality)`, `순차적 지역성(Sequential Locality)`으로 나뉜다.

<strong>시간적 지역성(temporal locality)</strong>: CPU가 한 번 참조한 데이터는 다시 참조할 가능성이 높다.

<strong>공간적 지역성(spatial locality)</strong>: CPU가 참조한 데이터와 인접한 데이터 역시 참조될 가능성이 높다.

<strong>순차적 지역성(sequential locality)</strong>: 분기가 발생하지 않는 한 명령어는 메모리에 저장된 순서대로 인출/실행된다.

지역성은 어디까지나 경향에 대한 것이므로 항상 캐시의 높은 적중률을 보장해 주지는 않는다.

> <strong>적중률(Hit rate)</strong>

캐시 메모리가 있는 컴퓨터 시스템은 CPU가 메모리에 접근하기 전 먼저 캐시 메모리에서 원하는 데이터의 존재 여부를 확인한다. 이때 필요한 데이터가 있는 경우를 적중(hit), 없는 경우를 실패(miss)라고 한다.

**요청한 데이터를 캐시 메모리에서 찾을 확률**을 <strong>적중률(hit rate)</strong>이라고 한다.

캐시 메모리의 성능은 적중률에 의해 결정된다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/6-operating-system/hit-rate.png)

**References**
- [[OS] 캐시(Cache) ? - 어제보다 한 걸음 더](https://k39335.tistory.com/38)
- [캐시(Cache) 메모리와 지역성::하드웨어 - 제이붐](https://junboom.tistory.com/34)
- [캐시 - 위키백과](https://ko.wikipedia.org/wiki/%EC%BA%90%EC%8B%9C)
- [캐시 메모리(cache memory)의 개요 정리 - 코알라알락's BLOG](https://zion830.tistory.com/46)
