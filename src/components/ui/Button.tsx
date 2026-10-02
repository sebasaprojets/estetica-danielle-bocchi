import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full font-sans text-[0.8125rem] font-semibold tracking-[0.08em] uppercase transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-(--ease-luxe) focus-visible:outline-offset-4 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-ivory shadow-soft hover:bg-mocha-deep hover:shadow-lift",
  secondary: "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  light: "bg-ivory text-ink shadow-soft hover:bg-nude",
  ghost: "text-ink underline-offset-8 hover:underline px-0! min-h-11",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3",
  lg: "px-8 py-4 text-[0.8125rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, iconPosition = "end", children, className, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {icon && iconPosition === "start" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "end" && (
        <span className="shrink-0 transition-transform duration-300 ease-(--ease-luxe) group-hover/btn:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
