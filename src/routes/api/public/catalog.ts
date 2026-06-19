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
          .createSignedUrl(fileName, 60 * 60, { download: true });

        if (error || !data?.signedUrl) {
          return new Response(null, {
            status: 302,
            headers: {
              Location: "https://wa.me/919322279696?text=Hi%2C%20please%20send%20me%20your%20product%20catalog.",
              "Cache-Control": "no-store",
            },
          });
        }

        return new Response(null, {
          status: 302,
          headers: { Location: data.signedUrl, "Cache-Control": "no-store" },
        });
      },
    },
  },
});
