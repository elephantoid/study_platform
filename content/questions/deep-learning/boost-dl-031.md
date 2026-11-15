---
id: boost-dl-031
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

GAN에서 Generator 쪽에도 BN을 적용해도 될까?

## 해설

일반적으로 GAN에서는 생성기(Generator)의 출력층(Output Layer)에만 BN(Batch Normalization)을 적용하지 않는다. 왜냐하면 생성기가 만든 이미지가 BN을 지나면 실제 이미지와는 값의 범위가 달라지기 때문이다.

**References**
- [초짜 대학원생의 입장에서 이해하는 Deep Convolutional Generative Adversarial Network (DCGAN) (1) - Jaejun Yoo's Playground](http://jaejunyoo.blogspot.com/2017/02/deep-convolutional-gan-dcgan-1.html)
