"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { Check, ArrowRight } from "./icons";

type Errors = Partial<Record<"name" | "email" | "message" | "form", string>>;

export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = (): boolean => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please enter a valid email.";
    if (!values.message.trim()) next.message = "Please tell us a little about your project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors({ form: (data as { error?: string }).error || "Something went wrong. Please try again." });
        return;
      }
      setSent(true);
    } catch {
      setErrors({ form: "Network error. Please check your connection and try again." });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="surface-card flex flex-col items-center p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Check size={26} />
        </span>
        <h2 className="mt-5 font-display text-xl font-medium text-ink">Message sent — thanks!</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
          We&apos;ve received your enquiry and will reply within one business day. If it&apos;s urgent,
          email us directly at{" "}
          <a href={`mailto:${SITE.email}`} className="text-brand-bright">{SITE.email}</a>.
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="surface-card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={set("name")}
            autoComplete="name"
            aria-invalid={!!errors.name}
            className="input"
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={set("email")}
            autoComplete="email"
            aria-invalid={!!errors.email}
            className="input"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company">
          <input
            type="text"
            value={values.company}
            onChange={set("company")}
            autoComplete="organization"
            className="input"
          />
        </Field>
        <Field label="Service interest">
          <select value={values.service} onChange={set("service")} className="input">
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </Field>
      </div>

      <Field label="Message" required error={errors.message}>
        <textarea
          value={values.message}
          onChange={set("message")}
          rows={5}
          aria-invalid={!!errors.message}
          className="input resize-y"
          placeholder="What are you building, and what does success look like?"
        />
      </Field>

      {errors.form && (
        <p className="rounded-xl border border-[#ff8589]/30 bg-[#ff8589]/10 px-4 py-3 text-sm text-[#ff8589]">
          {errors.form}
        </p>
      )}
      <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto disabled:opacity-60">
        {sending ? "Sending…" : "Send message"} {!sending && <ArrowRight size={16} />}
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--hairline);
          background: rgb(var(--bg));
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          color: rgb(var(--ink));
          transition: border-color 0.2s ease;
        }
        .input::placeholder {
          color: rgb(var(--ink-muted));
        }
        .input:focus {
          outline: none;
          border-color: rgba(56, 182, 255, 0.6);
        }
        /* Native dropdown options inherit browser defaults (white-on-white in
           dark mode) unless explicitly themed. */
        .input option {
          background: rgb(var(--surface));
          color: rgb(var(--ink));
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-[#ff8589]">{error}</span>}
    </label>
  );
}
