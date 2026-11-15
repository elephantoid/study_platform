---
id: boost-dl-017
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

Gradient Descent에 대해서 쉽게 설명한다면?

## 해설

Gradient Descent는 어떤 함수의 극소점을 찾기 위해 gradient 반대 방향으로 이동해 가는 방법이다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/how-to-gradient-descent.png)

딥러닝에서는 Loss function을 최소화시키기 위해 파라미터에 대해 Loss function을 미분하여 그 기울기값(gradient)을 구하고, 경사가 하강하는 방향으로 파라미터 값을 점진적으로 찾기위해 사용된다.

Gradient Descent를 수식으로 표현하면 아래와 같다.

$$
W_{t+1} \leftarrow W_t - \eta g_t
$$

Gradient Descent의 문제점으로는 크게 두 가지가 있다.

첫 번째로 적절한 <strong>step size(learning rate)</strong>가 필요하다. step size가 큰 경우 한 번 이동하는 거리가 커지므로 빠르게 수렴할 수 있다는 장점이 있다. 하지만, step size를 너무 크게 설정해버리면 최소값을 계산하도록 수렴하지 못하고 함수 값이 계속 커지는 방향으로 최적화가 진행될 수 있다.

한편 step size가 너무 작은 경우 발산하지는 않을 수 있지만 최적의 x를 구하는데 소요되는 시간이 오래 걸린다는 단점이 있다.

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/step-size-problem.png)

두 번째로 **local minima 문제**이다. gradient descent 알고리즘을 시작하는 위치는 매번 랜덤하기 때문에 어떤 경우에는 local minima에 빠져 계속 헤어나오지 못하는 경우도 생긴다. (자세한 내용은 [#14-1. GD가 Local Minima 문제를 피하는 방법은?](#14-1) 참고)

![](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/img/3-deep-learning/local-minima-problem.png)

**References**
- [경사하강법(gradient descent) - 공돌이의 수학정리노트](https://angeloyeo.github.io/2020/08/16/gradient_descent.html)
- [Gradient Descent 탐색 방법 - 다크 프로그래머](https://darkpgmr.tistory.com/133)
