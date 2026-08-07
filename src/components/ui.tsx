import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ============================================================================
   Primitivas de UI. Todos os valores vêm de MASTER.md §7.
   ========================================================================== */

/** Traço de 24px no acento + label em caixa alta (MASTER.md §7). */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`flex items-center gap-3 ${className ?? ""}`}>
      <span
        aria-hidden="true"
        className="h-px w-6 shrink-0"
        style={{ background: "var(--accent)" }}
      />
      <span className="text-eyebrow uppercase">{children}</span>
    </p>
  );
}

type ButtonVariant = "primary" | "accent" | "on-dark" | "ghost";

const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-240 " +
  "ease-out active:translate-y-0 disabled:pointer-events-none disabled:opacity-45";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-2",
  // Sem fundo próprio: quem chama passa `accentClasses[...].btn`, evitando que
  // duas classes de background disputem precedência na folha de estilo.
  accent: "text-white hover:-translate-y-0.5 hover:shadow-2",
  "on-dark":
    "bg-white text-ink-950 hover:-translate-y-0.5 hover:bg-paper-100 hover:shadow-2",
  // Herda a cor do contexto (claro ou escuro) e só empresta 25% dela à borda.
  ghost:
    "border border-[color-mix(in_srgb,currentColor_25%,transparent)] hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      className={`${buttonBase} ${buttonVariants[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  return (
    <a
      className={`${buttonBase} ${buttonVariants[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </a>
  );
}

/** Seta que avança 2px no hover do container `.group`. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`h-4 w-4 shrink-0 transition-transform duration-240 ease-out group-hover:translate-x-0.5 ${className ?? ""}`}
    >
      <path
        d="M3 8h10m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
