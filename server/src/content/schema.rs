//! Validation against `content/schema.json`, the content contract's single source of truth.
//!
//! Mirrors `pipeline/study_pipeline/check.py`: Draft 2020-12, one validator per `$defs`
//! entry, formats not asserted (the Python validator does not assert them either, and the
//! two must agree on what is valid).

use jsonschema::Validator;
use serde_json::Value;

pub struct Schemas {
    pub question: Validator,
    pub note: Validator,
    pub topic: Validator,
    pub source: Validator,
}

impl Schemas {
    pub fn compile(schema: &Value) -> Result<Self, String> {
        let build = |def: &str| -> Result<Validator, String> {
            let mut root = schema.clone();
            let obj = root.as_object_mut().ok_or("schema.json is not an object")?;
            obj.insert("$ref".into(), Value::String(format!("#/$defs/{def}")));
            jsonschema::draft202012::new(&root).map_err(|e| format!("$defs/{def}: {e}"))
        };
        Ok(Self {
            question: build("question")?,
            note: build("studyNote")?,
            topic: build("topic")?,
            source: build("source")?,
        })
    }
}

/// Every violation, as `<json pointer>: <message>`.
pub fn violations(validator: &Validator, instance: &Value) -> Vec<String> {
    validator
        .iter_errors(instance)
        .map(|e| {
            let path = e.instance_path().to_string();
            if path.is_empty() {
                e.to_string()
            } else {
                format!("{path}: {e}")
            }
        })
        .collect()
}
