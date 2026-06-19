import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Truck,
  Headset,
  PackageCheck,
  Star,
  ArrowRight,
  Award,
  Boxes,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BearingMotif } from "@/components/site/BearingMotif";
import { CountUp } from "@/components/site/CountUp";
import { CtaButtons } from "@/components/site/CtaButtons";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { CtaBanner } from "@/components/site/CtaBanner";
import { BrandsCarousel } from "@/components/site/BrandsCarousel";
import { BearingFinder } from "@/components/site/BearingFinder";
import { DeliveryInfo } from "@/components/site/DeliveryInfo";
import { Testimonials } from "@/components/site/Testimonials";
import { FaqSection } from "@/components/site/FaqSection";
import { CatalogDownload } from "@/components/site/CatalogDownload";
import { CallbackForm } from "@/components/site/CallbackForm";
import { COMPANY, PRODUCTS, yearsInBusiness, waLink } from "@/lib/site-data";
import heroImg from "@/assets/hero-bearings.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sujal Services & Solutions | Industrial Bearings Supplier in Mumbai" },
      {
        name: "description",
        content:
          "Industrial bearing supplier & distributor in Mumbai since 2013. Ball, roller, thrust & needle bearings, oil seals, lubricants & hardware. WhatsApp or call for a fast quote.",
      },
      { property: "og:title", content: "Sujal Services & Solutions | Industrial Bearings Mumbai" },
      {
        property: "og:description",
        content:
          "Trusted by 500+ clients. 10,000+ products delivered. Get a no-obligation quote on WhatsApp.",
      },
    ],
  }),
  component: Home,
});

const STATS = [
  { icon: Award, end: yearsInBusiness, suffix: "+", label: "Years in business" },
  { icon: Users, end: 500, suffix: "+", label: "Clients trust us" },
  { icon: Boxes, end: 10000, suffix: "+", label: "Products delivered" },
  { icon: Star, end: 5, suffix: ".0", label: "Google rating", decimals: 0 },
];

const WHY = [
  {
    icon: ShieldCheck,
    title: "Genuine Quality",
    text: "Authentic, branded and precision-grade bearings sourced from reliable manufacturers.",
  },
  {
    icon: Truck,
    title: "Fast Supply",
    text: "Quick dispatch and bulk availability so your machines never wait for parts.",
  },
  {
    icon: Headset,
    title: "Expert Guidance",
    text: "12+ years of know-how to help you pick the exact bearing for your application.",
  },
  {
    icon: PackageCheck,
    title: "Custom Sourcing",
    text: "Hard-to-find and imported sizes sourced to your exact specification.",
  },
];

function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-hidden bg-hero-gradient">
        <img
          src={heroImg}
          alt="Polished industrial ball and roller bearings on a steel surface"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-hero-gradient opacity-60" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-2 lg:pb-28 lg:pt-40">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-silver/25 bg-graphite-foreground/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-silver">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                Trusted supplier since {COMPANY.since}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-graphite-foreground sm:text-5xl lg:text-6xl">
                Precision <span className="text-gradient-amber">Bearings</span> &amp; Industrial
                Supplies, Delivered.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-silver/85">
                Ball, roller, thrust and needle bearings, oil seals, lubricants and hardware —
                stocked and sourced for industries across Mumbai and beyond. Prices change daily, so
                we quote every order personally.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <CtaButtons
                size="lg"
                showEmail={false}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              />
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-6 flex items-center gap-3 text-sm text-silver/75">
                <span className="flex -space-x-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </span>
                <span>
                  Rated <strong className="text-graphite-foreground">{COMPANY.rating}</strong> by
                  clients on Google
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal variant="right" className="hidden lg:block">
            <div className="relative mx-auto max-w-md">
              <div className="animate-float-y">
                <div className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-3xl" />
                <BearingMotif className="mx-auto w-2/3" />
              </div>
              <CallbackForm className="mt-6" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8 lg:grid-cols-4">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 90} className="text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-3xl font-bold text-foreground sm:text-4xl">
                  <CountUp end={s.end} suffix={s.suffix} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- Callback mini-form (mobile/tablet) ---------- */}
      <section className="px-4 pt-12 sm:px-6 lg:hidden">
        <Reveal className="mx-auto max-w-md">
          <CallbackForm />
        </Reveal>
      </section>

      {/* ---------- Brands ---------- */}
      <BrandsCarousel />

      {/* ---------- Products ---------- */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What we supply"
            title="Bearings & industrial hardware for every machine"
            description="Browse our core categories. Tap any card to get a current price on WhatsApp — no pricing is published because rates change daily."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70}>
                <ProductCard product={p} className="h-full" />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/products">
                View all products <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---------- Bearing number finder ---------- */}
      <BearingFinder />

      {/* ---------- Why choose us ---------- */}
      <section className="bg-secondary/50 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why Sujal"
            title="A bearings partner you can rely on"
            description="For over a decade, industries have chosen us for genuine parts, honest guidance and dependable supply."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={w.title} delay={i * 80}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-gradient text-accent-foreground shadow-glow-amber transition-transform duration-500 group-hover:rotate-12">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Review highlight ---------- */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-card sm:p-12">
              <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 opacity-10">
                <BearingMotif className="h-full w-full" />
              </div>
              <div className="relative">
                <div className="flex justify-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-7 w-7 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                  “Reliable supply, genuine parts and prompt service every single time.”
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Rated a perfect{" "}
                  <strong className="text-foreground">{COMPANY.rating} on Google</strong> by the
                  industries we serve.
                </p>
                <Button asChild variant="amber" size="lg" className="mt-8">
                  <a
                    href={waLink("Hi, I'd like a quote for industrial bearings.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get your quote now <ArrowRight />
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
