"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { companies, mobility, accentClasses } from "@/lib/brands";
import { GroupLogo } from "./GroupLogo";
import { BrandGlyph } from "./BrandGlyph";
import { ButtonLink } from "./ui";

/**
 * Header fixo. Nasce transparente sobre o hero escuro e ganha superfície sólida
 * assim que a página rola — o azul-noite do hero continua sendo o fundo até que
 * haja conteúdo claro por baixo.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // A home abre com hero escuro em tela cheia; as internas também.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha tudo ao navegar. Ajustar estado durante o render (e não em um efeito)
  // evita o render em cascata: o React descarta este render e refaz com os
  // menus já fechados, antes de qualquer pintura.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setMobileOpen(false);
  }

  // Dropdown: fecha no Escape e no clique fora.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen]);

  // Trava o scroll do body com o menu mobile aberto.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;
  // brand-500 sobre branco da 3.4:1 e reprova em AA justamente no hover, que e
  // quando o link esta sendo usado. No claro o hover escurece; no escuro clareia.
  const navHover = solid ? "hover:text-solar-ink" : "hover:text-solar";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-solar focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>

      {/* A cápsula paira: encolhe e ganha superfície ao rolar, em vez de virar
          uma barra colada no topo. */}
      <div
        className={`container-page mt-3 flex items-center justify-between gap-6 rounded-full px-4 transition-[background-color,box-shadow,border-color,height] duration-240 ease-out lg:px-5 ${
          solid
            ? "h-16 border border-cream-300 bg-cream-50/85 shadow-2 backdrop-blur-xl"
            : "h-20 border border-transparent"
        }`}
      >
        <Link
          href="/"
          aria-label="Grupo SR Energia — página inicial"
          className="rounded-sm"
        >
          <GroupLogo />
        </Link>

        {/* ---- Navegação desktop -------------------------------------- */}
        <nav
          aria-label="Principal"
          className={`hidden items-center gap-1 lg:flex ${solid ? "text-ink-950" : "text-white"}`}
        >
          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-160 ${navHover}`}
            >
              Empresas
              <svg
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className={`h-3 w-3 transition-transform duration-240 ease-out ${menuOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M2.5 4.5 6 8l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute left-0 top-full mt-2 w-[22rem] rounded-lg border border-cream-300 bg-cream-50 p-2 text-ink-950 shadow-3">
                {companies.map((brand) => {
                  const accent = accentClasses[brand.accent];
                  return (
                    <Link
                      key={brand.slug}
                      href={`/${brand.slug}`}
                      className="group flex items-start gap-3 rounded-md p-3 transition-colors duration-160 hover:bg-cream-100"
                    >
                      <BrandGlyph
                        brand={brand}
                        sizes="24px"
                        className={`mt-0.5 h-6 w-6 ${accent.textInk}`}
                      />
                      <span className="min-w-0">
                        <span className="block font-display text-sm font-bold">
                          {brand.name}
                        </span>
                        <span className="block text-[0.8125rem] leading-snug text-ink-600">
                          {brand.kicker}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href={`/${mobility.slug}`}
            className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-160 ${navHover}`}
          >
            Mobilidade Elétrica
          </Link>
          <Link
            href="/#obras"
            className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-160 ${navHover}`}
          >
            Obras
          </Link>

          <ButtonLink
            href="/contato"
            variant={solid ? "primary" : "on-dark"}
            className="ml-3 h-11 px-5"
          >
            Fale com o grupo
          </ButtonLink>
        </nav>

        {/* ---- Botão mobile -------------------------------------------- */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="menu-mobile"
          className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-md lg:hidden ${
            solid ? "text-ink-950" : "text-white"
          }`}
        >
          <span className="sr-only">{mobileOpen ? "Fechar menu" : "Abrir menu"}</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
            {mobileOpen ? (
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 8h16M4 16h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* ---- Painel mobile --------------------------------------------- */}
      {mobileOpen && (
        <div
          id="menu-mobile"
          className="container-page mt-2 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-3xl border border-cream-300 bg-cream-50 shadow-3 lg:hidden"
        >
          <nav aria-label="Principal (mobile)" className="p-5">
            <p className="text-eyebrow uppercase text-ink-600">Empresas</p>
            <ul className="mt-3 space-y-1">
              {companies.map((brand) => {
                const accent = accentClasses[brand.accent];
                return (
                  <li key={brand.slug}>
                    <Link
                      href={`/${brand.slug}`}
                      className="flex items-start gap-3 rounded-md p-3 transition-colors duration-160 hover:bg-cream-100"
                    >
                      <BrandGlyph
                        brand={brand}
                        sizes="24px"
                        className={`mt-0.5 h-6 w-6 ${accent.textInk}`}
                      />
                      <span>
                        <span className="block font-display font-bold">{brand.name}</span>
                        <span className="block text-sm leading-snug text-ink-600">
                          {brand.kicker}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 text-eyebrow uppercase text-ink-600">Também no grupo</p>
            <ul className="mt-3 space-y-1">
              <li>
                <Link
                  href={`/${mobility.slug}`}
                  className="flex items-start gap-3 rounded-md p-3 transition-colors duration-160 hover:bg-cream-100"
                >
                  <BrandGlyph brand={mobility} sizes="24px" className="mt-0.5 h-6 w-6 text-mobi-ink" />
                  <span>
                    <span className="block font-display font-bold">{mobility.name}</span>
                    <span className="block text-sm leading-snug text-ink-600">
                      {mobility.kicker}
                    </span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#obras" className="block rounded-md p-3 font-medium hover:bg-cream-100">
                  Obras entregues
                </Link>
              </li>
            </ul>

            <ButtonLink href="/contato" className="mt-8 w-full">
              Fale com o grupo
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
