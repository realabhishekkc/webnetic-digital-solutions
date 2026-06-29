import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = "info@webnetic.com.au";
const FROM = "Webnetic Contact Form <contact@webnetic.com.au>";

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, company, service, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const subject = `New enquiry${service ? ` — ${service}` : ""} from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    service ? `Service: ${service}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const resend = new Resend(key);

  try {
    await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
