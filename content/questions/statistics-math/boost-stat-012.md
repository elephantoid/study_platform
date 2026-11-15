---
id: boost-stat-012
topicId: statistics-math
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-stat-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

엔트로피(Entropy)에 대해 설명해주세요. 가능하면 정보이득(Information Gain)도요.

## 해설

**엔트로피**는 주어진 데이터의 혼잡도를 의미하며, 엔트로피는 다음과 같이 데이터가 어떤 클래스에 속할 확률에 대한 기댓값으로 표현할 수 있다.

$$
E = - \sum^k_{i=1} p_i \log_2 (p_i)
$$

엔트로피는 데이터가 서로 다른 클래스에 속하면 높고, 같은 클래스에 속하면 낮다. 다시 말하면 각각의 데이터가 특정 클래스에 속할 확률이 높고 나머지 클래스에 속할 확률이 낮다면 엔트로피가 낮고, 모든 각각의 클래스에 속할 확률이 비슷하다면 엔트로피는 높다.

**정보이득**은 데이터가 어떤 클래스에 속할 확률이 커짐에 따라 정보를 잘 얻게되는 것을 말하며, 감소되는 엔트로피 양을 의미한다. 수식으로는 기존 시스템의 엔트로피에서 현재 엔트로피를 뺀 값으로 표현된다. 의사결정트리는 가지를 칠 때 이 값을 사용하여 가지를 친다. 이 때 어떤 데이터를 두 집합으로 나누었을 때 두 집합의 정보이득이 크도록, 엔트로피는 작아지도록 분할을 한다.

**References**
- [10.1 엔트로피 - 데이터 사이언스 스쿨](https://datascienceschool.net/02%20mathematics/10.01%20%EC%97%94%ED%8A%B8%EB%A1%9C%ED%94%BC.html)
- [[인공지능] 엔트로피(Entropy) 와 정보이득(Information Gain) 계산 - 꾸준희](https://eehoeskrap.tistory.com/13)
- [파이썬 머신러닝 완벽 가이드 - 권철민](http://www.yes24.com/Product/Goods/87044746?OzSrank=2)
