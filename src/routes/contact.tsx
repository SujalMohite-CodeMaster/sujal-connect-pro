import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin, Clock, Star, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { FaqSection } from "@/components/site/FaqSection";
import { TrustBadge } from "@/components/site/TrustBadge";
import { COMPANY, telLink, mailLink, waLink, directionsLink } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Sujal Services & Solutions — Bearings Mumbai" },
      {
        name: "description",
        content:
          "Contact Sujal Services & Solutions in Masjid Bandar, Mumbai. Call +91 93222 79696, WhatsApp or email cp.sujal@gmail.com for a fast quote on industrial bearings.",
      },
      { property: "og:title", content: "Contact — Sujal Services & Solutions" },
      {
        property: "og:description",
        content: "Call, WhatsApp or email for a quote. Masjid Bandar, Mumbai 400003.",
      },
    ],
  }),
  component: Contact,
});

const QUICK = [
  {
    icon: Phone,
    label: "Call us",
    value: COMPANY.phoneDisplay,
    href: telLink,
    accent: "amber" as const,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat for a quote",
    href: waLink("Hi, I'd like a quote for industrial bearings."),
    accent: "whatsapp" as const,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: COMPANY.email,
    href: mailLink,
    accent: "steel" as const,
  },
];

const accentClass = {
  amber: "bg-amber-gradient text-accent-foreground",
  whatsapp: "bg-whatsapp text-whatsapp-foreground",
  steel: "bg-steel-gradient text-primary-foreground",
};

function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address.full)}&output=embed`;

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient px-4 pb-16 pt-32 sm:px-6 lg:pb-20 lg:pt-40">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Get in touch
            </span>
            <h1 className="mt-3 text-4xl font-bold text-graphite-foreground sm:text-5xl">
              Let's get your parts quoted
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-silver/85">
              Call, WhatsApp or send an enquiry — we respond fast with a current price. The quickest
              way to a quote is WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          {QUICK.map((q, i) => {
            const Icon = q.icon;
            return (
              <Reveal key={q.label} delay={i * 90}>
                <a
                  href={q.href}
                  target={q.external ? "_blank" : undefined}
                  rel={q.external ? "noopener noreferrer" : undefined}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentClass[q.accent]} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {q.label}
                    </span>
                    <span className="block font-semibold text-foreground">{q.value}</span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <SectionHeading
              align="left"
              eyebrow="Enquiry form"
              title="Request a quote"
              description="Fill in a few details and we'll get back to you with a current price and availability."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <Reveal variant="right">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <h3 className="text-xl font-bold text-foreground">Visit our shop</h3>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{COMPANY.address.full}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{COMPANY.hours}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="mt-0.5 h-5 w-5 shrink-0 fill-accent text-accent" />
                    <span className="text-muted-foreground">
                      Rated {COMPANY.rating} on Google by our clients
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <div className="mt-5 overflow-hidden rounded-2xl border border-border shadow-soft">
                <iframe
                  title={`Map to ${COMPANY.name}`}
                  src={mapSrc}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
