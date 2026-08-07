import type { Metadata } from "next";
import Link from "next/link";
import { accentClasses, brands } from "@/lib/brands";
import { CONTACT, hasWhatsapp, hasEmail, whatsappUrl } from "@/lib/contact";
import { BrandGlyph } from "@/components/BrandGlyph";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o Grupo SR Energia. Descreva a sua necessidade e direcionamos para a empresa certa do ecossistema.",
};

/** Só entram na lista os canais efetivamente preenchidos em src/lib/contact.ts. */
const channels = [
  { label: "E-mail", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "Telefone", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\D/g, "")}` },
  { label: "WhatsApp", value: CONTACT.phone || CONTACT.whatsapp, href: whatsappUrl ?? "" },
  { label: "Endereço", value: CONTACT.address, href: "" },
  { label: "Atendimento", value: CONTACT.hours, href: "" },
].filter((c) => c.value.length > 0);

export default function ContatoPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="on-dark relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 20% 0%, color-mix(in srgb, var(--color-brand-600) 22%, transparent), transparent 65%)",
          }}
        />
        <div className="container-page relative pb-16 pt-36 lg:pb-20 lg:pt-44">
          <Reveal>
            <Eyebrow className="text-brand-400">Contato</Eyebrow>
            <h1 className="mt-6 max-w-[18ch] font-display text-h1 text-white text-balance">
              Conte o seu caso. Direcionamos para a frente certa.
            </h1>
            <p className="measure mt-7 text-lead text-ink-300">
              Uma única porta de entrada para todo o ecossistema — geração,
              engenharia, tecnologia de geração contínua, modelo associativo ou
              infraestrutura de recarga.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= FORMULÁRIO + CANAIS ================= */}
      <section className="section bg-paper-50">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <Reveal>
              <h2 className="font-display text-h2 text-paper-900">Envie uma mensagem</h2>
              <p className="measure mt-4 text-paper-600">
                Quanto mais contexto você der sobre o consumo e a operação, mais
                direto será o retorno.
              </p>
              <div className="mt-9">
                <ContactForm />
              </div>
            </Reveal>

            <Reveal index={1}>
              <div className="rounded-lg border border-paper-200 bg-paper-0 p-7">
                <h2 className="font-display text-h3 text-paper-900">Canais diretos</h2>

                {channels.length > 0 ? (
                  <dl className="mt-6 space-y-5">
                    {channels.map((channel) => (
                      <div key={channel.label}>
                        <dt className="text-eyebrow uppercase text-paper-600">
                          {channel.label}
                        </dt>
                        <dd className="mt-1.5 text-paper-900">
                          {channel.href ? (
                            <a
                              href={channel.href}
                              className="link-underline font-medium text-brand-600"
                              {...(channel.href.startsWith("http")
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                            >
                              {channel.value}
                            </a>
                          ) : (
                            channel.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-5 text-sm leading-relaxed text-paper-600">
                    Telefone, e-mail, WhatsApp e endereço ainda não foram cadastrados.
                    Assim que forem preenchidos em{" "}
                    <code className="rounded-sm bg-paper-100 px-1 py-0.5 text-[0.8125rem]">
                      src/lib/contact.ts
                    </code>
                    , aparecem aqui automaticamente.
                  </p>
                )}

                {hasWhatsapp && whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-md bg-success px-6 text-sm font-semibold text-white transition-transform duration-240 ease-out hover:-translate-y-0.5"
                  >
                    Falar no WhatsApp
                  </a>
                )}

                <p className="mt-7 border-t border-paper-200 pt-6 text-sm leading-relaxed text-paper-600">
                  {hasEmail
                    ? "Respondemos em horário comercial."
                    : "Prefere falar com uma empresa específica do grupo? Escolha ao lado no campo de assunto."}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= ATALHO PARA AS MARCAS ================= */}
      <section className="on-dark section">
        <div className="container-page">
          <Reveal>
            <Eyebrow className="text-brand-400">Ou vá direto ao ponto</Eyebrow>
            <h2 className="mt-6 max-w-[24ch] font-display text-h2 text-white text-balance">
              Já sabe do que precisa?
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {brands.map((brand, i) => {
              const accent = accentClasses[brand.accent];
              return (
                <Reveal key={brand.slug} index={i} as="li" className="h-full">
                  <Link
                    href={`/${brand.slug}`}
                    className={`group flex h-full flex-col rounded-lg border border-ink-800 bg-ink-900 p-6 transition-[border-color,transform] duration-240 ease-out hover:-translate-y-0.5 ${accent.borderHover}`}
                  >
                    <BrandGlyph brand={brand} sizes="32px" className={`h-8 w-8 ${accent.text}`} />
                    <h3 className="mt-5 font-display text-base font-bold text-white">
                      {brand.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-300">
                      {brand.kicker}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
