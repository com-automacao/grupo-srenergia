# MASTER.md — Design System · Grupo SR Energia

> Fonte única de verdade. Todo componente, cor, espaçamento e animação do site
> deriva deste documento. Nenhum valor mágico, nenhum hex solto no código.
>
> Implementação dos tokens: [`src/app/globals.css`](src/app/globals.css) (bloco `@theme`).

---

## 1. Teses

### Tese Visual

Interface institucional que alterna **azul-noite `#050B18`** (hero, ecossistema, rodapé) com
**claro `#F6F8FB`** (conteúdo e páginas internas); tipografia sans geométrica com contraste
extremo de escala (display 88px / corpo 17px) e peso alto nos títulos; espaçamento generoso
em base 8px com seções de 120–160px; componentes de canto suave (12–16px), borda *hairline*
de 1px e elevação sutil — e cada sub-marca carrega seu próprio acento, herdado do logo real.

### Tese de Interação

Transições médias e assentadas (**200–320ms**) em `ease-out` cúbico; hover **acende** em vez
de crescer (borda e acento ganham luminosidade, translação de −2px, **sem escala**); reveals
no scroll com *stagger* de 60ms; e a assinatura do site — **linhas de energia que se desenham**
via `stroke-dashoffset` ao entrar no viewport, ligando o Grupo às 4 marcas.

**Proibido:** bounce, elástico, parallax pesado, carrossel com autoplay, animação de
propriedade de layout (`width`/`height`/`top`/`left`).

---

## 2. Cor

### 2.1 Espinha institucional — azul-noite

O azul é o tecido conectivo do grupo: está em SR, Jireh e JirehMac. Serve de base escura.

| Token | Hex | Uso |
|---|---|---|
| `--ink-950` | `#050B18` | Fundo escuro principal (hero, ecossistema, rodapé) |
| `--ink-900` | `#0A1224` | Superfície escura elevada (cards sobre o hero) |
| `--ink-800` | `#111C33` | Superfície escura 2 / borda no escuro |
| `--ink-700` | `#1B2A47` | Borda hairline no escuro |
| `--ink-500` | `#4A5E82` | Texto secundário no escuro |
| `--ink-300` | `#93A4C0` | Texto terciário no escuro |

### 2.2 Claro — onde o conteúdo respira

| Token | Hex | Uso |
|---|---|---|
| `--paper-0` | `#FFFFFF` | Cards no claro |
| `--paper-50` | `#F6F8FB` | Fundo claro principal |
| `--paper-100` | `#EDF1F7` | Fundo alternado / faixa |
| `--paper-200` | `#DDE4EE` | Borda hairline no claro |
| `--paper-600` | `#5A6880` | Texto secundário no claro |
| `--paper-900` | `#0B1220` | Texto principal no claro |

### 2.3 Azul de marca — o azul do Grupo

Extraído do ícone da SR Energia e da esfera Jireh.

| Token | Hex | Uso |
|---|---|---|
| `--brand-700` | `#0A46B4` | Azul profundo (Jireh) |
| `--brand-600` | `#1F76D2` | **Azul primário do Grupo** — links, CTA no claro |
| `--brand-500` | `#2B8FE8` | Hover do primário |
| `--brand-400` | `#5AAEF5` | Azul sobre fundo escuro (contraste AA no `--ink-950`) |

> ⚠️ `--brand-600` sobre `--ink-950` reprova em contraste. Sobre fundo escuro use
> sempre `--brand-400` ou mais claro.

### 2.4 Acentos de sub-marca

Cada empresa do ecossistema tem um acento herdado do próprio logo. É o mecanismo que
permite ao visitante distinguir as marcas sem ler o nome.

Cada acento tem **três papéis**, porque uma única cor não passa em contraste nos dois
regimes de luz. O tom puro nunca carrega texto sobre fundo claro.

| Papel | Token | Uso |
|---|---|---|
| puro | `--color-X` | réguas, pontos, bordas, ícones e **fundo de botão** |
| escuro | `--color-X-ink` | texto sobre `paper-*` |
| claro | `--color-X-lit` | texto sobre `ink-*` |

| Marca | puro | `-ink` | `-lit` | Origem |
|---|---|---|---|---|
| SR Energia | `#FF4B12` | `#CC3100` | `#FF4B12` | laranja do ícone e do logotipo |
| Jireh Energia | `#21C2F5` | `#077497` | `#21C2F5` | ciano do gradiente da esfera |
| JirehMac | `#86CE2E` | `#4E771B` | `#86CE2E` | verde-limão do raio |
| ABEST | `#E8151C` | `#D7141A` | `#F2565B` | vermelho do símbolo |
| Mobilidade Elétrica | `#7257FF` | `#6749FF` | `#9C87FF` | **novo** — única faixa livre do círculo |

