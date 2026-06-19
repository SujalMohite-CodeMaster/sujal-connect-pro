import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin, Clock, Star } from "lucide-react";
import { COMPANY, telLink, mailLink, waLink, PRODUCTS } from "@/lib/site-data";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-graphite text-graphite-foreground">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt={`${COMPANY.name} logo`} width={44} height={44} className="h-11 w-11" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold">{COMPANY.shortName}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-silver/80">
                  Services & Solutions
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-silver/80">
              Trusted supplier and distributor of industrial bearings, oil seals, lubricants and
              hardware in Mumbai since {COMPANY.since}.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-graphite-foreground/10 px-3 py-1.5 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold">{COMPANY.rating}</span>
              <span className="text-silver/80">Google rating</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-silver">Products</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {PRODUCTS.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/products"
                    className="text-silver/80 transition-colors hover:text-graphite-foreground"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-silver">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { to: "/about", label: "About Us" },
                { to: "/products", label: "Products" },
                { to: "/services", label: "Services" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-silver/80 transition-colors hover:text-graphite-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-silver">Reach Us</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={telLink} className="flex items-start gap-2.5 text-silver/80 hover:text-graphite-foreground">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waLink("Hi, I'd like a quote.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-silver/80 hover:text-graphite-foreground"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  WhatsApp us
                </a>
              </li>
              <li>
                <a href={mailLink} className="flex items-start gap-2.5 text-silver/80 hover:text-graphite-foreground">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-silver/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{COMPANY.address.full}</span>
              </li>
              <li className="flex items-start gap-2.5 text-silver/80">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{COMPANY.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-graphite-foreground/10 pt-6 text-xs text-silver/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p>Industrial bearings · Oil seals · Lubricants · Hardware — Mumbai, India</p>
        </div>
      </div>
    </footer>
  );
}
