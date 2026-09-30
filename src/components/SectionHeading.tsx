import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  blurb?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  blurb,
  align = "left",
  tone = "light",
  className,
  id,
  children,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <p className={cx("eyebrow", dark && "text-paper-warm/65")}>
          <span aria-hidden="true" className="mr-2.5 inline-block h-px w-6 align-middle bg-current opacity-50" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={90}>
        <h2
          id={id}
          className={cx(
            "mt-5 text-[clamp(1.95rem,4.4vw,3.15rem)] leading-[1.08]",
            dark ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {blurb ? (
        <Reveal delay={170}>
          <p
            className={cx(
              "mt-5 text-[0.975rem] leading-[1.75]",
              dark ? "text-paper-warm/75" : "text-ink-mute",
            )}
          >
            {blurb}
          </p>
        </Reveal>
      ) : null}
      {children ? <Reveal delay={240}>{children}</Reveal> : null}
    </div>
  );
}
