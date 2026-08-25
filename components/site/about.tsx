import { about, education, now } from "@/lib/content";
import { Section } from "./primitives";
import { TechGrid } from "./tech-grid";

export function About() {
  return (
    <Section id="about" index="03" title="about">
      <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="space-y-5">
          {about.map((p, i) => (
            <p key={i} className="prose-sans text-[15px] leading-[1.75] text-muted">
              {p}
            </p>
          ))}
        </div>

        <div className="space-y-10">
          <div>
            <p className="eyebrow mb-4">Currently</p>
            <ul className="space-y-2">
              {now.map((item) => (
                <li key={item} className="flex gap-2.5 text-[13px] text-muted">
                  <span className="text-term">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Education</p>
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.school} className="border-l-2 border-line pl-4">
                  <p className="text-[13.5px] text-ink">{e.degree}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted">{e.school}</p>
                  <p className="num mt-0.5 text-[11px] text-faint">{e.period}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <p className="mb-8 text-sm text-ink">
          <span className="text-term">$</span> cat ~/.stack
        </p>
        <TechGrid />
      </div>
    </Section>
  );
}
