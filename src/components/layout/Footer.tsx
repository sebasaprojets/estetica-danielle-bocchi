import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { clinic } from "@/data/clinic";
import { navigation } from "@/data/navigation";
import { telUrl, whatsappUrl } from "@/lib/utils";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <div className="mx-auto max-w-[88rem] px-5 pt-20 pb-10 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" size="lg" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/65">
              Um espaço dedicado ao cuidado, à autoestima e ao bem-estar, com atendimento humanizado e atenção em
              cada detalhe — no Centro Cívico, em Curitiba.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-11 items-center gap-3 border-b border-ivory/25 pb-1 text-sm font-medium transition-colors hover:border-sand hover:text-sand"
            >
              <WhatsAppIcon className="size-4" />
              Agendar pelo WhatsApp
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-2">
            <h2 className="eyebrow font-sans text-sand">Navegação</h2>
            <ul className="mt-6 space-y-1">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="inline-flex min-h-10 items-center text-sm text-ivory/75 transition-colors hover:text-ivory">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="eyebrow font-sans text-sand">Visite-nos</h2>
            <address className="mt-6 space-y-4 text-sm leading-relaxed text-ivory/75 not-italic">
              <a
                href={clinic.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 transition-colors hover:text-ivory"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-sand" strokeWidth={1.5} />
                <span>
                  {clinic.address.street} – {clinic.address.complement}
                  <br />
                  {clinic.address.neighborhood}, {clinic.address.city} – {clinic.address.state}
                  <br />
                  CEP {clinic.address.postalCode}
                </span>
              </a>
              <a href={telUrl()} className="flex min-h-10 items-center gap-3 transition-colors hover:text-ivory">
                <Phone className="size-4 shrink-0 text-sand" strokeWidth={1.5} />
                {clinic.phone.display}
              </a>
            </address>
          </div>

          <div className="md:col-span-2">
            <h2 className="eyebrow font-sans text-sand">Social</h2>
            <ul className="mt-6 space-y-3 text-sm text-ivory/75">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-3 transition-colors hover:text-ivory"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
              </li>
              {clinic.social.instagram && (
                <li>
                  <a
                    href={clinic.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-3 transition-colors hover:text-ivory"
                  >
                    <InstagramIcon className="size-4" /> Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none mt-20 font-serif text-[clamp(3.5rem,13vw,12rem)] leading-[0.85] tracking-[-0.03em] text-ivory/[0.06] select-none"
        >
          Danielle <span className="italic">Bocchi</span>
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {clinic.name}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/politica-de-privacidade" className="inline-flex min-h-10 items-center transition-colors hover:text-ivory">
              Política de privacidade
            </a>
            <span>Curitiba – PR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
