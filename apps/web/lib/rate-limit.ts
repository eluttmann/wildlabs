/**
 * A public LLM endpoint is an unmetered bill.
 *
 * An anonymous chat route on a portfolio site can be scripted, and every
 * request spends real money against the site owner's key. This is the floor —
 * not v2 hardening.
 *
 * ⚠️  IN-MEMORY, AND THEREFORE PER-INSTANCE.
 * On serverless each cold start gets a fresh map, so the effective limit is
 * (limit × live instances). That is enough to stop a naive loop and not enough
 * to stop anyone deliberate. Before this endpoint is public and funded, move
 * the counter to Upstash Redis or Vercel KV so it is shared across instances.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60 * 60 * 1000;

/** Bound the map so a spray of unique addresses cannot grow it without limit. */
const MAX_TRACKED = 10_000;

function sweep(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(identifier: string, limit: number): RateLimitResult {
  const now = Date.now();

  if (buckets.size > MAX_TRACKED) sweep(now);

  const existing = buckets.get(identifier);

  if (!existing || existing.resetAt <= now) {
    const bucket = { count: 1, resetAt: now + WINDOW_MS };
    buckets.set(identifier, bucket);
    return { ok: true, remaining: limit - 1, resetAt: bucket.resetAt };
  }

  if (existing.count >= limit) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { ok: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

/**
 * Caller address.
 *
 * Behind Vercel's proxy `x-forwarded-for` is a client-appended list; the first
 * entry is the real client. Trusting the last entry would let a caller spoof a
 * fresh identity per request by sending their own header.
 */
export function getClientId(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
