import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/site-data";

export function TrustBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-4 py-2 text-sm",
        className,
      )}
    >
      <BadgeCheck className="h-5 w-5 shrink-0 text-whatsapp" />
      <span className="font-medium text-foreground">GST Registered Business</span>
      <span className="hidden h-4 w-px bg-border sm:block" />
      <span className="font-mono text-xs font-semibold text-muted-foreground">
        GSTIN: {COMPANY.gstin}
      </span>
    </div>
  );
}
