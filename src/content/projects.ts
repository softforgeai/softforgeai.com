/**
 * Portfolio entries.
 *
 * IMPORTANT: entries with `isDemo: true` are demonstration concepts that show
 * the kind of systems SoftForge AI builds. They are NOT client engagements and
 * must stay labelled as such. When real client work is approved for
 * publication, add it here with `isDemo: false` and real, verified outcomes.
 */

export type Project = {
  slug: string;
  title: string;
  industry: string;
  isDemo: boolean;
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  /** For demos these are intended outcomes, not measured results. */
  impact: string[];
};

export const projects: Project[] = [
  {
    slug: "ai-document-intelligence",
    title: "AI Document Intelligence Platform",
    industry: "Finance & Operations",
    isDemo: true,
    summary:
      "Turning unstructured documents into validated, structured data that flows straight into business systems.",
    problem:
      "Operations teams manually read invoices, contracts, and forms, then re-key the data into accounting and ERP systems. The work is slow, repetitive, and prone to errors.",
    solution:
      "A document pipeline that classifies incoming files, extracts key fields with an LLM, validates them against business rules, and routes low-confidence results to a human reviewer before syncing to downstream systems.",
    technologies: ["Next.js", "Python", "FastAPI", "LLM APIs", "PostgreSQL", "pgvector", "AWS"],
    impact: [
      "Reduce manual data entry",
      "Human review focused only on uncertain cases",
      "Full audit trail for every extracted field",
    ],
  },
  {
    slug: "ai-customer-support-agent",
    title: "AI Customer Support Agent",
    industry: "SaaS & E-commerce",
    isDemo: true,
    summary:
      "An assistant that resolves routine questions instantly and hands complex cases to people with full context.",
    problem:
      "Support teams answer the same questions repeatedly, response times suffer during peak periods, and customers wait for answers that already exist in the help centre.",
    solution:
      "A retrieval-augmented support agent grounded in the help centre, product docs, and order data. It answers with cited sources, takes safe actions via APIs, and escalates to a human agent inside the existing helpdesk.",
    technologies: ["TypeScript", "Node.js", "RAG", "LLM APIs", "Vector database", "Helpdesk APIs"],
    impact: [
      "Faster first responses, around the clock",
      "Agents freed for complex conversations",
      "Answers grounded in approved content",
    ],
  },
  {
    slug: "intelligent-workflow-automation",
    title: "Intelligent Business Workflow Automation",
    industry: "Professional Services",
    isDemo: true,
    summary:
      "Connecting CRM, email, and internal tools into automated workflows with AI handling the judgement calls.",
    problem:
      "Lead intake, qualification, onboarding, and reporting depend on people copying information between tools, so work slips through the cracks and visibility is poor.",
    solution:
      "An orchestration layer that listens for events across CRM, email, and forms, uses AI to classify and summarise requests, triggers the right workflow, and reports status in a single dashboard.",
    technologies: ["Next.js", "Node.js", "Workflow engine", "LLM APIs", "CRM integrations", "PostgreSQL"],
    impact: [
      "Consistent, repeatable processes",
      "Fewer manual hand-offs between tools",
      "Real-time visibility into pipeline status",
    ],
  },
];
