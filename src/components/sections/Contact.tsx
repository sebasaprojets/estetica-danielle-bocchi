import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { clinic } from "@/data/clinic";
import { telUrl, whatsappUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/Icons";
import FadeContent from "@/components/reactbits/FadeContent";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const hasUnconfirmedHours = clinic.openingHours.some((h) => !h.confirmed);

  return (
    <section id="contato" aria-labelledby="contact-title" className="relative bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              id="contact-title"
              index="05"
              eyebrow="Localização & contato"
              title={
                <>
                  Venha nos <span className="text-mocha-deep italic">visitar.</span>
                </>
              }
              description="Estamos no Centro Cívico, em Curitiba. Fale com a nossa equipe para tirar dúvidas e agendar o seu horário."
            />

            <FadeContent delay={0.1} className="mt-12 space-y-px overflow-hidden rounded-[1.5rem] border border-line bg-line">
              <InfoRow icon={<MapPin className="size-5" strokeWidth={1.25} />} label="Endereço">
                <address className="not-italic">
                  {clinic.address.street} – {clinic.address.complement}
                  <br />
                  {clinic.address.neighborhood}, {clinic.address.city} – {clinic.address.state}, CEP{" "}
                  {clinic.address.postalCode}
                </address>
              </InfoRow>

              <InfoRow icon={<Phone className="size-5" strokeWidth={1.25} />} label="Telefone / WhatsApp">
                <a href={telUrl()} className="underline-offset-4 hover:underline">
                  {clinic.phone.display}
                </a>
              </InfoRow>

              <InfoRow icon={<Clock className="size-5" strokeWidth={1.25} />} label="Horário de atendimento">
                <dl className="space-y-1.5">
                  {clinic.openingHours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-6">
                      <dt>{h.days}</dt>
                      <dd className="text-right text-ink">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
                {hasUnconfirmedHours && (
                  <p className="mt-3 text-xs text-ink-soft/80">
                    Horários sujeitos a confirmação. Consulte a disponibilidade pelo WhatsApp.
                  </p>
                )}
              </InfoRow>
            </FadeContent>

            <FadeContent delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={whatsappUrl()}
                size="lg"
                icon={<WhatsAppIcon className="size-4" />}
                iconPosition="start"
                className="flex-1"
              >
                Falar pelo WhatsApp
              </Button>
              <Button
                href={clinic.maps.directionsUrl}
                variant="secondary"
                size="lg"
                icon={<Navigation className="size-4" strokeWidth={1.5} />}
                iconPosition="start"
                className="flex-1"
              >
                Como chegar
              </Button>
            </FadeContent>
          </div>

          <FadeContent delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </FadeContent>
        </div>

        <FadeContent className="mt-16 overflow-hidden rounded-[1.75rem] border border-line bg-nude">
          <iframe
            title={`Mapa: ${clinic.name} — ${clinic.address.full}`}
            src={clinic.maps.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[22rem] w-full grayscale-[0.55] sepia-[0.15] md:h-[28rem]"
            allowFullScreen
          />
        </FadeContent>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5 bg-ivory p-6 text-sm leading-relaxed text-ink-soft">
      <span className="mt-0.5 shrink-0 text-mocha" aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1">
        <p className="eyebrow mb-2 text-[0.625rem] text-ink">{label}</p>
        {children}
      </div>
    </div>
  );
}
