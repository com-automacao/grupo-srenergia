"use client";

import { useEffect, useRef } from "react";

/**
 * A assinatura do site: o tronco do Grupo se ramifica em quatro linhas, cada
 * uma no acento de uma empresa, desenhando-se com stroke-dashoffset ao entrar
 * no viewport (MASTER.md §6).
 *
 * Os paths usam pathLength="1", então o comprimento é normalizado pelo próprio
 * SVG — nenhuma medição em JavaScript.
 */

const BRANCHES = [
  { d: "M600 44C600 98 150 88 150 140", color: "var(--color-sr)", delay: 0 },
  { d: "M600 44C600 98 450 88 450 140", color: "var(--color-jireh)", delay: 120 },
  { d: "M600 44C600 98 750 88 750 140", color: "var(--color-jirehmac)", delay: 240 },
  { d: "M600 44C600 98 1050 88 1050 140", color: "var(--color-abest)", delay: 360 },
];

export function EnergyLines({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.dataset.draw = "in";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.draw = "in";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 140"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Tronco: sai do bloco do Grupo */}
      <path
        className="energy-path"
        pathLength={1}
        d="M600 0V44"
        stroke="var(--color-brand-400)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />

      {BRANCHES.map((branch) => (
        <path
          key={branch.color}
          className="energy-path"
          pathLength={1}
          d={branch.d}
          stroke={branch.color}
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ ["--draw-delay" as string]: `${branch.delay}ms` }}
        />
      ))}
    </svg>
  );
}
