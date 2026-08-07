import { BrandLockup } from "./BrandLockup";
import { getBrand } from "@/lib/brands";

/**
 * Lockup do Grupo SR Energia.
 *
 * O grupo não tem marca própria (ver README, pendências), então usa o logotipo
 * oficial da SR Energia — a marca-mãe do ecossistema.
 *
 * É o único dos cinco que funciona nos dois regimes de luz: o lettering é
 * laranja e a assinatura é azul, nenhum dos dois some no creme nem no escuro.
 * Os demais têm tipografia em azul-marinho ou grafite e precisam de versão
 * negativa (pendência aberta).
 */

const sr = getBrand("sr-energia")!;

export function GroupLogo({ className }: { className?: string }) {
  return (
    <BrandLockup
      brand={sr}
      className={`h-[2.52rem] sm:h-[2.88rem] ${className ?? ""}`}
      sizes="240px"
      priority
    />
  );
}
