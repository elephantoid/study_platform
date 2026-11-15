---
id: boost-ml-014
topicId: machine-learning
sourceId: boost-ai-tech-interview
type: concept
difficulty: intermediate
roles:
- mle
- rs
- ds
reviewTarget:
  noteId: boost-ml-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_interview@1
  at: '2026-11-15'
---

## 문제

최적화 기법중 Newton’s Method와 Gradient Descent 방법에 대해 알고 있나요?

## 해설

> **Newton's Method**

함수 $f$의 2차 테일러 근사(quadratic approximation)은 다음과 같다.

$$
f(y)\approx f(x)+\nabla f(x)^T(y-x)+\frac{1}{2}(y-x)^T\nabla^2f(x)(y-x),
\\
f_{approx}(y)=f(x)+\nabla f(x)^T(y-x)+\frac{1}{2}(y-x)^T\nabla^2f(x)(y-x)
$$

여기서 $y$는 다음 스텝의 $x$ 값인 $x^+$이다. 또한 quadratic approximation을 $f_{approx}$로 정한다.

이 $f_{approx}$ 즉, quadratic approximation을 최소로 만드는 입력 $y$를 찾으려 한다. 이때 $f_{approx}$는 convex이므로 위 식의 gradient를 0으로 만드는 입력 $y$가 $f_{approx}$를 최소로 만들 것이다. 이 결과가 Newton’s method에서의 step update 식이 된다. 아래 식의 미분은 $y$에 대한 미분 임을 기억하자.

$$
\nabla f_{approx}(y)=\nabla f(x)+\frac{1}{2}\left((\nabla^2f(x))^T(y-x)+(y-x)^T\nabla^2f(x)\right)
\\
=\nabla f(x)+\nabla^2f(x)(y-x)\qquad\qquad\qquad
\\
= 0,\qquad\qquad\qquad\qquad\qquad\qquad\qquad\quad\;\,
\\
\Leftrightarrow y=x-(\nabla^2f(x))^{-1}\nabla f(x)\qquad\qquad\;
$$

> **Gradient Descent**

Gradient descent에서는 함수 $f$의 2차 테일러 근사항을 사용하고, 2차 항의 경우 실제 2차 미분 결과가 아닌, 정방행렬(identity matrix)과 이를 $t$로 나눈 값으로 가정한다.

$$
f(y)\approx f(x)+\nabla f(x)^T(y-x)+\frac{1}{2t}\parallel y-x\parallel^2_2,
\\
f_{approx}(y)=f(x)+\nabla f(x)^T(y-x)+\frac{1}{2t}\parallel y-x\parallel^2_2
$$

Newton’s method와 동일하게 위 근사식의 gradient가 0인 $y$ 값, 즉 $x^+$를 정할 수 있다.

$$
\nabla f(y)=\nabla f(x)+\frac{1}{t}(y-x),
\\
=0,\qquad\qquad\;
\\
\Leftrightarrow y=x-t\nabla f(x)
$$

> **Newton's method**와 **Gradient descent**의 step에 따른 수렴 방향 비교

<img src="https://convex-optimization-for-all.github.io/img/chapter_img/chapter14/gd.jpeg">

- 파랑: Newton's method
- 검정: Gradient descent

Gradient descent는 2차 미분항을 정방행렬에 상수가 곱해진 값으로 가정하고 gradient를 계산하기 때문에, 등고선(contour)의 접선 방향에 수직하게(perpendicular) 수렴함을 확인할 수 있고, Newton’s method에 비해 느린 수렴 속도를 보인다.

**References**
- [14-01-01 Newton's method interpretation - 모두를 위한 컨벡스 최적화](https://convex-optimization-for-all.github.io/contents/chapter14/2021/03/26/14_01_01_newton_method_interpretation/)
- [뉴턴법/뉴턴-랩슨법의 이해와 활용(Newton's method) - 다크 프로그래머](https://darkpgmr.tistory.com/58)
- [Gradient Descent 탐색 방법 - 다크 프로그래머](https://darkpgmr.tistory.com/133)
- [4주차\_#2. 최적화 기법중 Newton's Method와 Gradient Descent 방법을 설명하세요. - 내가 보려고 만든 공간](https://astralworld58.tistory.com/86)
