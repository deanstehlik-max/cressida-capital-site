// Lightweight spam checks for the public loan form.
// The honeypot is a hidden field humans never fill. The rate limit is
// in-memory and per server process — enough to blunt a simple flood,
// and it resets when the process restarts.

export const HONEYPOT_FIELD = 'companyWebsite';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const buckets = new Map<string, number[]>();

export function isHoneypotTripped(value: unknown): boolean {
  if (typeof value === 'string') return value.trim() !== '';
  return value != null && value !== false;
}

export function clientIp(headers: { get(name: string): string | null }): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get('x-real-ip')?.trim();
  return realIp || 'unknown';
}

/** True when this IP has already used its submissions for the current window. */
export function isRateLimited(ip: string, now = Date.now()): boolean {
  const recent = (buckets.get(ip) ?? []).filter((ts) => now - ts < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    buckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  buckets.set(ip, recent);

  if (buckets.size > 5000) {
    for (const [key, stamps] of buckets) {
      const live = stamps.filter((ts) => now - ts < WINDOW_MS);
      if (live.length === 0) buckets.delete(key);
      else buckets.set(key, live);
    }
  }

  return false;
}
