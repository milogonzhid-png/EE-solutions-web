import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { BUCKET_ENTREGABLES } from "@/lib/entregables";

/**
 * Sirve el sitio demo de un cliente con el Content-Type correcto.
 *
 * Supabase Storage fuerza `Content-Type: text/plain` + `Content-Security-Policy:
 * sandbox` en CUALQUIER objeto servido por su endpoint (público o firmado) —
 * es una protección anti-XSS deliberada, no un bug de su lado. Eso significa
 * que un signed URL apuntando directo a un .html nunca se renderiza como
 * página, se ve como código fuente. Por eso este archivo lo descarga del lado
 * del servidor (con la sesión del usuario, RLS sigue aplicando igual que en
 * cualquier otra consulta) y lo re-sirve con sus propios headers.
 *
 * No requiere ninguna ruta separada para admin vs. cliente: RLS ya decide qué
 * puede ver cada quien (admin cualquier slug, cliente solo el suyo) — si la
 * consulta no regresa nada, es 404 tanto para "no existe" como para "no es tuyo".
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: cliente } = await supabase
    .from("clientes")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!cliente) {
    return new NextResponse("Cliente no encontrado.", { status: 404 });
  }

  const { data: entregable } = await supabase
    .from("entregables_cliente")
    .select("storage_path, url_externa")
    .eq("cliente_id", cliente.id)
    .eq("tipo", "demo_web")
    .single();

  if (!entregable) {
    return new NextResponse("Este cliente todavía no tiene sitio demo.", {
      status: 404,
    });
  }

  if (entregable.url_externa) {
    return NextResponse.redirect(entregable.url_externa);
  }

  if (!entregable.storage_path) {
    return new NextResponse("Este cliente todavía no tiene sitio demo.", {
      status: 404,
    });
  }

  const { data: archivo, error } = await supabase.storage
    .from(BUCKET_ENTREGABLES)
    .download(entregable.storage_path);

  if (error || !archivo) {
    return new NextResponse("No se pudo cargar el sitio demo.", {
      status: 500,
    });
  }

  return new NextResponse(await archivo.text(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
