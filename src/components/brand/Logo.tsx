import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * SoftForge AI mark: an "S" drawn as a circuit trace connecting three nodes —
 * engineering structure (orthogonal traces), connected systems (nodes) and
 * intelligence (the accent core at the centre).
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  const id = useId();
  const gradId = `sf-grad-${id}`;
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={gradId} x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent, #8B5CF6)" />
          <stop offset="1" stopColor="var(--accent-2, #38BDF8)" />
        </linearGradient>
      </defs>
      <path
        d="M24 8H12.5A4.5 4.5 0 0 0 8 12.5v0A3.5 3.5 0 0 0 11.5 16h9a3.5 3.5 0 0 1 3.5 3.5v0a4.5 4.5 0 0 1-4.5 4.5H8"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="8" r="2.6" fill="currentColor" />
      <circle cx="8" cy="24" r="2.6" fill="currentColor" />
      <circle cx="16" cy="16" r="3.4" fill={`url(#${gradId})`} stroke="var(--bg, #080B12)" strokeWidth="1.6" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-fg", className)}>
      <LogoMark className="size-7" />
      <span className="text-[1.05rem] font-semibold tracking-tight">
        SoftForge<span className="ml-1 text-muted">AI</span>
      </span>
    </span>
  );
}
