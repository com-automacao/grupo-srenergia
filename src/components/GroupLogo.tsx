import { BrandLockup } from "./BrandLockup";
import { getBrand } from "@/lib/brands";

/**
 * Lockup do Grupo SR Energia.
 *
 * O grupo não tem marca própria (ver README, pendências), então usa o logotipo
 * oficial da SR Energia — a marca-mãe do ecossistema — com "GRUPO" em mono
 * acima, na voz de rótulo do sistema.
 *
 * O logotipo da SR funciona nos dois regimes de luz: o lettering é laranja e a
 * assinatura é azul, nenhum dos dois some no creme nem no escuro. É o único dos
 * cinco com essa propriedade — os outros têm tipografia em azul-marinho ou
 * grafite e precisam de versão negativa (pendência aberta).
 */

const sr = getBrand("sr-energia")!;

type GroupLogoProps = {
  /** Em superfície escura o rótulo "GRUPO" clareia. */
  tone?: "dark" | "light";
  className?: string;
};

export function GroupLogo({ tone = "dark", className }: GroupLogoProps) {
  return (
    <span className={`inline-flex flex-col gap-1 ${className ?? ""}`}>
      <span
        className={`font-mono text-[0.5rem] uppercase leading-none tracking-[0.3em] ${
          tone === "light" ? "text-ink-300" : "text-ink-500"
        }`}
      >
        Grupo
      </span>
      <BrandLockup brand={sr} className="h-7 sm:h-8" sizes="200px" priority />
    </span>
  );
}
