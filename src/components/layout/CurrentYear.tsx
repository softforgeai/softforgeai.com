"use client";

import { useSyncExternalStore } from "react";

const FALLBACK_YEAR = 2026;
const subscribe = () => () => {};

/**
 * The prerendered shell can't read the clock, so it renders a fixed fallback
 * and the browser swaps in the current year after hydration.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => FALLBACK_YEAR,
  );
  return <>{year}</>;
}
