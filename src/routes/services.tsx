import { createFileRoute } from "@tanstack/react-router";
import {
  Boxes,
  Search,
  Truck,
  Headset,
  Recycle,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { CtaBanner } from "@/components/site/CtaBanner";
import { waLink } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Bulk Supply & Custom Sourcing — Sujal Mumbai" },
      {
        name: "description",
        content:
          "Beyond selling bearings: bulk supply, custom & imported sourcing, fast delivery, expert consultation and maintenance support across Mumbai. Enquire for a quote.",
      },
      { property: "og:title", content: "Services — Sujal Services & Solutions" },
      {
        property: "og:description",
        content: "Bulk supply, custom sourcing, fast delivery and expert consultation.",
      },
    ],
  }),
  component: Services,
});

const SERVICES = [
  {
    icon: Boxes,
    title: "Bulk & Wholesale Supply",
    text: "Reliable volume supply for factories, OEMs and resellers with consistent stock availability.",
  },
  {
    icon: Search,
    title: "Custom & Imported Sourcing",
    text: "We track down hard-to-find, obsolete and imported bearings to your exact specification.",
  },
  {
    icon: Truck,
    title: "Fast Delivery & Dispatch",
    text: "Quick turnaround and prompt dispatch so production downtime stays to a minimum.",
  },
  {
    icon: Headset,
    title: "Expert Consultation",
    text: "Not sure which bearing fits? Our team helps you choose the right part for your machine.",
  },
  {
    icon: ClipboardList,
    title: "Inventory & Repeat Orders",
    text: "We remember your specs and make repeat ordering effortless for ongoing maintenance.",
  },
  {
    icon: Recycle,
    title: "Lubrication & Maintenance Advice",
    text: "Guidance on the right grease, oil seals and care to extend the life of your bearings.",
  },
];

const STEPS = [
  { n: "01", title: "Tell us what you need", text: "Share the bearing number, size, brand or a photo via call or WhatsApp." },
  { n: "02", title: "Get a personal quote", text: "We check stock and reply with a current price and availability." },
  { n: "03", title: "Confirm & receive", text: "Approve the order and we dispatch your parts quickly and securely." },
];

function Services() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient px-4 pb-16 pt-32 sm:px-6 lg:pb-20 lg:pt-40">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              How we help
            </span>
            <h1 className="mt-3 text-4xl font-bold text-graphite-foreground sm:text-5xl">
              More than a supplier — your sourcing partner
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-silver/85">
              From bulk supply to one-off custom parts, we make sourcing bearings and industrial
              hardware simple, fast and dependable.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={(i % 3) * 80}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-steel-gradient text-primary-foreground shadow-card transition-transform duration-500 group-hover:rotate-12">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary/50 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Simple process"
            title="From enquiry to delivery in three steps"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-7 shadow-soft">
                  <span className="font-display text-5xl font-bold text-gradient-amber">
                    {step.n}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Button asChild variant="amber" size="lg">
              <a
                href={waLink("Hi, I'd like to enquire about your services.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start your enquiry <ArrowRight />
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
