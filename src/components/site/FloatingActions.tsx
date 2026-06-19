import { useEffect, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { waLink, telLink, COMPANY } from "@/lib/site-data";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-7 sm:right-6",
        mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
    >
      {/* Call (slides up when open) */}
      <a
        href={telLink}
        aria-label="Call us"
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full bg-amber-gradient text-accent-foreground shadow-glow-amber transition-all duration-300",
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-75 opacity-0",
        )}
      >
        <Phone className="h-5 w-5" />
      </a>

      {/* WhatsApp primary */}
      <a
        href={waLink(`Hi ${COMPANY.shortName}, I'd like a quote for an industrial bearing.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center gap-2"
      >
        <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-md bg-graphite px-3 py-1.5 text-sm font-medium text-graphite-foreground shadow-card md:group-hover:block">
          Chat for a quote
        </span>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift animate-pulse-ring">
          <MessageCircle className="h-7 w-7" />
        </span>
      </a>

      {/* Toggle to reveal call */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick actions" : "More contact options"}
        className="absolute -top-2 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-graphite text-graphite-foreground shadow-card"
      >
        {open ? <X className="h-3.5 w-3.5" /> : <Phone className="h-3 w-3" />}
      </button>
    </div>
  );
}
