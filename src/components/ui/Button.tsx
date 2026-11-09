import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-fg/90 shadow-[0_1px_0_0_rgb(255_255_255/0.15)_inset,0_8px_24px_-12px_color-mix(in_oklab,var(--accent)_60%,transparent)]",
  secondary: "border border-line-strong bg-surface/40 text-fg hover:border-fg/30 hover:bg-surface",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  children: ReactNode;
};

export function ButtonLink({ variant, size, className, arrow, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
