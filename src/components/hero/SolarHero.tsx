"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Backdrop } from "@/components/originkit/ui/hero-19/backdrop";
import { Orb } from "@/components/originkit/ui/hero-19/orb";
import { companies } from "@/lib/brands";
import { BrandGlyph } from "@/components/BrandGlyph";

/**
 * Hero do Grupo SR Energia — uma mão sustentando o sol.
 *
 * Composição herdada do hero-19 do Originkit (mão fotográfica + esfera de
 * partículas em Three.js), recolorida para o laranja da SR Energia e
 * reescrita para o conteúdo do grupo. A leitura é literal: energia solar
 * entregue na mão do cliente.
 *
 * Sobre isso corre um parallax preso ao scroll (GSAP ScrollTrigger com
 * `scrub`), na estrutura de quatro camadas: o fundo desce muito, a mão quase
 * nada. Quanto mais ao fundo, mais a camada fica para trás da rolagem — que é
 * o que produz a sensação de profundidade.
 */

const asset = (file: string) => `/originkit/hero-19/${file}`;

/** Suaviza o topo e a base da mão contra o fundo — o recorte tem borda dura. */
const HAND_MASK =
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 7%, #000 20%, #000 86%, rgba(0,0,0,0.5) 95%, transparent 100%)";

/** Camadas do parallax, do fundo para a frente. */
const LAYERS = [
  { layer: "1", yPercent: 70 },
  { layer: "2", yPercent: 55 },
  { layer: "3", yPercent: 40 },
  { layer: "4", yPercent: 10 },
];

/** As três camadas da tecnologia JirehMac, como leitura de instrumentação. */
const READOUT = ["Geração", "Armazenamento", "Automação"];

export function SolarHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      LAYERS.forEach((entry, index) => {
        timeline.to(
          root.querySelectorAll(`[data-parallax-layer="${entry.layer}"]`),
          { yPercent: entry.yPercent, ease: "none" },
          index === 0 ? undefined : "<",
        );
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="on-dark relative w-full overflow-hidden"
      aria-label="Grupo SR Energia"
    >
      {/* Camada 1 — a luz de fundo, a que mais fica para trás */}
      <div data-parallax-layer="1" className="pointer-events-none absolute inset-0 z-0">
        <Backdrop />
      </div>

      {/* Lavagem escura na base, para o hero morrer no creme da seção seguinte */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[38%] bg-linear-to-b from-transparent via-ink-950/30 to-ink-950"
      />

      <div className="relative h-[874px] overflow-hidden ipad:h-[1133px] desktop-sm:h-dvh desktop-sm:min-h-[860px] ultrawide:mx-auto ultrawide:h-[1080px] ultrawide:max-w-[1920px]">
        {/* Camada 2 — o sol */}
        <div data-parallax-layer="2" className="pointer-events-none absolute inset-0 z-10">
          <Orb />
        </div>

        {/* Camada 3 — o texto */}
        <div
          data-parallax-layer="3"
          className="absolute top-[150px] left-1/2 z-20 flex w-[min(100%-2.5rem,34rem)] -translate-x-1/2 flex-col items-center gap-9 text-center ipad:top-[230px] desktop-sm:top-auto desktop-sm:bottom-32 desktop-sm:left-[max(3rem,calc(50%-40rem))] desktop-sm:w-[34rem] desktop-sm:translate-x-0 desktop-sm:items-start desktop-sm:text-left"
        >
          <div className="flex flex-col items-center gap-5 desktop-sm:items-start">
            <p className="font-mono text-label uppercase text-solar">
              Ecossistema de energia
            </p>

            <h1 className="font-display text-display text-cream-50 text-balance">
              Toda a energia. <span className="italic">Um só grupo.</span>
            </h1>

            <p className="max-w-[42ch] text-lead text-ink-300">
              Geração, engenharia, tecnologia própria e mobilidade elétrica em um
              único ecossistema.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 desktop-sm:justify-start">
            {/* Creme, não laranja: o hero inteiro já é laranja, e um botão
                laranja sobre esse fundo perde a borda e some. */}
            <Link
              href="#ecossistema"
              className="inline-flex h-12 items-center rounded-full bg-cream-50 px-7 text-sm font-medium text-ink-950 transition-transform duration-240 ease-out hover:-translate-y-0.5"
            >
              Conheça nossas empresas
            </Link>
            <Link
              href="/contato"
              className="inline-flex h-12 items-center rounded-full border border-cream-50/25 px-7 text-sm font-medium text-cream-50 transition-colors duration-240 ease-out hover:border-cream-50/60"
            >
              Falar com um especialista
            </Link>
          </div>
        </div>

        {/* Camada 4 — a mão, quase colada à rolagem */}
        <img
          data-parallax-layer="4"
          aria-hidden
          src={asset("hand.png")}
          alt=""
          className="pointer-events-none absolute top-[calc(50%+255px)] left-[calc(50%-4px)] z-10 h-[410px] w-[738px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover ipad:top-[894px] ipad:left-1/2 ipad:h-[502px] ipad:w-[902px] desktop-sm:top-auto desktop-sm:bottom-0 desktop-sm:h-auto desktop-sm:w-[86vw] desktop-sm:min-w-[1239px] desktop-sm:origin-bottom desktop-sm:translate-y-0 desktop-sm:scale-115 ultrawide:top-[384px] ultrawide:bottom-auto ultrawide:w-[1180px] ultrawide:min-w-0 ultrawide:scale-100"
          style={{ maskImage: HAND_MASK, WebkitMaskImage: HAND_MASK }}
        />

        {/* Leitura de instrumentação — as camadas da tecnologia JirehMac */}
        <ul className="absolute top-1/2 right-6 z-20 hidden -translate-y-1/2 flex-col gap-3 border-l border-cream-50/15 pl-5 desktop-sm:flex">
          {READOUT.map((item) => (
            <li key={item} className="font-mono text-label uppercase text-ink-300">
              {item}
            </li>
          ))}
        </ul>

        {/* Brilho quente sob a mão */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-29px] left-1/2 z-20 hidden h-[99px] w-[663px] -translate-x-1/2 blur-[35px] desktop-sm:block"
          style={{
            backgroundImage:
              "linear-gradient(178.5deg, rgba(39,7,1,0.2) 28%, rgba(141,27,4,0.2) 93%)",
          }}
        />
      </div>

      {/* Régua das marcas, ancorada na base do hero */}
      <div className="absolute inset-x-0 bottom-0 z-40 border-t border-cream-50/10">
        <ul className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-5 desktop-sm:justify-between">
          {companies.map((brand) => (
            <li key={brand.slug}>
              <Link
                href={`/${brand.slug}`}
                className="group flex items-center gap-2.5 text-cream-50/55 transition-colors duration-240 ease-out hover:text-cream-50"
              >
                <BrandGlyph brand={brand} sizes="20px" className="h-5 w-5" />
                <span className="font-mono text-label uppercase">{brand.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
