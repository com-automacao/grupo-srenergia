import Image from "next/image";
import type { Brand } from "@/lib/brands";

/**
 * Logotipo completo da marca — símbolo mais tipografia, o arquivo oficial.
 *
 * Recortado do PNG original com limiar de opacidade (o `getbbox` puro pegava o
 * halo de baixa opacidade e devolvia a tela quase inteira, achatando o lockup
 * num retângulo de aspecto 1.47 em vez dos ~2.6 reais).
 *
 * Escala pela ALTURA: os cinco lockups têm larguras diferentes, e fixar a
 * largura deixaria uns gigantes e outros minúsculos lado a lado. Passe a altura
 * em `className` (ex.: `h-7`) e a largura se resolve sozinha.
 */

type BrandLockupProps = {
  brand: Brand;
  /** Traga a altura aqui — ex.: "h-7". A largura é automática. */
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function BrandLockup({
  brand,
  className,
  sizes = "220px",
  priority = false,
}: BrandLockupProps) {
  if (!brand.logo) return null;

  return (
    <Image
      src={brand.logo}
      alt={brand.name}
      width={640}
      height={240}
      sizes={sizes}
      priority={priority}
      className={`w-auto object-contain object-left ${className ?? ""}`}
    />
  );
}
