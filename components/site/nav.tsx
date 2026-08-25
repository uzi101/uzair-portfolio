"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "work", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "about", label: "about" },
  { id: "contact", label: "contact" },
];

export function Nav() {
  const [current, setCurrent] = useState("work");
  const [scrolled, setScrolled] = useState(false);

  // IntersectionObserver instead of a scroll listener: the browser does the math
  // off the main thread and we only set state when the active section actually changes.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2 text-sm font-medium text-ink"
        >
          <span className="text-term">~/</span>
          <span>uzair-beg</span>
          <span className="h-4 w-[7px] animate-caret bg-term" aria-hidden />
        </a>

        <ul className="flex items-center gap-1 sm:gap-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={current === s.id ? "true" : undefined}
                className={`relative block px-2 py-1.5 text-xs transition-colors sm:px-3 ${
                  current === s.id ? "text-term" : "text-faint hover:text-ink"
                }`}
              >
                <span className="hidden sm:inline">{current === s.id ? "› " : "  "}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
