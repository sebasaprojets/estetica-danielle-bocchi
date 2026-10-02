# Estética Danielle Bocchi — Website

Site institucional premium da **Estética Danielle Bocchi** (Centro Cívico, Curitiba – PR), focado em conversão pelo WhatsApp.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide React · Google Fonts (Cormorant Garamond + Manrope via `next/font`) · componentes adaptados do React Bits.

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

Copie `.env.example` para `.env.local` e preencha `NEXT_PUBLIC_SITE_URL` antes de publicar.

## Onde editar o conteúdo

Todo o conteúdo editável fica em `src/data/`:

| Arquivo | O que contém |
| --- | --- |
| `clinic.ts` | Nome, telefone, WhatsApp e mensagem automática, endereço, mapa, avaliações do Google, **horários**, Instagram |
| `treatments.ts` | Categorias e tratamentos (`published: false` oculta do site) |
| `testimonials.ts` | Depoimentos reais (nome só com autorização) |
| `gallery.ts` | Fotos da galeria |
| `images.ts` | Fotos do hero, sobre e CTA |
| `site.ts` | `showProvisionalMarkers` — selo "Imagem ilustrativa" |
| `navigation.ts` | Itens do menu |

### Trocando as imagens provisórias
1. Coloque as fotos em `public/images/` (ex.: `public/images/recepcao.jpg`).
2. No arquivo de dados, troque `src` por `"/images/recepcao.jpg"`, ajuste o `alt` e marque `provisional: false`.
3. Quando todas forem reais, defina `showProvisionalMarkers: false` em `src/data/site.ts`.

## Estrutura

```
src/
  app/            layout, página, SEO (sitemap, robots, manifest, OG image), política de privacidade, 404
  components/
    layout/       Header, MobileMenu, Footer, Logo
    sections/     Hero, TrustBar, Marquee, Treatments, About, Testimonials, Gallery, CTA, Contact, ContactForm, InlineCTA
    ui/           Button, SmartImage, TreatmentCard, TestimonialCard, Lightbox, WhatsAppButton, SectionHeading, Icons
    reactbits/    BlurText, ShinyText, SpotlightCard, Magnet, CountUp, FadeContent, CircularText (adaptados)
  data/           conteúdo editável
  lib/            utilitários (WhatsApp, SEO, seção ativa)
```
