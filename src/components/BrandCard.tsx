import Link from "next/link";
import { accentClasses, type Brand } from "@/lib/brands";
import { BrandLockup } from "./BrandLockup";
import { Arrow } from "./ui";

/**
 * Card de marca — uma célula da malha, no creme.
 *
 * Traz o logotipo oficial completo, não o símbolo: aqui há espaço para ele e é
 * onde o visitante conhece a empresa pela primeira vez. Sobre creme os cinco
 * lockups funcionam, inclusive os de tipografia azul-marinho e grafite, que
 * seriam ilegíveis no escuro.
 *
 * Sem borda ao redor: quem separa é a malha. No hover a célula acende — a régua
 * do acento se estende e o fundo esquenta um passo.
 */
export function BrandCard({ brand }: { brand: Brand }) {
  const accent = accentClasses[brand.accent];

  return (
    <Link
      href={`/${brand.slug}`}
      className="group relative flex h-full flex-col bg-cream-50 p-7 transition-colors duration-240 ease-out hover:bg-cream-100 lg:p-8"
    >
      {/* Régua de acento no topo. Anima `transform`, não `width`: largura é
          propriedade de layout e forçaria reflow a cada frame. */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-320 ease-out group-hover:scale-x-100 ${accent.bg}`}
      />

      <BrandLockup brand={brand} className="h-9" sizes="200px" />

      <p className={`mt-7 font-mono text-label uppercase ${accent.textInk}`}>
        {brand.kicker}
      </p>

      <p className="mt-4 text-ink-600">{brand.tagline}</p>

      <ul className="mt-7 space-y-2.5 border-t border-cream-300 pt-7">
        {brand.highlights.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-ink-600">
            <span
              aria-hidden="true"
              className={`mt-[0.55em] h-1 w-1 shrink-0 rounded-full ${accent.bg}`}
            />
            {item}
          </li>
        ))}
      </ul>

      <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-medium text-ink-950">
        Conhecer
        <Arrow />
      </span>
    </Link>
  );
}
