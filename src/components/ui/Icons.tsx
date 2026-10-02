import type { SVGProps } from "react";

/** Ícone oficial do WhatsApp (marca não disponível no Lucide). */
export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.39 9.39 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42 2.51 0 4.88.98 6.66 2.76a9.36 9.36 0 0 1 2.75 6.67c0 5.2-4.23 9.42-9.43 9.42m8.02-17.44A11.27 11.27 0 0 0 12.05.75C5.8.75.71 5.84.71 12.09c0 2 .52 3.95 1.52 5.67L.62 23.63l6-1.57a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

/** Ornamento botânico delicado, usado como detalhe decorativo. */
export function Sprig(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth={0.8} aria-hidden="true" {...props}>
      <path d="M60 116C60 80 58 44 62 6" strokeLinecap="round" />
      <path d="M61 30c10-8 20-9 28-6-6 8-17 11-28 6Z" />
      <path d="M61 30c-10-8-20-9-28-6 6 8 17 11 28 6Z" />
      <path d="M60 56c11-8 23-9 31-5-7 9-19 11-31 5Z" />
      <path d="M60 56c-11-8-23-9-31-5 7 9 19 11 31 5Z" />
      <path d="M60 82c10-7 21-8 29-4-7 8-18 10-29 4Z" />
      <path d="M60 82c-10-7-21-8-29-4 7 8 18 10 29 4Z" />
    </svg>
  );
}
