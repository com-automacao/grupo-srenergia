import Image from "next/image";
import type { Brand } from "@/lib/brands";
import { BrandMark } from "./BrandMark";

/**
 * Identidade visual de uma marca do ecossistema.
 *
 * Usa o símbolo oficial quando existe; cai no glifo desenhado em SVG quando
 * não — hoje só a Mobilidade Elétrica, que ainda não tem logo.
 *
 * Sempre decorativo (`alt=""`): o nome da marca acompanha em texto em todos os
 * pontos de uso, então repetir aqui só duplicaria o anúncio no leitor de tela.
 *
 * Nota de aplicação: o **logotipo completo** das marcas tem tipografia em
 * azul-marinho e grafite, que somem no azul-noite. Por isso o site usa o
 * símbolo mais o nome na tipografia própria, e não o lockup inteiro.
 */

type BrandGlyphProps = {
  brand: Brand;
  /** Deve trazer largura e altura — o símbolo preenche o box. */
  className?: string;
  /** Dica de tamanho para o next/image. Default cobre os usos pequenos. */
  sizes?: string;
};

export function BrandGlyph({ brand, className, sizes = "64px" }: BrandGlyphProps) {
  if (!brand.symbol) {
    return <BrandMark mark={brand.mark} className={className} />;
  }

  return (
    <span className={`relative block shrink-0 ${className ?? ""}`}>
      <Image
        src={brand.symbol}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className="object-contain"
      />
    </span>
  );
}
