import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { test, expect } from "@playwright/test";

// CONTRACT §5 / 리뷰 I1: draft 강의의 생성 문구가 빌드 산출물(정적 JS, 미리 렌더링한 HTML·RSC) 어디에도 없어야 한다.
const ROOT = process.cwd();

function files(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? files(p) : /\.(js|html|rsc|json|txt)$/.test(e.name) ? [p] : [];
  });
}

function draftSnippets(): string[] {
  const out: string[] = [];
  const dir = path.join(ROOT, "content", "lectures");
  for (const course of fs.readdirSync(dir)) {
    for (const f of fs.readdirSync(path.join(dir, course))) {
      const text = fs.readFileSync(path.join(dir, course, f), "utf8");
      const fm = YAML.parse(text.slice(4, text.indexOf("\n---\n", 3)));
      if ((fm.status ?? "draft") !== "draft") continue;
      for (const s of fm.segments ?? []) {
        if (s.summaryKo) out.push(String(s.summaryKo).slice(0, 30));
        for (const u of s.slideUnits ?? []) out.push(String(u.explanationArticleMd).slice(0, 30), String(u.slideTitle));
      }
      if (fm.syllabus?.instructor) out.push(`강사: ${fm.syllabus.instructor}`);
    }
  }
  return out;
}

test("draft 강의 생성 콘텐츠가 빌드 산출물에 없다", () => {
  const built = files(path.join(ROOT, ".next", "static")).concat(files(path.join(ROOT, ".next", "server", "app")));
  expect(built.length, "run npm run build:e2e first").toBeGreaterThan(0);
  const snippets = draftSnippets();
  expect(snippets.length).toBeGreaterThan(10);
  const leaks: string[] = [];
  for (const f of built) {
    const body = fs.readFileSync(f, "utf8");
    for (const s of snippets) if (body.includes(s)) leaks.push(`${path.relative(ROOT, f)}: ${s}`);
  }
  expect(leaks).toEqual([]);
});
