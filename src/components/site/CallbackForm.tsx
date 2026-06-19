import { useEffect, useRef, useState, type FormEvent } from "react";
import { PhoneCall, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  submitEnquiry,
  openEnquiryWhatsApp,
  SUBMIT_COOLDOWN_SECONDS,
  type EnquiryInput,
} from "@/lib/enquiry";

const honeypotStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  top: "auto",
  width: 1,
  height: 1,
  overflow: "hidden",
  opacity: 0,
};

export function CallbackForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({ name: "", phone: "" });
  const [cooldown, setCooldown] = useState(0);
  const honeypot = useRef("");

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (cooldown > 0) return;
    if (!form.name || !form.phone) {
      toast.error("Please add your name and phone number.");
      return;
    }

    if (honeypot.current.trim() !== "") {
      setStatus("success");
      return;
    }

    setStatus("loading");
    const input: EnquiryInput = {
      enquiry_type: "callback",
      name: form.name,
      phone: form.phone,
      website: honeypot.current,
    };
    const { ok } = await submitEnquiry(input);

    if (!ok) {
      setStatus("idle");
      toast.error("Something went wrong. Please WhatsApp us directly.");
      return;
    }

    setStatus("success");
    setCooldown(SUBMIT_COOLDOWN_SECONDS);
    toast.success("Thanks! We'll call you back shortly.");
    openEnquiryWhatsApp(input);
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card/95 p-6 shadow-card backdrop-blur",
        className,
      )}
    >
      {status === "success" ? (
        <div className="flex flex-col items-center py-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp/15 animate-scale-in">
            <CheckCircle2 className="h-8 w-8 text-whatsapp" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-foreground">Thanks!</h3>
          <p className="mt-1 text-sm text-muted-foreground">We'll call you back shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Honeypot — hidden from real users, catches bots. */}
          <div style={honeypotStyle} aria-hidden="true">
            <label>
              Company
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

          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-gradient text-accent-foreground">
              <PhoneCall className="h-4.5 w-4.5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-foreground">Request a Callback</h3>
              <p className="text-xs text-muted-foreground">No time to call? We'll reach you.</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="cb-name">Name</Label>
              <Input
                id="cb-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cb-phone">Phone number</Label>
              <Input
                id="cb-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+91 ..."
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="amber"
            size="lg"
            className="mt-4 w-full"
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
                <PhoneCall /> Request a Callback
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
