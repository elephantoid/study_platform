---
id: boost-dl-038
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

Back Propagation은 몇줄인가?

## 해설

참고 코드(경사하강법 적용) 기준으로 10줄이면 구현할 수 있다. `gradient_descent` 함수를 각 레이어별로 적용하면 미분값을 적용시킬 수 있다.

```python
# 가중치 매개변수의 기울기를 구함
def numerical_gradient(f, x):
    h = 1e-4
    grad = np.zeros_like(x)  # x와 형상이 같은 배열을 생성

    for idx in range(x.size):
        tmp_val = x[idx]
        # f(x+h) 계산
        x[idx] = tmp_val + h
        fxh1 = f(x)

        # f(x-h) 계산
        x[idx] = tmp_val - h
        fxh2 = f(x)

        grad[idx] = (fxh1 - fxh2) / (2 * h)
        x[idx] = tmp_val  # 값 복원

    return grad

for key in ('W1', 'b1', 'W2', 'b2'):
    network.params[key] -= learning_rate * grad[key]
```

**References**
- [deeplearning_from_scratch - youbeebee](https://github.com/youbeebee/deeplearning_from_scratch/blob/master/ch4.%EC%8B%A0%EA%B2%BD%EB%A7%9D%20%ED%95%99%EC%8A%B5/4.4.%EA%B8%B0%EC%9A%B8%EA%B8%B0.py)
- [4.5.신경망학습\_학습 알고리즘 구현하기 - 밑바닥부터 시작하는 딥러닝(도서)](http://m.yes24.com/Goods/Detail/34970929)
