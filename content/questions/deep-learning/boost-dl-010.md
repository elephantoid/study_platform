---
id: boost-dl-010
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

TF, PyTorch 등을 사용할 때 디버깅 노하우는?

## 해설

오류가 발생하는 곳, 중요한 데이터가 바뀌는 지점을 디버깅 포인트로 두고, 확인하는 방법이 있다. 또, IDE에서 다양한 디버깅 extension을 지원하기 때문에 이를 잘 활용하면 좋은 인사이트를 얻을 수 있다. 예를들어, vs code의 jupyter extension을 사용하면 데이터 프레임, 변수값등을 보기 쉽게 정렬하여 확인할 수 있다.

디버깅 노하우도 중요하지만, 오류에 대한 대처방식을 익히면 좋다. 디버깅 하지 않고 오류에 대처할 수 있으므로, 디버깅 시간을 아껴준다. 예를들어, 딥러닝 학습을 위한 코드를 작성할 때, 가장 많이 발생하는 오류는 CUDA out of memory와 shape 오류이다.(개인적인 의견) out of memory와 같은 오류는 배치 사이즈를 줄인다거나, 입력 데이터의 사이즈를 줄이는 방식으로 해결할 수 있다. shape 오류는 디버깅을 통해서 현재 입력 데이터의 shape, type등을 확인하고, 함수의 파라미터가 요구하는 shape, type에 맞게 변형하는 과정이 필요하다.

추가적으로 딥러닝 디버깅 툴은 아니지만, logging tool로서 tensorboard, wandb 등이 매우 유용하게 사용될 수 있다.
