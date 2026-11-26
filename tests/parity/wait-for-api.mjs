// STUDY_API_URL 의 /api/health 가 200 이 될 때까지 최대 60초 기다린다 (CI parity job 용).
const url = `${process.env.STUDY_API_URL?.replace(/\/$/, "")}/api/health`;
for (let i = 0; i < 60; i++) {
  try {
    const r = await fetch(url);
    if (r.ok) {
      console.log(`ready: ${JSON.stringify(await r.json())}`);
      process.exit(0);
    }
  } catch {}
  await new Promise((r) => setTimeout(r, 1000));
}
console.error(`timeout waiting for ${url}`);
process.exit(1);
