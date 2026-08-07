import Link from "next/link";
import { companies, mobility, accentClasses } from "@/lib/brands";
import { GroupLogo } from "./GroupLogo";

export function Footer() {
  return (
    <footer className="on-dark border-t border-ink-800">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <GroupLogo />
            <p className="measure mt-6 text-sm text-ink-300">
              Um ecossistema integrado de soluções energéticas: geração, engenharia,
              tecnologia própria de geração inteligente e modelos que tornam a energia
              mais acessível.
            </p>
          </div>

          <nav aria-labelledby="rodape-empresas">
            <h2
              id="rodape-empresas"
              className="text-eyebrow uppercase text-ink-500"
            >
              Empresas
            </h2>
            <ul className="mt-5 space-y-3">
              {companies.map((brand) => (
                <li key={brand.slug}>
                  <Link
                    href={`/${brand.slug}`}
                    className="group inline-flex items-center gap-2.5 text-sm text-ink-300 transition-colors duration-160 hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${accentClasses[brand.accent].bg}`}
                    />
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="rodape-grupo">
            <h2 id="rodape-grupo" className="text-eyebrow uppercase text-ink-500">
              Grupo
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href={`/${mobility.slug}`}
                  className="inline-flex items-center gap-2.5 text-sm text-ink-300 transition-colors duration-160 hover:text-white"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mobi" />
                  {mobility.name}
                </Link>
              </li>
              <li>
                <Link
                  href="/#ecossistema"
                  className="text-sm text-ink-300 transition-colors duration-160 hover:text-white"
                >
                  O ecossistema
                </Link>
              </li>
              <li>
                <Link
                  href="/#obras"
                  className="text-sm text-ink-300 transition-colors duration-160 hover:text-white"
                >
                  Obras entregues
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-sm text-ink-300 transition-colors duration-160 hover:text-white"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-ink-500">
            © {new Date().getFullYear()} Grupo SR Energia. Todos os direitos reservados.
          </p>
          <p className="text-[0.8125rem] text-ink-500">
            SR Energia · Jireh Energia · JirehMac · ABEST
          </p>
        </div>
      </div>
    </footer>
  );
}
