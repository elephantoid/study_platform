---
id: boost-dl-021
topicId: deep-learning
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-dl-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

Local Minima 문제에도 불구하고 딥러닝이 잘 되는 이유는?

## 해설

local minima 문제가 사실은 고차원(High Dimensional)의 공간에서는 발생하기 힘든, 매우 희귀한 경우이기 때문이다. 실제 딥러닝 모델에서는 weight가 수도없이 많으며, 그 수많은 weight가 모두 local minima에 빠져야 weight update가 정지되기 때문에 local minima는 큰 문제가 되지 않는다.

> **Local Minima 문제에도 불구하고 딥러닝이 잘 되는, 더 구체적인 이유**

고차원의 공간에서 모든 축의 방향으로 오목한 형태가 형성될 확률은 거의 0에 가깝다. 따라서, 고차원의 공간에서 대부분의 critical point는 local minima가 아니라 saddle point다. 그리고, 고차원의 공간에서 설령 local minima가 발생한다 하더라도 이는 global minimum이거나 또는 global minimum과 거의 유사한 수준의 에러 값을 갖는다. 왜냐하면, critical point에 포함된 위로 볼록인 방향 축의 비율이 크면 클수록 높은 에러를 가지기 때문이다.(실험적 결과) local minima는 위로 볼록인 경우가 하나도 없는 경우이기 때문에 결과적으로 매우 낮은 에러를 갖게 될 것이다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/saddle-point.png)

> **Critical point, Saddle point, Local minimum**

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/critical-saddle-point-and-local-minima.png)

- `critical point`: 일차 미분이 0인 지점이다. (local/global)minima, (local/global)maxima, saddle point를 가리킴
- `local minimum`: 모든 방향에서 극소값을 만족하는 점
- `global minimum`: 모든 방향에서 극소값을 만족하는 점 중에 가장 값이 작은 점(정답)
- `saddle point`: 어느 방향에서 보면 극대값이지만 다른 방향에서 보면 극소값이 되는 점

**References**
- [NeuralNetwork (3) Optimazation2 - Cornor's Blog](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/<https://wjddyd66.github.io/dl/NeuralNetwork-(3)-Optimazation2/>)
- [Local Minima 문제에 대한 새로운 시각 - 다크 프로그래머](https://darkpgmr.tistory.com/148)
- [05-1.심층 신경망 학습-활성화 함수, 가중치 초기화 - EXCELSIOR](https://excelsior-cjh.tistory.com/177)
