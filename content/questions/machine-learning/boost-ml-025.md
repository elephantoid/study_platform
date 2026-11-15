---
id: boost-ml-025
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

feature vector란 무엇일까요?

## 해설

**특징(feature)** 이란, 샘플(데이터)을 잘 설명하는 측정가능한 속성이다. 특징을 통해 특정 샘플을 수치화하여 나타낼 수 있다.  
**특징벡터(feature vector)** 란 피쳐(feature)들의 집합이다. 굳이 벡터로 표시하는 이유는 수학적으로 다루기 편하기 때문이다.  
데이터별로 어떤 특징을 가지고 있는지 찾아내고, 그것을 토대로 데이터를 벡터로 변환하는 작업을 **특징추출(feature extraction)** 이라고 한다.  
**특징 공간(feature space)** 이란 관측값들이 있는 공간을 의미한다. 이 특징 공간은 여러 차원으로 구성될 수 있다. 어떤 데이터를 특징공간의 하나의 벡터로 표현하는 경우, 여러 특징 변수가 특징벡터에 영향을 줄 수 있다. 예를들어, 특징 변수가 하나인 데이터는 1차원 특징 공간에 나타나고, 특징 변수가 N개라면 N차원의 특징 공간에 나타낼 수 있다.

d-차원 데이터의 특징 벡터는 다음과 같이 표시된다.

$$
x = (x_1, x_2, ..., x_d)^T
$$

> **💡 분야에 따른 피처벡터의 의미**
>
> - <strong>컴퓨터비전(이미지)</strong>에서의 특징은 edge, corner 등을 의미한다. 픽셀 값이 급격히 변화하는 곳, 밝기의 변화, 색상의 변화, 그래디언트의 방향 등의 매칭 정보등을 특징으로 삼는다. SIFT, SURF 등의 방법이 존재한다.
> - **자연어처리(텍스트)** 에서의 특징은 단어, 형태소, 서브워드, 토큰 등으로 표현될 수 있으며, BOW(Bag-of-Words)는 문서에서 단어의 발생을 설명하는 텍스트의 벡터 표현이다. 만약 8개의 단어로 이루어진 문장을 BoW로 만들면, 8차원(dimension)의 vector로서 하나의 단어를 표현할 수 있다.
> - **정형데이터**에서의 특징은 각 attribute(열)를 의미한다. 키, 나이, 국적 등이 특징으로 사용될 수 있다.

**References**
- [피쳐(기계학습) - 위키백과](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/<https://ko.wikipedia.org/wiki/%ED%94%BC%EC%B3%90_(%EA%B8%B0%EA%B3%84_%ED%95%99%EC%8A%B5)>)
- [4)머신러닝이란? - TCPschool.com](http://www.tcpschool.com/deep2018/deep2018_machine_learning)
- [머신러닝-다차원 특징공간과 차원의 저주 - 예비 개발자](http://blog.naver.com/PostView.nhn?blogId=qbxlvnf11&logNo=221323034856)
- [OpenCV-특징검출, 디스크립터, 매칭 - JeongYongHwang](https://raw.githubusercontent.com/boost-devs/ai-tech-interview/HEAD/answers/<https://wjddyd66.github.io/opencv/OpenCV(8)/>)
- [자연어처리 Bag of Words](https://bsm8734.github.io/posts/bc-d016-2-nlp-bag-of-words/)
- [자연어의 피처와 전처리 - GeumjaeLee](https://brunch.co.kr/@geumjaelee/4)
