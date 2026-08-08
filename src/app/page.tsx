import Image from "next/image";
import Link from "next/link";
import { accentClasses, companies, mobility } from "@/lib/brands";
import { BrandCard } from "@/components/BrandCard";
import { SolarHero } from "@/components/hero/SolarHero";
import { ScrollExpandVideo } from "@/components/ScrollExpandVideo";
import { CityGrid } from "@/components/CityGrid";
import { DisclosureCard } from "@/components/DisclosureCard";
import { ProfileGrid } from "@/components/ProfileGrid";
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
      <SolarHero />

      {/* ================= ECOSSISTEMA ================= */}
      <section
        id="ecossistema"
        className="section relative scroll-mt-28 overflow-hidden bg-cream-100"
      >
        {/* Planta aérea em traço: as luzes acendem da esquerda para a direita
            conforme a seção sobe — a energia entrando pela rede. */}
        <CityGrid className="pointer-events-none absolute inset-0 h-full w-full" />

        <div className="container-page relative">
          <Reveal>
            <p className="font-mono text-label uppercase text-solar-ink">
              Conheça nossas empresas
            </p>
            <h2 className="mt-6 max-w-[18ch] font-display text-h1 text-ink-950 text-balance">
              Quatro empresas. Uma única cadeia de energia.
            </h2>
            <p className="measure mt-6 text-lead text-ink-600">
              Cada empresa tem uma função específica, mas todas trabalham de forma
              integrada. É isso que permite atender desde uma instalação residencial
              até uma operação que não pode ficar sem energia um minuto sequer.
            </p>
          </Reveal>

          {/* A malha faz a separação: uma grade de 1px preenchida por células
              cor de creme, sem borda em cada card. */}
          <div className="mt-16 grid gap-px bg-cream-300 sm:grid-cols-2 lg:grid-cols-4">
            {companies.map((brand, i) => (
              <Reveal key={brand.slug} index={i} as="div" className="h-full">
                <BrandCard brand={brand} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MOBILIDADE ELÉTRICA (claro) =================
          Escondida no celular a pedido do cliente. A frente continua no menu e
          com página própria — só não abre espaço na home em tela estreita. */}
      <section
        id="mobilidade"
        className="hidden section scroll-mt-24 bg-cream-50 md:block [--accent:var(--color-mobi)]"
      >
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
            <Reveal>
              <Eyebrow className="text-mobi-ink">Nova área de atuação</Eyebrow>
              <h2 className="mt-6 max-w-[16ch] font-display text-h1 text-ink-950 text-balance">
                A energia que move os veículos elétricos.
              </h2>
              <p className="measure mt-6 text-lead text-ink-600">
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
              <ul className="grid gap-px bg-cream-300 sm:grid-cols-2">
                {mobility.services.slice(0, 6).map((service) => (
                  <li key={service.title}>
                    <DisclosureCard title={service.title} className="h-full">
                      {service.description}
                    </DisclosureCard>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= OBRAS ENTREGUES ================= */}
      <section id="obras" className="on-dark scroll-mt-28">
        <ScrollExpandVideo
          src1080="/video/fazenda-solar-1080.mp4"
          src720="/video/fazenda-solar-720.mp4"
          poster="/video/fazenda-solar-poster.jpg"
          label="Sobrevoo de drone sobre uma usina fotovoltaica do Grupo SR Energia, mostrando as fileiras de módulos instaladas em campo."
          eyebrow="Obras entregues"
          title={<>Projeto no papel é fácil. Usina gerando é outra coisa.</>}
        >
          <p className="measure mt-7 text-lead text-ink-300">
            Telhado industrial, solo, área rural. Sistemas dimensionados,
            instalados e conectados pela nossa própria equipe.
          </p>
        </ScrollExpandVideo>

        {/* No celular o vídeo já conta a história e as fotos virariam três
            blocos de rolagem sem ganho — ficam a partir de sm. */}
        <div className="container-page hidden pb-24 pt-20 sm:block">
          <div className="grid gap-px bg-ink-800 sm:grid-cols-3">
            {[
              {
                src: "/imagem1.jpg",
                alt: "Vista aérea de um complexo industrial com módulos fotovoltaicos instalados sobre os telhados dos galpões.",
                caption: "Telhado industrial — múltiplos galpões em um só sistema.",
              },
              {
                src: "/imagem2.jpg",
                alt: "Vista aérea de uma usina fotovoltaica de solo com cinco fileiras de módulos em terreno rural.",
                caption: "Usina de solo em área rural, conectada à distribuidora.",
              },
              {
                src: "/imagem3.jpg",
                alt: "Vista aérea de uma usina fotovoltaica de solo instalada entre vegetação e área de plantio.",
                caption: "Geração distribuída no campo, junto à unidade consumidora.",
              },
            ].map((photo, i) => (
              <Reveal key={photo.src} index={i} as="figure" className="h-full">
                <div className="bg-ink-950">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="px-6 py-5 text-sm text-ink-300">
                    {photo.caption}
                  </figcaption>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PERFIS ATENDIDOS (claro) ================= */}
      <section className="section bg-cream-100">
        <div className="container-page">
          <Reveal>
            <Eyebrow>Para quem atendemos</Eyebrow>
            <h2 className="mt-6 max-w-[20ch] font-display text-h1 text-ink-950 text-balance">
              A mesma engenharia, em quatro escalas diferentes.
            </h2>
          </Reveal>

          <ProfileGrid profiles={PROFILES} />

          <Reveal index={2}>
            <p className="mt-10 text-sm text-ink-600">
              Não sabe por onde começar?{" "}
              {/* brand-700 e não brand-600: sobre paper-100 o 600 cai para 4:1. */}
              <Link
                href="/contato"
                className="link-underline font-semibold text-solar-ink"
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
