import { MOCK_ATTRIBUTIONS } from "./sources";
import type { LectureView } from "./types";

/**
 * CS329Z Lecture 1 목업 데이터
 * - videoId: DGI4vucR71w
 * - durationSec: 4176 (69분 36초)
 * - 사용자 지침 준수:
 *   1) 전체 요약(summaryMd)은 하지 않고 Syllabus에 나온 Slides와 함께 공부할 수 있는 구조
 *   2) 영상을 안 보더라도 슬라이드를 잘게 쪼개어 하나씩 넘기며 [슬라이드 도식 + NotebookLM 기반 해설 글]로 완독 가능
 *   3) NotebookLM 소스 번들 및 슬라이드별 심화 프롬프트 연동 지원
 */
export const MOCK_LECTURES: Record<string, LectureView> = {
  "cs329z-lec01": {
    id: "cs329z-lec01",
    course: "CS329Z",
    term: "Autumn 2026",
    title: "Lecture 1: Introduction to Engineering AI Agents",
    videoId: "DGI4vucR71w",
    durationSec: 4176,
    syllabus: {
      lectureNo: 1,
      date: "2026-11-09",
      instructor: "Diyi Yang, Michael Ryan, John Yang",
      syllabusUrl: "https://cs329z.stanford.edu/",
      slidesTitle: "CS329Z Lecture 1 Slides — Compound AI Systems & Agentic Foundations (PDF)",
      slidesUrl: "https://cs329z.stanford.edu/",
      deckPageCount: 58,
      notebookLmUrl: "https://notebooklm.google.com/",
      readingLinks: [
        {
          title: "[Syllabus Reading 1] The Shift from Models to Compound AI Systems (BAIR)",
          url: "https://bair.berkeley.edu/blog/2024/02/18/compound-ai-systems/",
        },
        {
          title: "[Syllabus Reading 2] ReAct: Synergizing Reasoning and Acting in Language Models",
          url: "https://arxiv.org/abs/2210.03629",
        },
      ],
    },
    segments: [
      {
        id: "cs329z-l01-s01",
        startSec: 0,
        endSec: 420,
        title: "Segment 1: Course Logistics & Why AI Agents Now",
        summaryKo:
          "[세그먼트 1 자리표시자] Syllabus 개요 및 단일 LLM 호출에서 자율 에이전트 시스템으로의 전환 배경을 슬라이드와 해설 글로 확인하는 구간입니다.",
        slideRange: "Slides 1–11",
        slideKeyPointsPlaceholder: [
          "[Slide 01–04 자리표시자] CS329Z 커리큘럼 로드맵 및 평가 기준",
          "[Slide 05–08 자리표시자] 정적 프롬프트 모델 vs 환경과 상호작용하는 에이전트 정의",
          "[Slide 09–11 자리표시자] 에이전트 엔지니어링의 3대 축: Reasoning, Tool Use, Memory",
        ],
        slideUnits: [
          {
            slideId: "s01-u1",
            slideNumberLabel: "Slides 01–04",
            slideTitle: "CS329Z 커리큘럼 로드맵 & 왜 지금 에이전트인가?",
            timestampSec: 0,
            slideVisualBullets: [
              "Course Goal: Building reliable, autonomous Compound AI Systems",
              "Shift: Static Single-Turn Prompting → Multi-Step Agentic Workflows",
              "Key Pillars: Planning & Reasoning, Tool Use, Memory, Evaluation & Safety",
            ],
            explanationArticleMd:
              "**[슬라이드 01–04 해설 글]** 기존 LLM 활용이 '질문 1회 입력 → 답변 1회 출력(Zero-shot/Few-shot)'에 머물렀다면, CS329Z가 다루는 **Agent Engineering**은 모델이 스스로 목표를 하위 작업으로 쪼개고(Planning), 외부 도구를 실행해 환경을 바꾸며(Act), 그 결과를 관측(Observe)해 궤적을 수정하는 루프를 설계하는 학문입니다.",
            keyTakeawayKo:
              "에이전트 엔지니어링의 핵심은 단일 모델의 가중치 암기력이 아니라 '추론-행동-관측 루프'의 시스템 설계에 있습니다.",
            notebookLmPrompt:
              "CS329Z Lecture 1 슬라이드 1~4p를 바탕으로, 정적 LLM 파이프라인과 자율 AI 에이전트 시스템의 결정적인 차이점 3가지를 비교해줘.",
          },
          {
            slideId: "s01-u2",
            slideNumberLabel: "Slides 05–08",
            slideTitle: "자율성 스펙트럼 (Autonomy Spectrum: Workflow vs Agent)",
            timestampSec: 180,
            slideVisualBullets: [
              "Level 0: Pure LLM Call (No tools, fixed prompt)",
              "Level 1: Deterministic Workflow (Code controls the control flow)",
              "Level 2: Autonomous Agent (LLM dynamically decides control flow & tool calls)",
            ],
            explanationArticleMd:
              "**[슬라이드 05–08 해설 글]** 모든 문제에 완전 자율 에이전트(Level 2)를 쓰는 것은 오히려 지능적인 오설계입니다. 슬라이드 도식이 강조하듯, **제어 흐름(Control Flow)이 고정된 작업은 결정론적 코드 워크플로(Level 1)**로 짜고, 실행 경로를 사전에 알 수 없는 개방형 문제에서만 LLM이 다음 행동을 결정하는 에이전트 루프를 써야 비용과 오류율을 통제할 수 있습니다.",
            keyTakeawayKo:
              "코드가 제어 흐름을 쥐는 '워크플로'와 모델이 제어 흐름을 결정하는 '에이전트'를 문제 불확실성에 따라 구분해야 합니다.",
            notebookLmPrompt:
              "슬라이드 5~8p의 Autonomy Spectrum에서 결정론적 워크플로(Level 1) 대신 자율 에이전트(Level 2)를 선택해야 하는 구체적인 기준은 무엇인가?",
          },
          {
            slideId: "s01-u3",
            slideNumberLabel: "Slides 09–11",
            slideTitle: "에이전트 엔지니어링의 3대 핵심 축",
            timestampSec: 310,
            slideVisualBullets: [
              "1. Brain (Reasoning & Planning): CoT, ReAct, Tree-of-Thoughts",
              "2. Hands (Tool Use & Action Space): APIs, Code Interpreter, Web Browser",
              "3. Memory (Short-term Context & Long-term Episodic/Semantic Store)",
            ],
            explanationArticleMd:
              "**[슬라이드 09–11 해설 글]** 에이전트 아키텍처는 크게 세 가지 모듈로 분해됩니다. ① **Reasoning(두뇌)**은 현재 상태에서 어떤 행동이 필요한지 계획하고, ② **Tool Use(손발)**는 외부 검색·코드 실행·DB 조회를 통해 모델 외부 세계와 상호작용하며, ③ **Memory(기억)**는 긴 작업 동안 축적된 경험과 컨텍스트를 유실 없이 관리합니다.",
            keyTakeawayKo:
              "에이전트 실패를 디버깅할 때는 추론(Brain), 도구 인터페이스(Hands), 컨텍스트/메모리(Memory) 중 어느 층의 병목인지 분리해야 합니다.",
            notebookLmPrompt:
              "슬라이드 9~11p에 제시된 에이전트 3대 구성요소(Reasoning, Tool Use, Memory)가 서로 데이터를 주고받는 인터페이스를 설명해줘.",
          },
        ],
        questionIds: ["q-mle-bias-variance-concept"],
      },
      {
        id: "cs329z-l01-s02",
        startSec: 420,
        endSec: 1260,
        title: "Segment 2: Anatomy of an AI Agent & Compound Systems",
        summaryKo:
          "[세그먼트 2 자리표시자] 에이전트 아키텍처 다이어그램 슬라이드(Planner, Executor, Verifier)를 해설 글과 대조하며 학습하는 구간입니다.",
        slideRange: "Slides 12–24",
        slideKeyPointsPlaceholder: [
          "[Slide 12–16 자리표시자] Compound AI System 구성 요소 다이어그램",
          "[Slide 17–20 자리표시자] 계획(Planning) 및 작업 분해(Task Decomposition) 패턴",
          "[Slide 21–24 자리표시자] 모델 크기 확장 vs 시스템 엔지니어링 트레이드오프",
        ],
        slideUnits: [
          {
            slideId: "s02-u1",
            slideNumberLabel: "Slides 12–18",
            slideTitle: "Compound AI Systems: 단일 모델을 넘어선 시스템 설계",
            timestampSec: 420,
            slideVisualBullets: [
              "Why Compound Systems? Scaling model parameters alone hits cost/latency walls",
              "Components: Router + Retriever + Generator + Verifier/Critic",
              "System-level accuracy > Monolithic model accuracy on complex benchmarks",
            ],
            explanationArticleMd:
              "**[슬라이드 12–18 해설 글]** BAIR(Berkeley AI Research) 아티클과 연결되는 핵심 슬라이드입니다. 거대 모델 하나에 모든 추론을 맡기는 것보다, **작고 빠른 모델 여러 개를 검색기(Retriever), 코드 실행기, 검증기(Verifier)와 결합한 복합 AI 시스템(Compound AI System)**이 정밀도와 비용 효율 면에서 압도적으로 유리함을 보여줍니다.",
            keyTakeawayKo:
              "성능 향상은 모델 파라미터 크기뿐 아니라 Retriever·Verifier를 결합한 시스템 토폴로지 설계에서 나옵니다.",
            notebookLmPrompt:
              "슬라이드 12~18p와 필독 자료 1(BAIR Compound AI Systems)을 종합하여, 단일 거대 모델 대비 Compound AI System이 가지는 엔지니어링 이점을 설명해줘.",
          },
          {
            slideId: "s02-u2",
            slideNumberLabel: "Slides 19–24",
            slideTitle: "Planner – Executor – Verifier 3단 분리 패턴",
            timestampSec: 840,
            slideVisualBullets: [
              "Planner: Decomposes high-level goal into DAG / Sub-tasks",
              "Executor: Invokes specialized tools with scoped context",
              "Verifier (Critic): Checks output against rubric/constraints before final commit",
            ],
            explanationArticleMd:
              "**[슬라이드 19–24 해설 글]** 복잡한 코딩이나 리서치 작업에서 하나의 프롬프트가 계획과 실행, 검증을 동시에 수행하면 자기 확증 편향(Self-confirmation bias)에 빠집니다. 슬라이드 19–24는 **계획 수립(Planner) → 도구 실행(Executor) → 결과 검수(Verifier)**를 별도 역할(또는 서로 다른 모델 계열)로 분리하는 아키텍처를 제시합니다.",
            keyTakeawayKo:
              "생성자(Executor)와 검증자(Verifier)를 분리하면 환각과 오류 전파를 조기에 차단할 수 있습니다.",
            notebookLmPrompt:
              "슬라이드 19~24p의 Planner-Executor-Verifier 구조에서 Verifier가 생성 모델과 다른 기준(또는 다른 모델)을 써야 하는 이유는 무엇인가?",
          },
        ],
        questionIds: ["q-mle-bias-variance-concept"],
      },
      {
        id: "cs329z-l01-s03",
        startSec: 1260,
        endSec: 2190,
        title: "Segment 3: Reasoning Loops (CoT, ReAct, Reflexion)",
        summaryKo:
          "[세그먼트 3 자리표시자] ReAct(Reason + Act) 프롬프트 트레이스 슬라이드와 실패 모드 사례를 해설 글로 따라가는 구간입니다.",
        slideRange: "Slides 25–38",
        slideKeyPointsPlaceholder: [
          "[Slide 25–29 자리표시자] Chain-of-Thought(CoT) vs ReAct 루프 수식 및 트레이스 비교",
          "[Slide 30–34 자리표시자] 외부 도구 호출(Tool Calling) JSON 스키마 및 Observation 주입",
          "[Slide 35–38 자리표시자] 무한 루프(Looping) 및 도구 인자 환각 사례 분석",
        ],
        slideUnits: [
          {
            slideId: "s03-u1",
            slideNumberLabel: "Slides 25–31",
            slideTitle: "Chain-of-Thought(CoT)의 한계와 ReAct 루프의 탄생",
            timestampSec: 1260,
            slideVisualBullets: [
              "CoT Limitation: Open-loop reasoning (No external feedback → Hallucination propagation)",
              "ReAct Loop: Thought_t → Action_t → Observation_t → Thought_{t+1}",
              "Grounding reasoning traces in real-time external observations",
            ],
            explanationArticleMd:
              "**[슬라이드 25–31 해설 글]** 순수 Chain-of-Thought(CoT)는 모델 내부 가중치에만 의존하는 '개방 루프(Open-loop)' 추론이므로, 중간 스텝에서 사실 오류가 한 번 발생하면 끝까지 잘못된 결론으로 폭주합니다. 반면 **ReAct(Reason + Act)**는 추론(`Thought`) 직후 외부 도구를 실행(`Action`)하고 그 실제 결과(`Observation`)를 받아 다음 추론을 교정하는 **폐루프(Closed-loop)** 제어 구조입니다.",
            keyTakeawayKo:
              "ReAct는 내부 추론(Thought)을 외부 환경 관측(Observation)에 접지(Grounding)시켜 환각 누적을 막습니다.",
            notebookLmPrompt:
              "슬라이드 25~31p와 ReAct 논문을 바탕으로, HotpotQA 같은 다중 홉 추론에서 CoT가 실패하고 ReAct가 성공하는 구체적인 트레이스 예시를 설명해줘.",
          },
          {
            slideId: "s03-u2",
            slideNumberLabel: "Slides 32–38",
            slideTitle: "ReAct의 프로덕션 실패 모드와 방어 기법",
            timestampSec: 1740,
            slideVisualBullets: [
              "Failure Mode 1: Repetitive Action Looping (Calling same tool with same args)",
              "Failure Mode 2: Tool Schema / Argument Hallucination",
              "Mitigation: Action signature deduplication, max_steps cap, Reflexion self-critique",
            ],
            explanationArticleMd:
              "**[슬라이드 32–38 해설 글]** ReAct를 실무에 배포할 때 가장 흔히 겪는 장애는 **무한 루프(동일한 검색어나 인자로 도구를 계속 호출)**와 **도구 인자 환각(존재하지 않는 파라미터 생성)**입니다. 이를 막기 위해 오케스트레이터는 직전 호출 해시를 비교해 중복 호출 시 경고 Observation을 주입하고, `max_steps` 하드 캡과 스키마 검증기를 반드시 두어야 합니다.",
            keyTakeawayKo:
              "프로덕션 에이전트는 프롬프트 지시만 믿지 않고, 중복 호출 해시 감지와 max_steps 제한을 런타임 코드로 강제해야 합니다.",
            notebookLmPrompt:
              "슬라이드 32~38p에 나오는 ReAct의 실패 모드 2가지와, 이를 해결하기 위한 Reflexion 패턴의 작동 방식을 요약해줘.",
          },
        ],
        questionIds: ["q-agent-react-open"],
      },
      {
        id: "cs329z-l01-s04",
        startSec: 2190,
        endSec: 3240,
        title: "Segment 4: Memory Hierarchy & Context Engineering",
        summaryKo:
          "[세그먼트 4 자리표시자] 단기 컨텍스트 윈도우와 장기 외부 메모리(Episodic / Semantic) 슬라이드 도식을 해설 글과 함께 공부하는 구간입니다.",
        slideRange: "Slides 39–49",
        slideKeyPointsPlaceholder: [
          "[Slide 39–42 자리표시자] Working Memory(컨텍스트 창) 대역폭과 Attention 병목",
          "[Slide 43–46 자리표시자] Episodic / Procedural / Semantic Memory 계층 설계",
          "[Slide 47–49 자리표시자] 컨텍스트 압축 및 Subagent 격리 패턴",
        ],
        slideUnits: [
          {
            slideId: "s04-u1",
            slideNumberLabel: "Slides 39–49",
            slideTitle: "OS 가상 메모리를 닮은 에이전트 메모리 계층과 컨텍스트 격리",
            timestampSec: 2190,
            slideVisualBullets: [
              "Working Memory (Context Window): Fast but capacity-limited & prone to 'Lost in the Middle'",
              "Long-Term Memory: Episodic (past trajectories), Semantic (facts/RAG), Procedural (skills/code)",
              "Context Hygiene: Subagent delegation & Observation summarization",
            ],
            explanationArticleMd:
              "**[슬라이드 39–49 해설 글]** 컨텍스트 윈도우가 1M 토큰으로 넓어져도 모든 도구 출력(수만 줄의 로그나 웹 HTML)을 그대로 쌓으면 Attention 분산과 비용 폭증이 발생합니다. 따라서 **하위 탐색 작업은 격리된 Subagent에게 위임**해 요약 결과만 메인 컨텍스트로 돌려받고, 과거 성공 궤적은 Episodic Memory에 별도 색인하는 컨텍스트 엔지니어링이 필수적입니다.",
            keyTakeawayKo:
              "긴 에이전트 작업의 성패는 컨텍스트 창에 '무엇을 넣을지'보다 '무엇을 격리·압축해 뺄지'에서 갈립니다.",
            notebookLmPrompt:
              "슬라이드 39~49p의 에이전트 메모리 계층(Working, Episodic, Semantic, Procedural)을 운영체제(OS) 메모리 계층과 비유해서 설명해줘.",
          },
        ],
        questionIds: ["q-rs-attention-mcq"],
      },
      {
        id: "cs329z-l01-s05",
        startSec: 3240,
        endSec: 4176,
        title: "Segment 5: Evaluation Benchmarks, Safety & Course Project",
        summaryKo:
          "[세그먼트 5 자리표시자] 에이전트 벤치마크(SWE-bench, WebArena, GAIA) 슬라이드 표와 안전 가드레일 설계 원칙을 점검하는 구간입니다.",
        slideRange: "Slides 50–58",
        slideKeyPointsPlaceholder: [
          "[Slide 50–53 자리표시자] End-to-End 성공률 vs 스텝별 루브릭 평가(Trajectory Eval)",
          "[Slide 54–56 자리표시자] 부작용(Side-effect) 통제 및 Human-in-the-loop 가드레일",
          "[Slide 57–58 자리표시자] 학기 프로젝트 안내 및 다음 강의 예고",
        ],
        slideUnits: [
          {
            slideId: "s05-u1",
            slideNumberLabel: "Slides 50–58",
            slideTitle: "에이전트 궤적 평가(Trajectory Eval)와 부작용 안전장치",
            timestampSec: 3240,
            slideVisualBullets: [
              "Benchmarks: SWE-bench (Coding), WebArena (Browser), GAIA (General Assistant)",
              "Evaluation: Final outcome pass/fail is not enough → Step-by-step rubric & cost tracking",
              "Safety: Read-only sandbox by default, Human-in-the-loop gate for irreversible actions",
            ],
            explanationArticleMd:
              "**[슬라이드 50–58 해설 글]** 에이전트가 최종 답만 맞혔다고 좋은 시스템이 아닙니다. 위험한 명령을 실행했거나 불필요하게 도구를 50번 호출해 성공했을 수 있기 때문에 **중간 궤적(Trajectory) 전체를 루브릭으로 채점**해야 합니다. 또한 파일 삭제·결제·외부 메일 발송 같은 비가역적 행동 앞에는 반드시 결정론적 Policy Hook과 사용자 승인(Human-in-the-loop) 게이트를 두어야 합니다.",
            keyTakeawayKo:
              "에이전트 평가는 최종 정답률(Outcome)과 중간 궤적 효율/안전성(Trajectory)을 함께 측정해야 합니다.",
            notebookLmPrompt:
              "슬라이드 50~58p에서 강조하는 에이전트 평가 지표(Outcome vs Trajectory)와 비가역적 도구 호출 시 안전 가드레일 설계 원칙을 정리해줘.",
          },
        ],
        questionIds: ["q-agent-react-open"],
      },
    ],
    attribution: MOCK_ATTRIBUTIONS["src-stanford-cs329z"],
  },
};
