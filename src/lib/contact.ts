import { z } from "zod";

/** Shared between the client form and the server action. */

export const projectTypes = [
  { value: "ai-automation", label: "AI agents & automation" },
  { value: "custom-software", label: "Custom software / web application" },
  { value: "saas", label: "SaaS platform or MVP" },
  { value: "mobile", label: "Mobile application" },
  { value: "cloud-devops", label: "Cloud & DevOps" },
  { value: "ai-consulting", label: "AI integration & consulting" },
  { value: "other", label: "Something else" },
] as const;

export const budgets = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-25k", label: "$10,000 – $25,000" },
  { value: "25k-50k", label: "$25,000 – $50,000" },
  { value: "50k-100k", label: "$50,000 – $100,000" },
  { value: "100k-plus", label: "$100,000+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

/** Maps /services section ids to a sensible default project type. */
export const serviceToProjectType: Record<string, (typeof projectTypes)[number]["value"]> = {
  "ai-engineering": "ai-automation",
  "custom-software": "custom-software",
  "saas-development": "saas",
  "cloud-devops": "cloud-devops",
  "ai-consulting": "ai-consulting",
};

const projectTypeValues = projectTypes.map((p) => p.value) as [string, ...string[]];
const budgetValues = budgets.map((b) => b.value) as [string, ...string[]];

// Name and company end up in the email subject: reject line breaks and other
// control characters so they can't be used to tamper with email headers.
const SINGLE_LINE = /^[^\u0000-\u001f\u007f]*$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Please enter your name." })
    .max(100, { error: "Name must be 100 characters or fewer." })
    .regex(SINGLE_LINE, { error: "Name contains characters that aren't allowed." }),
  email: z
    .string()
    .trim()
    .min(1, { error: "Please enter your work email." })
    .max(200, { error: "Email must be 200 characters or fewer." })
    .pipe(z.email({ error: "Please enter a valid email address." })),
  company: z
    .string()
    .trim()
    .max(150, { error: "Company must be 150 characters or fewer." })
    .regex(SINGLE_LINE, { error: "Company contains characters that aren't allowed." })
    .optional()
    .default(""),
  projectType: z.enum(projectTypeValues, { error: "Please choose a project type." }),
  budget: z.enum(budgetValues, { error: "Please choose an estimated budget." }),
  message: z
    .string()
    .trim()
    .min(20, { error: "Please share a little more detail (at least 20 characters)." })
    .max(5000, { error: "Please keep your description under 5,000 characters." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type FieldErrors = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: FieldErrors; values?: Partial<Record<ContactField, string>> };

export function readContactForm(formData: FormData) {
  const get = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v : "";
  };
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    projectType: get("projectType"),
    budget: get("budget"),
    message: get("message"),
  };
}

export function validateContact(raw: ReturnType<typeof readContactForm>) {
  const result = contactSchema.safeParse(raw);
  if (result.success) return { success: true as const, data: result.data };
  const fieldErrors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { success: false as const, fieldErrors };
}

export function labelFor<T extends readonly { value: string; label: string }[]>(list: T, value: string) {
  return list.find((item) => item.value === value)?.label ?? value;
}
