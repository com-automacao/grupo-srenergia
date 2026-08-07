"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Índice na sequência — multiplica o stagger de 60ms (MASTER.md §6). */
  index?: number;
  /** Atraso extra em ms, somado ao stagger. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
};

const STAGGER = 60;

/**
 * Reveal no scroll: opacity 0→1 + translateY(16px→0), dispara uma única vez a
 * 12% de visibilidade.
 *
 * O elemento é renderizado no servidor já com `data-reveal="armed"`; o CSS só
 * o esconde quando `.js` está presente no <html> (ver layout.tsx). Assim não há
 * flash de conteúdo nem página vazia sem JavaScript.
 */
export function Reveal({
  children,
  index = 0,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sem suporte a IntersectionObserver: mostra imediatamente.
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.reveal = "in";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "in";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref polimórfico sobre um union de tags HTML
      ref={ref}
      data-reveal="armed"
      className={className}
      style={{ ["--reveal-delay" as string]: `${index * STAGGER + delay}ms` }}
    >
      {children}
    </Tag>
  );
}
