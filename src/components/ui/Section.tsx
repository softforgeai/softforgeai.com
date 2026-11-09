import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-24 md:py-32", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent-fg",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Heading = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center [&_p.eyebrow]:justify-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow>}
      <Heading
        id={id}
        className={cn(
          "mt-4 font-semibold text-fg",
          Heading === "h1"
            ? "text-4xl leading-[1.05] sm:text-5xl md:text-6xl"
            : "text-3xl leading-[1.1] sm:text-4xl md:text-[2.75rem]",
        )}
      >
        {title}
      </Heading>
      {description && <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-line bg-surface/60 p-6 transition-colors duration-300 hover:border-line-strong sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-wider",
        tone === "accent"
          ? "border-accent/30 bg-accent/10 text-accent-fg"
          : "border-line-strong bg-surface-2/60 text-muted",
      )}
    >
      {children}
    </span>
  );
}

export function IconTile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-fg [&_svg]:size-5",
        className,
      )}
    >
      {children}
    </span>
  );
}
