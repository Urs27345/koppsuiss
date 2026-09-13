import crypto from "crypto";

export const GALLERY_COOKIE_NAME = "fk_gallery_session";
export const DEFAULT_GALLERY_PASSWORD = process.env.GALLERY_PASSWORD || "Kopp-Archiv-2026!x9q";
const SECRET_SALT = process.env.GALLERY_AUTH_SECRET || "kopp-suisse-private-gallery-salt-2026-9f8a";

export function generateSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", SECRET_SALT)
    .update(`auth:${timestamp}:${DEFAULT_GALLERY_PASSWORD}`)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [timestamp, signature] = parts;

  // Max validity: 7 days
  const now = Date.now();
  const time = parseInt(timestamp, 10);
  if (isNaN(time) || now - time > 7 * 24 * 60 * 60 * 1000) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", SECRET_SALT)
    .update(`auth:${timestamp}:${DEFAULT_GALLERY_PASSWORD}`)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"));
  } catch {
    return false;
  }
}