> O vermelho da ABEST e o violeta da Mobilidade foram escurecidos em cerca de 1% em
> relação ao tom original para que o **texto branco** passe em AA sobre eles. É um
> desvio imperceptível ao olho e preserva a identidade; a alternativa seria enlamear
> a cor da marca.

**Texto sobre o acento (botões).** Laranja, ciano e verde-limão são claros demais para
texto branco — recebem texto `--color-ink-950`, o que dá 5,9 / 9,5 / 10,2 : 1. Vermelho
e violeta são escuros demais para texto escuro — recebem branco, a 4,6 : 1. Inverter o
texto preserva a cor da marca; escurecê-la até caber no branco a destruiria.

O hover de botão de acento **não muda a cor** — apenas eleva. Qualquer mudança de
matiz no hover reabriria o problema de contraste no exato momento de uso.

### 2.5 Semânticos

| Token | Hex |
|---|---|
| `--success` | `#16A34A` |
| `--warning` | `#D97706` |
| `--danger` | `#DC2626` |
| `--info` | `#1F76D2` |

### 2.6 Regra de contraste

Todo texto ≥ **4.5:1**, medido — não estimado. Razões auditadas:

| Par | Razão |
|---|---|
| `ink-300` sobre `ink-950` (corpo no escuro) | 7.79 |
| `ink-500` sobre `ink-950` (rodapé) | 4.53 |
| `brand-400` sobre `ink-950` | 8.25 |
| `paper-600` sobre `paper-50` | 5.30 |
| `brand-700` sobre `paper-100` | 7.27 |
| branco sobre `brand-600` (botão) | 4.58 |
| branco sobre `brand-700` (botão em hover) | 8.94 |
| `-ink` de cada acento sobre `paper-100` | ≥ 4.62 |
| `-lit` de cada acento sobre `ink-900` | ≥ 4.52 |
| texto do botão sobre acento puro | ≥ 4.61 |

**Armadilhas já encontradas neste projeto:**

- `brand-600` reprova sobre `paper-100` (4.04). Em faixa `paper-100`, use `brand-700`.
- O hover do botão primário **escurece** para `brand-700`. Com `brand-500` o texto
  branco caía para 3.39 — a falha aconteceria no estado de uso.
- `ink-500` no valor original (`#4A5E82`) dava 3.01 e foi clareado.

---

## 3. Tipografia

| Papel | Família | Fallback |
|---|---|---|
| Display / títulos | **Sora** (700, 800) | `system-ui, sans-serif` |
| Corpo / UI | **Inter** (400, 500, 600) | `system-ui, sans-serif` |

Escala fluida via `clamp()` — contraste extremo entre display e corpo é a assinatura.

| Token | Tamanho | Peso | Line-height | Tracking |
|---|---|---|---|---|
| `--text-display` | `clamp(2.75rem, 6.5vw, 5.5rem)` | 800 | 0.98 | −0.04em |
| `--text-h1` | `clamp(2.25rem, 4.5vw, 3.75rem)` | 800 | 1.04 | −0.03em |
| `--text-h2` | `clamp(1.75rem, 3vw, 2.75rem)` | 700 | 1.1 | −0.02em |
| `--text-h3` | `clamp(1.25rem, 1.8vw, 1.625rem)` | 700 | 1.2 | −0.01em |
| `--text-lead` | `clamp(1.125rem, 1.6vw, 1.375rem)` | 400 | 1.55 | 0 |
| `--text-body` | `1.0625rem` (17px) | 400 | 1.65 | 0 |
| `--text-sm` | `0.9375rem` (15px) | 400 | 1.6 | 0 |
| `--text-eyebrow` | `0.75rem` (12px) | 600 | 1 | **0.16em**, uppercase |

**Regras**
- Medida de leitura máxima: **68ch**.
- Nunca dois pesos 800 concorrendo no mesmo bloco visual.
- Eyebrow sempre acompanhado de um traço de 24px no acento da seção.

---

## 4. Espaçamento

Base **8px**. Escala: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.

| Token | Valor |
|---|---|
| `--space-section` | `clamp(5rem, 10vw, 10rem)` (80→160px) |
| `--space-block` | `clamp(2.5rem, 5vw, 4rem)` |
| `--gutter` | `clamp(1.25rem, 4vw, 2.5rem)` |
| `--container` | `1240px` |
| `--container-narrow` | `760px` |

---

## 5. Raio e elevação

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | `8px` | badges, inputs pequenos |
| `--radius-md` | `12px` | botões, inputs |
| `--radius-lg` | `16px` | cards |
| `--radius-xl` | `24px` | painéis e blocos de destaque |
| `--radius-full` | `999px` | pílulas |

Elevação é **discreta** — o sistema é hairline-first: a borda de 1px define a forma, a
sombra só reforça.

