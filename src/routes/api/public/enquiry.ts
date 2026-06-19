import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  enquiry_type: z.enum(["contact", "callback", "bulk"]),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(1).max(40),
  email: z.string().trim().max(255).optional().default(""),
  product_interested: z.string().trim().max(160).optional().default(""),
  quantity: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  // Honeypot — bots fill this; real users never see it.
  website: z.string().optional().default(""),
});

async function sendConfirmationEmail(email: string, name: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const firstName = name.split(" ")[0] || name;
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;line-height:1.6">
      <p>Hi ${firstName},</p>
      <p>Thank you for reaching out to <strong>Sujal Services &amp; Solutions</strong>. We've received your query and our team will get back to you shortly.</p>
      <p>For urgent requirements, call/WhatsApp us directly at
        <a href="https://wa.me/919322279696" style="color:#0a7d2c;font-weight:bold">+91 93222 79696</a>.
      </p>
      <p style="margin-top:24px;color:#6b7280;font-size:13px">Sujal Services &amp; Solutions — Industrial Bearing Supplier, Mumbai</p>
    </div>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Sujal Services & Solutions <onboarding@resend.dev>",
      to: [email],
      subject: "We've received your enquiry — Sujal Services & Solutions",
      html,
    }),
  });
}

export const Route = createFileRoute("/api/public/enquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ ok: false }, { status: 400 });
        }

        const parsed = schema.safeParse(raw);
        if (!parsed.success) {
          return Response.json({ ok: false }, { status: 400 });
        }
        const d = parsed.data;

        // Honeypot: silently accept but do nothing — only bots fill this.
        if (d.website.trim() !== "") {
          return Response.json({ ok: true });
        }

        const email = d.email.trim();
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Always save to the shared enquiries table
        const { error } = await supabaseAdmin.from("enquiries").insert({
          enquiry_type: d.enquiry_type,
          name: d.name,
          phone: d.phone,
          email: validEmail,
          product_interested: d.product_interested.trim() || null,
          quantity: d.quantity.trim() || null,
          message: d.message.trim() || null,
        });

        if (error) {
          console.error("Failed to save enquiry:", error.message);
          return Response.json({ ok: false }, { status: 500 });
        }

        // Also save to the dedicated bulk_enquiries table for richer analysis
        if (d.enquiry_type === "bulk") {
          const { error: bulkError } = await supabaseAdmin.from("bulk_enquiries").insert({
            name: d.name,
            phone: d.phone,
            email: validEmail,
            product_interested: d.product_interested.trim() || null,
            quantity: d.quantity.trim() || null,
            message: d.message.trim() || null,
            status: "new",
          });
          if (bulkError) {
            // Non-fatal: log it but don't fail the user request
            console.error("Failed to save to bulk_enquiries:", bulkError.message);
          }
        }

        if (validEmail) {
          try {
            await sendConfirmationEmail(validEmail, d.name);
          } catch (e) {
            console.error("Failed to send confirmation email:", e);
          }
        }

        return Response.json({ ok: true });
      },
    },
  },
});
