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
import { buildTransporter } from "../route";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production." }, { status: 403 });
  }

  const vars = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS ? "✓ set" : "✗ MISSING",
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
    h.push("Connection timed out — your ISP or network may block outbound port 465. Try SMTP_PORT=587 with SMTP_SECURE=false.");
  if (e.responseCode === 535 || e.code === "EAUTH")
    h.push(
      "Authentication failed (535) — SMTP_PASS is wrong, or this is the Hostinger panel password rather than the email account password. Log into Hostinger hPanel → Emails → Manage, then reset the email password and use that here."
    );
  if (e.code === "CERT_HAS_EXPIRED" || e.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE")
    h.push("TLS certificate issue — add SMTP_TLS_REJECT_UNAUTHORIZED=false to .env.local temporarily to confirm this is the cause, then report it to Hostinger.");
  if (!h.length)
    h.push("Check the terminal (dev server output) for the full SMTP session transcript — debug logging is enabled in development.");
  return h;
}
