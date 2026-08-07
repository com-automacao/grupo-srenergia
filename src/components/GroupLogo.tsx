/**
 * Lockup do Grupo SR Energia.
 *
 * O grupo ainda não tem marca própria fornecida (MASTER.md §9), então o lockup
 * é tipográfico: o arco de grid solar da SR — o elemento gráfico mais forte do
 * ecossistema — no laranja do Grupo, mais o nome em duas linhas.
 *
 * "GRUPO" vai em mono, a voz de rótulo do sistema; o nome vai na serifada
 * editorial, que é de peso único (400) — a presença vem do tamanho e do
 * tracking, nunca de negrito sintético.
 */

type GroupLogoProps = {
  /** Em superfície escura o nome vira creme. */
  tone?: "dark" | "light";
  className?: string;
};

export function GroupLogo({ tone = "dark", className }: GroupLogoProps) {
  const isLight = tone === "light";

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8 shrink-0 text-solar"
        aria-hidden="true"
        focusable="false"
      >
        <g stroke="currentColor" fill="none" strokeLinecap="butt">
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

      <span className="flex flex-col gap-1 leading-none">
        <span
          className={`font-mono text-[0.625rem] uppercase tracking-[0.18em] ${
            isLight ? "text-ink-300" : "text-ink-500"
          }`}
        >
          Grupo
        </span>
        <span
          className={`font-display text-[1.25rem] leading-none tracking-[-0.01em] ${
            isLight ? "text-cream-50" : "text-ink-950"
          }`}
        >
          SR Energia
        </span>
      </span>
    </span>
  );
}
