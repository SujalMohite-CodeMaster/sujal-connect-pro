import { waLink } from "@/lib/site-data";

export type EnquiryType = "contact" | "callback" | "bulk";

export interface EnquiryInput {
  enquiry_type: EnquiryType;
  name: string;
  phone: string;
  email?: string;
  product_interested?: string;
  quantity?: string;
  message?: string;
  /** Honeypot — must stay empty for real users. */
  website?: string;
}

const TYPE_LABEL: Record<EnquiryType, string> = {
  contact: "Contact / Retail Enquiry",
  callback: "Callback Request",
  bulk: "Bulk / Wholesale Enquiry",
};

/** Builds the pre-filled WhatsApp message exactly in the requested format. */
export function buildEnquiryWhatsApp(input: EnquiryInput): string {
  const lines = [
    "New Enquiry from Website",
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Type: ${TYPE_LABEL[input.enquiry_type]}`,
  ];
  if (input.product_interested) lines.push(`Product: ${input.product_interested}`);
  if (input.quantity) lines.push(`Quantity: ${input.quantity}`);
  if (input.message) lines.push(`Message: ${input.message}`);
  return lines.join("\n");
}

/** Opens WhatsApp in a new tab with the pre-filled enquiry message. */
export function openEnquiryWhatsApp(input: EnquiryInput) {
  if (typeof window === "undefined") return;
  window.open(waLink(buildEnquiryWhatsApp(input)), "_blank", "noopener,noreferrer");
}

/**
 * Saves an enquiry to the backend. Honeypot rejection is handled server-side
 * and still returns { ok: true } so bots get no signal.
 */
export async function submitEnquiry(input: EnquiryInput): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/public/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await res.json().catch(() => ({ ok: false }))) as { ok?: boolean };
    return { ok: Boolean(data.ok) };
  } catch {
    return { ok: false };
  }
}

/** Seconds the submit button stays disabled after a successful submission. */
export const SUBMIT_COOLDOWN_SECONDS = 30;
