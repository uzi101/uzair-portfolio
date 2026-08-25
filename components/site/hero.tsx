import { profile, stats } from "@/lib/content";
import { Terminal } from "./terminal";

export function Hero() {
  return (
    <section id="top" className="relative z-10 px-5 pb-6 pt-32 sm:px-8 sm:pb-10 sm:pt-40">
      <span id="top-sentinel" className="absolute top-0 h-px w-px" aria-hidden />

      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-term opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-term" />
            </span>
            {profile.status}
          </p>

          <h1 className="mt-6 text-[clamp(2.75rem,9vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-ink">
            UZAIR
            <br />
            BEG
            <span className="text-term">.</span>
          </h1>

          <p className="mt-5 text-sm text-term">
            {profile.role}{" "}
            <span className="text-faint">— {profile.location}</span>
          </p>

          <p className="prose-sans mt-6 max-w-lg text-[15px] leading-relaxed text-muted">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-term px-5 py-2.5 text-[13px] font-semibold text-bg transition-opacity hover:opacity-85"
            >
              Let&apos;s chat ↗
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-md border border-line-strong px-5 py-2.5 text-[13px] text-ink transition-colors hover:border-term/50 hover:text-term"
            >
              Email
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line-strong px-5 py-2.5 text-[13px] text-ink transition-colors hover:border-term/50 hover:text-term"
            >
              GitHub
            </a>
          </div>
        </div>

        <Terminal />
      </div>

      <dl className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:mt-20 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-bg px-5 py-6">
            <dt className="num text-3xl font-semibold tracking-tight text-term sm:text-4xl">
              {s.value}
            </dt>
            <dd className="mt-2 text-[13px] leading-snug text-ink">{s.label}</dd>
            <dd className="mt-1 text-[11px] text-faint">{s.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
