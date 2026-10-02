import { WhatsAppIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import FadeContent from "@/components/reactbits/FadeContent";
import { cn, whatsappUrl } from "@/lib/utils";

type InlineCTAProps = {
  title: string;
  text: string;
  buttonLabel?: string;
  message?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Faixa de conversão compacta, usada entre seções. */
export function InlineCTA({
  title,
  text,
  buttonLabel = "Falar com a equipe",
  message,
  tone = "light",
  className,
}: InlineCTAProps) {
  const dark = tone === "dark";
  return (
    <FadeContent
      className={cn(
        "flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border p-7 md:flex-row md:items-center md:p-10",
        dark ? "border-ivory/15 bg-ivory/[0.04]" : "border-line bg-cream",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className={cn("font-serif text-3xl leading-tight md:text-4xl", dark ? "text-ivory" : "text-ink")}>{title}</p>
        <p className={cn("mt-2 text-sm leading-relaxed md:text-base", dark ? "text-ivory/70" : "text-ink-soft")}>{text}</p>
      </div>
      <Button
        href={whatsappUrl(message)}
        variant={dark ? "light" : "primary"}
        size="lg"
        icon={<WhatsAppIcon className="size-4" />}
        iconPosition="start"
        className="w-full shrink-0 md:w-auto"
      >
        {buttonLabel}
      </Button>
    </FadeContent>
  );
}
