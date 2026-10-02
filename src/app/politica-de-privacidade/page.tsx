import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { clinic } from "@/data/clinic";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como a ${clinic.name} trata os dados pessoais dos visitantes do site.`,
  alternates: { canonical: "/politica-de-privacidade" },
};

/**
 * MODELO PROVISÓRIO — revisar com assessoria jurídica antes da publicação.
 */
export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-36 pb-24 md:pt-44 md:pb-32">
      <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft className="size-4" strokeWidth={1.5} /> Voltar ao início
      </Link>
      <p className="eyebrow mt-10 text-mocha-deep">Transparência</p>
      <h1 className="text-title mt-4 text-ink">Política de privacidade</h1>
      <p className="mt-6 rounded-xl border border-line bg-cream p-4 text-sm text-ink-soft">
        Texto-modelo provisório, a ser revisado e aprovado pela clínica e por sua assessoria jurídica.
      </p>

      <div className="mt-12 space-y-10 text-[1.0625rem] leading-relaxed text-ink-soft [&_h2]:mb-3 [&_h2]:text-3xl [&_h2]:text-ink">
        <section>
          <h2>1. Quem somos</h2>
          <p>
            {clinic.name}, localizada em {clinic.address.full}. Contato: {clinic.phone.display}.
          </p>
        </section>
        <section>
          <h2>2. Quais dados coletamos</h2>
          <p>
            Este site não possui cadastro nem armazena dados em servidor. Ao utilizar o formulário de pré-agendamento,
            as informações preenchidas (nome, telefone, assunto de interesse e mensagem) são usadas apenas para compor
            uma mensagem enviada por você mesma(o) pelo WhatsApp.
          </p>
        </section>
        <section>
          <h2>3. Finalidade</h2>
          <p>
            Os dados recebidos pelo WhatsApp são utilizados exclusivamente para responder ao seu contato, tirar dúvidas
            e realizar agendamentos.
          </p>
        </section>
        <section>
          <h2>4. Serviços de terceiros</h2>
          <p>
            O site utiliza serviços como Google Maps (mapa de localização) e WhatsApp (contato), que possuem suas próprias
            políticas de privacidade. Caso ferramentas de análise de audiência (como o Google Analytics) sejam ativadas,
            esta política será atualizada.
          </p>
        </section>
        <section>
          <h2>5. Seus direitos</h2>
          <p>
            Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar acesso, correção ou
            exclusão dos seus dados a qualquer momento pelo telefone {clinic.phone.display}.
          </p>
        </section>
      </div>
    </article>
  );
}
