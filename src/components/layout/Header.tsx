"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { buttonClasses } from "@/components/ui/Button";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-line bg-bg/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/65"
          : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label={`${siteConfig.name} — home`} onNavigate={close} className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm transition-colors",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href={siteConfig.cta.primary.href}
            className={buttonClasses({ size: "md", className: "max-md:hidden" })}
          >
            {siteConfig.cta.primary.label}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise become the
          containing block for this fixed panel and collapse it. */}
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg md:hidden"
            >
              <nav aria-label="Mobile" className="px-5 pb-10 pt-6 sm:px-8">
                <ul className="divide-y divide-line">
                  {[{ label: "Home", href: "/" }, ...mainNav].map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onNavigate={close}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between py-4 text-2xl font-medium tracking-tight",
                            active ? "text-fg" : "text-muted",
                          )}
                        >
                          {item.label}
                          <ArrowRight aria-hidden className="size-5 opacity-50" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href={siteConfig.cta.primary.href}
                  onNavigate={close}
                  className={buttonClasses({ size: "lg", className: "mt-8 w-full" })}
                >
                  {siteConfig.cta.primary.label}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );
}
