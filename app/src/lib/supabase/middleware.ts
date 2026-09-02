import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./database.types";

const RUTAS_PUBLICAS = ["/login", "/auth"];

/**
 * Refresca la sesión de Supabase en cada petición y protege rutas:
 * - Sin sesión → redirige a /login.
 * - Rol "cliente" que intenta entrar a /dashboard (admin) → lo manda a /portal.
 * - Rol "admin" que entra a /portal → lo manda a /dashboard.
 *
 * También canjea el ?code= del correo (PKCE) aquí, sin importar a qué ruta
 * llegue: Supabase manda a la Site URL cuando el redirect_to no coincide con
 * la lista de Redirect URLs. El middleware es el único lugar que puede
 * canjearlo y guardar las cookies (un Server Component no puede escribirlas).
 *
 * IMPORTANTE: nunca redirigir a "/" (o sea, eesolutions.com.mx/app a secas).
 * El sitio principal proxea "/app/*", y "/app" pelado entra en un ciclo de
 * diagonal final entre Netlify y Next. Siempre se manda a /dashboard, /portal
 * o /login, que sí son rutas completas.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  /**
   * Redirige copiando las cookies de sesión que Supabase acaba de escribir.
   * NextResponse.redirect() crea una respuesta nueva y vacía: si no se copian,
   * el token refrescado se pierde en cada redirect y la sesión queda a medias.
   */
  function redirigir(destino: string) {
    const url = request.nextUrl.clone();
    url.pathname = destino;
    url.search = ""; // no arrastrar ?code= ni ?error= a la siguiente vuelta
    const respuesta = NextResponse.redirect(url);
    supabaseResponse.cookies
      .getAll()
      .forEach(({ name, value, ...options }) =>
        respuesta.cookies.set(name, value, options),
      );
    return respuesta;
  }

  /** Panel que le toca al usuario según su rol. Nunca devuelve "/". */
  async function panelDelUsuario(idUsuario: string) {
    const { data: perfil } = await supabase
      .from("profiles")
      .select("rol")
      .eq("id", idUsuario)
      .single();
    return perfil?.rol === "admin" ? "/dashboard" : "/portal";
  }

  const { pathname, searchParams } = request.nextUrl;

  // 1) ¿Viene el código del correo? Canjearlo por sesión antes que nada.
  const codigo = searchParams.get("code");
  if (codigo) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(codigo);
    if (error || !data.user) return redirigir("/login");
    return redirigir(await panelDelUsuario(data.user.id));
  }

  // 2) ¿Viene un error del correo (link vencido/ya usado)? Al login, limpio.
  if (searchParams.has("error")) {
    return redirigir("/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const esRutaPublica = RUTAS_PUBLICAS.some((ruta) =>
    pathname.startsWith(ruta),
  );

  if (!user && !esRutaPublica) {
    return redirigir("/login");
  }

  if (user && esRutaPublica && pathname.startsWith("/login")) {
    return redirigir(await panelDelUsuario(user.id));
  }

  if (user && !esRutaPublica) {
    const panel = await panelDelUsuario(user.id);

    if (pathname.startsWith("/dashboard") && panel !== "/dashboard") {
      return redirigir(panel);
    }

    if (pathname.startsWith("/portal") && panel !== "/portal") {
      return redirigir(panel);
    }

    // La raíz ("/") no tiene panel propio: mandarla al que corresponda.
    if (pathname === "/") {
      return redirigir(panel);
    }
  }

  return supabaseResponse;
}
