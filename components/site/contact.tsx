import { profile } from "@/lib/content";
import { Section } from "./primitives";

const CHANNELS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\D/g, "")}` },
  { label: "Calendly", value: "Let\u2019s chat \u2014 30 min", href: profile.links.calendly, external: true },
  { label: "LinkedIn", value: "uzair-beg", href: profile.links.linkedin, external: true },
  { label: "GitHub", value: `@${profile.handle}`, href: profile.links.github, external: true },
  { label: "Based in", value: profile.location, href: null },
];

export function Contact() {
  return (
    <Section
      id="contact"
      index="04"
      title="contact"
      kicker="Seeking work that excites me. The 30-minute link is the fastest way in."
    >
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {CHANNELS.map((c) => {
          const body = (
            <>
              <span>
                <span className="eyebrow block">{c.label}</span>
                <span className="mt-1.5 block text-[13.5px] text-ink transition-colors group-hover:text-term">
                  {c.value}
                </span>
              </span>
              {c.href && (
                <span className="text-faint transition-all group-hover:translate-x-0.5 group-hover:text-term">
                  ↗
                </span>
              )}
            </>
          );
          return c.href ? (
            <a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center justify-between gap-4 bg-bg px-5 py-5 transition-colors hover:bg-raised"
            >
              {body}
            </a>
          ) : (
            <div
              key={c.label}
              className="group flex items-center justify-between gap-4 bg-bg px-5 py-5"
            >
              {body}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 text-[11px] text-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} Uzair Beg — built with Next.js, typed by hand.</p>
        <p className="text-term/60">
          {'{ "status": "open_to_work", "response_time": "< 24h" }'}
        </p>
      </div>
    </footer>
  );
}
