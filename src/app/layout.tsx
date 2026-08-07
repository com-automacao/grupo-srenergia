import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, DM_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

/* Serifada editorial no display: peso único, presença vinda do tamanho e do
   tracking negativo. Grotesca no texto. Mono nos rótulos e leituras de dados —
   a voz de instrumentação do sistema. */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-tight-next",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grupsrenergia.com.br"),
  title: {
    default: "Grupo SR Energia — Ecossistema completo de soluções energéticas",
    template: "%s · Grupo SR Energia",
  },
  description:
    "Geração, engenharia, tecnologia própria de geração inteligente e mobilidade elétrica em um único ecossistema. SR Energia, Jireh Energia, JirehMac e ABEST.",
  keywords: [
    "energia solar",
    "usina fotovoltaica",
    "geração de energia",
    "engenharia energética",
    "mobilidade elétrica",
    "carregador veicular",
    "eficiência energética",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Grupo SR Energia",
    title: "Grupo SR Energia — Ecossistema completo de soluções energéticas",
    description:
      "Geração, engenharia, tecnologia de geração inteligente e mobilidade elétrica em um único ecossistema.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0b08",
};

/**
 * Marca o documento como "JS ativo" antes da primeira pintura. Os estados
 * iniciais das animações dependem desta classe — sem ela o conteúdo nasce
 * visível, que é o comportamento correto para quem navega sem JavaScript.
 */
const JS_FLAG = `document.documentElement.classList.add('js')`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${instrument.variable} ${interTight.variable} ${dmMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body>
        <SmoothScroll />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
