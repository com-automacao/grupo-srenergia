"use client";

import { useState, type FormEvent } from "react";
import { brands } from "@/lib/brands";
import { CONTACT, hasEmail } from "@/lib/contact";

/**
 * Formulário de contato.
 *
 * Enquanto `CONTACT.email` estiver vazio (ver src/lib/contact.ts) o envio fica
 * desativado e o formulário diz isso claramente, em vez de fingir que enviou.
 * Com o e-mail preenchido, a mensagem é composta e aberta no cliente de e-mail
 * do visitante — sem backend, sem serviço externo, sem dado trafegando fora.
 */

const SUBJECTS = [
  { value: "", label: "Selecione o assunto" },
  ...brands.map((b) => ({ value: b.name, label: b.name })),
  { value: "Não sei / outro", label: "Não sei por onde começar" },
];

const fieldClass =
  "w-full rounded-md border border-paper-200 bg-paper-0 px-4 py-3 text-body " +
  "text-paper-900 transition-colors duration-160 placeholder:text-paper-600/70 " +
  "hover:border-paper-600/40 focus:border-brand-600 focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] " +
  "disabled:cursor-not-allowed disabled:bg-paper-100 disabled:text-paper-600";

const labelClass = "block text-sm font-semibold text-paper-900";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasEmail) return;

    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const body = [
      `Nome: ${get("nome")}`,
      `E-mail: ${get("email")}`,
      `Telefone: ${get("telefone")}`,
      `Cidade: ${get("cidade")}`,
      `Assunto: ${get("assunto")}`,
      "",
      get("mensagem"),
    ].join("\n");

    const subject = `Site — contato sobre ${get("assunto") || "o Grupo SR Energia"}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-5">
      {!hasEmail && (
        <p
          role="status"
          className="rounded-md border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-paper-900"
        >
          <strong className="font-semibold">Envio ainda não configurado.</strong>{" "}
          O e-mail de destino precisa ser definido em{" "}
          <code className="rounded-sm bg-paper-100 px-1 py-0.5 text-[0.8125rem]">
            src/lib/contact.ts
          </code>
          . O formulário abaixo já está pronto e funcional.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className={labelClass}>
            Nome <span aria-hidden="true">*</span>
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            autoComplete="name"
            disabled={!hasEmail}
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            E-mail <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={!hasEmail}
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="telefone" className={labelClass}>
            Telefone
          </label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            autoComplete="tel"
            disabled={!hasEmail}
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="cidade" className={labelClass}>
            Cidade
          </label>
          <input
            id="cidade"
            name="cidade"
            type="text"
            autoComplete="address-level2"
            disabled={!hasEmail}
            className={`${fieldClass} mt-2`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="assunto" className={labelClass}>
          Sobre o que você quer falar? <span aria-hidden="true">*</span>
        </label>
        <select
          id="assunto"
          name="assunto"
          required
          disabled={!hasEmail}
          defaultValue=""
          className={`${fieldClass} mt-2`}
        >
          {SUBJECTS.map((option) => (
            <option key={option.label} value={option.value} disabled={option.value === ""}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mensagem" className={labelClass}>
          Mensagem <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={5}
          required
          disabled={!hasEmail}
          placeholder="Conte o seu caso: tipo de imóvel ou operação, consumo aproximado e o que você precisa resolver."
          className={`${fieldClass} mt-2 resize-y`}
        />
      </div>

      <p className="text-sm text-paper-600">
        Campos marcados com <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> são obrigatórios.
      </p>

      <button
        type="submit"
        disabled={!hasEmail}
        className="inline-flex h-12 items-center justify-center rounded-md bg-brand-600 px-6 text-sm font-semibold text-white transition-[background-color,transform,box-shadow] duration-240 ease-out hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-2 active:translate-y-0 disabled:pointer-events-none disabled:opacity-45"
      >
        Enviar mensagem
      </button>

      <p aria-live="polite" className="text-sm text-paper-600">
        {sent && "Abrimos o seu programa de e-mail com a mensagem pronta para envio."}
      </p>
    </form>
  );
}
