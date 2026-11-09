"use server";

import { headers } from "next/headers";
import {
  budgets,
  labelFor,
  projectTypes,
  readContactForm,
  validateContact,
  type ContactInput,
  type ContactState,
} from "@/lib/contact";

/* -------------------------------------------------------------------------- */
/*  Spam protection                                                           */
/* -------------------------------------------------------------------------- */

const MIN_FILL_MS = 3_000; // humans don't submit a full form in under 3 seconds
const RATE_LIMIT = { windowMs: 10 * 60_000, max: 5 };

// Best-effort, per-instance limiter. For strict limits across serverless
// instances, back this with a shared store (e.g. Upstash Redis / Vercel KV).
const hits = new Map<string, number[]>();

function rateLimited(key: string, now: number) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

/* -------------------------------------------------------------------------- */
/*  Delivery                                                                  */
/* -------------------------------------------------------------------------- */

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function deliver(data: ContactInput): Promise<"sent" | "not-configured" | "failed"> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "SoftForge AI Website <onboarding@resend.dev>";

  if (!apiKey || !to) return "not-configured";

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "—"],
    ["Project type", labelFor(projectTypes, data.projectType)],
    ["Estimated budget", labelFor(budgets, data.budget)],
  ];

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nProject description:\n${data.message}`;
  const html = `<h2>New project inquiry</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><h3>Project description</h3><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: data.email,
        subject: `New inquiry: ${data.name}${data.company ? ` (${data.company})` : ""}`.slice(0, 200),
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Email provider error", res.status, await res.text().catch(() => ""));
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.error("[contact] Email delivery failed", error);
    return "failed";
  }
}

/* -------------------------------------------------------------------------- */
/*  Action                                                                    */
/* -------------------------------------------------------------------------- */

const GENERIC_ERROR =
  "Sorry — we couldn't send your message right now. Please try again in a few minutes.";

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const now = Date.now();

  // Honeypot: real visitors never see or fill this field.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success" }; // silently drop bots
  }

  // Timing check: the form records when it became interactive.
  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || startedAt <= 0 || now - startedAt < MIN_FILL_MS) {
    return { status: "error", message: "Please take a moment to review your details and submit again." };
  }

  const h = await headers();
  // Prefer the host platform's own header (Netlify / Vercel set these and
  // clients can't override them), then fall back to standard proxy headers.
  const ip =
    h.get("x-nf-client-connection-ip")?.trim() ||
    h.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (rateLimited(ip, now)) {
    return { status: "error", message: "Too many submissions. Please wait a few minutes and try again." };
  }

  const raw = readContactForm(formData);
  const result = validateContact(raw);
  if (!result.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: result.fieldErrors,
      values: raw,
    };
  }

  const outcome = await deliver(result.data);

  if (outcome === "sent") return { status: "success" };

  if (outcome === "not-configured") {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Email delivery not configured — submission received (dev only):", result.data);
      return { status: "success" };
    }
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL are not set; submission could not be delivered.");
  }

  return { status: "error", message: GENERIC_ERROR, values: raw };
}
