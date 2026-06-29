/**
 * DEV-ONLY · SMTP connection test
 *
 * Visit http://localhost:3000/api/contact/test in a browser while the dev
 * server is running. It verifies the SMTP connection and returns a JSON
 * report of exactly what succeeded or failed — far faster than debugging
 * through the contact form.
 *
 * Returns 403 in production so it is never exposed publicly.
 */
import { NextResponse } from "next/server";
import { buildTransporter, SHOW_DIAGNOSTICS } from "@/lib/mailer";

export async function GET() {
  // Available in dev, or in production only while DEBUG_CONTACT=true is set.
  if (!SHOW_DIAGNOSTICS) {
    return NextResponse.json(
      { error: "Not available. Set DEBUG_CONTACT=true in your environment to enable temporarily." },
      { status: 403 }
    );
  }

  const pass = process.env.SMTP_PASS ?? "";
  const vars = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    // Length + first/last char let you confirm .env.local parsed the password
    // intact (special chars/quotes/spaces are the usual silent corrupters).
    // Dev-only endpoint (403 in prod) so this never leaks publicly.
    SMTP_PASS: pass
      ? `✓ set · length=${pass.length} · starts="${pass[0]}" ends="${pass[pass.length - 1]}"`
      : "✗ MISSING",
    SMTP_PASS_has_surrounding_quotes: pass.startsWith('"') || pass.startsWith("'"),
    SMTP_PASS_has_trailing_space: pass !== pass.trimEnd(),
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  };

  // Check for missing required vars before even trying to connect
  const missing = (["SMTP_HOST", "SMTP_USER", "SMTP_PASS"] as const).filter((k) => !process.env[k]);
  if (missing.length) {
    return NextResponse.json({ ok: false, reason: "Missing env vars", missing, vars }, { status: 400 });
  }

  try {
    const transporter = buildTransporter();
    await transporter.verify();
    return NextResponse.json({
      ok: true,
      message: "SMTP connection verified — credentials and host are correct.",
      vars,
    });
  } catch (err) {
    const e = err as NodeJS.ErrnoException & { responseCode?: number; response?: string };
    return NextResponse.json(
      {
        ok: false,
        code: e.code,
        responseCode: e.responseCode,
        message: e.message,
        vars,
        hints: hints(e),
      },
      { status: 500 }
    );
  }
}

function hints(e: NodeJS.ErrnoException & { responseCode?: number }): string[] {
  const h: string[] = [];
  if (e.code === "ECONNREFUSED")
    h.push("Connection refused — wrong SMTP_HOST or SMTP_PORT, or a firewall is blocking the connection.");
  if (e.code === "ETIMEDOUT" || e.code === "ESOCKET")
    h.push(
      "Connection timed out / socket error — the host is blocking the outbound SMTP connection. " +
        "On Hostinger Node.js hosting this is common: (1) since the mail server is on the same provider, try SMTP_HOST=localhost (or 127.0.0.1) with SMTP_PORT=465; " +
        "(2) or try SMTP_PORT=587 with SMTP_SECURE=false; " +
        "(3) if both fail, outbound SMTP may be blocked on your plan — ask Hostinger support to allow outbound SMTP, or whitelist smtp.hostinger.com."
    );
  if (e.responseCode === 535 || e.code === "EAUTH")
    h.push(
      "Authentication failed (535) — SMTP_PASS is wrong, or this is the Hostinger panel password rather than the email account password. Log into Hostinger hPanel → Emails → Manage, then reset the email password and use that here."
    );
  if (e.code === "CERT_HAS_EXPIRED" || e.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE")
    h.push("TLS certificate issue — add SMTP_TLS_REJECT_UNAUTHORIZED=false to .env.local temporarily to confirm this is the cause, then report it to Hostinger.");
  if (!h.length)
    h.push("Check your host's application logs for [contact] lines with the full SMTP error.");
  return h;
}
