---
id: boost-dl-039
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

CNN으로 바꾼다면 얼마나 추가될까?

## 해설

filter의 수, 크기, padding, stride 등에 대한 내용과 pooling layer등 레이어에 관한 정의가 추가되므로 약 50줄 정도 추가된다.

MLP 버전과 CNN 버전의 참고코드는 아래와 같다.

- [MLP 참고 코드](https://github.com/youbeebee/deeplearning_from_scratch/blob/master/ch4.%EC%8B%A0%EA%B2%BD%EB%A7%9D%20%ED%95%99%EC%8A%B5/4.5.%ED%95%99%EC%8A%B5%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98%20%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0.py)
- [CNN 참고 코드](https://github.com/youbeebee/deeplearning_from_scratch/blob/master/ch7.CNN/7.5.CNN%20%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0.py)

**References**
- [deeplearning_from_scratch - youbeebee](https://github.com/youbeebee/deeplearning_from_scratch/blob/master/ch7.CNN/7.5.CNN%20%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0.py)
- [4.5.신경망학습\_학습 알고리즘 구현하기 - 밑바닥부터 시작하는 딥러닝(도서)](http://m.yes24.com/Goods/Detail/34970929)
