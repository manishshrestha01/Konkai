import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-ink text-paper border-ink hover:bg-accent hover:border-accent active:bg-accent-deep",
  outline:
    "bg-transparent text-ink border-ink/25 hover:border-ink hover:bg-ink/[0.04]",
  ghost:
    "bg-transparent text-ink border-transparent hover:bg-ink/[0.05]",
  light:
    "bg-paper text-ink border-paper hover:bg-accent hover:text-paper hover:border-accent",
};

const SIZES: Record<Size, string> = {
  // min-h keeps every variant a comfortable touch target on mobile
  sm: "min-h-10 px-4 text-[0.75rem] tracking-[0.14em]",
  md: "min-h-12 px-6 text-[0.75rem] tracking-[0.14em]",
  lg: "min-h-14 px-8 text-[0.78rem] tracking-[0.16em]",
};

const BASE =
  "inline-flex items-center justify-center gap-2.5 border uppercase font-medium transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] active:scale-[0.985] disabled:opacity-50";

function classes(variant: Variant, size: Size, className?: string) {
  return cx(BASE, VARIANTS[variant], SIZES[size], className);
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  children,
  className,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes(variant, size, className)}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  children,
  className,
  ...rest
}: CommonProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

/** Small external-link marker with an accessible label. */
export function ExternalHint({ label }: { label: string }) {
  return <span className="sr-only"> ({label})</span>;
}
