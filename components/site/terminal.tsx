"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Line = { text: string; tone: "cmd" | "out" | "dim" | "ok" };

const LINES: Line[] = [
  { text: "$ whoami", tone: "cmd" },
  { text: "uzair beg — systems & applied ai engineer", tone: "out" },
  { text: "", tone: "dim" },
  { text: "$ cat now.txt", tone: "cmd" },
  { text: "building multai — agent networks for teams", tone: "out" },
  { text: "patching io_uring in the linux kernel", tone: "out" },
  { text: "b.s. cse @ ohio state, dec 2026", tone: "out" },
  { text: "", tone: "dim" },
  { text: "$ ls ~/shipped", tone: "cmd" },
  { text: "payments-integration-lib/   devvy-agent-runtime/", tone: "dim" },
  { text: "harvest-inference/          multai/", tone: "dim" },
  { text: "", tone: "dim" },
  { text: "$ ./status --availability", tone: "cmd" },
  { text: "● seeking work that excites me", tone: "ok" },
];

const TONE: Record<Line["tone"], string> = {
  cmd: "text-term",
  out: "text-ink",
  dim: "text-faint",
  ok: "text-amber",
};

const CHAR_MS = 6;
/** Held at each line break so output lands in readable beats. */
const LINE_PAUSE_MS = 95;

export function Terminal() {
  /**
   * Precomputed reveal time for every character. Driving the animation off
   * elapsed wall-clock rather than a per-frame counter means a throttled
   * rAF (background tab, low-power mode) catches up instead of freezing.
   */
  const schedule = useMemo(() => {
    const times: number[] = [];
    let t = 0;
    for (const line of LINES) {
      for (let i = 0; i < line.text.length; i += 1) {
        t += CHAR_MS;
        times.push(t);
      }
      t += LINE_PAUSE_MS;
      times.push(t); // the newline itself
    }
    return times;
  }, []);

  const total = schedule.length;
  const [revealed, setRevealed] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(total);
      setDone(true);
      return;
    }

    const start = performance.now();
    let cursor = 0;

    // setInterval rather than rAF: a backgrounded tab throttles it but never
    // pauses it outright, so the elapsed-time schedule always converges.
    timer.current = setInterval(() => {
      const elapsed = performance.now() - start;
      while (cursor < total && schedule[cursor] <= elapsed) cursor += 1;
      setRevealed(cursor);
      if (cursor >= total) {
        stop();
        setDone(true);
      }
    }, 16);

    return stop;
  }, [schedule, total]);

  const skip = () => {
    stop();
    setRevealed(total);
    setDone(true);
  };

  let consumed = 0;
  const rendered = LINES.map((line, i) => {
    const start = consumed;
    consumed += line.text.length + 1;
    return {
      key: i,
      line,
      shown: Math.max(0, Math.min(line.text.length, revealed - start)),
      started: revealed > start || i === 0,
    };
  });

  let activeIndex = -1;
  for (let i = rendered.length - 1; i >= 0; i -= 1) {
    if (rendered[i].started) {
      activeIndex = i;
      break;
    }
  }

  return (
    <div className="scanlines overflow-hidden rounded-lg border border-line-strong bg-raised shadow-2xl shadow-black/50">
      <div className="flex items-center gap-3 border-b border-line bg-elevated px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center text-[11px] text-faint">uzair@portfolio — zsh</span>
        <button
          onClick={skip}
          className={`text-[10px] uppercase tracking-widest transition-colors hover:text-term ${
            done ? "invisible" : "text-faint"
          }`}
          aria-hidden={done}
          tabIndex={done ? -1 : 0}
        >
          skip
        </button>
      </div>

      <div className="px-4 py-4 text-[12.5px] leading-[1.75] sm:px-5 sm:text-[13px]">
        {rendered.map(({ line, shown, started, key }, i) => (
          <div
            key={key}
            className={`${TONE[line.tone]} min-h-[1.75em] whitespace-pre-wrap break-words`}
          >
            {started ? line.text.slice(0, shown) : ""}
            {i === activeIndex && !done && (
              <span className="ml-px inline-block h-[1em] w-[7px] translate-y-[2px] bg-term" />
            )}
          </div>
        ))}
        <div className="min-h-[1.75em] text-term">
          {done && (
            <>
              ${" "}
              <span className="ml-px inline-block h-[1em] w-[7px] translate-y-[2px] animate-caret bg-term" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
