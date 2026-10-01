"use client";

import React, { useState, useRef } from "react";
import type { LandingContent } from "@/content/uz";
import { track, buildDemoUrl } from "@/lib/analytics";

interface LeadFormProps {
  content: LandingContent["pricing"]["form"];
}

const CITIES = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Andijon",
  "Buxoro",
  "Farg‘ona",
  "Jizzax",
  "Xorazm",
  "Namangan",
  "Navoiy",
  "Qashqadaryo",
  "Qoraqalpog‘iston",
  "Samarqand",
  "Sirdaryo",
  "Surxondaryo",
];

export default function LeadForm({ content }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    school: "",
    city: "",
    branches: "",
    students: "",
    flows: [] as string[],
    consent: false,
    company_website: "", // Honeypot field
  });

  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const hasTrackedStartRef = useRef(false);

  const demoUrl = buildDemoUrl("pricing_form_success");

  // Field validation rules adhering to design.md §6.11
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = content.fields.name.error;
    }
    const digits = formData.phone.replace(/\D/g, "");
    if (digits.length < 9) {
      errs.phone = content.fields.phone.error;
    }
    if (!formData.school.trim()) {
      errs.school = content.fields.school.error;
    }
    if (!formData.consent) {
      errs.consent = content.fields.consent.error;
    }
    return errs;
  };

  const errors = hasTriedSubmit ? validate() : {};

  const handleFocus = () => {
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true;
      track("form_start");
    }
  };

  const handleBranchClick = (opt: string) => {
    setFormData((prev) => ({
      ...prev,
      branches: prev.branches === opt ? "" : opt,
    }));
  };

  const handleStudentClick = (opt: string) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students === opt ? "" : opt,
    }));
  };

  const handleFlowClick = (opt: string) => {
    setFormData((prev) => {
      const exists = prev.flows.includes(opt);
      const nextFlows = exists
        ? prev.flows.filter((f) => f !== opt)
        : [...prev.flows, opt];
      return { ...prev, flows: nextFlows };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedSubmit(true);
    setNetworkError("");

    const errs = validate();
    const errorKeys = Object.keys(errs);

    if (errorKeys.length > 0) {
      track("form_error", { fields: errorKeys });
      // Focus first error field
      setTimeout(() => {
        const firstErrorEl = document.querySelector<HTMLElement>(
          'form [aria-invalid="true"]'
        );
        firstErrorEl?.focus();
      }, 50);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          page_url: window.location.href,
          submitted_at: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      track("form_submit_success", {
        branches: formData.branches,
        students: formData.students,
        flows: formData.flows,
        city: formData.city,
      });

      setIsSuccess(true);
    } catch (err) {
      console.error("[Form Submit Error]", err);
      setNetworkError(content.networkError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      school: "",
      city: "",
      branches: "",
      students: "",
      flows: [],
      consent: false,
      company_website: "",
    });
    setHasTriedSubmit(false);
    setIsSuccess(false);
    setNetworkError("");
    hasTrackedStartRef.current = false;
  };

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-[var(--c-paper)] border border-[var(--c-sand-300)] rounded-[24px] p-6 sm:p-10 border-b-4 flex flex-col items-start gap-4 py-8"
      >
        <span
          className="w-14 h-14 rounded-full bg-[#1F7A4A] text-white grid place-items-center font-body font-bold text-[26px]"
          aria-hidden="true"
        >
          ✓
        </span>
        <h3 className="m-0 font-display font-extrabold text-[34px] leading-none text-[var(--c-ink)]">
          {content.success.title}
        </h3>
        <p className="m-0 font-body font-normal text-[17px] leading-[1.55] text-[var(--c-body-2)]">
          {content.success.message}
        </p>
        <div className="flex gap-3 flex-wrap mt-2">
          <a
            href={demoUrl}
            onClick={() => track("cta_demo_click", { location: "form_success" })}
            className="action-primary h-12 px-5 flex items-center gap-1.5 bg-[var(--c-amber-500)] hover:bg-[var(--c-amber-400)] text-[var(--c-forest-800)] font-body font-bold text-[16px] rounded-[10px] no-underline shadow-sm transition-colors"
          >
            <span>{content.success.demoCta}</span>
            <span className="text-[18px] leading-none">↗</span>
          </a>
          <button
            type="button"
            onClick={handleReset}
            className="h-12 px-5 rounded-[10px] border-[1.5px] border-[var(--c-sand-400)] hover:border-[var(--c-ink)] bg-transparent text-[var(--c-ink)] font-body font-semibold text-[16px] cursor-pointer transition-colors"
          >
            {content.success.resetButton}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--c-paper)] border border-[var(--c-sand-300)] rounded-[24px] p-6 sm:p-9 border-b-4">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Form Heading */}
        <div className="flex flex-col gap-1.5">
          <h3 className="m-0 font-display font-extrabold text-[30px] sm:text-[32px] leading-none text-[var(--c-ink)]">
            {content.title}
          </h3>
          <span className="font-body font-normal text-[15px] text-[var(--c-muted)]">
            <span className="text-[#B3301A] font-bold">*</span> · {content.requiredNote}
          </span>
        </div>

        {/* 2x2 Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="lead-name"
              className="font-body font-semibold text-[15px] text-[var(--c-ink)]"
            >
              {content.fields.name.label} *
            </label>
            <input
              id="lead-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={content.fields.name.placeholder}
              value={formData.name}
              onFocus={handleFocus}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "lead-name-error" : undefined}
              style={{
                borderColor: errors.name ? "#B3301A" : "var(--c-sand-400)",
              }}
              className="h-[50px] rounded-[10px] border-[1.5px] bg-white px-3.5 font-body text-[16px] text-[var(--c-ink)] focus:border-[var(--c-ink)] focus:ring-3 focus:ring-[var(--ring-focus)] outline-none transition-colors"
            />
            {errors.name && (
              <span
                id="lead-name-error"
                role="alert"
                className="font-body font-medium text-[13px] text-[#B3301A]"
              >
                {errors.name}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="lead-phone"
              className="font-body font-semibold text-[15px] text-[var(--c-ink)]"
            >
              {content.fields.phone.label} *
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={content.fields.phone.placeholder}
              value={formData.phone}
              onFocus={handleFocus}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "lead-phone-error" : undefined}
              style={{
                borderColor: errors.phone ? "#B3301A" : "var(--c-sand-400)",
              }}
              className="h-[50px] rounded-[10px] border-[1.5px] bg-white px-3.5 font-mono text-[16px] text-[var(--c-ink)] focus:border-[var(--c-ink)] focus:ring-3 focus:ring-[var(--ring-focus)] outline-none transition-colors"
            />
            {errors.phone && (
              <span
                id="lead-phone-error"
                role="alert"
                className="font-body font-medium text-[13px] text-[#B3301A]"
              >
                {errors.phone}
              </span>
            )}
          </div>

          {/* School Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="lead-school"
              className="font-body font-semibold text-[15px] text-[var(--c-ink)]"
            >
              {content.fields.school.label} *
            </label>
            <input
              id="lead-school"
              name="school"
              type="text"
              autoComplete="organization"
              placeholder={content.fields.school.placeholder}
              value={formData.school}
              onFocus={handleFocus}
              onChange={(e) =>
                setFormData({ ...formData, school: e.target.value })
              }
              aria-invalid={!!errors.school}
              aria-describedby={errors.school ? "lead-school-error" : undefined}
              style={{
                borderColor: errors.school ? "#B3301A" : "var(--c-sand-400)",
              }}
              className="h-[50px] rounded-[10px] border-[1.5px] bg-white px-3.5 font-body text-[16px] text-[var(--c-ink)] focus:border-[var(--c-ink)] focus:ring-3 focus:ring-[var(--ring-focus)] outline-none transition-colors"
            />
            {errors.school && (
              <span
                id="lead-school-error"
                role="alert"
                className="font-body font-medium text-[13px] text-[#B3301A]"
              >
                {errors.school}
              </span>
            )}
          </div>

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="lead-city"
              className="font-body font-semibold text-[15px] text-[var(--c-ink)]"
            >
              {content.fields.city.label}
            </label>
            <select
              id="lead-city"
              name="city"
              value={formData.city}
              onFocus={handleFocus}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="h-[50px] rounded-[10px] border-[1.5px] border-[var(--c-sand-400)] bg-white px-3 font-body text-[16px] text-[var(--c-ink)] focus:border-[var(--c-ink)] focus:ring-3 focus:ring-[var(--ring-focus)] outline-none transition-colors cursor-pointer"
            >
              <option value="">{content.fields.city.placeholder}</option>
              {(content.fields.city.options || CITIES).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Honeypot field (hidden from real users) */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="company_website">Website</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company_website}
            onChange={(e) =>
              setFormData({ ...formData, company_website: e.target.value })
            }
          />
        </div>

        {/* Branches Segment */}
        <div className="flex flex-col gap-2">
          <span className="font-body font-semibold text-[15px] text-[var(--c-ink)]">
            {content.fields.branches.label}
          </span>
          <div className="flex gap-2 flex-wrap">
            {content.fields.branches.options.map((opt) => {
              const on = formData.branches === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={on}
                  onClick={() => handleBranchClick(opt)}
                  style={{
                    backgroundColor: on ? "var(--c-ink)" : "#FFFFFF",
                    color: on ? "#FFFFFF" : "var(--c-ink)",
                    borderColor: on ? "var(--c-ink)" : "var(--c-sand-400)",
                  }}
                  className="h-11 min-w-[72px] px-4 rounded-[10px] border-[1.5px] font-body font-semibold text-[15px] cursor-pointer transition-colors duration-150"
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Students Range Segment */}
        <div className="flex flex-col gap-2">
          <span className="font-body font-semibold text-[15px] text-[var(--c-ink)]">
            {content.fields.students.label}
          </span>
          <div className="flex gap-2 flex-wrap">
            {content.fields.students.options.map((opt) => {
              const on = formData.students === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={on}
                  onClick={() => handleStudentClick(opt)}
                  style={{
                    backgroundColor: on ? "var(--c-ink)" : "#FFFFFF",
                    color: on ? "#FFFFFF" : "var(--c-ink)",
                    borderColor: on ? "var(--c-ink)" : "var(--c-sand-400)",
                  }}
                  className="h-11 px-3.5 rounded-[10px] border-[1.5px] font-body font-semibold text-[15px] cursor-pointer transition-colors duration-150"
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interested Workflows Multi-Chip */}
        <div className="flex flex-col gap-2">
          <span className="font-body font-semibold text-[15px] text-[var(--c-ink)]">
            {content.fields.flows.label}
          </span>
          <div className="flex gap-2 flex-wrap">
            {(() => {
              const selectedFlowsSet = new Set(formData.flows);
              return content.fields.flows.options.map((opt) => {
                const on = selectedFlowsSet.has(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={on}
                    onClick={() => handleFlowClick(opt)}
                    style={{
                      backgroundColor: on ? "var(--c-ink)" : "#FFFFFF",
                      color: on ? "#FFFFFF" : "var(--c-ink)",
                      borderColor: on ? "var(--c-ink)" : "var(--c-sand-400)",
                    }}
                    className="min-h-11 px-3 rounded-[20px] border-[1.5px] font-body font-semibold text-[14px] cursor-pointer transition-colors duration-150"
                  >
                    {opt}
                  </button>
                );
              });
            })()}
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="flex flex-col gap-1 pt-1">
          <label className="flex items-start gap-3 font-body font-normal text-[15px] leading-[1.45] text-[var(--c-body-2)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) =>
                setFormData({ ...formData, consent: e.target.checked })
              }
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="w-5 h-5 mt-0.5 rounded-[4px] accent-[var(--c-ink)] shrink-0 cursor-pointer"
            />
            <span>{content.fields.consent.label} *</span>
          </label>
          {errors.consent && (
            <span
              id="consent-error"
              role="alert"
              className="font-body font-medium text-[13px] text-[#B3301A] pl-8"
            >
              {errors.consent}
            </span>
          )}
        </div>

        {/* Network Error Alert */}
        {networkError && (
          <div
            role="alert"
            className="p-3 rounded-[10px] bg-[#FFF6F3] border border-[#C23B22] text-[#B3301A] font-body font-semibold text-[14px]"
          >
            {networkError}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="action-primary h-14 rounded-[12px] bg-[var(--c-amber-500)] hover:bg-[var(--c-amber-400)] text-[var(--c-forest-800)] font-body font-bold text-[18px] cursor-pointer transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm select-none"
        >
          {isSubmitting ? content.submitting : content.submit} →
        </button>

        <span className="font-body font-normal text-[13px] leading-[1.5] text-[var(--c-muted)]">
          {content.disclaimer}
        </span>
      </form>
    </div>
  );
}
