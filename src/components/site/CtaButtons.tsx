import { Phone, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { telLink, mailLink, waLink, COMPANY } from "@/lib/site-data";

type Props = {
  size?: "default" | "lg" | "xl";
  className?: string;
  whatsappMessage?: string;
  showEmail?: boolean;
};

export function CtaButtons({
  size = "lg",
  className,
  whatsappMessage = "Hi, I'd like a quote for an industrial bearing.",
  showEmail = true,
}: Props) {
  return (
    <div className={className}>
      <Button asChild variant="whatsapp" size={size}>
        <a href={waLink(whatsappMessage)} target="_blank" rel="noopener noreferrer">
          <MessageCircle /> WhatsApp for Price
        </a>
      </Button>
      <Button asChild variant="amber" size={size}>
        <a href={telLink}>
          <Phone /> Call {COMPANY.phoneDisplay}
        </a>
      </Button>
      {showEmail && (
        <Button asChild variant="outline" size={size}>
          <a href={mailLink}>
            <Mail /> Email Us
          </a>
        </Button>
      )}
    </div>
  );
}
