"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Re-applies scroll-reveal animations whenever the route changes.
export default function Fx() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal:not(.in)"));
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}
