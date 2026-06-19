import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/site-data";

export function TrustBadge({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border px-4 py-2 text-sm",
        tone === "dark"
          ? "border-graphite-foreground/15 bg-graphite-foreground/5"
          : "border-whatsapp/30 bg-whatsapp/10",
        className,
      )}
    >
      <BadgeCheck className="h-5 w-5 shrink-0 text-whatsapp" />
      <span className={cn("font-medium", tone === "dark" ? "text-graphite-foreground" : "text-foreground")}>
        GST Registered Business
      </span>
      <span
        className={cn(
          "hidden h-4 w-px sm:block",
          tone === "dark" ? "bg-graphite-foreground/20" : "bg-border",
        )}
      />
      <span
        className={cn(
          "font-mono text-xs font-semibold",
          tone === "dark" ? "text-silver/80" : "text-muted-foreground",
        )}
      >
        GSTIN: {COMPANY.gstin}
      </span>
    </div>
  );
}
