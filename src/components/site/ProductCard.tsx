import { ArrowRight, MessageCircle } from "lucide-react";
import { type ProductCategory, waLink } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: ProductCategory; className?: string }) {
  const Icon = product.icon;
  const message = `Hi, I'd like a quote for ${product.name}.`;

  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lift",
        className,
      )}
    >
      {/* corner accent */}
      <span className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-amber-gradient opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30" />

      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-steel-gradient text-primary-foreground shadow-card transition-transform duration-500 group-hover:rotate-[18deg]">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-foreground">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.blurb}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {product.points.map((pt) => (
          <span
            key={pt}
            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
          >
            {pt}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
        <MessageCircle className="h-4 w-4" />
        Enquire for price
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </a>
  );
}
