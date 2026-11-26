//! The deterministic half of the open-answer grader (`docs/GRADER.md` §2–§3).
//!
//! The model only judges criteria (D2). This module turns that judgment into a score:
//! it checks evidence against the answer (D3), clamps, sums, applies deductions, picks the
//! verdict, applies the `mustHave` cap, decides whether to escalate to the stronger model,
//! and suggests an FSRS rating. No model call happens here.
//!
//! Not here yet (GRADER.md §6 order): the model call, the result cache (D6), and
//! `POST /api/attempts`. Follow-up grading reuses this engine once follow-ups have rubrics
//! of the same shape (GRADER.md intro); until then it is not defined.

use std::collections::HashSet;

use serde::{Deserialize, Serialize};

use crate::content::model::Rubric;

/// Verdict thresholds in GRADER.md §3 are written for 10-point rubrics.
pub const SCALE: i64 = 10;

/// What the model returns (GRADER.md §3 "모델 출력 스키마").
#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Judgment {
    pub criteria: Vec<CriterionJudgment>,
    #[serde(default)]
    pub deductions_hit: Vec<String>,
    #[serde(default)]
    pub must_have_covered: Vec<MustHaveJudgment>,
    pub feedback_ko: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct CriterionJudgment {
    pub id: String,
    pub awarded: i64,
    pub evidence: String,
    #[serde(default)]
    pub uncertain: bool,
}

