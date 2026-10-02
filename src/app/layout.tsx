import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import { clinic } from "@/data/clinic";
import { getSiteUrl } from "@/lib/utils";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { IntroProvider, introBootScript } from "@/lib/intro";
import { IntroOverlay } from "@/components/intro/IntroOverlay";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const title = "Estética Danielle Bocchi | Clínica de Estética em Curitiba – Centro Cívico";
const description =
  "Clínica de estética em Curitiba, no Centro Cívico. Limpeza de pele, cuidados faciais e tratamentos estéticos com atendimento humanizado. Agende sua avaliação pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: title, template: `%s | ${clinic.name}` },
  description,
  applicationName: clinic.name,
  keywords: [
    "clínica de estética em Curitiba",
    "estética no Centro Cívico",
    "limpeza de pele em Curitiba",
    "tratamentos estéticos em Curitiba",
    "Estética Danielle Bocchi",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: clinic.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: true },
  category: "beauty",
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#faf8f5",
  colorScheme: "light",
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh overflow-x-clip">
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
        <noscript>
          <style>{"#intro{display:none!important}"}</style>
        </noscript>
        <IntroProvider>
        <a
          href="#conteudo"
          className="sr-only rounded-full bg-ink px-5 py-3 text-sm text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppButton />
        <IntroOverlay />
        </IntroProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([localBusinessJsonLd(), websiteJsonLd()]).replace(/</g, "\\u003c"),
          }}
        />

        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
