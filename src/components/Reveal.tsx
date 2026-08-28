import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * Shared scroll-triggered reveal: content fades in and rises gently the first
 * time it enters the viewport. Timing comes from the site-wide motion tokens.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
} & Record<string, unknown>) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
