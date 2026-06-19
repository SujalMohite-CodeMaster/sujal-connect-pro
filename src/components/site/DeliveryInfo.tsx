import { Truck, MapPinned } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const OPTIONS = [
  {
    icon: Truck,
    title: "Local Delivery (Mumbai)",
    text: "Fast local delivery across Mumbai so your machines never wait for parts.",
  },
  {
    icon: MapPinned,
    title: "Pan-India Shipping",
    text: "Reliable pan-India shipping through trusted courier and transport partners.",
  },
];

export function DeliveryInfo() {
  return (
    <section className="bg-secondary/50 px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Delivery & shipping"
          title="We get your parts to you, wherever you are"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {OPTIONS.map((o, i) => {
            const Icon = o.icon;
            return (
              <Reveal key={o.title} delay={i * 90}>
                <div className="group h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-steel-gradient text-primary-foreground shadow-card transition-transform duration-500 group-hover:rotate-12">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
