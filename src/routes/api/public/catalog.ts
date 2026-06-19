import { createFileRoute } from "@tanstack/react-router";

/**
 * Streams the latest catalog PDF from the private "catalog" storage bucket via
 * a short-lived signed URL. Stable public link: /api/public/catalog
 */
export const Route = createFileRoute("/api/public/catalog")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: list } = await supabaseAdmin.storage
          .from("catalog")
          .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

        const pdf = list?.find((f) => f.name.toLowerCase().endsWith(".pdf"));
        const fileName = pdf?.name ?? "catalog.pdf";

        const { data, error } = await supabaseAdmin.storage
          .from("catalog")
          .createSignedUrl(fileName, 60 * 60);

        if (error || !data?.signedUrl) {
          return new Response(
            "Catalog is not available yet. Please request it on WhatsApp.",
            { status: 404, headers: { "Content-Type": "text/plain" } },
          );
        }

        return new Response(null, {
          status: 302,
          headers: { Location: data.signedUrl, "Cache-Control": "no-store" },
        });
      },
    },
  },
});
