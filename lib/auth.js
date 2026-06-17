// Dependency-free auth: scrypt password hashing + HMAC-signed session cookie.
import crypto from "crypto";

const SECRET = process.env.AUTH_SECRET || "aastha-dev-secret-change-me";
export const SESSION_COOKIE = "aastha_session";
const MAX_AGE = 30 * 24 * 3600; // 30 days

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  if (!stored || !stored.includes(":")) return false;
  const [salt, hash] = stored.split(":");
  const test = crypto.scryptSync(String(password), salt, 64).toString("hex");
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(test, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function sign(data) {
  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function createSessionToken(userId) {
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp: Date.now() + MAX_AGE * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  if (!token || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  if (sign(payload) !== sig) return null;
  try {
    const { uid, exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (!uid || !exp || Date.now() > exp) return null;
    return uid;
  } catch {
    return null;
  }
}

export const COOKIE_OPTS = { httpOnly: true, sameSite: "lax", path: "/", maxAge: MAX_AGE };

// Read the session user id from a Request's Cookie header.
export function userIdFromRequest(req) {
  const cookie = req.headers.get("cookie") || "";
  const m = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return m ? verifySessionToken(decodeURIComponent(m[1])) : null;
}
