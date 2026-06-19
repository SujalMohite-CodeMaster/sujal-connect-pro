import { createFileRoute } from "@tanstack/react-router";
import { Target, Gem, HeartHandshake, Lightbulb, ShieldCheck, Clock } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { BearingMotif } from "@/components/site/BearingMotif";
import { CtaBanner } from "@/components/site/CtaBanner";
import { TrustBadge } from "@/components/site/TrustBadge";
import { COMPANY, yearsInBusiness } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Sujal Services & Solutions — Bearings Supplier Mumbai" },
      {
        name: "description",
        content:
          "Sujal Services & Solutions has supplied genuine industrial bearings, oil seals and lubricants across Mumbai since 2013, trusted by 500+ clients with a 5.0 Google rating.",
      },
      { property: "og:title", content: "About Sujal Services & Solutions" },
      {
        property: "og:description",
        content: "12+ years supplying genuine industrial bearings and hardware in Mumbai.",
      },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Gem, title: "Quality First", text: "We supply only genuine, precision-grade parts — never compromised quality." },
  { icon: HeartHandshake, title: "Honest Dealing", text: "Fair, transparent guidance and pricing quoted personally for every order." },
  { icon: Lightbulb, title: "Deep Expertise", text: "Over a decade of hands-on bearing knowledge across countless applications." },
  { icon: ShieldCheck, title: "Dependability", text: "Consistent supply our clients have relied on year after year." },
  { icon: Clock, title: "Speed", text: "Quick turnaround and fast dispatch to keep your operations running." },
  { icon: Target, title: "Customer Focus", text: "We find the right part for you — even the hard-to-source ones." },
];

function About() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden bg-hero-gradient px-4 pb-16 pt-32 sm:px-6 lg:pb-24 lg:pt-40">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Our Story
              </span>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-graphite-foreground sm:text-5xl">
                Powering industry, one bearing at a time
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-silver/85">
                Founded in {COMPANY.since}, {COMPANY.name} began with a simple goal: make genuine,
                high-quality industrial bearings and supplies easy to source in Mumbai. More than{" "}
                {yearsInBusiness} years later, we've grown into a trusted partner for over 500 clients
                across manufacturing, automotive, engineering and maintenance.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-silver/85">
                From a single ball bearing to bulk orders and hard-to-find custom parts, our focus
                has never changed — the right part, genuine quality, and service you can count on.
              </p>
              <div className="mt-6">
                <TrustBadge tone="dark" />
              </div>
            </Reveal>
          </div>
          <Reveal variant="right" className="hidden lg:block">
            <div className="relative mx-auto max-w-sm animate-float-y">
              <div className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-3xl" />
              <BearingMotif className="w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border bg-card px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-6 text-center">
          {[
            { end: yearsInBusiness, suffix: "+", label: "Years of experience" },
            { end: 500, suffix: "+", label: "Happy clients" },
            { end: 10000, suffix: "+", label: "Products delivered" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="text-3xl font-bold text-primary sm:text-4xl">
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Reveal variant="left">
            <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-steel-gradient text-primary-foreground">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground">Our Mission</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To be the most dependable source of industrial bearings and supplies in the region —
                delivering genuine quality, expert advice and fast service that keeps our clients'
                machines running without interruption.
              </p>
            </div>
          </Reveal>
          <Reveal variant="right">
            <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-gradient text-accent-foreground">
                <Gem className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground">Commitment to Quality</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Every product we supply is genuine and inspected for precision. We'd rather source
                the exact right part than offer a quick substitute — because in industry, the right
                bearing means less downtime and longer machine life.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/50 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What we stand for"
            title="Values that have earned trust for over a decade"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={(i % 3) * 80}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-transform duration-500 group-hover:rotate-12">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Work with a supplier that's been reliable since 2013"
        description="Tell us what you need and we'll source it. Reach out on WhatsApp or call for a personal quote."
      />
    </>
  );
}
