"use client";

import {
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import type { Locale } from "@/i18n/config";
import { trackUmami } from "@/lib/umami";

export type DemoFormCopy = {
  eyebrow: string;
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
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  telegram: string;
  errorTitle: string;
  errorBody: string;
  close: string;
  requiredError: string;
  phoneError: string;
  studentCountLabels: [string, string, string, string];
};

const TELEGRAM_URL = "https://t.me/Xamidullo_xudoyberdiyev";
const STUDENT_COUNT_BUCKETS = ["<50", "50-150", "150-300", "300+"] as const;
const PHONE_RE = /^\+?998\d{9}$/;
type Status = "idle" | "submitting" | "success" | "error";

function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  digits = digits.slice(0, 9);

  let value = "+998";
  if (digits.length > 0) value += ` ${digits.slice(0, 2)}`;
  if (digits.length >= 3) value += ` ${digits.slice(2, 5)}`;
  if (digits.length >= 5) value += ` ${digits.slice(5, 7)}`;
  if (digits.length >= 7) value += ` ${digits.slice(7, 9)}`;
  return value;
}

export default function DemoRequestForm({
  copy,
  locale,
}: {
  copy: DemoFormCopy;
  locale: Locale;
}) {
  const base = useId();
  const fieldId = (name: string) => `${base}-${name}`;
  const errorId = (name: string) => `${base}-${name}-error`;
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [centerName, setCenterName] = useState("");
  const [studentCount, setStudentCount] = useState("");
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)
        ?.focus();
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName.trim(),
          phone: phone.replace(/[\s-]/g, ""),
          region: region.trim(),
          center_name: centerName.trim() || undefined,
          student_count: studentCount || undefined,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      trackUmami("intro_submit", { locale });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="form-success">
        <span className="form-success-mark" aria-hidden="true">
          ✓
        </span>
        <h3>{copy.successTitle}</h3>
        <p>{copy.successBody}</p>
        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
          {copy.telegram}
          <ArrowUpRight />
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="intro-form"
      aria-describedby={status === "error" ? errorId("form") : undefined}
    >
      {status === "error" && (
        <p id={errorId("form")} role="alert" className="form-alert">
          <strong>{copy.errorTitle}</strong> {copy.errorBody}
        </p>
      )}

      <Field
        id={fieldId("fullName")}
        errorId={errorId("fullName")}
        label={copy.fullName}
        error={errors.fullName ? copy.requiredError : undefined}
      >
        <input
          id={fieldId("fullName")}
          name="fullName"
          autoComplete="name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? errorId("fullName") : undefined}
          placeholder={copy.fullNamePlaceholder}
        />
      </Field>

      <Field
        id={fieldId("phone")}
        errorId={errorId("phone")}
        label={copy.phone}
        error={
          errors.phone === "invalid"
            ? copy.phoneError
            : errors.phone
              ? copy.requiredError
              : undefined
        }
      >
        <input
          id={fieldId("phone")}
          name="phone"
          autoComplete="tel"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(event) => setPhone(formatPhone(event.target.value))}
          required
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? errorId("phone") : undefined}
          placeholder={copy.phonePlaceholder}
        />
      </Field>

      <Field
        id={fieldId("region")}
        errorId={errorId("region")}
        label={copy.region}
        error={errors.region ? copy.requiredError : undefined}
        wide
      >
        <input
          id={fieldId("region")}
          name="region"
          autoComplete="address-level1"
          value={region}
          onChange={(event) => setRegion(event.target.value)}
          required
          aria-invalid={Boolean(errors.region)}
          aria-describedby={errors.region ? errorId("region") : undefined}
          placeholder={copy.regionPlaceholder}
        />
      </Field>

      <Field
        id={fieldId("centerName")}
        errorId={errorId("centerName")}
        label={copy.centerName}
        wide
      >
        <input
          id={fieldId("centerName")}
          name="centerName"
          autoComplete="organization"
          value={centerName}
          onChange={(event) => setCenterName(event.target.value)}
          placeholder={copy.centerNamePlaceholder}
        />
      </Field>

      <Field
        id={fieldId("studentCount")}
        errorId={errorId("studentCount")}
        label={copy.studentCount}
        wide
      >
        <select
          id={fieldId("studentCount")}
          name="studentCount"
          value={studentCount}
          onChange={(event) => setStudentCount(event.target.value)}
        >
          <option value="">—</option>
          {STUDENT_COUNT_BUCKETS.map((bucket, index) => (
            <option key={bucket} value={bucket}>
              {copy.studentCountLabels[index]}
            </option>
          ))}
        </select>
      </Field>

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? copy.submitting : copy.submit}
        <ArrowRight />
      </button>
    </form>
  );
}

function Field({
  id,
  errorId,
  label,
  error,
  wide = false,
  children,
}: {
  id: string;
  errorId: string;
  label: string;
  error?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`form-field${wide ? " form-field-wide" : ""}`}>
      <div className="form-label-row">
        <label htmlFor={id}>{label}</label>
        {error && (
          <span id={errorId} role="alert">
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6 14 14 6M7 6h7v7" />
    </svg>
  );
}
