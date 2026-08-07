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
| Fontes | Geist (display e texto) + DM Mono (rótulos) via `next/font` |
| Animação | CSS nativo + IntersectionObserver; GSAP ScrollTrigger e Lenis no hero |
| 3D / shader | Three.js (esfera do hero) e ogl (aurora das páginas de marca) |
| Deploy | Vercel |

Todas as páginas são estáticas (SSG).

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
│  ├─ hero/SolarHero.tsx    Hero: a mão sustentando o sol, em parallax
│  ├─ originkit/            Hero-19 do Originkit: backdrop, orbe, mão
│  ├─ SmoothScroll.tsx      Lenis + sincronia com o ScrollTrigger
│  ├─ SoftAurora.tsx       Aurora em shader — hero das páginas de marca
│  ├─ aurora-shader.ts     GLSL do SoftAurora (react-bits)
│  ├─ BrandCard.tsx         Célula de marca, com o logotipo completo
│  ├─ BrandLockup.tsx       Logotipo oficial completo
│  ├─ BrandGlyph.tsx        Símbolo oficial, com fallback no glifo SVG
│  ├─ BrandMark.tsx         Glifos em SVG — só para marcas sem logo
│  ├─ GroupLogo.tsx         Lockup do Grupo
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

Superfície **creme quente `#FFF7E9`**, tinta quente `#0D0B08` nas âncoras
escuras, e o **laranja da SR Energia `#FF4B12`** como acento único do Grupo.
Cada empresa só recupera o seu acento na própria página — a contenção é o que
sustenta o sistema.

Cada acento tem três papéis, porque uma cor só não passa em contraste nos dois
regimes de luz:

| Marca | puro | `-ink` (no creme) | `-lit` (no escuro) |
|---|---|---|---|
| SR Energia / Grupo | `#FF4B12` | `#C93000` | `#FF4B12` |
| Jireh Energia | `#21C2F5` | `#06687F` | `#21C2F5` |
| JirehMac | `#86CE2E` | `#466B18` | `#86CE2E` |
| ABEST | `#E8151C` | `#C11217` | `#F2565B` |
| Mobilidade Elétrica | `#7257FF` | `#5A3CEB` | `#9C87FF` |

O tom puro é **decorativo e fundo de botão** — nunca texto sobre creme. Em
botão, laranja, ciano e verde-limão recebem **texto escuro** (5,9 a 10,2:1);
vermelho e violeta recebem branco. Inverter o texto preserva a cor da marca em
vez de escurecê-la até virar lama.

Todo par texto/fundo foi **medido**, não estimado — tabela e armadilhas em
[`MASTER.md`](MASTER.md) §2.5.

### Motion

Transições de 160–320ms em `ease-out` cúbico. O hover **acende** (a célula
esquenta um passo, a régua do acento se estende) em vez de crescer — não há
`scale`, bounce nem elástico.

O hero é a exceção deliberada: quatro camadas em parallax presas ao scroll via
GSAP ScrollTrigger, com o Lenis dirigindo a rolagem. Sob
`prefers-reduced-motion` nada disso monta — nem o parallax, nem o Lenis.
Sequestrar a rolagem de quem pediu menos movimento é o oposto do que a
preferência existe para garantir. Sem JavaScript, todo o conteúdo nasce
visível.

> 🔬 **Chave de tom do hero.** `HERO_TINT`, no topo de
> [`SolarHero.tsx`](src/components/hero/SolarHero.tsx), alterna entre `"solar"`
> (laranja da marca — o valor atual) e `"azul"` (o azul do logotipo). Como o
> fundo são PNGs achatados em laranja, o azul vem de um `hue-rotate(192deg)`
> aplicado ao fundo, ao halo do orbe e à mão; a esfera de partículas recebe a
> cor direto. Ficou no código como alternativa testada, não como pendência.

> ⚠️ **Cascade layers.** As regras base ficam em `@layer base` e os utilitários
> do projeto em `@layer components`. CSS fora de layer vence *todas* as
> utilities do Tailwind v4 — foi assim que um `* { border-color }` chegou a
> sobrescrever cada `border-*` do site. Ao adicionar CSS global, sempre declare
> a layer.

---

## Conteúdo

Todo o conteúdo das marcas vive em [`src/lib/brands.ts`](src/lib/brands.ts):
nome, descrição, lista de serviços, acento, glifo e o par de cores da aurora. Alterar uma descrição ali
reflete na home, no menu, no rodapé e na página interna ao mesmo tempo.

---

## Pendências

Itens que dependem de material ou informação do cliente:

- [x] ~~Logos das quatro marcas.~~ Recebidos em PNG transparente 1536×1024. Os
      **símbolos** foram recortados, quadrados e otimizados para
      `public/marca/*-simbolo.png` (2 MB → 11–20 KB cada) e são o que o site
      usa. Os originais seguem em `public/logo-*.png`.
- [ ] **Versão negativa dos logotipos.** Sobre creme os cinco lockups completos
      funcionam e é o que o site usa. Nas âncoras escuras, porém, só o da SR
      Energia sobrevive: Jireh, JirehMac e ABEST têm tipografia em azul-marinho
      e grafite, que somem no escuro — ali entra apenas o símbolo. Uma versão
      negativa liberaria o lockup completo nos dois regimes de luz.
- [ ] **Marca do Grupo SR Energia.** Ainda não fornecida; o header usa o
      logotipo da SR Energia, a marca-mãe, com "GRUPO" em mono acima.
- [ ] **Símbolo da Mobilidade Elétrica.** Única frente sem marca — usa um glifo
      desenhado em SVG (`BrandMark.tsx`), que o `BrandGlyph` aciona como
      fallback automático quando `symbol` está vazio.
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
