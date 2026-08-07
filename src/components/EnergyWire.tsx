"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Fio de energia que se preenche conforme a página rola.
 *
 * Um barramento horizontal corre acima das células e a corrente avança da
 * esquerda para a direita presa ao scroll. Ao chegar em cada derivação, o ramo
 * desce e o nó daquele setor acende — a leitura é de energia sendo distribuída,
 * um destino por vez.
 *
 * Feito em HTML e `transform`, não em SVG. A primeira versão usava
 * `stroke-dashoffset` com `pathLength="1"`, mas o SVG precisava de
 * `preserveAspectRatio="none"` para acompanhar a largura da grade, e sob
 * escala não uniforme o `vectorEffect="non-scaling-stroke"` faz o navegador
 * calcular o tracejado em espaço de tela: a normalização do `pathLength` se
 * perde e o fio sai picotado. Com `scaleX`/`scaleY` não há o que normalizar —
 * e continua tudo composto na GPU.
 *
 * Só aparece a partir de `lg`, onde a grade tem de fato quatro colunas — abaixo
 * disso as derivações não teriam onde aterrissar.
 */

/** Centros das quatro colunas, em porcentagem da largura. */
const NODES = [12.5, 37.5, 62.5, 87.5];

export function EnergyWire({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const live = root.querySelectorAll<HTMLElement>(".wire-live");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Sem movimento: o fio nasce energizado.
      live.forEach((el) => {
        el.style.transform = "scale(1)";
        el.style.opacity = "1";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.closest("section") ?? root,
          start: "top 75%",
          end: "bottom 80%",
          scrub: 0.5,
        },
      });

      // A corrente percorre o barramento.
      timeline.fromTo(
        ".wire-bus-live",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: 1 },
        0,
      );

      // Cada ramo desce e o nó acende quando a corrente passa por ele.
      NODES.forEach((x, i) => {
        const at = x / 100;
        timeline
          .fromTo(
            `.wire-drop-${i}`,
            { scaleY: 0 },
            { scaleY: 1, ease: "none", duration: 0.1 },
            at,
          )
          .fromTo(
            `.wire-node-${i}`,
            { opacity: 0, scale: 0.3 },
            { opacity: 1, scale: 1, ease: "back.out(2.4)", duration: 0.18 },
            at + 0.06,
          );
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className={`relative ${className ?? ""}`}>
      {/* Barramento apagado — o trilho por onde a corrente vai passar */}
      <span className="absolute inset-x-0 top-0 h-px bg-cream-300" />

      {/* A corrente no barramento */}
      <span
        className="wire-live wire-bus-live absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--accent)]"
        style={{ boxShadow: "0 0 8px var(--accent), 0 0 20px color-mix(in srgb, var(--accent) 55%, transparent)" }}
      />

      {NODES.map((x, i) => (
        <span key={x}>
          {/* Ramo apagado */}
          <span
            className="absolute top-0 h-full w-px bg-cream-300"
            style={{ left: `${x}%` }}
          />
          {/* Ramo energizado */}
          <span
            className={`wire-live wire-drop-${i} absolute top-0 h-full w-[2px] origin-top scale-y-0 bg-[var(--accent)]`}
            style={{
              left: `calc(${x}% - 1px)`,
              boxShadow: "0 0 8px var(--accent)",
            }}
          />
          {/* O nó: o setor energizado */}
          <span
            className={`wire-live wire-node-${i} absolute bottom-0 h-2.5 w-2.5 rounded-full bg-[var(--accent)] opacity-0`}
            style={{
              left: `calc(${x}% - 5px)`,
              boxShadow:
                "0 0 10px var(--accent), 0 0 26px color-mix(in srgb, var(--accent) 60%, transparent)",
            }}
          />
        </span>
      ))}
    </div>
  );
}
