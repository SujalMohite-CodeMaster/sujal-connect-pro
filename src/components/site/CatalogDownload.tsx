import { FileText, Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { waLink, catalogDownloadLink } from "@/lib/site-data";

export function CatalogDownload({ className }: { className?: string }) {
  return (
    <section className={cn("px-4 sm:px-6", className)}>
      <Reveal className="mx-auto max-w-4xl">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-6 shadow-card sm:flex-row sm:items-center sm:p-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-gradient text-accent-foreground shadow-glow-amber">
            <FileText className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">Download Product Catalog</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Get our full product list (PDF) — no prices included, contact us for live rates.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild variant="hero" size="lg" className="w-full shrink-0 sm:w-auto">
              <a href={catalogDownloadLink} target="_blank" rel="noopener noreferrer">
                <Download /> Download PDF
              </a>
            </Button>
            <Button asChild variant="whatsapp" size="lg" className="w-full shrink-0 sm:w-auto">
              <a
                href={waLink("Hi, please send me your product catalog")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle /> Get it on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
