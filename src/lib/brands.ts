/**
 * Ecossistema do Grupo SR Energia.
 *
 * Fonte única de conteúdo das marcas. As páginas internas, o grid da home, o
 * header e o rodapé leem daqui — mudar uma descrição em um lugar muda em todos.
 *
 * `accent` referencia os tokens de MASTER.md §2.4. `logo` aponta para os
 * mockups atuais em /public; quando chegarem os arquivos vetoriais definitivos,
 * é este campo que muda (ver MASTER.md §9).
 */

export type BrandSlug =
  | "sr-energia"
  | "jireh-energia"
  | "jirehmac"
  | "abest"
  | "mobilidade-eletrica";

export type Brand = {
  slug: BrandSlug;
  name: string;
  /** Aparece no eyebrow e no título da página interna. */
  kicker: string;
  /** Uma linha — usada no card do grid da home. */
  tagline: string;
  /** Parágrafo de abertura da página interna. */
  intro: string;
  /** Três competências mostradas no card. */
  highlights: string[];
  /** Lista completa de serviços/atuação da página interna. */
  services: { title: string; description: string }[];
  /** Token de cor Tailwind, sem o prefixo. Ex.: "sr" → text-sr / bg-sr. */
  accent: "sr" | "jireh" | "jirehmac" | "abest" | "mobi";
  /** Glifo desenhado em SVG (ver components/BrandMark.tsx). */
  mark: "sr" | "sphere" | "bolt-sphere" | "node-bolt" | "plug";
  /** Mockup atual — substituir por SVG/PNG transparente. */
  logo: string;
};

