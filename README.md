# Grupo SR Energia

Site institucional do Grupo SR Energia — um ecossistema de empresas de energia
composto por **SR Energia**, **Jireh Energia**, **JirehMac** e **ABEST**, mais a
frente de **Mobilidade Elétrica**.

O conceito do site é comunicar que o grupo não é uma empresa de energia solar,
e sim uma cadeia integrada que cobre o setor de ponta a ponta: geração,
engenharia, tecnologia própria de geração contínua, modelos associativos e
infraestrutura de recarga.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 (tokens via `@theme`) |
| Fontes | Sora (display) + Inter (texto) via `next/font` |
| Animação | CSS nativo + IntersectionObserver — **sem biblioteca de animação** |
| Deploy | Vercel |

Todas as páginas são estáticas (SSG). Nenhuma dependência além do núcleo
Next/React/Tailwind.

---

## Rodando localmente

```bash
npm install
```

```bash
npm run dev
```

Disponível em `http://localhost:3000`.

Outros comandos:

```bash
npm run build
```

```bash
npm run lint
```

---

## Estrutura

```
src/
├─ app/
│  ├─ layout.tsx            Header, Footer, fontes, metadata global
│  ├─ page.tsx              Home
│  ├─ globals.css           Tokens do design system + base + utilitários
│  ├─ [brand]/page.tsx      Template das 5 páginas de marca (SSG)
│  └─ contato/page.tsx      Contato
├─ components/
│  ├─ Header.tsx            Nav fixa, dropdown do ecossistema, menu mobile
│  ├─ Footer.tsx
│  ├─ BrandCard.tsx         Card de marca com régua de acento no hover
│  ├─ BrandMark.tsx         Glifos das marcas em SVG
│  ├─ GroupLogo.tsx         Lockup do Grupo
│  ├─ EnergyLines.tsx       Assinatura: tronco que se ramifica nas 4 marcas
│  ├─ ContactForm.tsx
│  ├─ Reveal.tsx            Reveal no scroll (IntersectionObserver)
│  └─ ui.tsx                Botões, eyebrow, seta
└─ lib/
   ├─ brands.ts             Conteúdo das 5 marcas — fonte única
   └─ contact.ts            Dados de contato (ver pendências)
```

### Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Home — hero, ecossistema, mobilidade, obras, perfis, CTA |
| `/sr-energia` | Projetos, instalação e soluções fotovoltaicas |
| `/jireh-energia` | Engenharia, inovação e tecnologia |
| `/jirehmac` | Tecnologia Inteligente de Geração de Energia |
| `/abest` | Associação Brasileira de Energia Solar para Todos |
| `/mobilidade-eletrica` | Infraestrutura de recarga para veículos elétricos |
| `/contato` | Formulário e canais diretos |

---

## Design system

O documento canônico é **[`MASTER.md`](MASTER.md)**: paleta, tipografia,
espaçamento, raios, elevação, motion e componentes base. Os tokens estão
implementados no bloco `@theme` de
[`src/app/globals.css`](src/app/globals.css).

**Regra do projeto:** nenhum valor visual é escrito direto no componente. Toda
cor, espaçamento, raio, sombra e duração vem de um token. Se um valor não
existe, ele é adicionado ao `MASTER.md` primeiro.

### Cor

Um **azul-noite institucional** (`#050B18`) serve de espinha para todo o grupo,
e cada marca carrega um acento herdado do seu próprio logo:

| Marca | puro | `-ink` (texto no claro) | `-lit` (texto no escuro) |
|---|---|---|---|
| SR Energia | `#FF4B12` | `#CC3100` | `#FF4B12` |
| Jireh Energia | `#21C2F5` | `#077497` | `#21C2F5` |
| JirehMac | `#86CE2E` | `#4E771B` | `#86CE2E` |
| ABEST | `#E8151C` | `#D7141A` | `#F2565B` |
| Mobilidade Elétrica | `#7257FF` | `#6749FF` | `#9C87FF` |

Cada acento tem três papéis porque uma cor só não passa em contraste nos dois
regimes de luz. O tom puro é **decorativo e fundo de botão** — nunca texto sobre
fundo claro. Em botão, laranja, ciano e verde-limão recebem **texto escuro**
(5,9 a 10,2:1); vermelho e violeta recebem branco. Inverter o texto preserva a
cor da marca em vez de escurecê-la até virar lama.

O regime de luz alterna por seção: escuro nas âncoras (hero, ecossistema,
obras, rodapé), claro onde o conteúdo respira.

Todo par texto/fundo do site foi **medido**, não estimado — a tabela de razões
está em [`MASTER.md`](MASTER.md) §2.6, junto com as armadilhas já encontradas
(ex.: `brand-600` reprova sobre `paper-100`; o hover do botão primário escurece
em vez de clarear, senão o texto branco cairia para 3,4:1 no exato momento de
uso).

### Motion

Transições de 160–320ms em `ease-out` cúbico. O hover **acende** (borda e
acento ganham luz, translação de −2px) em vez de crescer — não há `scale`,
bounce, elástico nem parallax. `prefers-reduced-motion` é respeitado
globalmente, e sem JavaScript todo o conteúdo nasce visível.

> ⚠️ **Cascade layers.** As regras base ficam em `@layer base` e os utilitários
> do projeto em `@layer components`. CSS fora de layer vence *todas* as
> utilities do Tailwind v4 — foi assim que um `* { border-color }` chegou a
> sobrescrever cada `border-*` do site. Ao adicionar CSS global, sempre declare
> a layer.

---

## Conteúdo

Todo o conteúdo das marcas vive em [`src/lib/brands.ts`](src/lib/brands.ts):
nome, descrição, lista de serviços, acento e glifo. Alterar uma descrição ali
reflete na home, no menu, no rodapé e na página interna ao mesmo tempo.

---

## Pendências

Itens que dependem de material ou informação do cliente:

- [ ] **Logos em vetor.** Os arquivos em `public/` são mockups renderizados
      (marca aplicada em parede, com relevo e brilho) — não servem para o site.
      É preciso SVG ou PNG com fundo transparente, em versão positiva e
      negativa, das quatro marcas e do Grupo. Enquanto isso, os glifos são
      desenhados em SVG (`BrandMark.tsx`), fiéis aos símbolos originais.
- [ ] **Marca do Grupo SR Energia.** Ainda não fornecida; o lockup atual é
      tipográfico, usando o arco de grid solar em degradê azul→laranja.
- [ ] **Dados de contato.** E-mail, telefone, WhatsApp, endereço, horário e
      redes sociais — preencher em
      [`src/lib/contact.ts`](src/lib/contact.ts). Enquanto estiverem vazios, o
      formulário avisa que o envio não está ativo e nenhum dado fictício é
      exibido.
- [ ] **Números institucionais.** Nada foi inventado: se houver kWp instalados,
      obras entregues ou anos de mercado que o cliente queira exibir, é possível
      adicionar uma faixa de indicadores na home.
- [ ] **Mais fotos de obra.** Há três imagens de drone. Um acervo maior permite
      transformar a seção "Obras entregues" em uma galeria por segmento.
