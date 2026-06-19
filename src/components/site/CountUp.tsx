import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type CountUpProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
};

export function CountUp({ end, suffix = "", prefix = "", duration = 1800, decimals = 0 }: CountUpProps) {
  const { ref, visible } = useScrollReveal<HTMLSpanElement>();
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!visible || startedRef.current) return;
    startedRef.current = true;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setValue(end);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
