# MASTER.md — Design System · Grupo SR Energia

> Fonte única de verdade. Todo componente, cor, espaçamento e animação do site
> deriva deste documento. Nenhum valor mágico, nenhum hex solto no código.
>
> Implementação: [`src/app/globals.css`](src/app/globals.css), bloco `@theme`.

---

## 1. Teses

### Tese Visual

Superfície **creme quente `#FFF7E9`** sobre a qual o conteúdo respira, pontuada
por âncoras em **tinta quente `#0D0B08`** — o hero e as seções de fotografia.
Uma **grotesca moderna** (Geist) em dois papéis: display em peso 650 com
tracking bem negativo, texto em peso normal; e uma **mono** (DM Mono) nos
rótulos e leituras de dados, que é a voz de instrumentação do sistema. Cantos
quase retos, separação por malha de 1px em vez de borda por card, e o **laranja
da SR Energia `#FF4B12`** como acento único do Grupo — cada empresa recupera o
seu acento apenas na própria página.

### Tese de Interação

Transições médias e assentadas (**160–320ms**) em `ease-out` cúbico; hover
**acende** em vez de crescer (a célula esquenta um passo, a régua do acento se
estende, translação de −2px, **sem escala**); reveals no scroll com *stagger* de
60ms; e a assinatura do site — o **hero em parallax de quatro camadas** preso ao
scroll, onde uma mão sustenta um sol de partículas.

**Proibido:** bounce, elástico, carrossel com autoplay, animação de propriedade
de layout (`width`/`height`/`top`/`left`).

---

## 2. Cor

### 2.1 Creme — a superfície

| Token | Hex | Uso |
|---|---|---|
| `--color-cream-50` | `#FFF7E9` | Fundo principal e células de conteúdo |
| `--color-cream-100` | `#F7EEDC` | Faixa alternada, hover de célula |
| `--color-cream-200` | `#EFE3CC` | Hairline padrão |
| `--color-cream-300` | `#E3D4B8` | Malha entre células, borda de destaque |

### 2.2 Tinta quente — texto e âncoras escuras

| Token | Hex | Uso |
|---|---|---|
| `--color-ink-950` | `#0D0B08` | Texto principal; fundo do hero |
| `--color-ink-900` | `#171310` | Superfície escura elevada |
| `--color-ink-800` | `#241D17` | Borda no escuro |
| `--color-ink-600` | `#574E43` | Texto secundário no creme (7.66:1) |
| `--color-ink-500` | `#6B6153` | Texto terciário no creme (5.7:1) |
| `--color-ink-300` | `#B5A897` | Texto de apoio **sobre o escuro** (8.43:1) |

### 2.3 Solar — o acento do Grupo

Herdado do logotipo da SR Energia, a marca-mãe do ecossistema.

| Papel | Token | Hex | Uso |
|---|---|---|---|
| puro | `--color-solar` | `#FF4B12` | Decorativo e **fundo de botão** |
| escuro | `--color-solar-ink` | `#C93000` | Texto sobre creme (5.05:1) |
| claro | `--color-solar-lit` | `#FF4B12` | Texto sobre escuro (5.87:1) |

### 2.4 Acentos de sub-marca

Só entram nas páginas de marca. Na home e na navegação o acento é sempre o
solar — a contenção é o que sustenta o sistema.

| Marca | puro | `-ink` (no creme) | `-lit` (no escuro) |
|---|---|---|---|
| SR Energia | `#FF4B12` | `#C93000` | `#FF4B12` |
| Jireh Energia | `#21C2F5` | `#06687F` | `#21C2F5` |
| JirehMac | `#86CE2E` | `#466B18` | `#86CE2E` |
| ABEST | `#E8151C` | `#C11217` | `#F2565B` |
| Mobilidade Elétrica | `#7257FF` | `#5A3CEB` | `#9C87FF` |

### 2.5 Regra de contraste

Todo texto ≥ **4.5:1**, medido — não estimado.

**Texto sobre o acento.** Laranja, ciano e verde-limão são claros demais para
texto branco: recebem texto `--color-ink-950` (5.9 / 9.5 / 10.2 : 1). Vermelho e
violeta são escuros demais para texto escuro: recebem branco. Inverter o texto
preserva a cor da marca em vez de escurecê-la até virar lama.

O hover de botão **não muda a cor** — apenas eleva. Qualquer mudança de matiz no
hover reabriria o problema de contraste no exato momento de uso.

**Armadilhas já encontradas neste projeto:**

