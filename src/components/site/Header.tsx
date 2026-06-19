import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { COMPANY, telLink, waLink } from "@/lib/site-data";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md shadow-soft"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2.5 transition-all duration-300",
            scrolled ? "py-2.5" : "py-4",
          )}
        >
          <img
            src={logo}
            alt={`${COMPANY.name} logo`}
            width={48}
            height={48}
            className={cn("transition-all duration-300", scrolled ? "h-9 w-9" : "h-11 w-11")}
          />
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "font-display font-bold tracking-tight text-foreground transition-all duration-300",
                scrolled ? "text-base" : "text-lg",
              )}
            >
              {COMPANY.shortName}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Services & Solutions
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-amber-gradient" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <a href={telLink} className="text-foreground">
              <Phone /> {COMPANY.phoneDisplay}
            </a>
          </Button>
          <Button asChild variant="whatsapp" size="sm">
            <a href={waLink("Hi, I'd like a quote.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> Get a Quote
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-md transition-all duration-300 lg:hidden",
          open ? "max-h-[420px]" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                pathname === item.to
                  ? "bg-secondary text-primary"
                  : "text-foreground hover:bg-secondary",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2">
            <Button asChild variant="amber" size="default" className="flex-1">
              <a href={telLink}>
                <Phone /> Call
              </a>
            </Button>
            <Button asChild variant="whatsapp" size="default" className="flex-1">
              <a href={waLink("Hi, I'd like a quote.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
