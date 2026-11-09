import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/Section";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-fade-b" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-40%] -z-10 h-[420px] w-[800px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 22%, transparent), transparent)",
        }}
      />
      <Container className="pb-20 pt-16 md:pb-24 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            id="page-title"
            className="mt-5 text-4xl font-semibold leading-[1.05] text-fg sm:text-5xl md:text-6xl"
          >
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{description}</p>
          {children && <div className="mt-9">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
