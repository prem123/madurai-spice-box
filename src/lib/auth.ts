/**
 * Lightweight single-password auth.
 * Works in both the Edge runtime (middleware) and Node (server actions)
 * because it only relies on the Web Crypto API.
 *
 * Set ADMIN_PASSWORD (and optionally ADMIN_SECRET) in your environment.
 */
export const ADMIN_COOKIE = "msb_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

function getSecret(): string {
  return process.env.ADMIN_SECRET || "madurai-spice-box-secret";
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The opaque session token stored in the cookie when logged in. */
export async function sessionToken(): Promise<string> {
  return sha256(`${getPassword()}::${getSecret()}`);
}

/** True if the supplied password matches the configured admin password. */
export function verifyPassword(input: string): boolean {
  const expected = getPassword();
  if (input.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < input.length; i++) {
    mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

/** True if the cookie value is a valid session token. */
export async function isValidSession(
  cookieValue: string | undefined
): Promise<boolean> {
  if (!cookieValue) return false;
  return cookieValue === (await sessionToken());
}
