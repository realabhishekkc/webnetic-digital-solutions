import { NextResponse } from "next/server";
import type { Transporter } from "nodemailer";
import { getTransporter, IS_DEV } from "@/lib/mailer";

// ── helpers ────────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── email templates ────────────────────────────────────────────────────────

interface ContactData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

function notificationHtml(d: ContactData): string {
  const rows = (
    [
      ["Name", escapeHtml(d.name)],
      [
        "Email",
        `<a href="mailto:${escapeHtml(d.email)}" style="color:#1e88e5;text-decoration:none;">${escapeHtml(d.email)}</a>`,
      ],
      d.company ? ["Company", escapeHtml(d.company)] : null,
      d.service ? ["Service", escapeHtml(d.service)] : null,
    ] as ([string, string] | null)[]
  )
    .filter((r): r is [string, string] => r !== null)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 20px 10px 0;border-bottom:1px solid #f0f4f8;width:110px;color:#64748b;font-size:13px;font-weight:600;vertical-align:top;">${label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f4f8;color:#0b1422;font-size:14px;">${value}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>New Enquiry — Webnetic</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f0f4f8;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#1e88e5 0%,#38b6ff 100%);padding:28px 40px;">
          <p style="margin:0;color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.3px;">WEBNETIC</p>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:10px;letter-spacing:3px;text-transform:uppercase;">Digital Solutions</p>
        </td>
      </tr>
      <!-- Title -->
      <tr>
        <td style="padding:32px 40px 8px;">
          <h1 style="margin:0 0 6px;color:#0b1422;font-size:17px;font-weight:700;">New contact enquiry</h1>
          <p style="margin:0;color:#64748b;font-size:13px;">From webnetic.com.au &mdash; reply to respond directly to ${escapeHtml(d.name)}</p>
        </td>
      </tr>
      <!-- Contact info -->
      <tr>
        <td style="padding:16px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">${rows}</table>
        </td>
      </tr>
      <!-- Message -->
      <tr>
        <td style="padding:4px 40px 36px;">
          <p style="margin:0 0 10px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">Message</p>
          <div style="background:#f8fafc;border-left:3px solid #38b6ff;border-radius:0 6px 6px 0;padding:16px 20px;color:#1a2744;font-size:14px;line-height:1.75;white-space:pre-wrap;">${escapeHtml(d.message)}</div>
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="padding:18px 40px;background:#f8fafc;border-top:1px solid #e8eef4;">
          <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
            Webnetic Digital Solutions &middot; Sydney, Australia &middot;
            <a href="mailto:info@webnetic.com.au" style="color:#94a3b8;text-decoration:none;">info@webnetic.com.au</a>
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function notificationText(d: ContactData): string {
  return [
    "NEW CONTACT ENQUIRY — webnetic.com.au",
    "=".repeat(42),
    `Name:    ${d.name}`,
    `Email:   ${d.email}`,
    d.company ? `Company: ${d.company}` : null,
    d.service ? `Service: ${d.service}` : null,
    "",
    "Message:",
    "-".repeat(42),
    d.message,
    "",
    "-".repeat(42),
    "Reply to this email to respond to the enquiry.",
    "Webnetic Digital Solutions · Sydney, Australia",
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}

function confirmationHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>We received your message — Webnetic</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f0f4f8;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#1e88e5 0%,#38b6ff 100%);padding:28px 40px;">
          <p style="margin:0;color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.3px;">WEBNETIC</p>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:10px;letter-spacing:3px;text-transform:uppercase;">Digital Solutions</p>
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="padding:36px 40px 28px;">
          <h1 style="margin:0 0 16px;color:#0b1422;font-size:20px;font-weight:700;">Thanks, ${escapeHtml(name)}!</h1>
          <p style="margin:0 0 14px;color:#475569;font-size:15px;line-height:1.75;">
            We&rsquo;ve received your message and will get back to you within
            <strong style="color:#1e88e5;">one business day</strong>.
          </p>
          <p style="margin:0 0 30px;color:#475569;font-size:15px;line-height:1.75;">
            In the meantime, feel free to explore our
            <a href="https://www.webnetic.com.au/work" style="color:#1e88e5;text-decoration:none;font-weight:600;">recent work</a>
            or learn more about our
            <a href="https://www.webnetic.com.au/services" style="color:#1e88e5;text-decoration:none;font-weight:600;">services</a>.
          </p>
          <a href="https://www.webnetic.com.au"
             style="display:inline-block;background:linear-gradient(135deg,#1e88e5,#38b6ff);color:#ffffff;text-decoration:none;padding:13px 30px;border-radius:100px;font-size:14px;font-weight:700;letter-spacing:0.2px;">
            Visit webnetic.com.au
          </a>
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="padding:18px 40px;background:#f8fafc;border-top:1px solid #e8eef4;">
          <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.65;">
            Webnetic Digital Solutions &middot; Sydney, Australia<br>
            <a href="mailto:info@webnetic.com.au" style="color:#94a3b8;text-decoration:none;">info@webnetic.com.au</a>
            &middot;
            <a href="https://www.webnetic.com.au" style="color:#94a3b8;text-decoration:none;">webnetic.com.au</a>
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function confirmationText(name: string): string {
  return [
    `Hi ${name},`,
    "",
    "Thanks for reaching out! We've received your message and will get back to you within one business day.",
    "",
    "While you wait, you're welcome to explore our recent work and services:",
    "https://www.webnetic.com.au",
    "",
    "—",
    "Webnetic Digital Solutions",
    "Sydney, Australia",
    "info@webnetic.com.au · webnetic.com.au",
  ].join("\n");
}

// ── route handler ──────────────────────────────────────────────────────────

export async function POST(req: Request) {
  // Parse body
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, company, service, message } = rawBody as Record<string, string>;

  // Server-side validation (mirrors client-side; never trust the client alone)
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Acquire transporter (fails fast if SMTP vars are missing)
  let transport: Transporter;
  try {
    transport = getTransporter();
  } catch (err) {
    const msg = (err as Error).message;
    console.error("[contact] SMTP transporter could not be created:", msg);
    return NextResponse.json(
      {
        error: "Email service unavailable. Please contact us directly.",
        ...(IS_DEV && { _debug: msg }),
      },
      { status: 503 }
    );
  }

  const data: ContactData = {
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() || undefined,
    service: service?.trim() || undefined,
    message: message.trim(),
  };

  // Hostinger requires the From address to match the authenticated SMTP user exactly.
  const smtpUser = process.env.SMTP_USER ?? "info@webnetic.com.au";
  const contactEmail = process.env.CONTACT_EMAIL ?? smtpUser;
  const from = `"Webnetic" <${smtpUser}>`;

  const subject = `New enquiry${data.service ? ` — ${data.service}` : ""} from ${data.name}`;

  try {
    // 1 · Notification to the Webnetic inbox — this is the critical send.
    //     If it fails, the request fails (the enquiry must reach us).
    await transport.sendMail({
      from,
      to: contactEmail,
      replyTo: data.email,
      subject,
      text: notificationText(data),
      html: notificationHtml(data),
    });

    // 2 · Confirmation to the visitor — best-effort only.
    //     A failure here (e.g. an invalid/blocked address that bounces) must
    //     never fail the request or block the enquiry. Set SEND_CONFIRMATION=false
    //     to disable visitor confirmations entirely.
    if (process.env.SEND_CONFIRMATION !== "false") {
      try {
        await transport.sendMail({
          from,
          to: data.email,
          subject: "We received your message — Webnetic Digital Solutions",
          text: confirmationText(data.name),
          html: confirmationHtml(data.name),
        });
      } catch (confErr) {
        // Logged, then swallowed — the enquiry already succeeded.
        console.warn(
          "[contact] Confirmation email not sent (visitor address may be invalid):",
          (confErr as Error).message
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const e = err as NodeJS.ErrnoException & { responseCode?: number; response?: string };
    console.error(
      `[contact] SMTP send failed | code=${e.code ?? "—"} | responseCode=${e.responseCode ?? "—"} | ${e.message}`
    );
    return NextResponse.json(
      {
        error: "Failed to send. Please try again or email us at info@webnetic.com.au.",
        // Exposes SMTP details in the browser network tab during local dev only.
        ...(IS_DEV && {
          _debug: { code: e.code, responseCode: e.responseCode, message: e.message },
        }),
      },
      { status: 500 }
    );
  }
}
