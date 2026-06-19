import { BearingMotif } from "@/components/site/BearingMotif";
import { CtaButtons } from "@/components/site/CtaButtons";
import { Reveal } from "@/components/site/Reveal";

export function CtaBanner({
  title = "Need a part quoted today?",
  description = "Send us the bearing number, size or photo on WhatsApp and get a fast, no-obligation price. Prices are quoted manually because rates change daily.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="bg-grid absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-20">
        <BearingMotif className="h-full w-full" />
      </div>
      <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <Reveal>
          <h2 className="text-3xl font-bold text-graphite-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-silver/85">{description}</p>
          <CtaButtons
            size="lg"
            className="mt-8 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row"
          />
        </Reveal>
      </div>
    </section>
  );
}
