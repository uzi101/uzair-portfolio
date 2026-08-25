"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/lib/content";

type Item = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Links" | "Contact";
  run: () => void;
  keywords?: string;
};

const go = (hash: string) => () => {
  document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const open = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(
    () => [
      { id: "work", label: "Experience", hint: "section", group: "Navigate", run: go("work"), keywords: "jpmorgan icicle paws drb snap job" },
      { id: "projects", label: "Projects", hint: "section", group: "Navigate", run: go("projects"), keywords: "multai quantlib aether opportunityedu" },
      { id: "about", label: "About", hint: "section", group: "Navigate", run: go("about"), keywords: "bio gym poker education" },
      { id: "contact", label: "Contact", hint: "section", group: "Navigate", run: go("contact"), keywords: "email phone reach" },
      { id: "github", label: "GitHub", hint: `@${profile.handle}`, group: "Links", run: open(profile.links.github), keywords: "code source repo" },
      { id: "linkedin", label: "LinkedIn", hint: "uzair-beg", group: "Links", run: open(profile.links.linkedin) },
      { id: "calendly", label: "Let\u2019s chat", hint: "Calendly \u00b7 30 min", group: "Contact", run: open(profile.links.calendly), keywords: "meeting schedule call resume cv" },
      { id: "email", label: "Send an email", hint: profile.email, group: "Contact", run: () => { window.location.href = `mailto:${profile.email}`; } },
      {
        id: "copy",
        label: "Copy email address",
        hint: profile.email,
        group: "Contact",
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => setCopied(true),
            () => setCopied(false),
          );
        },
      },
    ],
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.label} ${i.hint} ${i.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const select = useCallback(
    (item: Item | undefined) => {
      if (!item) return;
      item.run();
      // "Copy" is the one action whose feedback lives inside the palette.
      if (item.id !== "copy") close();
    },
    [close],
  );

  // Global hotkeys: cmd/ctrl-K toggles, "/" opens when not already typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable || ["INPUT", "TEXTAREA"].includes(e.target.tagName));

      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((v) => !v);
        return;
      }
      if (e.key === "/" && !typing && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Lock background scroll while the palette owns the screen.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  if (!isOpen) return <PaletteTrigger onOpen={() => setIsOpen(true)} />;

  let cursor = -1;

  return (
    <>
      <PaletteTrigger onOpen={() => setIsOpen(true)} />
      <div
        className="fixed inset-0 z-[90] flex items-start justify-center bg-bg/80 px-4 pt-[12vh] backdrop-blur-sm"
        onClick={close}
        role="presentation"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl overflow-hidden rounded-xl border border-line-strong bg-elevated shadow-2xl shadow-black/60"
        >
          <div className="flex items-center gap-3 border-b border-line px-4">
            <span className="text-term" aria-hidden>
              &gt;
            </span>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="Jump to a section, open a link…"
              aria-label="Search commands"
              className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-faint"
            />
            <kbd className="hidden shrink-0 rounded border border-line-strong px-1.5 py-0.5 text-[10px] text-faint sm:block">
              ESC
            </kbd>
          </div>

          <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
            {results.length === 0 && (
              <p className="px-3 py-8 text-center text-sm text-faint">No matches.</p>
            )}
            {(["Navigate", "Links", "Contact"] as const).map((group) => {
              const inGroup = results.filter((r) => r.group === group);
              if (!inGroup.length) return null;
              return (
                <div key={group} className="mb-1">
                  <p className="eyebrow px-3 py-2">{group}</p>
                  {inGroup.map((item) => {
                    cursor += 1;
                    const index = cursor;
                    const isActive = index === active;
                    return (
                      <button
                        key={item.id}
                        data-index={index}
                        onMouseMove={() => setActive(index)}
                        onClick={() => select(item)}
                        className={`flex w-full items-center justify-between gap-4 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                          isActive ? "bg-term/10 text-term" : "text-muted hover:text-ink"
                        }`}
                      >
                        <span>
                          {item.id === "copy" && copied ? "Copied to clipboard" : item.label}
                        </span>
                        <span className="shrink-0 text-[11px] text-faint">{item.hint}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[11px] text-faint">
            <span>
              <Key>↑</Key>
              <Key>↓</Key> navigate
            </span>
            <span>
              <Key>↵</Key> select
            </span>
            <span className="ml-auto hidden sm:inline">
              <Key>⌘</Key>
              <Key>K</Key> toggle
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mr-1 inline-block min-w-[18px] rounded border border-line-strong px-1 text-center text-[10px] leading-4 text-muted">
      {children}
    </kbd>
  );
}

/** Persistent affordance so the shortcut is discoverable rather than secret. */
function PaletteTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      aria-label="Open command palette"
      className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full border border-line-strong bg-elevated/90 px-4 py-2.5 text-xs text-muted shadow-lg shadow-black/40 backdrop-blur transition-colors hover:border-term/40 hover:text-term md:flex"
    >
      <span className="text-term">⌘</span>
      <span>K</span>
      <span className="text-faint">to navigate</span>
    </button>
  );
}
