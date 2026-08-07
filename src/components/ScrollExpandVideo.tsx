"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Vídeo que se expande conforme a página rola: começa como uma janela recortada
 * no meio da seção e abre até sangrar de borda a borda, enquanto o título se
 * afasta.
 *
 * A expansão anima **`clip-path`**, não largura nem altura. Largura e altura
 * são propriedades de layout: animá-las forçaria reflow a cada quadro, com a
 * página inteira reposicionada 60 vezes por segundo. O `clip-path` é composto
 * na GPU e o vídeo nunca muda de tamanho — apenas o quanto dele aparece.
 *
 * O vídeo só toca quando está na tela e nunca sob `prefers-reduced-motion`:
 * nesse caso a seção nasce aberta, com o pôster no lugar do vídeo.
 */

type ScrollExpandVideoProps = {
  /** Fonte 1080p — servida a partir de 768px de viewport. */
  src1080: string;
  /** Fonte 720p — celular, metade do peso. */
  src720: string;
  poster: string;
  /** Descrição do conteúdo do vídeo, para quem não pode vê-lo. */
  label: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
};

const CLOSED = "inset(16% 32% round 24px)";
const OPEN = "inset(0% 0% round 0px)";

/**
 * A cor entra junto com a janela. Fechado, o quadro está quase dessaturado e um
 * passo mais escuro; aberto, chega às cores plenas do sobrevoo. Como está no
 * mesmo `scrub` da abertura, rolar de volta reverte sozinho — não há estado a
 * guardar.
 */
const DRAINED = "saturate(0.18) contrast(1.08) brightness(0.72)";
const VIVID = "saturate(1) contrast(1) brightness(1)";

export function ScrollExpandVideo({
  src1080,
  src720,
  poster,
  label,
  eyebrow,
  title,
  children,
}: ScrollExpandVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Só toca o que está na tela: um vídeo rodando atrás do rodapé gasta
    // bateria e banda sem ninguém ver.
    let observer: IntersectionObserver | undefined;
    if (video && !reduced) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        },
        { threshold: 0.1 },
      );
      observer.observe(root);
    }

    // Sem movimento: a seção nasce aberta e em cores plenas.
    if (reduced) {
      const media = root.querySelector<HTMLElement>(".sev-media");
      const vid = root.querySelector<HTMLElement>(".sev-video");
      if (media) media.style.clipPath = OPEN;
      if (vid) vid.style.filter = VIVID;
      return () => observer?.disconnect();
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const open = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=90%",
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
        },
      });

      open
        .fromTo(".sev-media", { clipPath: CLOSED }, { clipPath: OPEN, ease: "none" }, 0)
        .fromTo(".sev-video", { filter: DRAINED }, { filter: VIVID, ease: "none" }, 0);

      // O título recua enquanto o vídeo toma a tela.
      gsap.to(".sev-copy", {
        opacity: 0,
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=40%",
          scrub: 0.4,
        },
      });
    }, root);

    return () => {
      context.revert();
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative h-dvh min-h-[640px] w-full overflow-hidden">
      <div className="sev-media absolute inset-0 [clip-path:inset(16%_32%_round_24px)]">
        <video
          ref={videoRef}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          className="sev-video h-full w-full object-cover [filter:saturate(0.18)_contrast(1.08)_brightness(0.72)]"
        >
          <source src={src720} type="video/mp4" media="(max-width: 767px)" />
          <source src={src1080} type="video/mp4" />
        </video>

        {/* Dois véus. O vertical assenta topo e base; o da esquerda é o que
            sustenta o texto — o vídeo é um sobrevoo sobre grama e terra clara,
            e sobre esses quadros o creme e o laranja do eyebrow sumiriam. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink-950/60 via-transparent to-ink-950/75"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-ink-950/92 via-ink-950/55 to-ink-950/10"
        />
      </div>

      <div className="sev-copy container-page relative flex h-full flex-col justify-center">
        <p className="font-mono text-label uppercase text-solar">{eyebrow}</p>
        <h2 className="mt-6 max-w-[20ch] font-display text-h1 text-cream-50 text-balance">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
