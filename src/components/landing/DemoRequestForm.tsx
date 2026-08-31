"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";

export type DemoFormCopy = {
  title: string;
  subtitle: string;
  fullName: string;
  fullNamePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  region: string;
  regionPlaceholder: string;
  centerName: string;
  centerNamePlaceholder: string;
  studentCount: string;
  note: string;
  notePlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  close: string;
  requiredError: string;
  phoneError: string;
  studentCountLabels: [string, string, string, string];
};

const STUDENT_COUNT_BUCKETS = ["<50", "50-150", "150-300", "300+"] as const;
const PHONE_RE = /^\+?998\d{9}$/;
type Status = "idle" | "submitting" | "success" | "error";

function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  else if (d.startsWith("0")) d = d.slice(1);
  d = d.slice(0, 9);
  let out = "+998";
  if (d.length > 0) out += " " + d.slice(0, 2);
  if (d.length >= 3) out += " " + d.slice(2, 5);
  if (d.length >= 5) out += " " + d.slice(5, 7);
  if (d.length >= 7) out += " " + d.slice(7, 9);
  return out;
}

export default function DemoRequestForm({ copy }: { copy: DemoFormCopy }) {
  const base = useId();
  const fid = (n: string) => `${base}-${n}`;
  const eid = (n: string) => `${base}-${n}-err`;
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [centerName, setCenterName] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = "required";
    const normalizedPhone = phone.replace(/[\s-]/g, "");
    if (!normalizedPhone) next.phone = "required";
    else if (!PHONE_RE.test(normalizedPhone)) next.phone = "invalid";
    if (!region.trim()) next.region = "required";
    setErrors(next);
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)
        ?.focus();
      return;
    }
    submittingRef.current = true;
    setStatus("submitting");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName.trim(),
          phone: phone.replace(/[\s-]/g, ""),
          region: region.trim(),
          center_name: centerName.trim() || undefined,
          student_count: studentCount || undefined,
          note: note.trim() || undefined,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="py-8 text-center">
        <h3 className="mb-2 font-heading text-xl font-bold uppercase tracking-tight text-foreground">
          {copy.successTitle}
        </h3>
        <p className="text-sm text-muted-foreground">
          {copy.successBody}
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="space-y-4"
      aria-describedby={status === "error" ? eid("form") : undefined}
    >
      {status === "error" && (
        <p
          id={eid("form")}
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          <span className="font-semibold">{copy.errorTitle}</span>{" "}
          {copy.errorBody}
        </p>
      )}

      <Field
        id={fid("fullName")}
        errId={eid("fullName")}
        label={copy.fullName}
        error={errors.fullName ? copy.requiredError : undefined}
      >
        <input
          id={fid("fullName")}
          name="fullName"
          autoComplete="name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? eid("fullName") : undefined}
          className={input}
          placeholder={copy.fullNamePlaceholder}
        />
      </Field>

      <Field
        id={fid("phone")}
        errId={eid("phone")}
        label={copy.phone}
        error={
          errors.phone
            ? errors.phone === "required"
              ? copy.requiredError
              : copy.phoneError
            : undefined
        }
      >
        <input
          id={fid("phone")}
          name="phone"
          autoComplete="tel"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          required
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? eid("phone") : undefined}
          className={input}
          placeholder={copy.phonePlaceholder}
        />
      </Field>

      <Field
        id={fid("region")}
        errId={eid("region")}
        label={copy.region}
        error={errors.region ? copy.requiredError : undefined}
      >
        <input
          id={fid("region")}
          name="region"
          autoComplete="address-level1"
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
          aria-invalid={!!errors.region}
          aria-describedby={errors.region ? eid("region") : undefined}
          className={input}
          placeholder={copy.regionPlaceholder}
        />
      </Field>

      <Field
        id={fid("centerName")}
        errId={eid("centerName")}
        label={copy.centerName}
      >
        <input
          id={fid("centerName")}
          name="centerName"
          autoComplete="organization"
          type="text"
          value={centerName}
          onChange={(e) => setCenterName(e.target.value)}
          className={input}
          placeholder={copy.centerNamePlaceholder}
        />
      </Field>

      <Field
        id={fid("studentCount")}
        errId={eid("studentCount")}
        label={copy.studentCount}
      >
        <select
          id={fid("studentCount")}
          name="studentCount"
          value={studentCount}
          onChange={(e) => setStudentCount(e.target.value)}
          className={input}
        >
          <option value="">—</option>
          {STUDENT_COUNT_BUCKETS.map((b, i) => (
            <option key={b} value={b}>
              {copy.studentCountLabels[i]}
            </option>
          ))}
        </select>
      </Field>

      <Field id={fid("note")} errId={eid("note")} label={copy.note}>
        <textarea
          id={fid("note")}
          name="note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={500}
          className={input}
          placeholder={copy.notePlaceholder}
        />
        <p className="mt-1 text-right text-xs text-muted-foreground">
          {note.length}/500
        </p>
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground transition-[background-color,opacity] hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:opacity-60"
      >
        {status === "submitting" ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  errId,
  label,
  error,
  children,
}: {
  id: string;
  errId: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={errId} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