export const brands: Brand[] = [
  {
    slug: "sr-energia",
    name: "SR Energia",
    kicker: "Projetos, instalação e soluções fotovoltaicas",
    tagline: "A porta de entrada do grupo: do projeto à usina em operação.",
    intro:
      "A SR Energia é a empresa comercial e operacional do grupo. É por ela que passa a maior parte dos nossos clientes — do primeiro estudo de viabilidade até a usina gerando energia. Atende projetos residenciais, comerciais, industriais e rurais.",
    highlights: [
      "Venda e instalação de usinas fotovoltaicas",
      "Consultoria e eficiência energética",
      "Execução de obras e implantação",
    ],
    services: [
      {
        title: "Desenvolvimento de projetos",
        description:
          "Estudo de viabilidade, dimensionamento e projeto executivo do sistema de geração, com análise do perfil de consumo e do retorno do investimento.",
      },
      {
        title: "Usinas fotovoltaicas",
        description:
          "Venda e instalação de sistemas de geração solar em telhado ou solo, do porte residencial à usina de grande escala.",
      },
      {
        title: "Residencial, comercial, industrial e rural",
        description:
          "Soluções dimensionadas para cada perfil de consumo — da casa que quer zerar a conta à indústria que precisa de energia previsível.",
      },
      {
        title: "Consultoria energética",
        description:
          "Análise de faturas, enquadramento tarifário e desenho da estratégia de energia mais econômica para o cliente.",
      },
      {
        title: "Eficiência energética",
        description:
          "Diagnóstico e adequação de instalações para reduzir o desperdício antes mesmo de gerar — o kWh mais barato é o que não se consome.",
      },
      {
        title: "Execução de obras",
        description:
          "Implantação completa dos sistemas com equipe própria, da estrutura à conexão e homologação junto à concessionária.",
      },
    ],
    accent: "sr",
    mark: "sr",
    logo: "/logo-srenergia.png",
  },
  {
    slug: "jireh-energia",
    name: "Jireh Energia",
    kicker: "Engenharia, inovação e tecnologia",
    tagline: "O braço de engenharia — e onde nasce a inovação do grupo.",
    intro:
      "A Jireh Energia é a empresa de engenharia e tecnologia do Grupo SR Energia. Atua no que exige projeto especializado e desenvolvimento próprio: soluções energéticas sob medida, serviços técnicos e novas tecnologias. É dentro dela que está a JirehMac.",
    highlights: [
      "Engenharia especializada",
      "Desenvolvimento de soluções energéticas",
      "Novas tecnologias e serviços técnicos",
    ],
    services: [
      {
        title: "Engenharia especializada",
        description:
          "Projetos elétricos e energéticos de maior complexidade, com responsabilidade técnica e adequação às normas do setor.",
      },
      {
        title: "Soluções energéticas sob medida",
        description:
          "Desenho de arquiteturas de geração e distribuição para operações com requisitos que uma solução padrão não atende.",
      },
      {
        title: "Serviços técnicos",
        description:
          "Comissionamento, laudos, adequações e manutenção especializada em sistemas de geração e infraestrutura elétrica.",
      },
      {
        title: "Desenvolvimento de tecnologia",
        description:
          "Pesquisa, desenvolvimento e implantação de tecnologias próprias de geração — a frente que deu origem à JirehMac.",
      },
    ],
    accent: "jireh",
    mark: "sphere",
    logo: "/logo-jireh-energia.png",
  },
  {
    slug: "jirehmac",
    name: "JirehMac",
    kicker: "Tecnologia Inteligente de Geração de Energia",
    tagline: "Energia contínua, 24 horas por dia, com múltiplas fontes em um só sistema.",
    intro:
      "A JirehMac é a divisão de tecnologia da Jireh Energia e do Grupo SR Energia. É uma tecnologia própria de geração inteligente que integra diferentes fontes energéticas em um único sistema automatizado — desenvolvida para aplicações que não podem parar.",
    highlights: [
      "Integração de múltiplas fontes",
      "Automação e geração inteligente",
      "Disponibilidade 24 horas por dia",
    ],
    services: [
      {
        title: "Geração fotovoltaica",
        description:
          "A base do sistema: energia solar como fonte primária, dimensionada para cobrir o perfil de carga da operação.",
      },
      {
        title: "Armazenamento em baterias",
        description:
          "Banco de baterias que guarda o excedente e sustenta a operação quando a geração solar não está disponível.",
      },
      {
        title: "Geração elétrica inteligente",
        description:
          "Núcleo tecnológico que decide, a cada momento, qual fonte deve atender a carga com o melhor custo e a maior segurança.",
      },
      {
        title: "Automação",
        description:
          "Comutação automática entre fontes, sem intervenção humana e sem interrupção percebida pela operação.",
      },
      {
        title: "Concessionária como backup",
        description:
          "A rede deixa de ser a fonte principal e passa a ser retaguarda — o que inverte a relação de dependência.",
      },
      {
        title: "Gerador a diesel como contingência final",
        description:
          "Última camada de segurança energética, acionada apenas quando todas as anteriores estão indisponíveis.",
      },
    ],
    accent: "jirehmac",
    mark: "bolt-sphere",
    logo: "/logo-jireh-mac.png",
  },
  {
    slug: "abest",
    name: "ABEST",
    kicker: "Associação Brasileira de Energia Solar para Todos",
    tagline: "Energia mais econômica por meio de modelos associativos.",
    intro:
      "A ABEST é a associação do Grupo SR Energia. Sua missão é ampliar o acesso à energia mais econômica por meio de modelos associativos e soluções coletivas, conectando consumidores a alternativas que promovem economia e sustentabilidade. É o compromisso social do grupo.",
    highlights: [
      "Modelos associativos de energia",
      "Soluções coletivas",
      "Democratização do acesso",
    ],
    services: [
      {
        title: "Modelos associativos",
        description:
          "Estruturas que permitem a consumidores acessar energia mais barata sem investimento próprio em geração.",
      },
      {
        title: "Soluções coletivas",
        description:
          "Arranjos que reúnem múltiplos consumidores para viabilizar condições que, isoladamente, não estariam ao alcance de cada um.",
      },
      {
        title: "Economia e sustentabilidade",
        description:
          "Redução do custo da energia associada a fontes limpas — economia e impacto ambiental caminhando na mesma direção.",
      },
      {
        title: "Acesso para empresas e pessoas",
        description:
          "Atendimento a associados de perfis diversos, com a mesma premissa: energia mais acessível para todos.",
      },
    ],
    accent: "abest",
    mark: "node-bolt",
    logo: "/logo-abest.png",
  },
  {
    slug: "mobilidade-eletrica",
    name: "Mobilidade Elétrica",
    kicker: "Infraestrutura de recarga para veículos elétricos",
    tagline: "Do carregador residencial ao eletroposto — a energia que move a frota.",
    intro:
      "O Grupo SR Energia acompanha a evolução do mercado de energia e da mobilidade sustentável. Não oferecemos apenas geração: entregamos toda a infraestrutura necessária para abastecer veículos elétricos de forma segura, inteligente e eficiente — em residências, empresas, condomínios, comércios e frotas.",
    highlights: [
      "Carregadores residenciais e corporativos",
      "Eletropostos e soluções para condomínios",
      "Integração com solar e armazenamento",
    ],
    services: [
      {
        title: "Instalação de carregadores",
        description:
          "Fornecimento e instalação de carregadores para veículos elétricos, do wallbox residencial ao equipamento de uso corporativo.",
      },
      {
        title: "Projetos de infraestrutura elétrica",
        description:
          "Projeto da infraestrutura de recarga: alimentação, proteção, aterramento e adequação do quadro à nova carga.",
      },
      {
        title: "Soluções para condomínios",
        description:
          "Arquitetura de recarga compartilhada com medição individualizada, resolvendo o rateio entre unidades.",
      },
      {
        title: "Implantação de eletropostos",
        description:
          "Estações de recarga para uso público ou de frota, incluindo dimensionamento, obra e comissionamento.",
      },
      {
        title: "Estudos de demanda e adequação elétrica",
        description:
          "Avaliação da capacidade instalada e do impacto da recarga na demanda contratada, evitando ultrapassagem e multa.",
      },
      {
        title: "Integração com fotovoltaico e armazenamento",
        description:
          "Recarga alimentada por geração própria e por baterias — o veículo abastecido com a energia gerada no local.",
      },
      {
        title: "Gestão inteligente de recarga",
        description:
          "Controle de potência, agendamento e priorização de carga para recarregar no melhor horário e sem sobrecarregar a instalação.",
      },
    ],
    accent: "mobi",
    mark: "plug",
    logo: "",
  },
];

