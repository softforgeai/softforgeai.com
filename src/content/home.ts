import type { LucideIcon } from "lucide-react";
import {
  Bot,
  AudioLines,
  FileSearch,
  Layers,
  Workflow,
  Cloud,
  Target,
  ShieldCheck,
  Gauge,
  MessagesSquare,
  Code,
  Handshake,
  Search,
  PenTool,
  Hammer,
  Rocket,
  LineChart,
} from "lucide-react";

export const capabilities: { label: string; icon: LucideIcon }[] = [
  { label: "AI Agents", icon: Bot },
  { label: "RAG & Knowledge Systems", icon: FileSearch },
  { label: "Voice AI", icon: AudioLines },
  { label: "Workflow Automation", icon: Workflow },
  { label: "SaaS Platforms", icon: Layers },
  { label: "Cloud & DevOps", icon: Cloud },
];

export const audiences = [
  "Startup founders",
  "SaaS companies",
  "Small & mid-sized businesses",
  "Technology companies",
  "Healthcare technology",
  "Operations-heavy teams",
];

export const problemsWeSolve = [
  "Manual, repetitive operations that don't scale",
  "Product ideas that need to reach market quickly",
  "AI experiments that never reach production",
  "Systems that can't keep up with growth",
];

export const principles: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Business outcomes first",
    description:
      "We start with the problem and the result you need, then choose the technology — not the other way around.",
    icon: Target,
  },
  {
    title: "Production-grade AI",
    description:
      "Evaluation, guardrails, monitoring, and human-in-the-loop design so AI behaves predictably in the real world.",
    icon: Gauge,
  },
  {
    title: "Engineering discipline",
    description:
      "Typed code, automated tests, code review, and CI/CD on every project. Built to be maintained, not just demoed.",
    icon: Code,
  },
  {
    title: "Security & privacy by design",
    description:
      "Least-privilege access, careful data handling, and clear choices about which data reaches which model.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent communication",
    description:
      "Regular demos, written updates, and direct access to the engineers building your product.",
    icon: MessagesSquare,
  },
  {
    title: "You own what we build",
    description:
      "Clean, documented code and infrastructure in your accounts. No lock-in, no black boxes.",
    icon: Handshake,
  },
];

export const processSteps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Discover",
    description:
      "We learn your business, users, and constraints, and define what success looks like.",
    icon: Search,
  },
  {
    title: "Design",
    description:
      "Architecture, user experience, and a delivery plan with clear milestones and scope.",
    icon: PenTool,
  },
  {
    title: "Build",
    description:
      "Iterative development in short cycles, with working software demoed regularly.",
    icon: Hammer,
  },
  {
    title: "Launch",
    description:
      "Testing, security review, deployment, and a smooth hand-over to your team and users.",
    icon: Rocket,
  },
  {
    title: "Scale",
    description:
      "Monitoring, optimisation, and ongoing improvements as your product and usage grow.",
    icon: LineChart,
  },
];

export const techStack: { group: string; items: string[] }[] = [
  {
    group: "AI & Machine Learning",
    items: ["OpenAI", "Anthropic Claude", "Open-source LLMs", "LangChain", "LlamaIndex", "pgvector", "Pinecone"],
  },
  {
    group: "Frontend & Mobile",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native"],
  },
  {
    group: "Backend & Data",
    items: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS", "Google Cloud", "Azure", "Vercel", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
];
