import { BRANDS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export function BrandsCarousel() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section className="overflow-hidden px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Authorised range"
          title="Trusted Brands We Supply"
          description="We stock and source genuine bearings from the world's most trusted manufacturers."
        />

        <div className="group relative mt-12">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

          <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
            {loop.map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card"
              >
                <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
