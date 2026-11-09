"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm text-accent-fg">Something went wrong</p>
      <h1 className="mt-4 text-4xl font-semibold text-fg sm:text-5xl">We hit an unexpected error.</h1>
      <p className="mt-5 max-w-md text-lg text-muted">
        Please try again. If the problem continues, come back in a few minutes.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className={buttonClasses({ size: "lg" })}>
          Try again
        </button>
        <Link href="/" className={buttonClasses({ size: "lg", variant: "secondary" })}>
          Back to home
        </Link>
      </div>
    </Container>
  );
}
