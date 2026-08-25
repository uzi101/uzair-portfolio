import { projects, type Project } from "@/lib/content";
import { Chip, Section } from "./primitives";

const TONE = {
  live: "border-term/30 bg-term/10 text-term",
  amber: "border-amber/30 bg-amber/10 text-amber",
  muted: "border-line-strong bg-elevated text-faint",
} as const;

const CATEGORIES = ["Startups", "Systems & Open Source"] as const;

export function Projects() {
  const featured = projects.find((p) => p.featured);

  return (
    <Section id="projects" index="02" title="projects" kicker="Built outside an assignment.">
      {featured && <Featured project={featured} />}

      <div className="mt-14 space-y-12">
        {CATEGORIES.map((category) => {
          const items = projects.filter((p) => p.category === category && !p.featured);
          if (!items.length) return null;
          return (
            <div key={category}>
              <div className="mb-6 flex items-center gap-3">
                <h3 className="text-sm font-medium text-ink">{category}</h3>
                <span className="h-px w-10 bg-term/60" />
                <span className="num text-[11px] text-faint">{items.length}</span>
              </div>
              <div
                className={`grid gap-5 ${
                  items.length <= 2 || items.length === 4
                    ? "md:grid-cols-2"
                    : "md:grid-cols-3"
                }`}
              >
                {items.map((p) => (
                  <Card key={p.name} project={p} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Featured({ project: p }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-line bg-raised/40 transition-colors hover:border-term/25">
      <div className="h-px bg-gradient-to-r from-term/60 via-term/20 to-transparent" />
      <div className="p-5 sm:p-8">
        <Header project={p} size="lg" />
        <p className="prose-sans mt-4 max-w-3xl text-[14.5px] leading-relaxed text-muted">
          {p.blurb}
        </p>
        {p.detail.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {p.detail.map((d, i) => (
              <div key={i} className="rounded-md border border-line bg-bg/60 p-4">
                <span className="eyebrow num text-term/70">{String(i + 1).padStart(2, "0")}</span>
                <p className="prose-sans mt-2 text-[13px] leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        )}
        <Stack items={p.stack} />
      </div>
    </article>
  );
}

function Card({ project: p }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-line bg-raised/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-term/25">
      <div className="h-px bg-line transition-colors group-hover:bg-term/40" />
      <div className="flex flex-1 flex-col p-5">
        <Header project={p} size="sm" />
        <p className="prose-sans mt-3.5 flex-1 text-[13px] leading-relaxed text-muted">{p.blurb}</p>
        <Stack items={p.stack} />
      </div>
    </article>
  );
}

function Header({ project: p, size }: { project: Project; size: "sm" | "lg" }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h4
          className={`font-semibold tracking-tight text-ink ${
            size === "lg" ? "text-lg sm:text-xl" : "text-base"
          }`}
        >
          {p.href ? (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-term"
            >
              {p.name}{" "}
              <span className="text-faint transition-colors group-hover:text-term">↗</span>
            </a>
          ) : (
            p.name
          )}
        </h4>
        <p className="mt-1 text-[11.5px] text-faint">
          {p.kind} <span className="text-line-strong">·</span> {p.period}
        </p>
      </div>
      {p.status && (
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[10.5px] ${TONE[p.status.tone]}`}
        >
          {p.status.label}
        </span>
      )}
    </div>
  );
}

function Stack({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <Chip key={t}>{t}</Chip>
      ))}
    </div>
  );
}