/** As quatro empresas do ecossistema. Mobilidade é área de atuação, não empresa. */
export const companies = brands.filter((b) => b.slug !== "mobilidade-eletrica");

export const mobility = brands.find((b) => b.slug === "mobilidade-eletrica")!;

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

/**
 * Classes por acento. Mapeadas explicitamente porque o Tailwind faz varredura
 * estática do código — `text-${accent}` seria removido no build.
 */
export const accentClasses: Record<
  Brand["accent"],
  {
    text: string;
    textInk: string;
    bg: string;
    bgSoft: string;
    border: string;
    borderHover: string;
    ring: string;
    stroke: string;
  }
> = {
  sr: {
    text: "text-sr",
    textInk: "text-sr-ink",
    bg: "bg-sr",
    bgSoft: "bg-sr/10",
    border: "border-sr",
    borderHover: "group-hover:border-sr",
    ring: "[--accent:var(--color-sr)]",
    stroke: "stroke-sr",
  },
  jireh: {
    text: "text-jireh",
    textInk: "text-jireh-ink",
    bg: "bg-jireh",
    bgSoft: "bg-jireh/10",
    border: "border-jireh",
    borderHover: "group-hover:border-jireh",
    ring: "[--accent:var(--color-jireh)]",
    stroke: "stroke-jireh",
  },
  jirehmac: {
    text: "text-jirehmac",
    textInk: "text-jirehmac-ink",
    bg: "bg-jirehmac",
    bgSoft: "bg-jirehmac/10",
    border: "border-jirehmac",
    borderHover: "group-hover:border-jirehmac",
    ring: "[--accent:var(--color-jirehmac)]",
    stroke: "stroke-jirehmac",
  },
  abest: {
    text: "text-abest",
    textInk: "text-abest-ink",
    bg: "bg-abest",
    bgSoft: "bg-abest/10",
    border: "border-abest",
    borderHover: "group-hover:border-abest",
    ring: "[--accent:var(--color-abest)]",
    stroke: "stroke-abest",
  },
  mobi: {
    text: "text-mobi",
    textInk: "text-mobi-ink",
    bg: "bg-mobi",
    bgSoft: "bg-mobi/10",
    border: "border-mobi",
    borderHover: "group-hover:border-mobi",
    ring: "[--accent:var(--color-mobi)]",
    stroke: "stroke-mobi",
  },
};
