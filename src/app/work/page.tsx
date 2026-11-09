import { Info } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Badge, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Work",
  description:
    "Examples of the AI and software systems SoftForge AI builds: document intelligence, AI customer support agents, and intelligent workflow automation.",
  path: "/work",
});

export default function WorkPage() {
  const hasDemos = projects.some((p) => p.isDemo);

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Systems that solve real problems."
        description="A look at the kinds of AI and software solutions we design and build — the problem, our approach, and the technology behind it."
      >
        {hasDemos && (
          <p className="flex max-w-2xl items-start gap-3 rounded-xl border border-accent/25 bg-accent/5 p-4 text-sm leading-relaxed text-muted">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-fg" />
            <span>
              Projects marked <strong className="font-medium text-fg">Demonstration</strong> are illustrative
              concepts showing our approach. They are not client engagements, and their outcomes are intended
              goals rather than measured results. Client case studies will be added once approved for
              publication.
            </span>
          </p>
        )}
      </PageHeader>

      <Container className="space-y-6 py-20 md:py-28">
        {projects.map((project, index) => (
          <Reveal key={project.slug}>
            <article
              id={project.slug}
              aria-labelledby={`${project.slug}-title`}
              className="scroll-mt-28 overflow-hidden rounded-3xl border border-line bg-surface/60"
            >
              <header className="flex flex-col gap-5 border-b border-line p-7 sm:p-10 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
                    {project.isDemo && <Badge tone="accent">Demonstration</Badge>}
                    <Badge>{project.industry}</Badge>
                  </div>
                  <h2
                    id={`${project.slug}-title`}
                    className="mt-5 text-2xl font-semibold text-fg sm:text-3xl"
                  >
                    {project.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-muted">{project.summary}</p>
                </div>
              </header>

              <div className="grid md:grid-cols-2">
                <div className="border-b border-line p-7 sm:p-10 md:border-b-0 md:border-r">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Problem</h3>
                  <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>
                  <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-subtle">Solution</h3>
                  <p className="mt-3 leading-relaxed text-muted">{project.solution}</p>
                </div>
                <div className="p-7 sm:p-10">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Technologies</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <li
                        key={t}
                        className="rounded-lg border border-line bg-surface-2/60 px-3 py-1.5 text-sm text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-subtle">
                    {project.isDemo ? "Intended business impact" : "Business impact"}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {project.impact.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-fg">
                        <span
                          aria-hidden
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </Container>

      <FinalCta
        title="Let's build your success story."
        description="Have a similar challenge? We'd love to hear about it and explore how we can help."
      />
    </>
  );
}
