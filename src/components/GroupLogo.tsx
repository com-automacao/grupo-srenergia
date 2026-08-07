/**
 * Lockup do Grupo SR Energia.
 *
 * O grupo ainda não tem marca própria fornecida (MASTER.md §9), então o lockup
 * é tipográfico: o arco de grid solar da SR — o elemento gráfico mais forte do
 * ecossistema — em degradê azul→laranja, que é literalmente a assinatura
 * cromática do grupo, mais o nome em duas linhas.
 */

type GroupLogoProps = {
  /** Em superfície escura o nome vira branco. */
  tone?: "dark" | "light";
  className?: string;
};

export function GroupLogo({ tone = "dark", className }: GroupLogoProps) {
  const isLight = tone === "light";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="grupo-arc" x1="6" y1="40" x2="42" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-brand-600)" />
            <stop offset="52%" stopColor="var(--color-brand-500)" />
            <stop offset="100%" stopColor="var(--color-sr)" />
          </linearGradient>
        </defs>
        <g stroke="url(#grupo-arc)" fill="none" strokeLinecap="butt">
          <path
            d="M10.2 12.43A18 18 0 1 1 30.16 40.9"
            strokeWidth="5"
            strokeDasharray="9.42 1.88"
          />
          <path
            d="M16.03 15.96A12.5 12.5 0 1 1 28.28 35.75"
            strokeWidth="4.5"
            strokeDasharray="6.55 1.31"
          />
          <path
            d="M18.64 19.5A7 7 0 1 1 26.39 30.58"
            strokeWidth="4"
            strokeDasharray="3.67 0.73"
          />
        </g>
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[0.6875rem] font-semibold tracking-[0.22em] ${
            isLight ? "text-ink-300" : "text-paper-600"
          }`}
        >
          GRUPO
        </span>
        <span
          className={`font-display text-[1.0625rem] font-extrabold tracking-[-0.02em] ${
            isLight ? "text-white" : "text-paper-900"
          }`}
        >
          SR Energia
        </span>
      </span>
    </span>
  );
}
