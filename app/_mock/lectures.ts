import { MOCK_ATTRIBUTIONS } from "./sources";
import type { LectureView } from "./types";

/**
 * CS329Z Lecture 1 목업 데이터 (CONTRACT v2 기준)
 * - videoId: DGI4vucR71w
 * - durationSec: 4176 (69분 36초)
 * - 모든 slideVisualBullets는 영어 슬라이드 문장을 그대로 옮기지 않고 한국어로 재구성함
 * - 각 SlideStudyUnit에 generatedBy("notebooklm" | "antigravity")를 명시함
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
      slidesTitle: "CS329Z 1강 슬라이드 — 복합 AI 시스템과 에이전트 엔지니어링 기초",
      slidesUrl: "https://cs329z.stanford.edu/",
      deckPageCount: 58,
      notebookLmUrl: "https://notebooklm.google.com/",
      readingLinks: [
        {
          title: "[필독 자료 1] 단일 모델에서 복합 AI 시스템으로의 전환 (BAIR 블로그)",
          url: "https://bair.berkeley.edu/blog/2024/02/18/compound-ai-systems/",
        },
        {
          title: "[필독 자료 2] ReAct: 언어 모델에서 추론과 행동의 결합 (ICLR 2023)",
          url: "https://arxiv.org/abs/2210.03629",
        },
      ],
    },
    segments: [
      {
        id: "cs329z-2026au-l01-s01",
        startSec: 0,
        endSec: 460,
        title: "구간 1: 강의 소개, 커리큘럼 구성 및 에이전트 정의",
        summaryKo:
          "강의 운영 방식과 평가 비중을 안내하고, 정적인 단일 프롬프트 호출에서 다단계 자율 에이전트 시스템으로 발전하게 된 배경을 다루는 구간입니다.",
        slideRange: "Slides 1–11",
        slideKeyPointsPlaceholder: [
          "CS329Z 학기 로드맵과 실습 중심 프로젝트 평가 구조",
          "단일 턴 질의응답 모델과 환경 상호작용형 에이전트의 구조적 차이",
          "에이전트 시스템을 지탱하는 3대 핵심 축: 추론·계획, 도구 활용, 기억 계층",
        ],
        slideUnits: [
          {
            slideId: "s01-u1",
            slideNumberLabel: "Slides 01–04",
            slideTitle: "CS329Z 커리큘럼 로드맵 & 왜 지금 에이전트인가?",
            timestampSec: 0,
            slideVisualBullets: [
              "수업 목표: 신뢰할 수 있고 자율적으로 과업을 완수하는 복합 AI 시스템 구축",
              "패러다임 전환: 일회성 정적 프롬프트 응답에서 다단계 에이전트 워크플로로의 진화",
              "핵심 설계 기둥: 추론 및 계획(Planning), 외부 도구 실행(Tool Use), 메모리 관리, 평가 및 안전성",
            ],
            explanationArticleMd:
              "**[슬라이드 01–04 해설 글]** 기존 대형 언어 모델 활용이 '질문 1회 입력 후 답변 1회 출력'에 머물렀다면, CS329Z가 다루는 에이전트 엔지니어링은 모델이 스스로 상위 목표를 하위 과업으로 분해하고 외부 도구를 호출해 환경을 변화시키며, 그 실행 결과를 다시 관측해 다음 행동을 결정하는 폐루프 시스템을 설계하는 방법을 다룹니다.",
            keyTakeawayKo:
              "에이전트 엔지니어링의 핵심은 단일 모델의 암기량이 아니라 추론·행동·관측이 순환하는 시스템 루프 설계에 있습니다.",
            notebookLmPrompt:
              "CS329Z 1강 슬라이드 1~4쪽을 바탕으로, 정적 언어 모델 파이프라인과 자율 에이전트 시스템의 구조적 차이점 3가지를 한국어로 비교해줘.",
            generatedBy: "notebooklm",
          },
          {
            slideId: "s01-u2",
            slideNumberLabel: "Slides 05–08",
            slideTitle: "자율성 스펙트럼: 결정론적 워크플로와 자율 에이전트 구분",
            timestampSec: 180,
            slideVisualBullets: [
              "0단계(단순 모델 호출): 외부 도구 없이 고정된 프롬프트만으로 텍스트를 생성하는 구조",
              "1단계(결정론적 워크플로): 사람이 작성한 코드가 분기와 제어 흐름을 고정적으로 관리하는 구조",
              "2단계(자율 에이전트): 언어 모델이 관측 결과에 따라 실행 경로와 도구 호출 순서를 동적으로 결정하는 구조",
            ],
            explanationArticleMd:
              "**[슬라이드 05–08 해설 글]** 모든 문제에 완전 자율 에이전트를 도입하는 것은 비용과 지연 시간을 낭비하는 오설계가 될 수 있습니다. 슬라이드에서 강조하듯 절차와 분기가 명확한 과업은 코드가 제어권을 쥐는 결정론적 워크플로로 구현하고, 실행 단계를 사전에 예측할 수 없는 개방형 문제에서만 모델이 제어 흐름을 결정하도록 설계해야 합니다.",
            keyTakeawayKo:
              "과업의 불확실성 수준에 맞춰 코드 기반 워크플로와 모델 주도형 에이전트 루프를 적절히 선택해야 합니다.",
            notebookLmPrompt:
              "슬라이드 5~8쪽의 자율성 단계 기준을 참고할 때, 실무에서 결정론적 워크플로 대신 자율 에이전트를 도입해야 하는 판단 기준은 무엇인가?",
            generatedBy: "notebooklm",
          },
          {
            slideId: "s01-u3",
            slideNumberLabel: "Slides 09–11",
            slideTitle: "에이전트 아키텍처를 구성하는 3대 핵심 모듈",
            timestampSec: 310,
            slideVisualBullets: [
              "두뇌(추론과 계획): 연쇄 추론(CoT), 행동 결합 추론(ReAct), 자기 성찰(Reflexion) 루프",
              "손발(도구 사용과 행동 공간): 외부 API 호출, 코드 실행 샌드박스, 웹 브라우저 제어",
              "기억(메모리 계층): 단기 작업 문맥(컨텍스트 창)과 장기 일화·의미·절차 기억 저장소",
            ],
            explanationArticleMd:
              "**[슬라이드 09–11 해설 글]** 에이전트 시스템은 크게 세 가지 기능 모듈로 나뉩니다. 첫째, 추론 모듈은 현재 상태를 분석해 다음 행동을 계획하고, 둘째, 도구 모듈은 검색·코드 실행·데이터베이스 조회를 통해 외부 환경과 상호작용하며, 셋째, 기억 모듈은 장시간 이어지는 작업에서 핵심 정보와 과거 시행착오를 보존합니다.",
            keyTakeawayKo:
              "에이전트 장애를 분석할 때는 추론 능력, 도구 인터페이스, 기억 관리 중 어느 계층에서 병목이 생겼는지 분리해 진단해야 합니다.",
            notebookLmPrompt:
              "슬라이드 9~11쪽에 정리된 에이전트 3대 모듈(추론, 도구 활용, 기억)이 하나의 작업 루프 안에서 정보를 주고받는 순서를 설명해줘.",
            generatedBy: "notebooklm",
          },
        ],
        questionIds: ["q-mle-bias-variance-concept"],
      },
      {
        id: "cs329z-2026au-l01-s02",
        startSec: 460,
        endSec: 1699,
        title: "구간 2: 에이전트 발전사 및 내부 해부도",
        summaryKo:
          "초기 기호주의 에이전트부터 ReAct·AutoGPT 열풍까지의 흐름을 짚어보고, 계획기·실행기·검증기로 나뉘는 에이전트 내부 구조를 살펴보는 구간입니다.",
        slideRange: "Slides 12–24",
        slideKeyPointsPlaceholder: [
          "복합 AI 시스템(Compound AI Systems) 구성 요소와 단일 모델 대비 이점",
          "계획(Planner) · 실행(Executor) · 검증(Verifier) 역할 분리 설계",
          "모델 크기 확장과 시스템 엔지니어링 결합 시의 비용·성능 균형",
        ],
        slideUnits: [
          {
            slideId: "s02-u1",
            slideNumberLabel: "Slides 12–18",
            slideTitle: "복합 AI 시스템: 단일 거대 모델을 넘어선 시스템적 결합",
            timestampSec: 460,
            slideVisualBullets: [
              "단일 모델 확장의 한계: 파라미터 크기만 키우는 방식은 추론 비용과 지연 시간 장벽에 직면함",
              "복합 구성 요소: 라우터, 검색기, 생성 모델, 코드 실행기, 검증기를 유기적으로 연결",
              "시스템 수준 정확도: 검증과 재시도 루프를 결합한 소형 모델 조합이 단일 대형 모델을 능가함",
            ],
            explanationArticleMd:
              "**[슬라이드 12–18 해설 글]** 거대 언어 모델 하나에 모든 계산과 지식 인출을 맡기는 대신, 목적에 맞는 모델과 외부 검색기·코드 인터프리터·검증기를 조합한 복합 AI 시스템이 실무 표준으로 자리 잡았습니다. 각 단계의 입출력을 검증할 수 있어 신뢰성과 비용 효율을 동시에 확보할 수 있습니다.",
            keyTakeawayKo:
              "최고의 에이전트 성능은 단일 모델 가중치 크기뿐 아니라 검색·실행·검증을 엮는 시스템 설계에서 나옵니다.",
            notebookLmPrompt:
              "슬라이드 12~18쪽과 필독 자료 1(복합 AI 시스템)을 종합하여, 단일 거대 모델 대비 복합 시스템이 가지는 엔지니어링 이점을 정리해줘.",
            generatedBy: "notebooklm",
          },
          {
            slideId: "s02-u2",
            slideNumberLabel: "Slides 19–24",
            slideTitle: "계획기 · 실행기 · 검증기 3단 역할 분리 패턴",
            timestampSec: 1325,
            slideVisualBullets: [
              "계획기(Planner): 상위 목표를 실행 가능한 하위 작업 그래프나 순차 단계로 분해",
              "실행기(Executor): 격리된 문맥 안에서 지정된 도구를 호출해 개별 하위 과업을 수행",
              "검증기(Verifier): 최종 반영 전에 루브릭과 제약 조건을 기준으로 산출물 무결성을 판정",
            ],
            explanationArticleMd:
              "**[슬라이드 19–24 해설 글]** 하나의 모델 프롬프트가 계획과 실행, 자기 검증을 한꺼번에 처리하면 자신이 만든 오류를 스스로 합리화하는 확증 편향이 발생합니다. 따라서 계획 수립, 도구 실행, 결과 검수를 독립된 단계나 서로 다른 모델 계열로 분리하면 오류 전파를 조기에 차단할 수 있습니다.",
            keyTakeawayKo:
              "생성 단계와 검증 단계를 분리하면 에이전트의 환각과 연쇄 오류를 효과적으로 억제할 수 있습니다.",
            notebookLmPrompt:
              "슬라이드 19~24쪽의 계획-실행-검증 분리 구조에서 검증기(Verifier)를 생성 모델과 분리해야 하는 이유를 설명해줘.",
            generatedBy: "notebooklm",
          },
        ],
        questionIds: ["q-mle-bias-variance-concept"],
      },
      {
        id: "cs329z-2026au-l01-s03",
        startSec: 1699,
        endSec: 2592,
        title: "구간 3: 추론 루프(CoT, ReAct, Reflexion)와 다중 에이전트",
        summaryKo:
          "연쇄 추론(CoT)과 행동 결합 추론(ReAct)의 차이를 비교하고, 자기 성찰(Reflexion) 및 다중 에이전트 토론 구조를 학습하는 구간입니다.",
        slideRange: "Slides 25–38",
        slideKeyPointsPlaceholder: [
          "연쇄 추론(CoT)의 개방 루프 한계와 ReAct 폐루프 추론 구조 비교",
          "외부 도구 호출 스키마 정의와 관측 결과(Observation) 문맥 주입",
          "무한 반복 루프 및 도구 인자 환각 사례와 런타임 방어 기법",
        ],
        slideUnits: [
          {
            slideId: "s03-u1",
            slideNumberLabel: "Slides 25–31",
            slideTitle: "연쇄 추론(CoT)의 한계와 ReAct 루프의 결합 원리",
            timestampSec: 1699,
            slideVisualBullets: [
              "연쇄 추론(CoT)의 한계: 외부 세계의 피드백 없이 내부 지식만으로 추론해 초기 환각이 끝까지 증폭됨",
              "ReAct 순환 구조: 사고(Thought) → 행동(Action) → 관측(Observation)을 번갈아 수행하며 궤적 수정",
              "외부 근거 접지: 검색 결과나 계산기 출력을 다음 사고 단계의 입력으로 삼아 사실성을 확보",
            ],
            explanationArticleMd:
              "**[슬라이드 25–31 해설 글]** 순수 연쇄 추론(CoT)은 외부 환경과 단절된 채 내부 파라미터 기억에만 의존하므로 중간 단계에서 사실 오류가 생기면 스스로 바로잡기 어렵습니다. 반면 ReAct는 추론 직후 외부 도구를 실행하고 그 관측 결과를 바탕으로 다음 추론을 이어가므로 환각 누적을 방지합니다.",
            keyTakeawayKo:
              "ReAct는 내부 추론 과정을 외부 환경의 실제 관측값에 접지시켜 사실 오류 전파를 차단합니다.",
            notebookLmPrompt:
              "슬라이드 25~31쪽과 ReAct 논문을 바탕으로, 다중 단계 지식 검색 문제에서 단순 CoT가 실패하고 ReAct가 성공하는 이유를 설명해줘.",
            generatedBy: "notebooklm",
          },
          {
            slideId: "s03-u2",
            slideNumberLabel: "Slides 32–38",
            slideTitle: "ReAct의 프로덕션 실패 모드와 런타임 방어 전략",
            timestampSec: 2212,
            slideVisualBullets: [
              "실패 모드 1(무한 반복 루프): 동일한 도구와 동일한 인자를 끝없이 재호출하며 토큰을 소진함",
              "실패 모드 2(도구 인자 환각): 정의되지 않은 도구 이름이나 스키마에 맞지 않는 인자를 생성함",
              "방어 기법: 호출 시그니처 해시 중복 차단, 최대 스텝 제한(max_steps), 자기 성찰(Reflexion) 피드백 주입",
            ],
            explanationArticleMd:
              "**[슬라이드 32–38 해설 글]** 실무 환경에서 에이전트를 운영할 때 가장 빈번한 장애는 동일한 실패 행동을 반복하는 무한 루프와 잘못된 도구 인자 생성입니다. 이를 제어하기 위해 런타임 오케스트레이터는 직전 호출 해시를 비교해 중복을 막고, 최대 실행 횟수 제한과 스키마 검증 오류 메시지를 관측값으로 되돌려주어야 합니다.",
            keyTakeawayKo:
              "프로덕션 에이전트는 프롬프트에만 의존하지 않고 중복 호출 감지와 스텝 상한선을 코드 수준에서 강제해야 합니다.",
            notebookLmPrompt:
              "슬라이드 32~38쪽에 제시된 ReAct의 주요 실패 모드 2가지와 이를 복구하는 자기 성찰(Reflexion) 메커니즘을 요약해줘.",
            generatedBy: "notebooklm",
          },
        ],
        questionIds: ["q-agent-react-open"],
      },
      {
        id: "cs329z-2026au-l01-s04",
        startSec: 2592,
        endSec: 3665,
        title: "구간 4: 에이전트 메모리 계층, 도구 호출 및 MCP 표준",
        summaryKo:
          "일화·의미·절차 메모리 계층과 Toolformer/Gorilla 등 도구 학습 연구, 그리고 Model Context Protocol(MCP) 표준 인터페이스를 다루는 구간입니다.",
        slideRange: "Slides 39–49",
        slideKeyPointsPlaceholder: [
          "작업 기억(컨텍스트 창) 용량 한계와 중간 정보 손실 현상",
          "일화적(Episodic) · 의미적(Semantic) · 절차적(Procedural) 장기 기억 설계",
          "Model Context Protocol(MCP)을 통한 도구 연결 표준화와 하위 에이전트 문맥 격리",
        ],
        slideUnits: [
          {
            slideId: "s04-u1",
            slideNumberLabel: "Slides 39–49",
            slideTitle: "에이전트 메모리 계층 설계와 MCP 도구 연결 표준",
            timestampSec: 2592,
            slideVisualBullets: [
              "작업 기억(컨텍스트 창): 접근은 빠르지만 대용량 도구 출력이 쌓이면 핵심 주의를 잃기 쉬움",
              "장기 기억 3분류: 과거 실행 궤적(일화 기억), 외부 지식 저장소(의미 기억), 재사용 스킬·코드(절차 기억)",
              "문맥 위생과 표준화: 대용량 탐색은 하위 에이전트에 격리 위임하고, 도구 연동은 MCP 규격으로 단일화",
            ],
            explanationArticleMd:
              "**[슬라이드 39–49 해설 글]** 컨텍스트 창이 커졌더라도 수만 토큰의 원본 로그나 웹 문서를 그대로 누적하면 추론 정확도가 급격히 떨어지고 비용이 폭증합니다. 따라서 하위 탐색은 독립된 서브에이전트에 위임해 요약본만 돌려받고, 외부 도구 연동은 표준 프로토콜(MCP)로 추상화하여 문맥 오염을 최소화해야 합니다.",
            keyTakeawayKo:
              "장기 실행 에이전트의 핵심은 문맥 창에 무엇을 넣을지보다 불필요한 관측값을 어떻게 격리·압축할지에 달려 있습니다.",
            notebookLmPrompt:
              "슬라이드 39~49쪽의 에이전트 메모리 3가지 유형(일화, 의미, 절차)을 각각 실제 소프트웨어 에이전트 구현 예시와 연결해 설명해줘.",
            generatedBy: "notebooklm",
          },
        ],
        questionIds: ["q-rs-attention-mcq"],
      },
      {
        id: "cs329z-2026au-l01-s05",
        startSec: 3665,
        endSec: 4176,
        title: "구간 5: 핵심 난제 — 신뢰성, 안전성 및 프라이버시",
        summaryKo:
          "실제 환경에 배포된 에이전트의 궤적 평가 기준과 부작용 통제, 보안 및 프라이버시 보호 원칙을 정리하는 마지막 구간입니다.",
        slideRange: "Slides 50–58",
        slideKeyPointsPlaceholder: [
          "최종 결과 정답률과 중간 실행 궤적(Trajectory) 루브릭 평가 비교",
          "비가역적 상태 변경 도구에 대한 정책 훅과 사용자 승인 게이트",
          "프롬프트 인젝션 방어 및 최소 권한 샌드박스 운영 원칙",
        ],
        slideUnits: [
          {
            slideId: "s05-u1",
            slideNumberLabel: "Slides 50–58",
            slideTitle: "에이전트 궤적 평가와 비가역적 행동 안전 가드레일",
            timestampSec: 3665,
            slideVisualBullets: [
              "입체적 평가: 최종 성공 여부뿐 아니라 도구 호출 횟수, 비용, 중간 추론 궤적의 타당성을 함께 채점",
              "부작용 통제: 읽기 전용 샌드박스를 기본으로 두고 삭제·결제·외부 전송은 사전 정책 검증을 강제",
              "보안 위협 방어: 외부 웹·문서에서 유입되는 간접 프롬프트 인젝션 차단 및 최소 권한 부여",
            ],
            explanationArticleMd:
              "**[슬라이드 50–58 해설 글]** 에이전트가 우연히 최종 답을 맞혔더라도 위험한 명령을 실행했거나 수십 번의 불필요한 도구 호출을 거쳤다면 프로덕션에 쓸 수 없습니다. 따라서 중간 실행 궤적 전체를 루브릭으로 평가해야 하며, 상태를 바꾸는 비가역적 작업 앞에는 반드시 결정론적 정책 검사와 사람 승인 단계를 두어야 합니다.",
            keyTakeawayKo:
              "신뢰할 수 있는 에이전트는 최종 결과 평가와 중간 궤적 안전성 검증, 그리고 최소 권한 가드레일이 결합되어야 완성됩니다.",
            notebookLmPrompt:
              "슬라이드 50~58쪽에서 강조하는 에이전트 궤적 평가 방법과 간접 프롬프트 인젝션 방어 원칙을 요약해줘.",
            generatedBy: "notebooklm",
          },
        ],
        questionIds: ["q-agent-react-open"],
      },
    ],
    attribution: MOCK_ATTRIBUTIONS["src-stanford-cs329z"],
  },
};
