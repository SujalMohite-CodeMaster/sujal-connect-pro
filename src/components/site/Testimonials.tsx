import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { TESTIMONIALS, COMPANY } from "@/lib/site-data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(t);
  }, [paused]);

  const active = TESTIMONIALS[index];

  return (
    <section className="px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-7 w-7 fill-accent text-accent" />
            ))}
          </div>
          <p className="mt-3 text-2xl font-bold text-foreground">
            {COMPANY.rating} <span className="text-muted-foreground">/ 5.0</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Based on Google &amp; Justdial Reviews</p>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Quote className="mx-auto h-9 w-9 text-accent/40" />
            <div key={index} className="animate-fade-slide">
              <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                “{active.quote}”
              </p>
              <p className="mt-5 text-sm font-semibold text-primary">— {active.author}</p>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show review ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    i === index ? "w-7 bg-accent" : "w-2.5 bg-border hover:bg-muted-foreground/40",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
