import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-5 pt-32 pb-24 text-center">
      <p className="eyebrow text-mocha-deep">Erro 404</p>
      <h1 className="text-title mt-4 text-ink">
        Página não <span className="italic">encontrada.</span>
      </h1>
      <p className="mt-6 max-w-md text-ink-soft">O conteúdo que você procura pode ter sido movido ou não existe mais.</p>
      <Button href="/" className="mt-10">
        Voltar ao início
      </Button>
    </section>
  );
}
