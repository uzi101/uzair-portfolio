import { Fragment, type ReactNode } from "react";

export function Section({
  id,
  index,
  title,
  kicker,
  children,
}: {
  id: string;
  index: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-4">
            <span className="eyebrow num shrink-0 text-term">{index}</span>
            <h2 className="shrink-0 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              <span className="text-term">/</span>
              {title}
            </h2>
            <div className="rule mt-1 hidden flex-1 sm:block" />
          </div>
          {kicker && <p className="mt-2 pl-9 text-sm text-faint">{kicker}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-line-strong bg-elevated/60 px-2 py-1 text-[11px] text-muted transition-colors group-hover:border-term/25 group-hover:text-ink">
      {children}
    </span>
  );
}

/** The judgment call behind an entry — the thing a list of tasks can't show. */
export function CallOut({ headline, body }: { headline: string; body: string }) {
  return (
    <div className="mt-6 rounded-md border-l-2 border-term/60 bg-term/[0.04] px-4 py-3.5">
      <p className="eyebrow mb-1.5 text-term/80">the call</p>
      <p className="mb-1.5 text-[13px] font-medium text-ink">{headline}</p>
      <p className="prose-sans text-[13px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}


/** Renders `**bold**` spans so the skimmable terms in a bullet stand out. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Monogram standing in for a company logo. */
export function LogoMark({ mark, tint }: { mark: string; tint: string }) {
  return (
    <span
      style={{ color: tint, borderColor: `${tint}55`, backgroundColor: `${tint}14` }}
      className="flex size-7 shrink-0 items-center justify-center rounded border text-[9px] font-bold tracking-tight"
    >
      {mark}
    </span>
  );
}