#[derive(Debug, Clone, Deserialize)]
pub struct MustHaveJudgment {
    pub term: String,
    pub covered: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum Verdict {
    Pass,
    Partial,
    Fail,
}

/// FSRS rating (CONTRACT §4 `POST /api/review/:questionId`).
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
pub enum Rating {
    Again = 1,
    Hard = 2,
    Good = 3,
    Easy = 4,
}

/// CONTRACT §4 `GradeResult.criteria[]`.
#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub struct CriterionResult {
    pub id: String,
    pub desc: String,
    pub awarded: i64,
    pub points: i64,
    pub evidence: String,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub struct DeductionResult {
    pub desc: String,
    pub points: i64,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Graded {
    pub score: i64,
    pub max_score: i64,
    pub verdict: Verdict,
    pub criteria: Vec<CriterionResult>,
    pub deductions: Vec<DeductionResult>,
    /// Criteria whose evidence was not found in the answer (forced to 0).
    pub evidence_failures: usize,
    /// Parts of the judgment that do not fit the rubric: unknown or repeated criterion ids,
    /// missing criteria, unknown deductions.
    pub schema_violations: usize,
    pub any_uncertain: bool,
    pub must_have_missing: Vec<String>,
}

#[derive(Debug, thiserror::Error, PartialEq, Eq)]
pub enum GradeError {
    #[error("rubric totals {0} points; the verdict thresholds are defined for {SCALE}")]
    UnsupportedScale(i64),
}

/// Lowercase and drop whitespace and punctuation, so evidence matches the answer
/// regardless of spacing or punctuation (D3: "공백·문장부호만 정규화").
fn normalize(s: &str) -> String {
    s.chars()
        .filter(|c| !c.is_whitespace() && !is_punctuation(*c))
        .flat_map(char::to_lowercase)
        .collect()
}

fn is_punctuation(c: char) -> bool {
    c.is_ascii_punctuation()
        || matches!(
            c,
            '\u{2010}'..='\u{2027}' | '\u{3001}'..='\u{3003}' | '\u{3008}'..='\u{3011}' | '\u{FF01}'..='\u{FF0F}' | '·'
        )
}

/// D3: evidence must be a verbatim span of the answer. Empty evidence never counts.
#[must_use]
pub fn evidence_in_answer(evidence: &str, answer: &str) -> bool {
    let e = normalize(evidence);
    !e.is_empty() && normalize(answer).contains(&e)
}

/// GRADER.md §3 score rules.
pub fn grade(rubric: &Rubric, answer: &str, j: &Judgment) -> Result<Graded, GradeError> {
    let max_score: i64 = rubric.criteria.iter().map(|c| i64::from(c.points)).sum();
    if max_score != SCALE {
        return Err(GradeError::UnsupportedScale(max_score));
    }
    let mut schema_violations = 0;
    let mut evidence_failures = 0;
    let mut seen = HashSet::new();
    for c in &j.criteria {
        if !seen.insert(c.id.as_str()) || !rubric.criteria.iter().any(|r| r.id == c.id) {
            schema_violations += 1;
        }
    }

    let criteria: Vec<CriterionResult> = rubric
        .criteria
        .iter()
        .map(|r| {
            let points = i64::from(r.points);
            let Some(c) = j.criteria.iter().find(|c| c.id == r.id) else {
                schema_violations += 1;
                return CriterionResult {
                    id: r.id.clone(),
                    desc: r.desc.clone(),
                    awarded: 0,
                    points,
                    evidence: String::new(),
                };
            };
            let mut awarded = c.awarded.clamp(0, points);
            if awarded > 0 && !evidence_in_answer(&c.evidence, answer) {
                evidence_failures += 1;
                awarded = 0;
            }
            CriterionResult {
                id: r.id.clone(),
                desc: r.desc.clone(),
                awarded,
                points,
                evidence: c.evidence.clone(),
            }
        })
        .collect();

    // Only deductions the rubric defines, at the rubric's value; each at most once.
    let mut deductions = Vec::new();
    for hit in j.deductions_hit.iter().collect::<HashSet<_>>() {
        match rubric.deductions.iter().find(|d| &d.desc == hit) {
            Some(d) => deductions.push(DeductionResult {
                desc: d.desc.clone(),
                points: i64::from(d.points),
            }),
            None => schema_violations += 1,
        }
    }
    deductions.sort_by(|a, b| a.desc.cmp(&b.desc));

    let raw: i64 = criteria.iter().map(|c| c.awarded).sum::<i64>()
        + deductions.iter().map(|d| d.points).sum::<i64>();
    let score = raw.max(0);
    let must_have_missing: Vec<String> = rubric
        .must_have
        .iter()
        .filter(|term| {
            !j.must_have_covered
                .iter()
                .any(|m| &m.term == *term && m.covered)
        })
        .cloned()
        .collect();
    let mut verdict = verdict_for(score);
    if verdict == Verdict::Pass && !must_have_missing.is_empty() {
        verdict = Verdict::Partial;
    }
    Ok(Graded {
        score,
        max_score,
        verdict,
        criteria,
        deductions,
        evidence_failures,
        schema_violations,
        any_uncertain: j.criteria.iter().any(|c| c.uncertain),
        must_have_missing,
    })
}

/// `pass` ≥ 7, `partial` 4–6, `fail` ≤ 3 on the 10-point scale.
#[must_use]
pub fn verdict_for(score: i64) -> Verdict {
    match score {
        s if s >= 7 => Verdict::Pass,
        s if s >= 4 => Verdict::Partial,
        _ => Verdict::Fail,
    }
}

/// GRADER.md §2: re-grade with the stronger model if any of these hold.
#[must_use]
pub fn needs_escalation(g: &Graded, refused: bool) -> bool {
    let near_boundary = matches!(g.score, 3 | 4 | 6 | 7);
    g.any_uncertain
        || near_boundary
        || g.schema_violations > 0
        || g.evidence_failures >= 2
        || refused
}

/// GRADER.md §3: suggested FSRS rating. The user makes the final call (may pick Easy).
#[must_use]
pub fn suggested_rating(v: Verdict) -> Rating {
    match v {
        Verdict::Fail => Rating::Again,
        Verdict::Partial => Rating::Hard,
        Verdict::Pass => Rating::Good,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::content::model::{Criterion, Deduction};

    fn rubric() -> Rubric {
        Rubric {
            must_have: vec!["ReAct".into()],
            criteria: vec![
                Criterion {
                    id: "c1".into(),
                    desc: "loop".into(),
                    points: 4,
                },
                Criterion {
                    id: "c2".into(),
                    desc: "grounding".into(),
                    points: 3,
                },
                Criterion {
                    id: "c3".into(),
                    desc: "failure".into(),
                    points: 3,
                },
            ],
            deductions: vec![Deduction {
                desc: "confuses tools with training".into(),
                points: -2,
            }],
            model_answer_ko: "…".into(),
        }
    }

    const ANSWER: &str = "ReAct는 추론과 행동을 번갈아 한다. 도구 결과로 외부 정보에 접지한다! 무한 루프가 실패 모드다.";

    fn crit(id: &str, awarded: i64, evidence: &str) -> CriterionJudgment {
        CriterionJudgment {
            id: id.into(),
            awarded,
            evidence: evidence.into(),
            uncertain: false,
        }
    }

    fn judgment(criteria: Vec<CriterionJudgment>) -> Judgment {
        Judgment {
            criteria,
            deductions_hit: vec![],
            must_have_covered: vec![MustHaveJudgment {
                term: "ReAct".into(),
                covered: true,
            }],
            feedback_ko: String::new(),
        }
    }

    fn full() -> Judgment {
        judgment(vec![
            crit("c1", 4, "추론과 행동을 번갈아 한다"),
            crit("c2", 3, "도구 결과로 외부 정보에 접지한다"),
            crit("c3", 3, "무한 루프가 실패 모드다"),
        ])
    }

    #[test]
    fn full_marks_pass() {
        let g = grade(&rubric(), ANSWER, &full()).unwrap();
        assert_eq!((g.score, g.max_score, g.verdict), (10, 10, Verdict::Pass));
        assert!(!needs_escalation(&g, false));
        assert_eq!(suggested_rating(g.verdict), Rating::Good);
    }

    #[test]
    fn evidence_ignores_spacing_and_punctuation_only() {
        assert!(evidence_in_answer(
            "도구 결과로 외부 정보에  접지한다",
            ANSWER
        ));
        assert!(evidence_in_answer("접지한다 무한", ANSWER));
        assert!(!evidence_in_answer("외부 지식에 접지한다", ANSWER));
        assert!(!evidence_in_answer("  ...  ", ANSWER));
    }

    #[test]
    fn fabricated_evidence_zeroes_the_criterion() {
        let mut j = full();
        j.criteria[1].evidence = "답안에 없는 문장".into();
        let g = grade(&rubric(), ANSWER, &j).unwrap();
        assert_eq!(g.criteria[1].awarded, 0);
        assert_eq!((g.score, g.evidence_failures), (7, 1));
    }

    #[test]
    fn awards_are_clamped_to_points() {
        let j = judgment(vec![
            crit("c1", 99, "추론과 행동을"),
            crit("c2", -5, ""),
            crit("c3", 0, ""),
        ]);
        let g = grade(&rubric(), ANSWER, &j).unwrap();
        assert_eq!(
            g.criteria.iter().map(|c| c.awarded).collect::<Vec<_>>(),
            [4, 0, 0]
        );
    }

    #[test]
    fn deductions_use_rubric_values_and_floor_at_zero() {
        let mut j = judgment(vec![
            crit("c1", 1, "추론과"),
            crit("c2", 0, ""),
            crit("c3", 0, ""),
        ]);
        j.deductions_hit = vec![
            "confuses tools with training".into(),
            "confuses tools with training".into(),
        ];
        let g = grade(&rubric(), ANSWER, &j).unwrap();
        assert_eq!(
            g.deductions,
            [DeductionResult {
                desc: "confuses tools with training".into(),
                points: -2
            }]
        );
        assert_eq!(g.score, 0);
    }

    #[test]
    fn unknown_deduction_or_criterion_is_a_schema_violation() {
        let mut j = full();
        j.deductions_hit = vec!["made up".into()];
        j.criteria.push(crit("c9", 3, "ReAct"));
        let g = grade(&rubric(), ANSWER, &j).unwrap();
        assert_eq!((g.score, g.schema_violations), (10, 2));
        assert!(needs_escalation(&g, false));
    }

    #[test]
    fn missing_criterion_scores_zero_and_escalates() {
        let j = judgment(vec![
            crit("c1", 4, "추론과 행동을 번갈아 한다"),
            crit("c2", 3, "외부 정보에 접지한다"),
        ]);
        let g = grade(&rubric(), ANSWER, &j).unwrap();
        assert_eq!((g.score, g.schema_violations), (7, 1));
        assert!(needs_escalation(&g, false));
    }

    #[test]
    fn missing_must_have_caps_at_partial() {
        let mut j = full();
        j.must_have_covered.clear();
        let g = grade(&rubric(), ANSWER, &j).unwrap();
        assert_eq!((g.score, g.verdict), (10, Verdict::Partial));
        assert_eq!(g.must_have_missing, ["ReAct"]);
    }

    #[test]
    fn verdict_thresholds() {
        use Verdict::{Fail as F, Partial as P, Pass as S};
        let v: Vec<_> = (0..=10).map(verdict_for).collect();
        assert_eq!(v, [F, F, F, F, P, P, P, S, S, S, S]);
    }

    #[test]
    fn escalates_near_boundaries_uncertainty_and_refusal() {
        let mut g = grade(&rubric(), ANSWER, &full()).unwrap();
        assert!(needs_escalation(&g, true));
        for s in [3, 4, 6, 7] {
            g.score = s;
            assert!(needs_escalation(&g, false), "{s}");
        }
        for s in [0, 2, 5, 8, 10] {
            g.score = s;
            assert!(!needs_escalation(&g, false), "{s}");
        }
        g.any_uncertain = true;
        assert!(needs_escalation(&g, false));
    }

    #[test]
    fn two_evidence_failures_escalate() {
        let mut j = full();
        j.criteria[0].evidence = "없음".into();
        j.criteria[1].evidence = "없음".into();
        let g = grade(&rubric(), ANSWER, &j).unwrap();
        assert_eq!((g.score, g.evidence_failures), (3, 2));
        assert!(needs_escalation(&g, false));
    }

    #[test]
    fn rejects_rubrics_not_on_the_ten_point_scale() {
        let mut r = rubric();
        r.criteria[0].points = 5;
        assert_eq!(
            grade(&r, ANSWER, &full()),
            Err(GradeError::UnsupportedScale(11))
        );
    }

    #[test]
    fn rating_suggestions() {
        assert_eq!(suggested_rating(Verdict::Fail), Rating::Again);
        assert_eq!(suggested_rating(Verdict::Partial), Rating::Hard);
    }
}
