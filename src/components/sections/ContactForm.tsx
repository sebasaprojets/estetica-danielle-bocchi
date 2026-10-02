"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { publishedTreatments } from "@/data/treatments";
import { cn, whatsappUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";

type Fields = {
  name: string;
  phone: string;
  interest: string;
  period: string;
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Fields, string>>;

const initial: Fields = { name: "", phone: "", interest: "", period: "", message: "", consent: false };

const periods = ["Manhã", "Tarde", "Início da noite", "Sem preferência"];

/** Máscara de telefone brasileiro: (41) 99999-9999 */
function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.name.trim().length < 2) errors.name = "Informe seu nome.";
  const digits = f.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) errors.phone = "Informe um telefone válido com DDD.";
  if (!f.interest) errors.interest = "Selecione um assunto.";
  if (f.message.length > 500) errors.message = "Use no máximo 500 caracteres.";
  if (!f.consent) errors.consent = "É necessário concordar para continuar.";
  return errors;
}

function buildMessage(f: Fields) {
  const lines = [
    "Olá! Conheci a Estética Danielle Bocchi pelo site e gostaria de agendar um horário.",
    "",
    `• Nome: ${f.name.trim()}`,
    `• Telefone: ${f.phone}`,
    `• Interesse: ${f.interest}`,
  ];
  if (f.period) lines.push(`• Melhor período: ${f.period}`);
  if (f.message.trim()) lines.push(`• Mensagem: ${f.message.trim()}`);
  return lines.join("\n");
}

/**
 * Formulário de pré-agendamento.
 * Não armazena dados: valida no navegador e abre o WhatsApp com a mensagem pronta.
 */
export function ContactForm() {
  const uid = useId();
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    const url = whatsappUrl(buildMessage(fields));
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  const id = (k: string) => `${uid}-${k}`;
  const describedBy = (k: keyof Fields) => (errors[k] ? id(`${k}-error`) : undefined);

  const inputClass = (k: keyof Fields) =>
    cn(
      "peer w-full rounded-xl border bg-ivory px-4 pt-6 pb-2.5 text-[0.9375rem] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-transparent focus:border-mocha focus:shadow-[0_0_0_4px_rgb(128_107_93/0.12)]",
      errors[k] ? "border-[#a2453a]" : "border-line hover:border-sand",
    );

  const labelClass =
    "pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm text-ink-soft transition-all duration-200 peer-focus:top-3.5 peer-focus:text-[0.6875rem] peer-focus:font-semibold peer-focus:tracking-wide peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[0.6875rem] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-wide";

  return (
    <div className="relative rounded-[1.75rem] border border-line bg-cream p-6 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sentUrl ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[28rem] flex-col items-start justify-center"
            role="status"
          >
            <CheckCircle2 className="size-10 text-olive-deep" strokeWidth={1.25} aria-hidden="true" />
            <h3 className="mt-6 text-4xl text-ink">Mensagem pronta!</h3>
            <p className="mt-3 max-w-md text-ink-soft">
              Abrimos o WhatsApp com seus dados preenchidos. É só enviar a mensagem para a nossa equipe. Se a janela não
              abriu, use o botão abaixo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={sentUrl} icon={<WhatsAppIcon className="size-4" />} iconPosition="start">
                Abrir WhatsApp
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setSentUrl(null);
                  setFields(initial);
                }}
              >
                Novo contato
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            aria-describedby={id("intro")}
          >
            <h3 className="text-3xl text-ink md:text-4xl">Pré-agendamento</h3>
            <p id={id("intro")} className="mt-2 text-sm text-ink-soft">
              Preencha os campos e enviaremos sua mensagem pronta pelo WhatsApp. Campos com * são obrigatórios.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="relative sm:col-span-2">
                <input
                  id={id("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Nome"
                  value={fields.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                  className={inputClass("name")}
                />
                <label htmlFor={id("name")} className={labelClass}>
                  Nome *
                </label>
                <FieldError id={id("name-error")} message={errors.name} />
              </div>

              <div className="relative">
                <input
                  id={id("phone")}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="Telefone"
                  value={fields.phone}
                  onChange={(e) => set("phone", maskPhone(e.target.value))}
                  aria-invalid={!!errors.phone}
                  aria-describedby={describedBy("phone")}
                  className={inputClass("phone")}
                />
                <label htmlFor={id("phone")} className={labelClass}>
                  WhatsApp / telefone *
                </label>
                <FieldError id={id("phone-error")} message={errors.phone} />
              </div>

              <div className="relative">
                <select
                  id={id("interest")}
                  name="interest"
                  value={fields.interest}
                  onChange={(e) => set("interest", e.target.value)}
                  aria-invalid={!!errors.interest}
                  aria-describedby={describedBy("interest")}
                  className={cn(inputClass("interest"), "appearance-none pt-6", !fields.interest && "text-transparent")}
                >
                  <option value="" disabled hidden />
                  <option value="Avaliação (ainda não sei qual tratamento)">Avaliação — ainda não sei</option>
                  {publishedTreatments.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                  <option value="Outro assunto">Outro assunto</option>
                </select>
                <label
                  htmlFor={id("interest")}
                  className={cn(
                    "pointer-events-none absolute left-4 text-ink-soft transition-all duration-200",
                    fields.interest
                      ? "top-3.5 -translate-y-1/2 text-[0.6875rem] font-semibold tracking-wide"
                      : "top-1/2 -translate-y-1/2 text-sm",
                  )}
                >
                  Assunto de interesse *
                </label>
                <svg aria-hidden="true" viewBox="0 0 12 12" className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-ink-soft">
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <FieldError id={id("interest-error")} message={errors.interest} />
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="mb-3 text-sm text-ink-soft">Melhor período para atendimento</legend>
                <div className="flex flex-wrap gap-2">
                  {periods.map((p) => (
                    <label key={p} className="cursor-pointer">
                      <input
                        type="radio"
                        name="period"
                        value={p}
                        checked={fields.period === p}
                        onChange={() => set("period", p)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex min-h-11 items-center rounded-full border border-line bg-ivory px-4 text-sm text-ink-soft transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-mocha hover:border-sand">
                        {p}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="relative sm:col-span-2">
                <textarea
                  id={id("message")}
                  name="message"
                  rows={4}
                  maxLength={500}
                  placeholder="Mensagem"
                  value={fields.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy("message")}
                  className={cn(inputClass("message"), "resize-none pt-7")}
                />
                <label htmlFor={id("message")} className={cn(labelClass, "top-6 peer-focus:top-3.5")}>
                  Mensagem (opcional)
                </label>
                <span className="absolute right-4 bottom-3 text-[0.6875rem] text-ink-soft/80 tabular-nums">
                  {fields.message.length}/500
                </span>
                <FieldError id={id("message-error")} message={errors.message} />
              </div>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={fields.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    aria-invalid={!!errors.consent}
                    aria-describedby={describedBy("consent")}
                    className="mt-1 size-4 shrink-0 accent-mocha-deep"
                  />
                  <span>
                    Concordo em ser contatada(o) pela clínica pelo WhatsApp, conforme a{" "}
                    <a href="/politica-de-privacidade" className="underline underline-offset-4 hover:text-ink">
                      Política de privacidade
                    </a>
                    . *
                  </span>
                </label>
                <FieldError id={id("consent-error")} message={errors.consent} />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-8 w-full"
              icon={<WhatsAppIcon className="size-4" />}
              iconPosition="start"
            >
              Enviar pelo WhatsApp
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#a2453a]"
        >
          <AlertCircle className="size-3.5" strokeWidth={2} aria-hidden="true" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