- Branco sobre o laranja dá 3.35:1. Botão solar leva texto escuro, sempre.
- `--color-ink-500` no valor original (`#4A5E82`) dava 3.01:1 e foi clareado.
- No sistema anterior, `brand-600` reprovava sobre a faixa mais escura de fundo.

---

## 3. Tipografia

| Papel | Família | Peso |
|---|---|---|
| Display e texto | **Geist** | 650 no display, 400–500 no texto |
| Rótulos e dados | **DM Mono** | 400 |

Uma grotesca só nos dois papéis: duas grotescas parecidas seriam redundância. O
contraste vem de **peso, escala e tracking**, não de mudança de família.

| Token | Tamanho | Peso | Tracking |
|---|---|---|---|
| `--text-display` | `clamp(3rem, 7vw, 5.5rem)` | 650 | −0.035em |
| `--text-h1` | `clamp(2.5rem, 5vw, 4rem)` | 650 | −0.032em |
| `--text-h2` | `clamp(2rem, 3.4vw, 3rem)` | 650 | −0.028em |
| `--text-h3` | `clamp(1.25rem, 1.7vw, 1.5rem)` | 600 | −0.018em |
| `--text-lead` | `clamp(1.0625rem, 1.4vw, 1.25rem)` | 400 | −0.01em |
| `--text-body` | `1rem` | 400 | 0 |
| `--text-label` | `0.6875rem` mono | 400 | **0.12em**, uppercase |

**Regras**
- Medida de leitura máxima: **62ch**.
- Rótulo e leitura de dados são sempre mono em caixa alta. É a voz que
  distingue "informação de instrumento" de "texto corrido".
- No hero, o título usa `--text-h1` e não `--text-display`: a grotesca em peso
  650 ocupa bem mais largura que uma serifada no mesmo corpo, e a 88px avançava
  sobre o orbe.

---

## 4. Espaçamento, raio e elevação

Base **8px**. `--space-section: clamp(5rem, 9vw, 9rem)`,
`--gutter: clamp(1.25rem, 4vw, 3rem)`, container **1360px**.

Raio quase reto — `4 / 8 / 12px` —, porque a malha é ortogonal e cantos
arredondados brigam com ela. A **pílula** (`rounded-full`) fica reservada a nav e
botões, onde marca a diferença entre "superfície" e "ação".

Elevação discreta: a hairline define a forma, a sombra só reforça.

---

## 5. Motion

| Token | Valor |
|---|---|
| `--dur-fast` | `160ms` |
| `--dur-base` | `240ms` |
| `--dur-slow` | `320ms` |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| stagger | `60ms` |

### O hero

Quatro camadas presas ao scroll (GSAP ScrollTrigger, `scrub: 0`):

| Camada | Conteúdo | `yPercent` |
|---|---|---|
| 1 | Luz de fundo | 70 |
| 2 | O sol (esfera de partículas) | 55 |
| 3 | Título e chamadas | 40 |
| 4 | A mão | 10 |

Quanto mais ao fundo, mais a camada fica para trás da rolagem — é daí que vem a
profundidade. O **Lenis** dirige a rolagem para que o `scrub` ande contínuo em
vez de saltar no passo dos eventos de roda.

### O pilar de luz das páginas de marca

Cada página de empresa abre com o **LightPillar** (react-bits, shader em
`three`) no par de cores da própria marca, tirado do logotipo — nunca
inventado:

| Marca | Par |
|---|---|
| SR Energia | laranja `#FF4B12` → âmbar `#FFA033` |
| Jireh Energia | ciano `#21C2F5` → azul profundo `#0A46B4` |
| JirehMac | verde-limão `#86CE2E` → amarelo `#EFE23C` |
| ABEST | vermelho `#E8151C` → coral `#FF7A5A` |
| Mobilidade Elétrica | violeta `#7257FF` → ciano `#21C2F5` |

A base escurece: com o pilar atrás do título, o kicker no acento da marca
cairia sobre a própria cor e sumiria.

### O vídeo que se expande

A seção de obras da home abre um sobrevoo de drone que cresce de uma janela
recortada até sangrar de borda a borda, com a seção presa (`pin`) enquanto isso.

A cor entra junto com a janela: fechado o quadro está quase dessaturado e um
passo mais escuro, aberto chega às cores plenas do sobrevoo. Como está no mesmo
`scrub` da abertura, rolar de volta reverte sozinho — não há estado a guardar.

A expansão anima **`clip-path`**, não largura nem altura. Largura e altura são
propriedades de layout: animá-las forçaria reflow a cada quadro, com a página
inteira reposicionada 60 vezes por segundo. O `clip-path` é composto na GPU e o
vídeo nunca muda de tamanho — muda só o quanto dele aparece.

