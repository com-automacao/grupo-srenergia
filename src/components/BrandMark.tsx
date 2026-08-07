import type { Brand } from "@/lib/brands";

/**
 * Glifos das marcas do ecossistema, desenhados em SVG a partir dos símbolos
 * reais de cada logo. Herdam `currentColor`, então ganham o acento da marca por
 * classe de texto — e ficam nítidos em qualquer densidade de tela.
 *
 * São placeholders de alta fidelidade: quando chegarem os arquivos vetoriais
 * oficiais (MASTER.md §9), este componente é substituído pelo <Image> do logo.
 */

type BrandMarkProps = {
  mark: Brand["mark"];
  className?: string;
};

const BOLT = "M26.8 10.5 17 26.8h6.4L21.4 37.5 31.2 21.2h-6.4z";

export function BrandMark({ mark, className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {mark === "sr" && (
        /* Arco de grid solar aberto à direita — o "C" do símbolo da SR.
           Os três anéis usam o mesmo passo angular (30° de célula, 6° de junta),
           então os cortes se alinham radialmente e a forma lê como uma grade de
           painéis, não como pontilhado. */
        <g stroke="currentColor" strokeLinecap="butt" fill="none">
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
      )}

      {mark === "sphere" && (
        /* Esfera com meridianos — símbolo da Jireh Energia. */
        <g stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="24" cy="24" r="16" />
          <path d="M24 8c-6.5 5-9.5 10.5-9.5 16S17.5 35 24 40" />
          <path d="M24 8c6.5 5 9.5 10.5 9.5 16S30.5 35 24 40" />
          <path d="M9 19.5c5 2.6 10 3.9 15 3.9s10-1.3 15-3.9" />
        </g>
      )}

      {mark === "bolt-sphere" && (
        /* Esfera atravessada pelo raio — símbolo da JirehMac. */
        <g fill="none">
          <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
          <path
            d="M11.5 17.5c7.5 3.5 17.5 3.5 25 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M11.5 30.5c7.5-3.5 17.5-3.5 25 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path d={BOLT} fill="currentColor" />
        </g>
      )}

      {mark === "node-bolt" && (
        /* Anel com nós de conexão e raio central — símbolo da ABEST. */
        <g fill="none">
          <circle
            cx="24"
            cy="24"
            r="15"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="20 9"
          />
          <circle cx="24" cy="9" r="3.6" fill="currentColor" />
          <circle cx="11" cy="31.5" r="3.6" fill="currentColor" />
          <circle cx="37" cy="31.5" r="3.6" fill="currentColor" />
          <path d={BOLT} fill="currentColor" />
        </g>
      )}

      {mark === "plug" && (
        /* Conector de recarga: bocal, cabo e raio — Mobilidade Elétrica. */
        <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M15 8v7M27 8v7" />
          <path d="M11 15h20v5.5A10 10 0 0 1 21 30.5h0A10 10 0 0 1 11 20.5V15Z" />
          <path d="M21 30.5V36a5 5 0 0 0 5 5h6" />
          <path
            d="M37.5 30.5 32.5 38h4.5l-1.2 6 5.2-8h-4.4z"
            fill="currentColor"
            stroke="none"
          />
        </g>
      )}
    </svg>
  );
}
