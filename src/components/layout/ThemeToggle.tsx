"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

export const THEME_STORAGE_KEY = "sf-theme";

/** Inline script that applies the saved theme before first paint (no flash). */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

/**
 * The visible icon is driven purely by CSS (the `light:` variant reads
 * data-theme on <html>), so server and client markup always match.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      <Sun aria-hidden className="size-[18px] light:hidden" />
      <Moon aria-hidden className="hidden size-[18px] light:block" />
    </button>
  );
}