| Token | Valor |
|---|---|
| `--shadow-0` | `none` |
| `--shadow-1` | `0 1px 2px rgb(11 18 32 / 0.04)` |
| `--shadow-2` | `0 4px 16px -4px rgb(11 18 32 / 0.08)` |
| `--shadow-3` | `0 12px 32px -8px rgb(11 18 32 / 0.12)` |
| `--glow` | `0 0 0 1px <accent>, 0 8px 32px -8px <accent>/0.35` (hover no escuro) |

---

## 6. Motion

| Token | Valor |
|---|---|
| `--dur-fast` | `160ms` |
| `--dur-base` | `240ms` |
| `--dur-slow` | `320ms` |
| `--dur-draw` | `1100ms` (desenho das linhas de energia) |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--stagger` | `60ms` |

**Padrões canônicos**

| Padrão | Especificação |
|---|---|
| Reveal no scroll | `opacity 0→1` + `translateY(16px→0)`, `--dur-slow`, `--ease-out`, stagger 60ms, dispara uma única vez a 12% de visibilidade |
| Barramento do hero | Cinco fontes convergem em um nó e saem por uma linha só. Trilhos desenham uma vez; depois um pulso curto (`dasharray 0.13 0.87`) percorre cada ramo em loop de 6,5–8,1s, com fases dessincronizadas. Sob reduced motion o pulso **sai de cena** em vez de congelar |
| Hover em card | borda → acento, `translateY(-2px)`, `--shadow-3`, `--dur-base`. **Sem `scale`** |
| Hover em link | sublinhado cresce da esquerda, `--dur-fast` |
| Linhas de energia | `stroke-dashoffset` total→0, `--dur-draw`, `--ease-in-out`, stagger 120ms por ramo |
| Foco | `outline: 2px solid <acento>` + `outline-offset: 3px`. Nunca removido |

**Reduced motion** — `@media (prefers-reduced-motion: reduce)`: toda duração cai para `0.01ms`,
reveals entram já em `opacity: 1`, linhas de energia aparecem desenhadas. Nenhum conteúdo
depende de animação para ser lido.

---

## 7. Componentes base

### Botão

| Variante | Fundo | Texto | Borda | Hover |
|---|---|---|---|---|
| `primary` | `--brand-600` | branco | — | `--brand-500` + `translateY(-2px)` + `--shadow-2` |
| `on-dark` | branco | `--ink-950` | — | fundo `--paper-100` + `translateY(-2px)` |
| `ghost` | transparente | herda | 1px hairline | borda vira acento da seção |

Altura 48px, padding `0 24px`, `--radius-md`, peso 600, `--text-sm`.
Cinco estados obrigatórios: **default, hover, focus-visible, active, disabled**.

### Card de marca

Superfície + hairline. No topo, uma **régua de 3px no acento da marca** que se estende de
0→100% da largura no hover (`--dur-slow`, `--ease-out`). Ícone/logo, nome, uma linha de
descrição, lista de 3 competências, link "Conhecer →".

### Eyebrow

Traço de 24px no acento + label uppercase `--text-eyebrow`.

---

## 8. Arquitetura de seções

Alternância de regime de luz é estrutural, não decorativa:

O hero é **enxuto por decisão**: eyebrow, um título de seis palavras, uma linha de
apoio e dois botões. Quem carrega a mensagem é o barramento de energia, não o texto
— parágrafo longo em hero institucional de energia é exatamente o que o mercado
inteiro já faz.

| Seção | Regime |
|---|---|
| Hero | escuro `--ink-950`, ~90svh, com o barramento convergente |
| Manifesto do ecossistema | escuro (continuidade) |
| Grid das 4 marcas | escuro — os acentos brilham |
| Mobilidade Elétrica | claro `--paper-50` |
| Obras entregues | escuro (fotos de drone ganham contra o escuro) |
| Números | claro `--paper-100` |
| CTA final | escuro |
| Rodapé | escuro `--ink-950` |
| Páginas internas | claro, com hero escuro no acento da marca |

---

## 9. Ativos de marca

**Pendência aberta.** Os cinco logos em `public/` são *mockups renderizados* (marca aplicada
em parede cinza, com relevo e glow). Não são utilizáveis em produção: fundo cravado, sombra
e brilho embutidos.

**Necessário:** SVG (preferencial) ou PNG com fundo transparente, em versão positiva e
negativa (para fundo escuro), de:
`logo-srenergia`, `logo-jireh-energia`, `logo-jireh-mac`, `logo-abest` e a marca do
**Grupo SR Energia** (ainda não fornecida).

Até lá, os cards de marca usam um **glifo em SVG** desenhado no acento de cada empresa, e o
header usa o lettering tipográfico do Grupo. A troca é local: `src/lib/brands.ts`.

**Fotografia disponível:** `imagem1.jpg` (telhado industrial, paisagem), `imagem2.jpg` e
`imagem3.jpg` (usinas de solo, retrato). Autênticas, de drone. Tratamento: leve
dessaturação e *overlay* `--ink-950` a 45% quando servirem de fundo, para o texto passar
em contraste.
