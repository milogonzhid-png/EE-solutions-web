import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "./supabase/database.types";

/**
 * Bucket privado de Supabase Storage donde viven los PDF y sitios demo de
 * cada cliente, en `<slug>/<archivo>`. RLS de storage.objects decide quién
 * ve qué carpeta — ver supabase/migrations/*_entregables_cliente_y_storage.sql.
 */
export const BUCKET_ENTREGABLES = "entregables-clientes";

/** Vigencia corta a propósito: se regenera en cada carga de página, nunca se guarda. */
const TTL_URL_FIRMADA_SEGUNDOS = 60 * 10;

export const NOMBRES_TIPO_ENTREGABLE: Record<string, string> = {
  ficha_pago: "Ficha de pago",
  bienvenida: "Bienvenida",
  agreement: "Agreement",
  demo_web: "Sitio demo",
  otro: "Otro",
};

export type EntregableConUrl = Tables<"entregables_cliente"> & {
  urlAbrir: string | null;
};

/**
 * Trae los entregables de un cliente con su URL para abrir.
 *
 * - PDF en Storage: URL firmada (10 min) — Supabase la sirve con
 *   `Content-Type: application/pdf` real, se abre bien directo.
 * - Sitio demo en Storage (`tipo: demo_web` + `storage_path`): NO usa URL
 *   firmada. Supabase Storage fuerza `Content-Type: text/plain` +
 *   `Content-Security-Policy: sandbox` en cualquier objeto que sirve — anti-XSS
 *   deliberado, aplica igual a URLs firmadas que a públicas — así que un
 *   `.html` servido directo desde Storage se ve como código fuente, nunca se
 *   renderiza. Se enruta en cambio por `/demo/<slug>`, que lo descarga del
 *   lado del servidor y lo re-sirve con el header correcto (ver
 *   `src/app/demo/[slug]/route.ts`).
 * - Link externo (`url_externa`, p. ej. un sitio demo ya publicado en
 *   Netlify): se usa tal cual.
 */
export async function entregablesConUrl(
  supabase: SupabaseClient<Database>,
  clienteId: string,
  slug: string,
): Promise<EntregableConUrl[]> {
  const { data } = await supabase
    .from("entregables_cliente")
    .select("*")
    .eq("cliente_id", clienteId)
    .order("tipo");

  if (!data || data.length === 0) return [];

  return Promise.all(
    data.map(async (entregable) => {
      if (entregable.url_externa) {
        return { ...entregable, urlAbrir: entregable.url_externa };
      }
      if (!entregable.storage_path) {
        return { ...entregable, urlAbrir: null };
      }
      if (entregable.tipo === "demo_web") {
        // basePath ("/app") no se aplica a strings armados a mano.
        return { ...entregable, urlAbrir: `/app/demo/${slug}` };
      }
      const { data: firmada } = await supabase.storage
        .from(BUCKET_ENTREGABLES)
        .createSignedUrl(entregable.storage_path, TTL_URL_FIRMADA_SEGUNDOS);
      return { ...entregable, urlAbrir: firmada?.signedUrl ?? null };
    }),
  );
}
