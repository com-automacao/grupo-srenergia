"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Planta aérea de cidade em traço, com as luzes acendendo conforme a página
 * rola — o bairro sendo energizado quarteirão a quarteirão.
 *
 * O traçado é gerado por um PRNG **semeado** (mulberry32). Sem semente fixa,
 * `Math.random` daria um desenho no servidor e outro na hidratação, e o React
 * acusaria divergência de marcação. Com semente, o mapa é sempre o mesmo e o
 * HTML bate.
 *
 * As luzes acendem em ordem de distância a partir da esquerda, não em ordem
 * aleatória: a leitura é de energia entrando pela rede e se espalhando.
 */

const W = 1200;
/**
 * Proporção próxima à da seção que o recebe. O SVG usa `slice`, então uma
 * moldura muito baixa seria ampliada para cobrir a altura e o traçado sairia
 * ralo e esticado — a 420 de altura o mapa era escalado 2,6x.
 */
const H = 900;

/** PRNG determinístico — mesma semente, mesmo mapa, servidor e cliente. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Plan = {
  streets: string[];
  lights: { x: number; y: number; r: number }[];
};

function buildPlan(): Plan {
  const rand = mulberry32(20260807);
  const streets: string[] = [];
  const nodes: { x: number; y: number }[] = [];

  // Avenidas horizontais, com leve inclinação — cidade não é papel milimetrado.
  const rows: number[] = [];
  for (let y = 34; y < H; y += 58 + rand() * 34) {
    const drift = (rand() - 0.5) * 18;
    rows.push(y);
    streets.push(`M0 ${y.toFixed(1)} L${W} ${(y + drift).toFixed(1)}`);
  }

  // Ruas verticais, interrompidas em alturas diferentes — quarteirões irregulares.
  for (let x = 26; x < W; x += 48 + rand() * 38) {
    const from = rand() * 160;
    const to = H - rand() * 160;
    const drift = (rand() - 0.5) * 14;
    streets.push(
      `M${x.toFixed(1)} ${from.toFixed(1)} L${(x + drift).toFixed(1)} ${to.toFixed(1)}`,
    );

    // Cruzamentos: candidatos a receber luz.
    for (const y of rows) {
      if (y > from && y < to && rand() > 0.42) {
        nodes.push({ x: x + drift * ((y - from) / (to - from)), y });
      }
    }
  }

  // Duas diagonais longas, as vias que cortam a malha.
  streets.push(`M-40 ${H * 0.78} L${W * 0.68} -30`);
  streets.push(`M${W * 0.42} ${H + 30} L${W + 40} ${H * 0.16}`);
  streets.push(`M-40 ${H * 0.24} L${W + 40} ${H * 0.62}`);

  // Acende da esquerda para a direita: a energia entra pela rede.
  nodes.sort((a, b) => a.x - b.x);

  return {
    streets,
    lights: nodes.map((n) => ({ ...n, r: 1.6 + rand() * 1.6 })),
  };
}

/** Calculado uma única vez: o mapa é sempre o mesmo. */
const plan = buildPlan();

export function CityGrid({ className }: { className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll<SVGElement>(".city-light").forEach((el) => {
        el.style.opacity = "0.85";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        ".city-light",
        { opacity: 0, scale: 0.2 },
        {
          opacity: 0.85,
          scale: 1,
          ease: "none",
          stagger: { each: 0.012, from: "start" },
          scrollTrigger: {
            trigger: root.closest("section") ?? root,
            start: "top 85%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g
        stroke="var(--color-ink-950)"
        strokeWidth="1"
        fill="none"
        opacity="0.09"
        vectorEffect="non-scaling-stroke"
      >
        {plan.streets.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <g fill="var(--accent)">
        {plan.lights.map((l) => (
          <circle
            key={`${l.x.toFixed(2)}-${l.y.toFixed(2)}`}
            className="city-light"
            cx={l.x}
            cy={l.y}
            r={l.r}
            opacity="0"
            style={{ transformOrigin: `${l.x}px ${l.y}px` }}
          />
        ))}
      </g>
    </svg>
  );
}
