/**
 * Abstract "intelligent workflow" diagram: business inputs flow into a
 * reasoning core and out as actions. Pure SVG + CSS animation (no JS),
 * animations are disabled for reduced-motion users via globals.css.
 */

const inputs = [
  { label: "Documents", y: 70 },
  { label: "Support tickets", y: 160 },
  { label: "CRM events", y: 250 },
  { label: "APIs & data", y: 340 },
];

const outputs = [
  { label: "Automated actions", y: 115 },
  { label: "Grounded answers", y: 205 },
  { label: "Insights & reports", y: 295 },
];

const CORE = { x: 280, y: 205 };

export function HeroVisual() {
  return (
    <figure className="relative">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[2rem] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(40% 40% at 50% 50%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)",
        }}
      />
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface/70 shadow-2xl shadow-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </div>
          <span className="font-mono text-[0.7rem] text-subtle">workflow / intelligent-ops</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-muted">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-emerald-400" aria-hidden />
            running
          </span>
        </div>

        <svg
          viewBox="0 0 560 410"
          className="block h-auto w-full bg-grid"
          role="img"
          aria-labelledby="hero-visual-title"
        >
          <title id="hero-visual-title">
            Diagram of an AI workflow: documents, support tickets, CRM events and APIs flow into an AI
            reasoning core, which produces automated actions, grounded answers and insights.
          </title>
          <defs>
            <linearGradient id="hv-flow" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--accent-2)" />
            </linearGradient>
            <radialGradient id="hv-core" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.35" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Connections: inputs → core */}
          {inputs.map((n, i) => {
            const d = `M150 ${n.y} C 205 ${n.y}, 200 ${CORE.y}, ${CORE.x - 44} ${CORE.y}`;
            return (
              <g key={n.label}>
                <path d={d} className="fill-none stroke-line-strong" strokeWidth="1.25" />
                <path
                  d={d}
                  fill="none"
                  stroke="url(#hv-flow)"
                  strokeWidth="1.5"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  className="animate-dash"
                  style={{ animationDelay: `${i * -0.7}s` }}
                />
              </g>
            );
          })}

          {/* Connections: core → outputs */}
          {outputs.map((n, i) => {
            const d = `M${CORE.x + 44} ${CORE.y} C 360 ${CORE.y}, 355 ${n.y}, 405 ${n.y}`;
            return (
              <g key={n.label}>
                <path d={d} className="fill-none stroke-line-strong" strokeWidth="1.25" />
                <path
                  d={d}
                  fill="none"
                  stroke="url(#hv-flow)"
                  strokeWidth="1.5"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  className="animate-dash"
                  style={{ animationDelay: `${i * -0.9}s` }}
                />
              </g>
            );
          })}

          {/* Input nodes */}
          {inputs.map((n) => (
            <g key={n.label} transform={`translate(20 ${n.y - 18})`}>
              <rect width="130" height="36" rx="9" className="fill-surface-2 stroke-line-strong" />
              <circle cx="16" cy="18" r="3" className="fill-muted" />
              <text x="28" y="22.5" className="fill-fg font-sans text-[12px]">
                {n.label}
              </text>
            </g>
          ))}

          {/* Core */}
          <circle cx={CORE.x} cy={CORE.y} r="90" fill="url(#hv-core)" />
          <circle
            cx={CORE.x}
            cy={CORE.y}
            r="62"
            className="animate-pulse-soft fill-none stroke-accent/40"
            strokeDasharray="2 6"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <circle cx={CORE.x} cy={CORE.y} r="44" className="fill-surface stroke-line-strong" />
          <g transform={`translate(${CORE.x - 16} ${CORE.y - 22})`}>
            <path
              d="M24 8H12.5A4.5 4.5 0 0 0 8 12.5v0A3.5 3.5 0 0 0 11.5 16h9a3.5 3.5 0 0 1 3.5 3.5v0a4.5 4.5 0 0 1-4.5 4.5H8"
              className="fill-none stroke-fg"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="24" cy="8" r="2.4" className="fill-fg" />
            <circle cx="8" cy="24" r="2.4" className="fill-fg" />
            <circle cx="16" cy="16" r="3.4" fill="url(#hv-flow)" />
          </g>
          <text
            x={CORE.x}
            y={CORE.y + 30}
            textAnchor="middle"
            className="fill-muted font-mono text-[8.5px] uppercase tracking-[0.12em]"
          >
            AI core
          </text>

          {/* Output nodes */}
          {outputs.map((n) => (
            <g key={n.label} transform={`translate(405 ${n.y - 18})`}>
              <rect width="140" height="36" rx="9" className="fill-surface-2 stroke-line-strong" />
              <circle cx="16" cy="18" r="3" fill="url(#hv-flow)" />
              <text x="28" y="22.5" className="fill-fg font-sans text-[12px]">
                {n.label}
              </text>
            </g>
          ))}

          {/* Footer labels */}
          <text x="20" y="392" className="fill-subtle font-mono text-[9px] uppercase tracking-[0.14em]">
            Inputs
          </text>
          <text
            x={CORE.x}
            y="392"
            textAnchor="middle"
            className="fill-subtle font-mono text-[9px] uppercase tracking-[0.14em]"
          >
            Reason · Retrieve · Decide
          </text>
          <text
            x="545"
            y="392"
            textAnchor="end"
            className="fill-subtle font-mono text-[9px] uppercase tracking-[0.14em]"
          >
            Outcomes
          </text>
        </svg>
      </div>
      <figcaption className="sr-only">Illustrative diagram of an AI-powered business workflow.</figcaption>
    </figure>
  );
}
