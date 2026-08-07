"use client";

import { useEffect, useId, useRef } from "react";

/**
 * Barramento do hero: cinco fontes descem, convergem em um único nó e saem por
 * uma linha só, que flui para dentro da página.
 *
 * É a proposta do grupo dita graficamente — muitas especialidades, uma entrega.
 * Faz par com <EnergyLines>, na seção do ecossistema, que percorre o caminho
 * inverso: um tronco que se ramifica nas quatro marcas.
 *
 * As linhas se desenham uma vez ao carregar; depois, um pulso curto percorre
 * cada ramo em loop lento. Ambos param sob `prefers-reduced-motion`.
 */

const NODE = { x: 300, y: 520 };

/* Nenhuma fonte fica alinhada ao nó: uma linha reta pelo centro se confundiria
   com a saída, e a convergência deixaria de ser legível. */
const SOURCES = [
  { x: 34, color: "var(--color-sr)", dur: "6.5s", delay: "0s" },
  { x: 158, color: "var(--color-jireh)", dur: "7.5s", delay: "1.1s" },
  { x: 262, color: "var(--color-jirehmac)", dur: "6.9s", delay: "2.2s" },
  { x: 424, color: "var(--color-abest)", dur: "8.1s", delay: "0.6s" },
  { x: 566, color: "var(--color-mobi)", dur: "7.1s", delay: "1.7s" },
];

/** Desce reto, curva no terço final e chega ao nó pela vertical. */
const pathFor = (x: number) =>
  `M${x} 0C${x} 300 ${NODE.x} 340 ${NODE.x} ${NODE.y}`;

export function EnergyBus({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  // O componente é renderizado duas vezes (desktop e mobile). Sem ids únicos os
  // <defs> colidiriam e a máscara de uma instância vazaria para a outra.
  const uid = useId();
  const glowId = `bus-glow-${uid}`;
  const fadeId = `bus-fade-${uid}`;
  const maskId = `bus-mask-${uid}`;

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
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // `slice` faz o desenho cobrir a caixa. Com o padrão (`meet`) ele entra em
    // letterbox e a linha de saída termina no ar, no meio do hero.
    <svg
      ref={ref}
      viewBox="0 0 600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor="var(--color-brand-400)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-brand-400)" stopOpacity="0" />
        </radialGradient>
        {/* As fontes nascem esmaecidas no topo, para o corte não parecer erro. */}
        <linearGradient id={fadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="16%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id={maskId}>
          <rect x="0" y="0" width="600" height="900" fill={`url(#${fadeId})`} />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        {SOURCES.map((source) => (
          <g key={source.color}>
            {/* Trilho */}
            <path
              className="energy-path"
              pathLength={1}
              d={pathFor(source.x)}
              stroke={source.color}
              strokeWidth="1.5"
              strokeOpacity="0.45"
              vectorEffect="non-scaling-stroke"
            />
            {/* Pulso que percorre o trilho */}
            <path
              className="energy-pulse"
              pathLength={1}
              d={pathFor(source.x)}
              stroke={source.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{
                ["--pulse-dur" as string]: source.dur,
                ["--pulse-delay" as string]: source.delay,
              }}
            />
          </g>
        ))}
      </g>

      {/* Nó de convergência */}
      <circle cx={NODE.x} cy={NODE.y} r="70" fill={`url(#${glowId})`} />
      <circle
        cx={NODE.x}
        cy={NODE.y}
        r="7"
        fill="var(--color-brand-400)"
        className="bus-node"
      />

      {/* Saída única, fluindo para dentro da página */}
      <path
        className="energy-path"
        pathLength={1}
        d={`M${NODE.x} ${NODE.y}V900`}
        stroke="var(--color-brand-400)"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
        style={{ ["--draw-delay" as string]: "700ms" }}
      />
    </svg>
  );
}
