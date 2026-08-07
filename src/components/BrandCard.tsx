import Link from "next/link";
import { accentClasses, type Brand } from "@/lib/brands";
import { BrandMark } from "./BrandMark";
import { Arrow } from "./ui";

/**
 * Card de marca (MASTER.md §7): superfície escura + hairline, com uma régua de
 * 3px no acento da empresa que se estende de 0 a 100% da largura no hover.
 * Sem escala — o card acende, não cresce.
 */
export function BrandCard({ brand }: { brand: Brand }) {
  const accent = accentClasses[brand.accent];

  return (
    <Link
      href={`/${brand.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-ink-800 bg-ink-900 p-7 transition-[border-color,transform,box-shadow] duration-240 ease-out hover:-translate-y-0.5 ${accent.borderHover} ${accent.ring}`}
    >
      {/* Régua de acento no topo */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[3px] w-0 transition-[width] duration-320 ease-out group-hover:w-full ${accent.bg}`}
      />

      <BrandMark mark={brand.mark} className={`h-11 w-11 ${accent.text}`} />

      <h3 className="mt-6 font-display text-h3 text-white">{brand.name}</h3>
      <p className={`mt-1.5 text-sm font-medium ${accent.text}`}>{brand.kicker}</p>

      <p className="mt-4 text-sm leading-relaxed text-ink-300">{brand.tagline}</p>

      <ul className="mt-6 space-y-2.5 border-t border-ink-800 pt-6">
        {brand.highlights.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-ink-300">
            <span
              aria-hidden="true"
              className={`mt-[0.5em] h-1 w-1 shrink-0 rounded-full ${accent.bg}`}
            />
            {item}
          </li>
        ))}
      </ul>

      <span className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-white">
        Conhecer
        <Arrow />
      </span>
    </Link>
  );
}
