import { MOCK_ATTRIBUTIONS } from "./sources";
import type { GradeResult, QuestionView } from "./types";

export const MOCK_QUESTIONS: Record<string, QuestionView> = {
  "q-agent-react-open": {
    id: "q-agent-react-open",
    topicId: "agent-architecture",
    type: "open",
    difficulty: "advanced",
    promptMd:
      "단일 Chain-of-Thought(CoT) 추론과 비교했을 때 **ReAct(Reason + Act)** 에이전트 루프가 가지는 구조적 이점과, 프로덕션 환경에서 발생할 수 있는 대표적인 **실패 모드(Failure Modes)** 2가지를 설명하세요.",
    reviewTarget: {
      segment: {
        lectureId: "cs329z-lec01",
        videoId: "DGI4vucR71w",
        startSec: 1260,
      },
    },
    attribution: MOCK_ATTRIBUTIONS["src-stanford-cs329z"],
    followUps: [
      {
        id: "q-agent-react-open-fu1",
        order: 1,
        promptMd:
          "**[꼬리질문 1/3 — 무한 루프 제어]** ReAct 에이전트가 동일한 도구를 같은 인자로 반복 호출하는 무한 루프에 빠졌을 때, 런타임 오케스트레이터 수준에서 이를 감지하고 복구하기 위한 구체적인 메커니즘을 설명해보세요.",
        hintKo:
          "툴 호출 시그니처 해싱, 최대 스텝 제한(max_steps), 그리고 에러/중복 감지 메시지를 Observation에 주입하는 방식을 고려해보세요.",
        rubricKeywords: ["max_steps", "중복 호출 해시 감지", "Observation 피드백 주입"],
        modelAnswerKo:
          "직전 N번의 (tool_name, normalized_args) 해시를 비교해 동일 호출이 반복되면 실행을 차단하고, '동일한 도구 호출이 반복되었습니다. 다른 검색어나 접근법을 시도하세요'라는 시스템 Observation을 컨텍스트에 주입합니다. 동시에 세션 전체에 하드 캡(max_steps)과 토큰 예산을 설정합니다.",
        sampleFeedbackKo:
          "호출 시그니처 중복 감지와 Observation을 통한 방향 전환 유도(Self-correction)를 정확히 짚었습니다.",
        maxScore: 10,
      },
      {
        id: "q-agent-react-open-fu2",
        order: 2,
        promptMd:
          "**[꼬리질문 2/3 — 컨텍스트 오염 완화]** 도구 실행 결과(Observation)로 수만 토큰짜리 원본 JSON이나 웹페이지가 반환되어 컨텍스트 창이 오염되는 문제를 어떻게 설계적으로 해결하시겠습니까?",
        hintKo:
          "Subagent 위임(격리된 컨텍스트) 또는 경량 모델을 통한 Observation 요약/필터링 파이프라인을 떠올려보세요.",
        rubricKeywords: ["Observation 압축/요약", "Subagent 격리", "스키마 프로젝션"],
        modelAnswerKo:
          "1) 도구 레이어에서 필요한 필드만 투영(Projection)하거나 페이지네이션을 강제하고, 2) 대용량 문서는 격리된 Subagent(또는 경량 모델 gemini-3.5-flash-lite)가 먼저 읽고 핵심 요약만 메인 에이전트 컨텍스트로 반환하는 계층형 위임 구조를 사용합니다.",
        sampleFeedbackKo:
          "도구 응답 스키마 제한과 Subagent 컨텍스트 격리 전략이 명확하게 서술되었습니다.",
        maxScore: 10,
      },
      {
        id: "q-agent-react-open-fu3",
        order: 3,
        promptMd:
          "**[꼬리질문 3/3 — 부작용(Side-effect) 안전장치]** 조회(Read) 도구가 아니라 DB 삭제나 외부 결제 같은 상태 변경(Write) 도구를 에이전트가 호출하려 할 때 어떤 아키텍처 가드레일을 두어야 합니까?",
        hintKo:
          "Human-in-the-loop 승인 게이트, Dry-run 미리보기, 결정론적 정책 검사(Policy Hook)를 결합하세요.",
        rubricKeywords: ["Human-in-the-Loop 승인", "Pre-tool Hook 검증", "Dry-run / 멱등성 키"],
        modelAnswerKo:
          "LLM 프롬프트에만 의존하지 않고 Pre-tool Execution Hook(결정론적 코드)에서 쓰기 권한과 파라미터 범위를 검증하며, 비가역적 작업은 실행을 일시 중지(Interrupt)하고 사용자의 명시적 승인(Human-in-the-loop)을 받은 뒤 멱등성 키(Idempotency Key)와 함께 실행합니다.",
        sampleFeedbackKo:
          "프롬프트 가드레일의 한계를 인지하고 코드 레벨 Hook 및 Human-in-the-loop 승인을 결합한 점이 우수합니다.",
        maxScore: 10,
      },
    ],
  },
  "q-mle-bias-variance-concept": {
    id: "q-mle-bias-variance-concept",
    topicId: "ml-fundamentals",
    type: "concept",
    difficulty: "basic",
    promptMd:
      "머신러닝에서 **편향(Bias)과 분산(Variance)의 트레이드오프**를 정의하고, 모델이 고분산(High Variance, 과적합) 상태일 때 적용할 수 있는 대표적인 해결 기법 3가지를 설명하세요.",
    reviewTarget: {
      noteId: "note-bias-variance",
      segment: {
        lectureId: "cs329z-lec01",
        videoId: "DGI4vucR71w",
        startSec: 420,
      },
    },
    attribution: MOCK_ATTRIBUTIONS["src-boost-ai"],
    followUps: [
      {
        id: "q-mle-bias-variance-concept-fu1",
        order: 1,
        promptMd:
          "**[꼬리질문 1/3 — L1 vs L2 정규화]** 고분산 완화를 위해 정규화(Regularization)를 사용할 때, L1(Lasso)과 L2(Ridge) 정규화가 가중치(Weight) 분포와 희소성(Sparsity)에 미치는 기하학적·수식적 차이는 무엇인가요?",
        hintKo:
          "미분 시 기울기 형태(상수 부호 vs 가중치 비례)와 제약 조건 영역의 모서리(Corner) 유무를 설명하세요.",
        rubricKeywords: ["희소성(Sparsity)", "Subgradient / 부호 상수", "제약 영역 모서리"],
        modelAnswerKo:
          "L1 정규화는 손실 함수에 |w|를 더해 미분 시 sign(w)만큼 일정한 힘으로 가중치를 0으로 밀어내어 희소 모델(Feature Selection)을 만듭니다. 반면 L2는 w^2을 더해 가중치 크기에 비례해 감쇠(Weight Decay)시키므로 0에 가까워질수록 감소 폭이 줄어들어 모든 특성을 골고루 작게 유지합니다.",
        sampleFeedbackKo:
          "L1의 희소성 유도 원리와 L2의 Weight Decay 특성을 정확히 비교했습니다.",
        maxScore: 10,
      },
      {
        id: "q-mle-bias-variance-concept-fu2",
        order: 2,
        promptMd:
          "**[꼬리질문 2/3 — 앙상블 기법 비교]** Bagging(예: Random Forest)과 Boosting(예: Gradient Boosting)은 각각 편향(Bias)과 분산(Variance) 중 어느 쪽을 줄이는 데 주로 기여하며 그 이유는 무엇인가요?",
        hintKo:
          "독립적인 모델들의 평균(분산 감소)과 이전 모델의 잔차/오차를 순차 보정하는 과정(편향 감소)을 대비해보세요.",
        rubricKeywords: ["Bagging: 분산 감소", "Boosting: 편향 감소", "독립 표본 평균 vs 순차 잔차 학습"],
        modelAnswerKo:
          "Bagging은 부트스트랩 샘플로 독립 학습된 고분산 약한 학습기들의 예측을 평균 내어 분산(Variance)을 줄입니다. 반면 Boosting은 이전 모델이 틀린 잔차(Residual)나 가중치에 집중해 순차적으로 모델을 보강하므로 모델의 표현력을 높여 편향(Bias)을 주로 감소시킵니다.",
        sampleFeedbackKo:
          "Bagging의 분산 감소 효과와 Boosting의 편향 감소 메커니즘을 명확히 구분했습니다.",
        maxScore: 10,
      },
      {
        id: "q-mle-bias-variance-concept-fu3",
        order: 3,
        promptMd:
          "**[꼬리질문 3/3 — 현대 딥러닝의 이중 하강(Double Descent)]** 고전적 편향-분산 트레이드오프와 달리, 초거대 신경망(Over-parameterized Regime)에서 파라미터 수가 데이터 수를 크게 넘어설 때 테스트 오차가 다시 감소하는 'Double Descent' 현상은 왜 발생합니까?",
        hintKo:
          "보간 임계점(Interpolation Threshold) 이후 SGD의 암묵적 정규화(Implicit Regularization)와 최소 노름 해 탐색을 생각해보세요.",
        rubricKeywords: ["보간 임계점(Interpolation Threshold)", "암묵적 정규화(Implicit Regularization)", "최소 노름(Minimum Norm) 해"],
        modelAnswerKo:
          "파라미터 수가 학습 데이터를 막 완벽히 외우기 시작하는 보간 임계점 부근에서는 작은 노이즈에도 함수가 크게 흔들려 분산이 폭증하지만, 파라미터가 훨씬 더 많아지면 훈련 오차를 0으로 만드는 수많은 해 중에서 SGD가 가장 매끄러운 최소 노름(Minimum Norm) 해를 찾아가는 암묵적 정규화 효과가 작동해 일반화 성능이 다시 좋아집니다.",
        sampleFeedbackKo:
          "보간 임계점과 과모수화 영역에서의 암묵적 정규화 개념을 훌륭하게 연결했습니다.",
        maxScore: 10,
      },
    ],
  },
  "q-rs-attention-mcq": {
    id: "q-rs-attention-mcq",
    topicId: "transformer-llm",
    type: "mcq",
    difficulty: "intermediate",
    promptMd:
      "Scaled Dot-Product Attention 수식 $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$ 에서 내적 값을 $\\sqrt{d_k}$ 로 스케일링하는 가장 핵심적인 수학적 이유는 무엇입니까?",
    choices: [
      "Q와 K 행렬 곱셈의 시간 복잡도를 O(N^2)에서 O(N log N)으로 줄이기 위해서",
      "차원 d_k가 커질수록 내적 값의 분산이 커져 Softmax 함수가 기울기 소실(Vanishing Gradient) 영역으로 포화되는 것을 막기 위해서",
      "Value 행렬 V의 출력 벡터 노름(Norm)을 항상 1로 정규화하기 위해서",
      "Multi-Head Attention에서 헤드 간 가중치 공유(Weight Tied)를 강제하기 위해서",
    ],
    reviewTarget: {
      segment: {
        lectureId: "cs329z-lec01",
        videoId: "DGI4vucR71w",
        startSec: 2190,
      },
    },
    attribution: MOCK_ATTRIBUTIONS["src-boost-ai"],
    followUps: [
      {
        id: "q-rs-attention-mcq-fu1",
        order: 1,
        promptMd:
          "**[꼬리질문 1/3 — 분산 유도]** $Q$와 $K$의 각 원소가 평균 0, 분산 1인 독립 확률변수라고 가정할 때, 내적 $q \\cdot k = \\sum_{i=1}^{d_k} q_i k_i$ 의 평균과 분산이 어떻게 되는지 수식적으로 설명해보세요.",
        hintKo:
          "독립 확률변수 곱의 기댓값과 분산 성질을 이용해 d_k개의 합이 분산을 어떻게 키우는지 유도하세요.",
        rubricKeywords: ["평균 0", "분산 d_k", "표준편차 sqrt(d_k)로 나누어 분산 1 복원"],
        modelAnswerKo:
          "각 항 q_i * k_i의 기댓값은 E[q_i]E[k_i] = 0이고, 분산은 Var(q_i k_i) = 1*1 = 1입니다. 서로 독립인 d_k개 항을 더하므로 내적의 평균은 0, 분산은 d_k(표준편차 sqrt(d_k))가 됩니다. 따라서 sqrt(d_k)로 나누어야 분산이 다시 1로 유지됩니다.",
        sampleFeedbackKo:
          "내적의 분산이 d_k에 비례해 커지는 과정과 정규화 인자 유도 과정이 정확합니다.",
        maxScore: 10,
      },
      {
        id: "q-rs-attention-mcq-fu2",
        order: 2,
        promptMd:
          "**[꼬리질문 2/3 — KV Cache 메모리 병목]** 긴 시퀀스 추론(Inference) 시 Multi-Head Attention(MHA)에서 발생하는 KV Cache 메모리 대역폭 병목을 줄이기 위한 **GQA(Grouped-Query Attention)** 와 **MQA(Multi-Query Attention)** 의 차이를 설명하세요.",
        hintKo:
          "Query 헤드 수 대비 Key/Value 헤드를 몇 개로 공유하는지 비교하세요.",
        rubricKeywords: ["KV 헤드 공유", "MQA: 단일 KV 헤드", "GQA: 그룹 단위 KV 헤드 공유"],
        modelAnswerKo:
          "MHA는 모든 Query 헤드마다 별도의 K, V 헤드를 두어 KV Cache가 크지만, MQA는 모든 Query 헤드가 단 1개의 K, V 헤드를 공유해 메모리를 극적으로 줄이는 대신 품질 저하가 발생할 수 있습니다. GQA는 Query 헤드를 G개 그룹으로 나누어 그룹당 1개의 K, V 헤드를 공유함으로써 추론 속도와 모델 품질 사이의 균형을 잡습니다.",
        sampleFeedbackKo:
          "MHA, MQA, GQA의 KV 헤드 공유 구조와 메모리-품질 트레이드오프를 명확히 설명했습니다.",
        maxScore: 10,
      },
      {
        id: "q-rs-attention-mcq-fu3",
        order: 3,
        promptMd:
          "**[꼬리질문 3/3 — FlashAttention 원리]** FlashAttention이 Attention 수식 자체를 근사하지 않고도(Exact Attention) HBM 메모리 접근 횟수와 복잡도를 줄이는 핵심 시스템 기법 2가지는 무엇입니까?",
        hintKo:
          "GPU SRAM 타일링(Tiling)과 Online Softmax, 그리고 역전파 시 재계산(Recomputation)을 떠올려보세요.",
        rubricKeywords: ["SRAM Tiling", "Online Softmax (Log-sum-exp 갱신)", "역전파 시 Attention 행렬 재계산"],
        modelAnswerKo:
          "1) N x N Attention 행렬 전체를 HBM에 쓰지 않고 블록 단위로 쪼개어 빠른 GPU SRAM 위에서 Online Softmax 스케일링으로 누적 계산하는 Tiling 기법, 2) 순전파 때 거대한 중간 Attention 행렬을 저장하지 않고 통계량(최댓값, 합)만 저장한 뒤 역전파 시 SRAM에서 빠르게 재계산(Recomputation)하는 기법입니다.",
        sampleFeedbackKo:
          "SRAM Tiling/Online Softmax와 역전파 재계산을 통한 HBM I/O 절감 원리를 정확히 서술했습니다.",
        maxScore: 10,
      },
    ],
  },
};

