import Image from "next/image";
import Link from "next/link";
import { accentClasses, companies, mobility } from "@/lib/brands";
import { BrandCard } from "@/components/BrandCard";
import { EnergyBus } from "@/components/EnergyBus";
import { EnergyLines } from "@/components/EnergyLines";
import { Reveal } from "@/components/Reveal";
import { Arrow, ButtonLink, Eyebrow } from "@/components/ui";

/** Perfis atendidos — conteúdo do briefing, não estatística inventada. */
const PROFILES = [
  {
    title: "Residencial",
    description: "Geração própria para reduzir ou zerar a conta de luz da casa.",
  },
  {
    title: "Comercial",
    description: "Energia previsível para quem tem margem apertada e conta alta.",
  },
  {
    title: "Industrial",
    description: "Alta demanda, continuidade operacional e custo sob controle.",
  },
  {
    title: "Rural",
    description: "Usinas de solo e soluções para propriedades fora do centro urbano.",
  },
];

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="on-dark relative overflow-hidden">
        {/* Malha de infraestrutura: grid hairline + brilho do azul de marca */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-ink-700) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink-700) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 0%, #000 30%, transparent 78%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 18% 8%, color-mix(in srgb, var(--color-brand-600) 26%, transparent), transparent 62%), radial-gradient(ellipse 45% 45% at 88% 30%, color-mix(in srgb, var(--color-sr) 14%, transparent), transparent 60%)",
          }}
        />

        {/* Barramento: cinco fontes convergindo em uma saída só. Ocupa a metade
            direita no desktop; no mobile some para não competir com o título. */}
        <EnergyBus className="pointer-events-none absolute -right-16 top-0 hidden h-full w-[46%] lg:block" />

        <div className="container-page relative flex min-h-[86svh] flex-col justify-center pb-24 pt-36 lg:min-h-[92svh] lg:pb-32">
          <Reveal>
            <Eyebrow className="text-brand-400">Ecossistema de energia</Eyebrow>
          </Reveal>

          <Reveal index={1}>
            <h1 className="mt-8 max-w-[11ch] font-display text-display text-white text-balance">
              Toda a energia.{" "}
              <span className="text-brand-400">Um só grupo.</span>
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p className="mt-8 max-w-[46ch] text-lead text-ink-300">
              Geração, engenharia, tecnologia própria e mobilidade elétrica em um
              único ecossistema.
            </p>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-11 flex flex-wrap gap-3">
              <ButtonLink href="#ecossistema" variant="on-dark">
                Conheça nossas empresas
              </ButtonLink>
              <ButtonLink href="/contato" variant="ghost" className="text-white">
                Falar com um especialista
              </ButtonLink>
            </div>
          </Reveal>

          {/* No mobile o barramento entra no fluxo, abaixo dos botões. */}
          <EnergyBus className="mt-14 h-56 w-full lg:hidden" />
        </div>
      </section>

      {/* ================= MANIFESTO + ECOSSISTEMA ================= */}
      <section id="ecossistema" className="on-dark section scroll-mt-24">
        <div className="container-page">
          <Reveal className="text-center">
            <Eyebrow className="justify-center text-brand-400">
              Conheça nossas empresas
            </Eyebrow>
            <h2 className="mx-auto mt-6 max-w-[22ch] font-display text-h1 text-white text-balance">
              Quatro empresas. Uma única cadeia de energia.
            </h2>
            <p className="mx-auto mt-6 max-w-[62ch] text-lead text-ink-300">
              Cada empresa tem uma função específica, mas todas trabalham de forma
              integrada. É isso que permite atender desde uma instalação residencial
              até uma operação que não pode ficar sem energia um minuto sequer.
            </p>
          </Reveal>

          {/* Assinatura: o tronco do grupo se ramifica nas quatro marcas.
              A largura acompanha exatamente a do grid — os ramos terminam em
              12,5% / 37,5% / 62,5% / 87,5%, que são os centros das 4 colunas. */}
          <EnergyLines className="mt-14 hidden h-[140px] w-full lg:block" />

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4">
            {companies.map((brand, i) => (
              <Reveal key={brand.slug} index={i} as="div" className="h-full">
                <BrandCard brand={brand} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MOBILIDADE ELÉTRICA (claro) ================= */}
      <section
        id="mobilidade"
        className="section scroll-mt-24 bg-paper-50 [--accent:var(--color-mobi)]"
      >
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
            <Reveal>
              <Eyebrow className="text-mobi-ink">Nova área de atuação</Eyebrow>
              <h2 className="mt-6 max-w-[16ch] font-display text-h1 text-paper-900 text-balance">
                A energia que move os veículos elétricos.
              </h2>
              <p className="measure mt-6 text-lead text-paper-600">
                {mobility.intro}
              </p>
              <ButtonLink
                href={`/${mobility.slug}`}
                variant="accent"
                className={`mt-9 ${accentClasses[mobility.accent].btn}`}
              >
                Ver soluções de recarga
              </ButtonLink>
            </Reveal>

            <Reveal index={1}>
              <ul className="grid gap-px overflow-hidden rounded-lg border border-paper-200 bg-paper-200 sm:grid-cols-2">
                {mobility.services.slice(0, 6).map((service) => (
                  <li key={service.title} className="bg-paper-0 p-6">
                    <h3 className="font-display text-[0.9375rem] font-bold text-paper-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-paper-600">
                      {service.description}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= OBRAS ENTREGUES ================= */}
      <section id="obras" className="on-dark section scroll-mt-24">
        <div className="container-page">
          <Reveal>
            <Eyebrow className="text-brand-400">Obras entregues</Eyebrow>
            <h2 className="mt-6 max-w-[20ch] font-display text-h1 text-white text-balance">
              Projeto no papel é fácil. Usina gerando é outra coisa.
            </h2>
            <p className="measure mt-6 text-lead text-ink-300">
              Telhado industrial, solo, área rural. Sistemas dimensionados, instalados
              e conectados pela nossa própria equipe.
            </p>
          </Reveal>

          <Reveal index={1} className="mt-14">
            <figure className="overflow-hidden rounded-lg border border-ink-800">
              <div className="relative aspect-[16/9] lg:aspect-[21/9]">
                <Image
                  src="/imagem1.jpg"
                  alt="Vista aérea de um complexo industrial com módulos fotovoltaicos instalados sobre os telhados dos galpões."
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="border-t border-ink-800 bg-ink-900 px-6 py-4 text-sm text-ink-300">
                Geração em telhado industrial — múltiplos galpões integrados em um
                único sistema.
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {[
              {
                src: "/imagem2.jpg",
                alt: "Vista aérea de uma usina fotovoltaica de solo com cinco fileiras de módulos em terreno rural.",
                caption: "Usina de solo em área rural, com conexão à rede de distribuição.",
              },
              {
                src: "/imagem3.jpg",
                alt: "Vista aérea de uma usina fotovoltaica de solo instalada entre vegetação e área de plantio.",
                caption: "Geração distribuída no campo, próxima à unidade consumidora.",
              },
            ].map((photo, i) => (
              <Reveal key={photo.src} index={i}>
                <figure className="h-full overflow-hidden rounded-lg border border-ink-800">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-ink-800 bg-ink-900 px-6 py-4 text-sm text-ink-300">
                    {photo.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PERFIS ATENDIDOS (claro) ================= */}
      <section className="section bg-paper-100">
        <div className="container-page">
          <Reveal>
            <Eyebrow>Para quem atendemos</Eyebrow>
            <h2 className="mt-6 max-w-[20ch] font-display text-h1 text-paper-900 text-balance">
              A mesma engenharia, em quatro escalas diferentes.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-paper-200 bg-paper-200 sm:grid-cols-2 lg:grid-cols-4">
            {PROFILES.map((profile, i) => (
              <Reveal key={profile.title} index={i} as="div" className="h-full">
                <div className="h-full bg-paper-0 p-7">
                  <h3 className="font-display text-h3 text-paper-900">{profile.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper-600">
                    {profile.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal index={2}>
            <p className="mt-10 text-sm text-paper-600">
              Não sabe por onde começar?{" "}
              {/* brand-700 e não brand-600: sobre paper-100 o 600 cai para 4:1. */}
              <Link
                href="/contato"
                className="link-underline font-semibold text-brand-700"
              >
                Fale com a SR Energia
              </Link>{" "}
              — é a porta de entrada do grupo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="on-dark relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 50% 100%, color-mix(in srgb, var(--color-brand-600) 24%, transparent), transparent 70%)",
          }}
        />
        <div className="container-page relative section">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-h1 text-white text-balance">
              Uma necessidade energética. Um grupo inteiro por trás dela.
            </h2>
            <p className="mx-auto mt-6 max-w-[54ch] text-lead text-ink-300">
              Conte o seu caso e direcionamos para a empresa certa do ecossistema —
              geração, engenharia, tecnologia de geração contínua, modelo associativo
              ou infraestrutura de recarga.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contato" variant="on-dark">
                Falar com o grupo
              </ButtonLink>
              <Link
                href="/sr-energia"
                className="group inline-flex h-12 items-center gap-2 px-4 text-sm font-semibold text-white"
              >
                Começar pela SR Energia
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
