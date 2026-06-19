import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
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
import {
  submitEnquiry,
  openEnquiryWhatsApp,
  buildEnquiryWhatsApp,
  SUBMIT_COOLDOWN_SECONDS,
  type EnquiryInput,
} from "@/lib/enquiry";

type EnquiryType = "retail" | "bulk";

const TYPES: { id: EnquiryType; icon: typeof Store; title: string; sub: string }[] = [
  { id: "retail", icon: Store, title: "Retail Enquiry", sub: "Single or small quantity" },
  { id: "bulk", icon: Boxes, title: "Bulk / Wholesale Enquiry", sub: "High volume / reseller" },
];

const honeypotStyle: CSSProperties = {
  position: "absolute",
  left: "-9999px",
  top: "auto",
  width: 1,
  height: 1,
  overflow: "hidden",
  opacity: 0,
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [product, setProduct] = useState<string>("");
  const [enquiryType, setEnquiryType] = useState<EnquiryType>("retail");
  const [cooldown, setCooldown] = useState(0);
  const honeypot = useRef("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    quantity: "",
    message: "",
  });

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function buildInput(): EnquiryInput {
    return {
      enquiry_type: enquiryType === "bulk" ? "bulk" : "contact",
      name: form.name,
      phone: form.phone,
      email: form.email,
      product_interested: product,
      quantity: enquiryType === "bulk" ? form.quantity : "",
      message: form.message,
      website: honeypot.current,
    };
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (cooldown > 0) return;
    if (!form.name || !form.phone) {
      toast.error("Please add your name and phone number.");
      return;
    }

    // Honeypot: bail silently as if it succeeded.
    if (honeypot.current.trim() !== "") {
      setStatus("success");
      return;
    }

    setStatus("loading");
    const input = buildInput();
    const { ok } = await submitEnquiry(input);

    if (!ok) {
      setStatus("idle");
      toast.error("Something went wrong saving your enquiry. Please WhatsApp us directly.");
      return;
    }

    setStatus("success");
    setCooldown(SUBMIT_COOLDOWN_SECONDS);
    toast.success("Enquiry received — opening WhatsApp to confirm.");
    openEnquiryWhatsApp(input);
  }

  function reset() {
    setForm({ name: "", phone: "", email: "", quantity: "", message: "" });
    setProduct("");
    setEnquiryType("retail");
    honeypot.current = "";
    setStatus("idle");
  }

  if (status === "success") {
    const waMessage = buildEnquiryWhatsApp(buildInput());
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-card">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-whatsapp/15 animate-scale-in">
          <CheckCircle2 className="h-11 w-11 text-whatsapp" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-foreground">
          Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
        </h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          We've received your query and our team will reach out with a quote soon. WhatsApp should
          have opened in a new tab — just tap send to reach us instantly.
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
        {cooldown > 0 && (
          <p className="mt-4 text-xs text-muted-foreground">
            You can send another enquiry in {cooldown}s.
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
    >
      {/* Honeypot field — hidden from real users, catches bots. */}
      <div style={honeypotStyle} aria-hidden="true">
        <label>
          Company website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            onChange={(e) => {
              honeypot.current = e.target.value;
            }}
          />
        </label>
      </div>

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
        disabled={status === "loading" || cooldown > 0}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" /> Sending...
          </>
        ) : cooldown > 0 ? (
          <>Please wait {cooldown}s</>
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
