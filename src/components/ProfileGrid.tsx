"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DisclosureCard } from "./DisclosureCard";
import { EnergyWire } from "./EnergyWire";
import { Reveal } from "./Reveal";

/**
 * Os perfis atendidos, energizados por um fio.
 *
 * Duas leituras do mesmo fio, decididas por breakpoint:
 *
 * - **Desktop (`lg`)** — barramento horizontal acima da grade de quatro
 *   colunas, com uma derivação descendo em cada coluna (`EnergyWire`).
 * - **Celular** — barramento vertical na lateral direita, com um ramo entrando
 *   em cada linha. O card fica mais estreito para abrir esse corredor e volta à
 *   largura cheia quando é aberto: com o texto à mostra, o espaço é dele.
 *
 * O ramo e o nó vivem **dentro** de cada linha, alinhados por flexbox. Posicioná-los
 * por porcentagem da altura sairia do lugar assim que um card abrisse e mudasse
 * a altura da linha.
 */

type Profile = { title: string; description: string };

export function ProfileGrid({ profiles }: { profiles: Profile[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const live = root.querySelectorAll<HTMLElement>(".vwire-live");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
          trigger: root,
          start: "top 82%",
          end: "bottom 78%",
          scrub: 0.5,
        },
      });

      timeline.fromTo(
        ".vwire-bus",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", duration: 1 },
        0,
      );

      profiles.forEach((_, i) => {
        const at = (i + 0.55) / profiles.length;
        timeline
          .fromTo(
            `.vwire-branch-${i}`,
            { scaleX: 0 },
            { scaleX: 1, ease: "none", duration: 0.1 },
            at,
          )
          .fromTo(
            `.vwire-node-${i}`,
            { opacity: 0, scale: 0.3 },
            { opacity: 1, scale: 1, ease: "back.out(2.4)", duration: 0.16 },
            at + 0.05,
          );
      });
    }, root);

    return () => context.revert();
  }, [profiles]);

  return (
    <div ref={rootRef}>
      {/* Desktop: barramento horizontal acima da grade */}
      <EnergyWire className="mt-14 hidden h-10 w-full lg:block" />

      <ul className="relative mt-10 grid gap-px lg:mt-0 lg:grid-cols-4 lg:bg-cream-300">
        {/* Celular: barramento vertical na lateral direita */}
        <span
          aria-hidden="true"
          className="absolute inset-y-6 right-5 w-px bg-cream-300 lg:hidden"
        />
        <span
          aria-hidden="true"
          className="vwire-live vwire-bus absolute inset-y-6 right-[19px] w-[2px] origin-top scale-y-0 bg-[var(--accent)] lg:hidden"
          style={{ boxShadow: "0 0 8px var(--accent)" }}
        />

        {profiles.map((profile, i) => {
          const open = openIndex === i;
          return (
            <Reveal key={profile.title} index={i} as="li" className="h-full">
              <div className="flex h-full items-center border-b border-cream-300 last:border-b-0 lg:block lg:border-0">
                {/* A largura anima aqui, e não é `transform`: encolher por
                    escala distorceria o texto. É uma transição de 320ms num
                    subárvore de quatro itens, disparada por toque — não uma
                    animação presa ao scroll. */}
                <div
                  className={`shrink-0 transition-[width] duration-320 ease-out lg:w-full ${
                    open ? "w-full" : "w-[calc(100%-3.5rem)]"
                  }`}
                >
                  <DisclosureCard
                    title={profile.title}
                    open={open}
                    onToggle={() => setOpenIndex(open ? null : i)}
                    className="h-full"
                  >
                    {profile.description}
                  </DisclosureCard>
                </div>

                {/* Ramo + nó — some quando o card toma a linha inteira */}
                <span
                  aria-hidden="true"
                  className={`relative h-px flex-1 bg-cream-300 transition-opacity duration-240 lg:hidden ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span
                    className={`vwire-live vwire-branch-${i} absolute -top-px left-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--accent)]`}
                    style={{ boxShadow: "0 0 8px var(--accent)" }}
                  />
                  <span
                    className={`vwire-live vwire-node-${i} absolute right-[-4px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-0`}
                    style={{
                      boxShadow:
                        "0 0 10px var(--accent), 0 0 24px color-mix(in srgb, var(--accent) 60%, transparent)",
                    }}
                  />
                </span>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
