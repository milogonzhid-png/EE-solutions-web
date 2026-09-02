import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

/**
 * Cliente de Supabase para usarse en componentes de cliente ("use client").
 * Usa la publishable/anon key — segura para exponerse en el navegador porque
 * todo el acceso a datos está gobernado por RLS (ver migraciones en Supabase).
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
