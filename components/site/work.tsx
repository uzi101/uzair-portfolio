import { experience } from "@/lib/content";
import { CallOut, Chip, LogoMark, RichText, Section } from "./primitives";

export function Work() {
  return (
    <Section id="work" index="01" title="experience" kicker="Each one names the call, not the task.">
      <ol className="relative">
        {/* Spine: pinned left on mobile, centered once there's room to alternate. */}
        <div
          aria-hidden
          className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-term/40 via-line-strong to-transparent md:left-1/2"
        />

        {experience.map((exp, i) => {
          const left = i % 2 === 0;
          return (
            <li key={`${exp.company}-${exp.period}`} className="relative pb-12 last:pb-0">
              <span
                aria-hidden
                className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-term bg-bg md:left-1/2 md:-translate-x-1/2"
              />

              <div className="md:grid md:grid-cols-2 md:gap-x-14">
                <div
                  className={
                    left
                      ? "pl-8 md:col-start-1 md:row-start-1 md:pl-0"
                      : "pl-8 md:col-start-2 md:row-start-1 md:pl-0"
                  }
                >
                  <div className="group rounded-lg border border-line bg-raised/40 p-5 transition-colors hover:border-term/25 sm:p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-ink">{exp.role}</h3>

                    <div className="mt-3 flex flex-wrap items-center gap-2.5">
                      <span className="flex items-center gap-2 rounded-full border border-line bg-elevated py-1 pl-1 pr-3">
                        <LogoMark {...exp.logo} />
                        <span className="text-[12px] text-ink">{exp.company}</span>
                      </span>
                    </div>

                    <p className="num mt-2.5 text-[11.5px] text-faint">
                      {exp.period} <span className="text-line-strong">·</span> {exp.location}
                    </p>

                    <p className="prose-sans mt-4 text-[13.5px] leading-relaxed text-muted">
                      {exp.summary}
                    </p>

                    <ul className="mt-4 space-y-2.5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2.5">
                          <span
                            aria-hidden
                            className="mt-[7px] size-1 shrink-0 rounded-full bg-term/50"
                          />
                          <span className="prose-sans text-[13px] leading-relaxed text-muted">
                            <RichText text={b} />
                          </span>
                        </li>
                      ))}
                    </ul>

                    {exp.call && <CallOut {...exp.call} />}

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {exp.stack.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
