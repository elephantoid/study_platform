export function formatTimestamp(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(r).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** `?t=` 값을 0 ≤ t < durationSec 정수 초로 만든다. 음수·소수·숫자 아님은 0 또는 내림. */
export function parseStartSec(raw: string | null, durationSec: number): number {
  const n = Number(raw);
  if (!raw || !Number.isFinite(n) || n < 0) return 0;
  return Math.min(Math.floor(n), Math.max(0, durationSec - 1));
}
