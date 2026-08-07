import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
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
  themeColor: "#050b18",
};

/**
 * Marca o documento como "JS ativo" antes da primeira pintura. Os estados
 * iniciais das animações (reveal, desenho das linhas) dependem desta classe —
 * sem ela o conteúdo nasce visível, o que é o comportamento correto para quem
 * navega sem JavaScript.
 */
const JS_FLAG = `document.documentElement.classList.add('js')`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
