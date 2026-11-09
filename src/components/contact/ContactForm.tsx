"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { submitContact } from "@/app/contact/actions";
import {
  budgets,
  projectTypes,
  serviceToProjectType,
  validateContact,
  type ContactField,
  type ContactState,
  type FieldErrors,
} from "@/lib/contact";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Values = Record<ContactField, string>;

const emptyValues: Values = { name: "", email: "", company: "", projectType: "", budget: "", message: "" };
const initialState: ContactState = { status: "idle" };

const fieldOrder: ContactField[] = ["name", "email", "company", "projectType", "budget", "message"];

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [values, setValues] = useState<Values>(emptyValues);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const startedAtRef = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Record when the form became interactive (spam timing check) and
  // pre-select a project type when arriving from a service page.
  useEffect(() => {
    startedAtRef.current = Date.now();
    const service = new URLSearchParams(window.location.search).get("service");
    const preset = service ? serviceToProjectType[service] : undefined;
    // One-time sync from the URL (an external source) after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (preset) setValues((v) => (v.projectType ? v : { ...v, projectType: preset }));
  }, []);

  const serverErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  // A field's live client-side result (even "no error") takes precedence over the last server response.
  const errors: FieldErrors = Object.fromEntries(
    fieldOrder.map((f) => [f, f in clientErrors ? clientErrors[f] : serverErrors[f]]),
  );

  // Move focus to the result so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error") summaryRef.current?.focus();
  }, [state]);

  function update(field: ContactField, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field] || clientErrors[field]) {
      const result = validateContact({ ...values, [field]: value });
      setClientErrors((e) => ({ ...e, [field]: result.success ? undefined : result.fieldErrors[field] }));
    }
  }

  function blur(field: ContactField) {
    setTouched((t) => ({ ...t, [field]: true }));
    const result = validateContact(values);
    setClientErrors((e) => ({ ...e, [field]: result.success ? undefined : result.fieldErrors[field] }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const result = validateContact(values);
    const startedInput = event.currentTarget.elements.namedItem("startedAt");
    if (startedInput instanceof HTMLInputElement) startedInput.value = String(startedAtRef.current);
    if (result.success) {
      setClientErrors({}); // let the server's response drive what is shown next
    } else {
      event.preventDefault();
      setClientErrors(result.fieldErrors);
      setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));
      const first = fieldOrder.find((f) => result.fieldErrors[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start rounded-2xl border border-line-strong bg-surface p-8 outline-none sm:p-10"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
          <CircleCheck aria-hidden className="size-6" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold text-fg">Thank you — we&apos;ve received your message.</h2>
        <p className="mt-3 leading-relaxed text-muted">
          We read every inquiry personally and will reply to the email you provided to arrange a conversation
          about your project.
        </p>
      </div>
    );
  }

  const visibleErrors = fieldOrder.filter((f) => errors[f]);
  const showSummary = state.status === "error" && (visibleErrors.length > 0 || state.message);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-describedby={showSummary ? "form-summary" : undefined}
      className="rounded-2xl border border-line-strong bg-surface p-6 sm:p-10"
    >
      {showSummary && (
        <div
          ref={summaryRef}
          id="form-summary"
          tabIndex={-1}
          role="alert"
          className="mb-8 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-fg outline-none"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-red-400" />
          <p>{state.status === "error" ? state.message : null}</p>
        </div>
      )}

      {/* Spam protection */}
      <input type="hidden" name="startedAt" defaultValue="0" />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input
            {...inputProps("name", errors.name)}
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
          />
        </Field>
        <Field id="email" label="Work email" required error={errors.email}>
          <input
            {...inputProps("email", errors.email)}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
          />
        </Field>
        <Field id="company" label="Company" error={errors.company} hint="Optional">
          <input
            {...inputProps("company", errors.company)}
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            onBlur={() => blur("company")}
          />
        </Field>
        <Field id="projectType" label="Project type" required error={errors.projectType}>
          <select
            {...inputProps("projectType", errors.projectType)}
            value={values.projectType}
            onChange={(e) => update("projectType", e.target.value)}
            onBlur={() => blur("projectType")}
          >
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Estimated budget" required error={errors.budget} className="sm:col-span-2">
          <select
            {...inputProps("budget", errors.budget)}
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
            onBlur={() => blur("budget")}
          >
            <option value="" disabled>
              Select a budget range
            </option>
            {budgets.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="message"
          label="Project description"
          required
          error={errors.message}
          className="sm:col-span-2"
          hint="What are you building, what problem does it solve, and what's your timeline?"
        >
          <textarea
            {...inputProps("message", errors.message)}
            rows={6}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            onBlur={() => blur("message")}
            className={cn(inputClass(errors.message), "min-h-36 resize-y py-3")}
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-subtle">
          We only use your details to respond to your inquiry.
        </p>
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className={buttonClasses({ size: "lg", className: "w-full shrink-0 sm:w-auto" })}
        >
          {pending ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Start Your Project
              <Send aria-hidden className="size-4" />
            </>
          )}
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {pending ? "Sending your message" : ""}
      </p>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function inputClass(error?: string) {
  return cn(
    "block w-full rounded-xl border bg-bg/60 px-4 text-[0.95rem] text-fg placeholder:text-subtle transition-colors",
    "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring",
    error ? "border-red-500/60" : "border-line-strong hover:border-fg/25",
  );
}

const fieldsWithHints: ContactField[] = ["company", "message"];

function inputProps(name: ContactField, error?: string) {
  return {
    id: name,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": [error ? `${name}-error` : null, fieldsWithHints.includes(name) ? `${name}-hint` : null].filter(Boolean).join(" ") || undefined,
    className: cn(inputClass(error), "h-12"),
  };
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  className,
  children,
}: {
  id: ContactField;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
          {required && (
            <span aria-hidden className="ml-0.5 text-accent-fg">
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </label>
        {hint && hint === "Optional" && (
          <span id={`${id}-hint`} className="text-xs text-subtle">
            {hint}
          </span>
        )}
      </div>
      {children}
      {hint && hint !== "Optional" && (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-400 light:text-red-600">
          <CircleAlert aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