export const MOCK_GRADE_RESULTS: Record<string, GradeResult> = {
  "q-agent-react-open": {
    questionId: "q-agent-react-open",
    score: 8,
    maxScore: 10,
    verdict: "pass",
    criteria: [
      {
        id: "c1",
        desc: "Reason(사고)과 Act(도구 호출)의 교대 루프 및 Observation 주입 구조 설명",
        awarded: 4,
        points: 4,
        evidence: "추론 단계와 외부 도구 실행 결과를 Observation으로 다시 컨텍스트에 넣는 루프를 명확히 기술함.",
      },
      {
        id: "c2",
        desc: "단일 CoT 대비 외부 지식 접지(Grounding) 및 환각 감소 이점 제시",
        awarded: 3,
        points: 3,
        evidence: "파라미터 내부 지식에 의존하는 CoT와 달리 실시간 검색/계산으로 환각을 줄인다는 점을 언급함.",
      },
      {
        id: "c3",
        desc: "프로덕션 실패 모드(무한 반복 루프, 잘못된 도구 인자 환각, 컨텍스트 폭발 등) 2가지 이상",
        awarded: 2,
        points: 3,
        evidence: "무한 루프는 설명했으나 도구 인자 스키마 환각 및 지연시간 누적 측면을 보완하면 만점입니다.",
      },
    ],
    deductions: [
      {
        desc: "도구 실패 시 Fallback / 타임아웃 처리에 대한 언급 누락",
        points: -1,
      },
    ],
    feedbackKo:
      "ReAct의 핵심 메커니즘인 Thought → Action → Observation 루프와 외부 정보 접지(Grounding) 이점을 정확히 이해하고 있습니다. 아래 생성된 **3개의 심층 꼬리질문**을 통해 무한 루프 방어, 컨텍스트 오염 제어, 쓰기 도구 안전장치까지 연이어 점검해보세요.",
    modelAnswerKo:
      "ReAct는 내부 추론(Reasoning trace)과 외부 환경에 대한 행동(Action) 및 관측(Observation)을 번갈아 수행하여 CoT의 사실 환각과 오류 전파를 외부 근거로 교정합니다. 주요 실패 모드로는 1) 동일 실패 행동을 반복하는 무한 루프(Looping), 2) 존재하지 않는 도구나 잘못된 JSON 인자를 생성하는 도구 환각, 3) 긴 Observation 축적으로 인한 컨텍스트 창 오염 및 지연 증가가 있습니다.",
    nextDue: "2026-11-19",
  },
  "q-mle-bias-variance-concept": {
    questionId: "q-mle-bias-variance-concept",
    score: 10,
    maxScore: 10,
    verdict: "pass",
    criteria: [],
    deductions: [],
    feedbackKo:
      "개념 카드의 핵심 정의(편향=목표 함수와의 구조적 오차, 분산=훈련 데이터 변동에 따른 민감도)와 고분산 해결 기법(L1/L2 정규화, 드롭아웃/조기 종료, 학습 데이터 증강 및 Bagging)을 모두 확인했습니다. 이어서 아래 **3개의 꼬리질문**에 답하며 심화 개념을 완성하세요.",
    modelAnswerKo:
      "편향(Bias)은 모델 가정이 지나치게 단순해 발생하는 과소적합(Underfitting) 오차이며, 분산(Variance)은 훈련 데이터의 노이즈까지 학습해 데이터셋이 바뀔 때 예측이 크게 흔들리는 과적합(Overfitting) 오차입니다. 고분산 해결을 위해 1) L1/L2 정규화(Weight Decay) 및 Dropout, 2) 더 많은 학습 데이터 확보 및 Data Augmentation, 3) 모델 복잡도 축소 또는 Bagging 앙상블을 적용합니다.",
    nextDue: "2026-11-20",
  },
  "q-rs-attention-mcq": {
    questionId: "q-rs-attention-mcq",
    score: 10,
    maxScore: 10,
    verdict: "pass",
    criteria: [],
    deductions: [],
    feedbackKo:
      "정답입니다! 차원 d_k가 커질 때 내적 값의 분산이 d_k배로 커지면서 Softmax 출력이 0 또는 1로 극단화되어 기울기(Gradient)가 소실되는 현상을 막기 위해 sqrt(d_k)로 스케일링합니다. 이어서 아래 **3개의 꼬리질문**으로 수식 유도, GQA/MQA, FlashAttention까지 답변해보세요.",
    modelAnswerKo:
      "2번: 차원 d_k가 커질수록 내적 값의 분산이 커져 Softmax 함수가 기울기 소실(Vanishing Gradient) 영역으로 포화되는 것을 막기 위해서입니다.",
    nextDue: "2026-11-21",
  },
};

export const QUESTION_LIST = Object.values(MOCK_QUESTIONS);
