import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Recibe el enlace mágico (magic link) de Supabase Auth, intercambia el
 * código por una sesión y redirige a "/app", que a su vez manda a
 * /app/dashboard o /app/portal según el rol del usuario.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Detrás del proxy de eesolutions.com.mx/app/*, request.url trae el host
  // interno de Netlify (ee-solutions-app.netlify.app). x-forwarded-host
  // conserva el dominio público real que vio el visitante — se usa ese
  // cuando está presente para no mandar al usuario al dominio interno.
  const hostPublico = request.headers.get("x-forwarded-host");
  const origen = hostPublico ? `https://${hostPublico}` : url.origin;

  return NextResponse.redirect(`${origen}/app`);
}