Dois véus sustentam o texto: o vertical assenta topo e base, o da esquerda é o
que garante a leitura. O vídeo é um sobrevoo sobre grama e terra clara, e sobre
esses quadros o creme e o laranja do eyebrow sumiriam.

O vídeo só toca quando está na tela, e nunca sob `prefers-reduced-motion` —
nesse caso a seção nasce aberta, com o pôster no lugar.

### Reduced motion

Sob `prefers-reduced-motion: reduce`: durações caem para `0.01ms`, os reveals
nascem visíveis, o parallax não monta e **o Lenis não monta** — sequestrar a
rolagem de quem pediu menos movimento é o oposto do que a preferência existe
para garantir. Nenhum conteúdo depende de animação para ser lido.

---

## 6. Componentes

**Botão** — altura 48px, `rounded-full`, peso 500. Cinco estados obrigatórios:
default, hover, focus-visible, active, disabled.

**Célula de marca** — sem borda própria: a separação vem da malha (`gap-px`
sobre `bg-cream-300`). Traz o **logotipo oficial completo**, o kicker em mono, a
tagline, três competências e o link. No hover o fundo esquenta para `cream-100` e
a régua do acento se estende de 0 a 100% via `transform` — nunca via `width`,
que é propriedade de layout.

**CTA de marca** (`SlideGlowButton`) — o botão principal das páginas de
empresa. Em repouso é um pill de rótulo sólido. No hover, três coisas acontecem
juntas em 420ms: o rótulo aceso é revelado da esquerda por `clip-path`, uma
**faísca** de 2px percorre o botão de ponta a ponta como corrente num fio, e a
borda acende com um brilho quente acumulando pela esquerda.

A faísca vive num elemento de largura total e translada 100% da própria
largura: parte da borda esquerda e para exatamente na direita, em qualquer
tamanho de botão, sem medir nada.

A referência deixava o rótulo em repouso **vazado** (`-webkit-text-stroke`),
preenchendo só no hover. Aqui não: contorno fino sobre fundo escuro reprova em
contraste com folga, e um CTA precisa ser legível antes de alguém apontar o
mouse. O brilho é o que o hover acrescenta — a leitura nunca depende dele. E é
um `<a>`, não um `<button>`: ele navega.

**Fio de energia** (`EnergyWire`) — barramento acima da grade de perfis. A
corrente avança da esquerda para a direita presa ao scroll e, ao chegar em cada
derivação, o ramo desce e o nó daquele setor acende.

Feito em HTML e `transform`, não em SVG. A primeira versão usava
`stroke-dashoffset` com `pathLength="1"`, mas o SVG precisava de
`preserveAspectRatio="none"` para acompanhar a largura da grade, e sob escala
não uniforme o `vectorEffect="non-scaling-stroke"` faz o navegador calcular o
tracejado em espaço de tela: a normalização se perde e o fio sai picotado. Com
`scaleX`/`scaleY` não há o que normalizar.

**Header** — cápsula flutuante que encolhe de 80 para 64px e ganha superfície ao
rolar, em vez de virar uma barra colada no topo.

---

## 7. Ativos de marca

Os cinco PNGs em `public/` **têm canal alfa real** (90–94% transparente,
1536×1024) e são plenamente utilizáveis.

Deles saem dois derivados otimizados em `public/marca/`:

- `*-simbolo.png` — só o símbolo, quadrado, 256px. Usado onde falta espaço:
  menu, rodapé, régua do hero.
- `*.png` — logotipo completo, recortado com **limiar de opacidade** (o `getbbox`
  puro pegava o halo de baixa opacidade e devolvia a tela quase inteira,
  achatando o lockup num aspecto 1.47 em vez dos ~2.6 reais). Usado nas células
  de marca e no header.

**Regime de luz dos lockups.** Só o da SR Energia funciona nos dois fundos — o
lettering é laranja e a assinatura é azul. Jireh, JirehMac e ABEST têm
tipografia em azul-marinho e grafite, que somem no escuro; por isso aparecem
inteiros apenas sobre creme. Uma **versão negativa** liberaria o lockup completo
também nas âncoras escuras — pendência aberta.

O Grupo não tem marca própria: o header usa o logotipo da SR Energia com
"GRUPO" em mono acima.

**Fotografia:** `imagem1.jpg` (telhado industrial, paisagem), `imagem2.jpg` e
`imagem3.jpg` (usinas de solo, retrato). Autênticas, de drone.
