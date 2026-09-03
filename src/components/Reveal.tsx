import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

export type RevealVariant =
  | "rise"
  | "scale"
  | "left"
  | "right"
  | "zoom"
  | "tick"
  | "fade"
  | "settle";

/**
 * Shared scroll-triggered reveal. The `variant` picks the *type* of motion so
 * different sections of the site feel distinct while staying equally subtle.
 */
export function Reveal({
  children,
  as: TagProp = "div",
  delay = 0,
  variant = "rise",
  className = "",
  style,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  style?: CSSProperties;
} & Record<string, unknown>) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  // Cast keeps prop typing sane: R3F augments JSX.IntrinsicElements globally.
  const Tag = TagProp as ElementType<Record<string, unknown>>;

  return (
    <Tag

      ref={ref}
      data-reveal={variant}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
