import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Loader2,
  Send,
  MessageCircle,
  Store,
  Boxes,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PRODUCT_OPTIONS, waLink, COMPANY } from "@/lib/site-data";

type EnquiryType = "retail" | "bulk";

const TYPES: { id: EnquiryType; icon: typeof Store; title: string; sub: string }[] = [
  { id: "retail", icon: Store, title: "Retail Enquiry", sub: "Single or small quantity" },
  { id: "bulk", icon: Boxes, title: "Bulk / Wholesale Enquiry", sub: "High volume / reseller" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [product, setProduct] = useState<string>("");
  const [enquiryType, setEnquiryType] = useState<EnquiryType>("retail");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    quantity: "",
    message: "",
  });

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please add your name and phone number.");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      toast.success("Enquiry received — we'll get back to you shortly!");
    }, 1400);
  }

  function reset() {
    setForm({ name: "", phone: "", email: "", quantity: "", message: "" });
    setProduct("");
    setEnquiryType("retail");
    setStatus("idle");
  }

  if (status === "success") {
    const waMessage = `Hi ${COMPANY.shortName}, I'm ${form.name}. ${
      enquiryType === "bulk" ? "[Bulk/Wholesale] " : ""
    }I'd like a quote for ${product || "industrial bearings"}${
      form.quantity ? ` (Qty: ${form.quantity})` : ""
    }.`;
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-card">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-whatsapp/15 animate-scale-in">
          <CheckCircle2 className="h-11 w-11 text-whatsapp" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-foreground">Thank you, {form.name.split(" ")[0]}!</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Your enquiry has been received. Our team will reach out with a quote soon. For the fastest
          response, message us directly on WhatsApp.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="whatsapp" size="lg">
            <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> Continue on WhatsApp
            </a>
          </Button>
          <Button variant="outline" size="lg" onClick={reset}>
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
    >
      {/* Enquiry type selector */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {TYPES.map((t) => {
          const Icon = t.icon;
          const active = enquiryType === t.id;
          return (
            <button
              type="button"
              key={t.id}
              onClick={() => setEnquiryType(t.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-300",
                active
                  ? "border-primary bg-primary/5 shadow-soft"
                  : "border-border bg-background hover:border-primary/40",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                  active
                    ? "bg-steel-gradient text-primary-foreground"
                    : "bg-secondary text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">{t.title}</span>
                <span className="block text-xs text-muted-foreground">{t.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" value={form.name} onChange={update("name")} placeholder="Your name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone / WhatsApp *</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="+91 ..."
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@company.com"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="product">Product interested in</Label>
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger id="product" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_OPTIONS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
              <SelectItem value="Other / Not sure">Other / Not sure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {enquiryType === "bulk" && (
          <div className="space-y-3 sm:col-span-2">
            <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-3 text-sm text-foreground">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p>
                Wholesale buyers get priority quotes and bulk pricing — let us know your requirement.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quantity">Estimated Quantity</Label>
              <Input
                id="quantity"
                value={form.quantity}
                onChange={update("quantity")}
                placeholder="e.g. 500 pcs / monthly requirement"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={form.message}
            onChange={update("message")}
            placeholder="Bearing number, size, brand or any details..."
            rows={4}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="amber"
        size="lg"
        className="mt-6 w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send /> Request a Quote
          </>
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        No prices are listed online — rates change daily and are quoted manually. We'll respond with
        a current price.
      </p>
    </form>
  );
}
