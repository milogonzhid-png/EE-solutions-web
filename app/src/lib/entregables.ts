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
 * Trae los entregables de un cliente con su URL para abrir: firmada (10 min)
 * si el archivo vive en Storage, o la url_externa tal cual si es un link
 * (p. ej. un sitio demo ya publicado en Netlify).
 */
export async function entregablesConUrl(
  supabase: SupabaseClient<Database>,
  clienteId: string,
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
      const { data: firmada } = await supabase.storage
        .from(BUCKET_ENTREGABLES)
        .createSignedUrl(entregable.storage_path, TTL_URL_FIRMADA_SEGUNDOS);
      return { ...entregable, urlAbrir: firmada?.signedUrl ?? null };
    }),
  );
}
