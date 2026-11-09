import type { LucideIcon } from "lucide-react";
import { Bot, Code, Cloud, Layers, Compass } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Primary service categories (used on the homepage)                         */
/* -------------------------------------------------------------------------- */

export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  offerings: string[];
  href: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "ai-engineering",
    title: "AI Engineering & Automation",
    description:
      "We build intelligent AI-powered systems that automate repetitive operations, improve customer experiences, and help businesses operate more efficiently.",
    icon: Bot,
    href: "/services#ai-engineering",
    offerings: [
      "AI Agents & Agentic Workflows",
      "AI Customer Support Automation",
      "AI Voice Agents",
      "Retrieval-Augmented Generation (RAG)",
      "LLM Integration",
      "Business Process Automation",
      "CRM & Third-Party Integrations",
      "Document Intelligence & Extraction",
    ],
  },
  {
    id: "custom-software",
    title: "Custom Software & SaaS Development",
    description:
      "From initial concepts to production-ready platforms, we engineer scalable software products that solve real business challenges.",
    icon: Code,
    href: "/services#custom-software",
    offerings: [
      "Custom Web Application Development",
      "SaaS Platform Development",
      "MVP Development",
      "Backend & API Engineering",
      "Full-Stack Application Development",
      "Mobile Application Development",
      "Database Architecture",
      "System Integration",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & Engineering Solutions",
    description:
      "We help businesses build, deploy, maintain, and scale reliable technology infrastructure.",
    icon: Cloud,
    href: "/services#cloud-devops",
    offerings: [
      "Cloud Infrastructure",
      "DevOps & CI/CD",
      "Microservices Architecture",
      "System Modernization",
      "Performance Optimization",
      "Application Maintenance",
      "Technical Consulting",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Detailed services (used on /services)                                     */
/* -------------------------------------------------------------------------- */

export type ServiceDetail = {
  id: string;
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  problems: string[];
  capabilities: string[];
  useCases: { title: string; description: string }[];
};

export const services: ServiceDetail[] = [
  {
    id: "ai-engineering",
    eyebrow: "01 — AI Engineering & Automation",
    title: "AI systems that do real work",
    icon: Bot,
    summary:
      "We design and build AI agents, retrieval systems, and automated workflows that plug into the tools your team already uses. The focus is on reliability: clear scope, measurable behaviour, guardrails, and human oversight where it matters.",
    problems: [
      "Teams spend hours on repetitive, rules-based work",
      "Support queues grow faster than headcount",
      "Knowledge is scattered across documents, tickets, and inboxes",
      "AI pilots that never make it to production",
    ],
    capabilities: [
      "AI agents & agentic workflows",
      "Customer support automation",
      "AI voice agents",
      "Retrieval-augmented generation (RAG)",
      "LLM integration & prompt engineering",
      "Document intelligence & extraction",
      "Evaluation, monitoring & guardrails",
      "CRM & third-party integrations",
    ],
    useCases: [
      {
        title: "Support triage and resolution",
        description:
          "An agent that answers common questions from your knowledge base, drafts replies, and escalates edge cases to a human with full context.",
      },
      {
        title: "Document processing",
        description:
          "Extract structured data from invoices, contracts, or forms and push it into your systems with validation and review steps.",
      },
      {
        title: "Internal knowledge assistant",
        description:
          "A secure assistant that answers questions grounded in your company documents, with sources cited.",
      },
    ],
  },
  {
    id: "custom-software",
    eyebrow: "02 — Custom Software Development",
    title: "Software built around how you operate",
    icon: Code,
    summary:
      "When off-the-shelf tools stop fitting, we build web and mobile applications tailored to your workflows, with clean architecture that your team can own and extend.",
    problems: [
      "Critical processes run on spreadsheets and manual hand-offs",
      "Existing tools don't integrate with each other",
      "Legacy systems slow down every new feature",
      "No in-house team to design and build a new product",
    ],
    capabilities: [
      "Custom web applications",
      "Full-stack development",
      "Backend & API engineering",
      "Mobile applications",
      "Database architecture",
      "System integration",
    ],
    useCases: [
      {
        title: "Internal operations platforms",
        description:
          "Replace fragmented spreadsheets with a single application for scheduling, approvals, reporting, or inventory.",
      },
      {
        title: "Customer portals",
        description:
          "Give your customers a secure place to manage accounts, orders, documents, and support.",
      },
      {
        title: "Integration layers",
        description:
          "Connect CRMs, ERPs, payment providers, and internal tools through well-documented APIs.",
      },
    ],
  },
  {
    id: "saas-development",
    eyebrow: "03 — SaaS Development",
    title: "From MVP to scalable SaaS platform",
    icon: Layers,
    summary:
      "We help founders validate ideas quickly and grow them into dependable products — multi-tenant architecture, billing, authentication, analytics, and the AI features that set your product apart.",
    problems: [
      "Need to launch an MVP quickly without accumulating technical debt",
      "Product is outgrowing its original architecture",
      "Adding AI features to an existing product",
      "Lacking senior engineering leadership",
    ],
    capabilities: [
      "MVP scoping & development",
      "Multi-tenant SaaS architecture",
      "Authentication, roles & permissions",
      "Subscription billing integration",
      "Product analytics & dashboards",
      "AI-powered product features",
    ],
    useCases: [
      {
        title: "Founder MVPs",
        description:
          "A focused first version that gets your product in front of real users, built on foundations that can scale.",
      },
      {
        title: "AI feature layer",
        description:
          "Add summarisation, search, copilots, or automation to an existing SaaS product.",
      },
      {
        title: "Platform re-architecture",
        description:
          "Evolve a growing product toward a cleaner, more scalable architecture without stopping delivery.",
      },
    ],
  },
  {
    id: "cloud-devops",
    eyebrow: "04 — Cloud & DevOps",
    title: "Infrastructure you can rely on",
    icon: Cloud,
    summary:
      "We set up and maintain cloud infrastructure, deployment pipelines, and monitoring so your software ships faster and stays up — with costs and security kept in check.",
    problems: [
      "Manual, error-prone deployments",
      "Rising cloud costs without clear visibility",
      "Performance issues as usage grows",
      "Ageing systems that are hard to maintain",
    ],
    capabilities: [
      "Cloud infrastructure (AWS, GCP, Azure)",
      "DevOps & CI/CD pipelines",
      "Infrastructure as code",
      "Microservices architecture",
      "System modernisation",
      "Performance optimisation",
      "Monitoring & observability",
      "Application maintenance",
    ],
    useCases: [
      {
        title: "Automated delivery pipelines",
        description:
          "Testing, preview environments, and one-click deployments so your team ships with confidence.",
      },
      {
        title: "Legacy modernisation",
        description:
          "Migrate monoliths or on-premise systems to modern cloud infrastructure in safe, incremental steps.",
      },
      {
        title: "Cost and performance reviews",
        description:
          "Identify bottlenecks and wasted spend, then implement targeted improvements.",
      },
    ],
  },
  {
    id: "ai-consulting",
    eyebrow: "05 — AI Integration & Consulting",
    title: "A clear path from AI idea to impact",
    icon: Compass,
    summary:
      "Not sure where AI fits in your business? We help you identify high-value opportunities, assess feasibility and risk, and plan an implementation that makes commercial sense.",
    problems: [
      "Unclear which processes would benefit from AI",
      "Concerns about data privacy, accuracy, and cost",
      "Choosing between models, vendors, and build vs. buy",
      "Leadership needs a practical roadmap, not hype",
    ],
    capabilities: [
      "AI opportunity assessment",
      "Technical feasibility & prototyping",
      "Model and vendor selection",
      "Data readiness review",
      "Security, privacy & risk review",
      "Implementation roadmap",
      "Technical consulting",
    ],
    useCases: [
      {
        title: "AI discovery workshop",
        description:
          "A structured session to map processes, rank opportunities, and agree on a first project.",
      },
      {
        title: "Proof of concept",
        description:
          "A time-boxed prototype that tests whether an AI approach works on your real data.",
      },
      {
        title: "Architecture review",
        description:
          "An independent review of an existing AI or software system with prioritised recommendations.",
      },
    ],
  },
];
