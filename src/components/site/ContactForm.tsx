import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, MessageCircle } from "lucide-react";
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
import { PRODUCT_OPTIONS, waLink, COMPANY } from "@/lib/site-data";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [product, setProduct] = useState<string>("");
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
    setStatus("idle");
  }

  if (status === "success") {
    const waMessage = `Hi ${COMPANY.shortName}, I'm ${form.name}. I'd like a quote for ${
      product || "industrial bearings"
    }${form.quantity ? ` (Qty: ${form.quantity})` : ""}.`;
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
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            value={form.quantity}
            onChange={update("quantity")}
            placeholder="e.g. 50 pcs"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
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
