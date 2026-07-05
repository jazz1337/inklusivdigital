import { useState } from "react";

/**
 * Stateful pause/play toggle for looping decorative animations. Starts
 * already paused if the OS-level "reduce motion" preference is active.
 */
export function useAnimPaused() {
  return useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
}

/**
 * Stateless one-shot check for single, non-looping reveal animations
 * (e.g. a score ring filling in once) — no pause control needed since
 * the animation finishes in under a second.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
