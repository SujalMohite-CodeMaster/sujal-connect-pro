import { type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: "up" | "left" | "right";
  delay?: number;
  as?: ElementType;
};

const variantClass = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
} as const;

export function Reveal({ children, className, variant = "up", delay = 0, as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={cn(variantClass[variant], visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
