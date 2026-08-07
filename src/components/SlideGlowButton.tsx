import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * CTA principal das páginas de marca — o rótulo acende e o brilho desliza da
 * esquerda no hover, no acento da própria empresa.
 *
 * Reconstruído a partir do `slide-glow-button` de referência, que veio sem o
 * CSS (as classes `.button` / `.actual-text` / `.hover-text` eram o efeito
 * inteiro) e com `class=` no lugar de `className=`. Duas decisões deliberadas
 * em relação ao original:
 *
 * - **O repouso é sólido, não vazado.** A referência deixa o texto em contorno
 *   (`-webkit-text-stroke`) e só preenche no hover. Contorno fino sobre fundo
 *   escuro reprova em contraste com folga, e um CTA precisa ser legível antes
 *   de alguém apontar o mouse. Aqui o brilho é o que o hover acrescenta — a
 *   leitura nunca depende dele.
 * - **É um link, não um `<button>`.** Ele navega; `<button>` anunciaria a
 *   coisa errada para leitor de tela e quebraria abrir em nova aba.
 *
 * A cópia acesa é `aria-hidden`: sem isso o leitor de tela leria o rótulo duas
 * vezes seguidas.
 */

type SlideGlowButtonProps = ComponentProps<typeof Link> & {
  children: string;
  /**
   * Superfície onde o botão vive. Define qual variante do acento tem contraste:
   * `-lit` no escuro, `-ink` no claro.
   */
  tone?: "dark" | "light";
};

export function SlideGlowButton({
  children,
  tone = "dark",
  className,
  ...props
}: SlideGlowButtonProps) {
  return (
    <Link
      {...props}
      className={`slide-glow group relative inline-flex h-12 items-center justify-center rounded-full border px-7 text-sm font-medium transition-colors duration-240 ease-out ${
        tone === "dark"
          ? "border-cream-50/25 text-cream-50 [--glow:var(--accent-lit)]"
          : "border-ink-950/15 text-ink-950 [--glow:var(--accent-ink)]"
      } ${className ?? ""}`}
    >
      <span className="relative z-10">{children}</span>
      <span aria-hidden="true" className="slide-glow__glow">
        {children}
      </span>
    </Link>
  );
}
