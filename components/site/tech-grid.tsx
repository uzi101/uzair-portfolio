import { techGroups, type Tech } from "@/lib/tech";

/**
 * Icons are inlined as SVG at build time rather than hotlinked from an image
 * service — no third-party request, no layout shift, and the tiles can be
 * tinted to the page theme.
 */
export function TechGrid() {
  return (
    <div className="space-y-8">
      {techGroups.map(({ group, items }) => (
        <div key={group}>
          <p className="eyebrow mb-3">{group}</p>
          <ul className="flex flex-wrap gap-2">
            {items.map((t) => (
              <li key={t.name}>
                <Tile tech={t} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Tile({ tech }: { tech: Tech }) {
  // A lettermark already spells the product, so repeating it as a caption is noise.
  const showCaption = tech.mark !== tech.name;
  const markSize =
    (tech.mark?.length ?? 0) <= 3 ? "text-[15px]" : (tech.mark?.length ?? 0) <= 5 ? "text-[12px]" : "text-[10px]";

  return (
    <div
      title={tech.name}
      style={tech.hex ? ({ "--brand": tech.hex } as React.CSSProperties) : undefined}
      className="group flex h-[4.75rem] w-[4.75rem] flex-col items-center justify-center gap-1.5 rounded-md border border-line bg-raised/50 px-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-elevated"
    >
      <span className="flex h-6 w-full items-center justify-center text-muted transition-colors duration-200 group-hover:text-[var(--brand,var(--color-term))]">
        {tech.path ? (
          <svg viewBox="0 0 24 24" className="size-[22px]" fill="currentColor" aria-hidden>
            <path d={tech.path} />
          </svg>
        ) : (
          <span className={`${markSize} font-bold leading-none tracking-tight`}>{tech.mark}</span>
        )}
      </span>
      {showCaption && (
        <span className="w-full truncate text-center text-[9.5px] leading-tight text-faint transition-colors group-hover:text-ink">
          {tech.name}
        </span>
      )}
    </div>
  );
}
