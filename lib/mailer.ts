import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// SMTP transporter factory + singleton. Server-side only — never import this
// from a client component. Credentials come exclusively from environment
// variables (never hardcoded, never NEXT_PUBLIC_).

export const IS_DEV = process.env.NODE_ENV !== "production";

// Temporary production diagnostics. Set DEBUG_CONTACT=true in the host's env
// to expose the SMTP test endpoint and include error details in responses,
// then unset it once email is confirmed working. Never leave on permanently.
export const DEBUG_CONTACT = process.env.DEBUG_CONTACT === "true";

// When true, surface SMTP error details to the client / test page.
export const SHOW_DIAGNOSTICS = IS_DEV || DEBUG_CONTACT;

let _transporter: Transporter | null = null;

export function buildTransporter(): Transporter {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      `SMTP env vars missing — present: SMTP_HOST=${!!SMTP_HOST} SMTP_USER=${!!SMTP_USER} SMTP_PASS=${!!SMTP_PASS}`
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 465),
    // port 465 → implicit SSL (secure: true); port 587 → STARTTLS (secure: false)
    secure: SMTP_SECURE !== "false",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: {
      minVersion: "TLSv1.2",
      // Allow self-signed certs only when explicitly opted-in during local testing.
      // Never set SMTP_TLS_REJECT_UNAUTHORIZED=false in production.
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
    },
    // Verbose SMTP session logs appear in the terminal in dev — helps diagnose auth errors.
    logger: IS_DEV,
    debug: IS_DEV,
  });
}

// Singleton in production (reused across requests).
// In development, always create fresh to avoid stale connections after hot reload.
export function getTransporter(): Transporter {
  if (!IS_DEV && _transporter) return _transporter;
  _transporter = buildTransporter();
  return _transporter;
}
