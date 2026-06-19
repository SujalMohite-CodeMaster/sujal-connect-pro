import { ScanSearch, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { BearingMotif } from "@/components/site/BearingMotif";
import { waLink } from "@/lib/site-data";

export function BearingFinder() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-card p-8 shadow-card sm:p-12">
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 opacity-10">
              <BearingMotif className="h-full w-full" />
            </div>
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-gradient text-accent-foreground shadow-glow-amber">
                <ScanSearch className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Know Your Bearing Number?
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  If you already know your bearing's part number (e.g.,{" "}
                  <strong className="text-foreground">6205</strong>,{" "}
                  <strong className="text-foreground">6004ZZ</strong>,{" "}
                  <strong className="text-foreground">32008</strong>), just WhatsApp us the number —
                  we'll confirm availability and send you an instant quote.
                </p>
                <Button asChild variant="whatsapp" size="lg" className="mt-6">
                  <a
                    href={waLink("Hi, I'm looking for bearing number: ")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle /> WhatsApp your bearing number
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
