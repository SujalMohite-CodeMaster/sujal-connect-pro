import { cn } from "@/lib/utils";

/**
 * Signature animated bearing motif — concentric rings with rolling balls.
 * Pure SVG + CSS, lightweight. Outer + inner rings counter-rotate.
 */
export function BearingMotif({ className }: { className?: string }) {
  const balls = Array.from({ length: 12 });
  return (
    <div className={cn("relative aspect-square", className)} aria-hidden="true">
      {/* Outer race */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke="oklch(0.7 0.02 247 / 0.35)"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="oklch(0.7 0.02 247 / 0.25)"
            strokeWidth="1.5"
            strokeDasharray="3 7"
          />
        </svg>
      </div>

      {/* Ball cage */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <radialGradient id="ballGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="oklch(0.95 0.01 247)" />
              <stop offset="55%" stopColor="oklch(0.78 0.015 247)" />
              <stop offset="100%" stopColor="oklch(0.55 0.03 255)" />
            </radialGradient>
            <radialGradient id="ballAmber" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="oklch(0.88 0.12 75)" />
              <stop offset="60%" stopColor="oklch(0.74 0.16 62)" />
              <stop offset="100%" stopColor="oklch(0.6 0.16 48)" />
            </radialGradient>
          </defs>
          {balls.map((_, i) => {
            const angle = (i / balls.length) * Math.PI * 2;
            const cx = 100 + Math.cos(angle) * 86;
            const cy = 100 + Math.sin(angle) * 86;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="9"
                fill={i === 0 ? "url(#ballAmber)" : "url(#ballGrad)"}
              />
            );
          })}
        </svg>
      </div>

      {/* Inner race counter-rotates */}
      <div className="absolute inset-[22%] animate-spin-reverse">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="oklch(0.74 0.16 62 / 0.6)"
            strokeWidth="3"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="oklch(0.7 0.02 247 / 0.3)"
            strokeWidth="2"
            strokeDasharray="2 6"
          />
        </svg>
      </div>

      {/* Hub */}
      <div className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-silver-gradient shadow-card" />
    </div>
  );
}
