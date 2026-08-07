import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { accentClasses, brands, getBrand } from "@/lib/brands";
import { BrandMark } from "@/components/BrandMark";
import { Reveal } from "@/components/Reveal";
import { Arrow, ButtonLink, Eyebrow } from "@/components/ui";

type Params = { params: Promise<{ brand: string }> };

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};

  return {
    title: `${brand.name} — ${brand.kicker}`,
    description: brand.intro,
    openGraph: { title: `${brand.name} · Grupo SR Energia`, description: brand.intro },
  };
}

export default async function BrandPage({ params }: Params) {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const accent = accentClasses[brand.accent];
  const others = brands.filter((b) => b.slug !== brand.slug);

  /* A JirehMac é uma pilha de fontes, não uma lista de serviços — as camadas
     têm ordem e dependência entre si, então ganham numeração. */
  const asLayers = brand.slug === "jirehmac";

  return (
    <div
      style={{
        ["--accent" as string]: `var(--color-${brand.accent})`,
        ["--accent-ink" as string]: `var(--color-${brand.accent}-ink)`,
      }}
    >
      {/* ================= HERO ================= */}
      <section className="on-dark relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 15% 0%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 65%)",
          }}
        />
        {/* Glifo gigante em marca d'água */}
        <BrandMark
          mark={brand.mark}
          className={`pointer-events-none absolute -right-16 top-8 h-[26rem] w-[26rem] opacity-[0.07] ${accent.text}`}
        />

        <div className="container-page relative pb-20 pt-36 lg:pb-28 lg:pt-44">
          <Reveal>
            <Link
              href="/#ecossistema"
              className="link-underline inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
            >
              <span aria-hidden="true">←</span> Ecossistema Grupo SR Energia
            </Link>
          </Reveal>

          <Reveal index={1}>
            <div className="mt-10 flex items-center gap-4">
              <BrandMark mark={brand.mark} className={`h-14 w-14 shrink-0 ${accent.text}`} />
              <h1 className="font-display text-h1 text-white text-balance">{brand.name}</h1>
            </div>
          </Reveal>

          <Reveal index={2}>
            <p className={`mt-5 text-lead font-medium ${accent.text}`}>{brand.kicker}</p>
          </Reveal>

          <Reveal index={3}>
            <p className="measure mt-8 text-lead text-ink-300">{brand.intro}</p>
          </Reveal>

          <Reveal index={4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contato" variant="on-dark">
                Falar com a {brand.name}
              </ButtonLink>
              <ButtonLink href="#atuacao" variant="ghost" className="text-white">
                Ver o que fazemos
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= ATUAÇÃO ================= */}
      <section id="atuacao" className="section scroll-mt-24 bg-paper-50">
        <div className="container-page">
          <Reveal>
            <Eyebrow className={accent.textInk}>
              {asLayers ? "As camadas do sistema" : "Nossa atuação"}
            </Eyebrow>
            <h2 className="mt-6 max-w-[24ch] font-display text-h2 text-paper-900 text-balance">
              {asLayers
                ? "Seis fontes. Uma decisão automática a cada instante."
                : `O que a ${brand.name} entrega.`}
            </h2>
            {asLayers && (
              <p className="measure mt-6 text-lead text-paper-600">
                As camadas são acionadas em ordem de prioridade — da mais barata e
                limpa à contingência final. A comutação é automática e não é
                percebida pela operação.
              </p>
            )}
          </Reveal>

          {asLayers ? (
            <ol className="mt-14 space-y-px overflow-hidden rounded-lg border border-paper-200 bg-paper-200">
              {brand.services.map((service, i) => (
                <Reveal key={service.title} index={i} as="li">
                  <div className="flex flex-col gap-4 bg-paper-0 p-7 sm:flex-row sm:gap-8">
                    <span
                      className={`font-display text-h3 tabular-nums ${accent.textInk}`}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="sm:pt-0.5">
                      <h3 className="font-display text-h3 text-paper-900">{service.title}</h3>
                      <p className="measure mt-2.5 text-paper-600">{service.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          ) : (
            <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-paper-200 bg-paper-200 md:grid-cols-2 lg:grid-cols-3">
              {brand.services.map((service, i) => (
                <Reveal key={service.title} index={i % 3} as="div" className="h-full">
                  <div className="group h-full bg-paper-0 p-7">
                    <span
                      aria-hidden="true"
                      className={`block h-[3px] w-8 transition-[width] duration-320 ease-out group-hover:w-14 ${accent.bg}`}
                    />
                    <h3 className="mt-5 font-display text-h3 text-paper-900">
                      {service.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-paper-600">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= LUGAR NO ECOSSISTEMA ================= */}
      <section className="on-dark section">
        <div className="container-page">
          <Reveal>
            <Eyebrow className={accent.text}>No ecossistema</Eyebrow>
            <h2 className="mt-6 max-w-[26ch] font-display text-h2 text-white text-balance">
              A {brand.name} não trabalha sozinha.
            </h2>
            <p className="measure mt-6 text-lead text-ink-300">
              Quando um projeto exige mais de uma competência, as outras frentes do
              grupo entram junto — sem repassar o cliente para fora.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other, i) => {
              const otherAccent = accentClasses[other.accent];
              return (
                <Reveal key={other.slug} index={i} as="li" className="h-full">
                  <Link
                    href={`/${other.slug}`}
                    className={`group flex h-full flex-col rounded-lg border border-ink-800 bg-ink-900 p-6 transition-[border-color,transform] duration-240 ease-out hover:-translate-y-0.5 ${otherAccent.borderHover}`}
                  >
                    <BrandMark
                      mark={other.mark}
                      className={`h-8 w-8 ${otherAccent.text}`}
                    />
                    <h3 className="mt-5 font-display text-base font-bold text-white">
                      {other.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-300">
                      {other.tagline}
                    </p>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-white">
                      Ver
                      <Arrow />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section bg-paper-100">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-h2 text-paper-900 text-balance">
              Vamos falar sobre o seu projeto?
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-paper-600">
              Descreva a sua necessidade e direcionamos para a frente certa do grupo.
            </p>
            <ButtonLink href="/contato" variant="accent" className={`mt-8 ${accent.btn}`}>
              Falar com o grupo
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
