import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { CtaBanner } from "@/components/site/CtaBanner";
import { BearingFinder } from "@/components/site/BearingFinder";
import { CatalogDownload } from "@/components/site/CatalogDownload";
import { BrandsCarousel } from "@/components/site/BrandsCarousel";
import { PRODUCTS } from "@/lib/site-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | Bearings, Oil Seals & Lubricants — Sujal Mumbai" },
      {
        name: "description",
        content:
          "Explore ball, roller, thrust, needle & specialty bearings, oil seals, lubricants and industrial hardware. Tap any product to get a current price on WhatsApp.",
      },
      { property: "og:title", content: "Products — Sujal Services & Solutions" },
      {
        property: "og:description",
        content: "Industrial bearings, oil seals, lubricants & hardware. Enquire for a quote.",
      },
    ],
  }),
  component: Products,
});

function Products() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient px-4 pb-16 pt-32 sm:px-6 lg:pb-20 lg:pt-40">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Our Catalogue
            </span>
            <h1 className="mt-3 text-4xl font-bold text-graphite-foreground sm:text-5xl">
              Industrial bearings & supplies
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-silver/85">
              A complete range for every machine and application. We stock standard sizes and source
              specialty and imported parts on request.
            </p>
          </Reveal>
        </div>
      </section>

      {/* No-price notice */}
      <section className="px-4 pt-12 sm:px-6">
        <Reveal className="mx-auto flex max-w-3xl items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p>
            <strong>Prices aren't listed online.</strong> Bearing rates change daily, so every order
            is quoted personally. Tap a product to get a fast, current price on WhatsApp.
          </p>
        </Reveal>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70}>
                <ProductCard product={p} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog download */}
      <CatalogDownload className="pb-4" />

      {/* Bearing number finder */}
      <BearingFinder />

      {/* Brands */}
      <BrandsCarousel />

      <SectionHeading
        className="px-4 pb-12"
        eyebrow="Can't find it?"
        title="We source hard-to-find & custom bearings"
        description="If a part isn't on this list, we can still get it. Send us the bearing number, brand or a photo and we'll source it for you."
      />

      <CtaBanner
        title="Get a quote for any product"
        description="Share the part details and quantity — we'll reply with a current price and availability."
      />
    </>
  );
}
