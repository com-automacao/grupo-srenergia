"use client";

import { useState, type ReactNode } from "react";

/**
 * Card que no celular abre ao toque e no desktop já nasce aberto.
 *
 * A visibilidade do conteúdo é **decidida no CSS**, não em JavaScript: o corpo
 * vive numa grade que vai de `0fr` a `1fr`, e o breakpoint `lg` força `1fr`
 * independentemente do estado. Isso evita o problema clássico do acordeão
 * responsivo — renderizar aberto no servidor e fechar na hidratação (ou o
 * contrário), que produz um salto visível. Aqui o servidor manda a marcação
 * certa para os dois tamanhos de tela e nada pisca.
 *
 * Animar `grid-template-rows` em vez de `height` também dispensa medir o
 * conteúdo: a altura de destino é o próprio conteúdo, seja ele qual for.
 *
 * O texto está sempre no DOM, aberto ou fechado — o buscador e o leitor de tela
 * enxergam tudo.
 */

type DisclosureCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  /** Controlado de fora quando o pai precisa reagir à abertura. */
  open?: boolean;
  onToggle?: () => void;
};

export function DisclosureCard({
  title,
  children,
  className,
  open: openProp,
  onToggle,
}: DisclosureCardProps) {
  const [selfOpen, setSelfOpen] = useState(false);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : selfOpen;

  return (
    <div className={`bg-cream-50 ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => (controlled ? onToggle?.() : setSelfOpen((v) => !v))}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left lg:pointer-events-none lg:px-7 lg:pt-7 lg:pb-0"
      >
        <span className="font-display text-h3 text-ink-950">{title}</span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-solar-ink transition-transform duration-240 ease-out lg:hidden ${
            open ? "rotate-45" : ""
          }`}
        >
          {/* Cruz que vira "x" — dispensa dois ícones. */}
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
            <path
              d="M8 2v12M2 8h12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-320 ease-out lg:grid-rows-[1fr] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-sm leading-relaxed text-ink-600 lg:px-7 lg:pt-3 lg:pb-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
