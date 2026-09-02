import { createClient } from "@/lib/supabase/server";
import { LineaDeFases } from "@/components/LineaDeFases";
import {
  NOMBRES_ESTADO,
  COLOR_ESTADO,
  FASE_POR_CLAVE,
  indiceDeFase,
  FASES,
} from "@/lib/fases";
import { entregablesConUrl, NOMBRES_TIPO_ENTREGABLE } from "@/lib/entregables";

export const revalidate = 0;

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: perfil } = await supabase
    .from("profiles")
    .select("cliente_id")
    .eq("id", user!.id)
    .single();

  if (!perfil?.cliente_id) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <p className="text-sm text-white/70">
          Tu cuenta todavía no está vinculada a un proyecto. Escríbenos por
          WhatsApp al{" "}
          <a href="https://wa.me/529512128121" className="text-[#21C7EA]">
            951 212 8121
          </a>{" "}
          y lo resolvemos.
        </p>
      </div>
    );
  }

  const [{ data: cliente }, { data: pendientes }] = await Promise.all([
    supabase.from("clientes").select("*").eq("id", perfil.cliente_id).single(),
    supabase
      .from("pendientes")
      .select("*")
      .eq("cliente_id", perfil.cliente_id)
      .order("creado_en", { ascending: false }),
  ]);

  if (!cliente) {
    return (
      <p className="text-center text-white/50">
        No se encontró tu proyecto. Contáctanos si esto no es lo que esperabas.
      </p>
    );
  }

  const entregables = await entregablesConUrl(supabase, cliente.id, cliente.slug);

  const abiertos = (pendientes ?? []).filter((p) => !p.resuelto);
  const deTuParte = abiertos.filter((p) => p.depende_de === "cliente");
  const denuestroLado = abiertos.filter((p) => p.depende_de !== "cliente");
  const resueltos = (pendientes ?? []).filter((p) => p.resuelto);

  const faseActual = FASE_POR_CLAVE[cliente.fase];
  const indice = indiceDeFase(cliente.fase);
  const siguiente = indice >= 0 ? FASES[indice + 1] : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">{cliente.nombre_comercial}</h1>
          <p className="text-sm text-white/50">
            {cliente.paquete
              ? `Paquete ${cliente.paquete}`
              : "Paquete por confirmar"}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs ${COLOR_ESTADO[cliente.estado]}`}
        >
          {NOMBRES_ESTADO[cliente.estado]}
        </span>
      </div>

      {/* Resumen de dónde va el proyecto, en una línea legible. */}
      {faseActual && (
        <div className="rounded-xl border border-[#21C7EA]/25 bg-[#21C7EA]/[0.06] p-5">
          <p className="text-xs uppercase tracking-wide text-[#21C7EA]">
            Fase {indice + 1} de 6 · en curso
          </p>
          <p className="mt-1.5 text-lg font-medium">{faseActual.nombre}</p>
          <p className="mt-1 text-sm text-white/60">{faseActual.objetivo}.</p>
          <p className="mt-3 text-sm text-white/70">
            <span className="text-white/45">Entregable de esta fase:</span>{" "}
            {faseActual.entregable}
            <span className="text-white/45"> · duración estimada </span>
            {faseActual.duracion}
          </p>
          {siguiente && (
            <p className="mt-1 text-sm text-white/50">
              <span className="text-white/40">Sigue:</span> {siguiente.nombre} —{" "}
              {siguiente.entregable.toLowerCase()}
            </p>
          )}
        </div>
      )}

      {/* Lo que bloquea el avance va primero: es la acción del cliente. */}
      {deTuParte.length > 0 && (
        <section className="rounded-xl border border-[#FF2F86]/30 bg-[#FF2F86]/[0.06] p-5">
          <h2 className="text-sm font-medium text-[#FF2F86]">
            Necesitamos esto de tu parte
          </h2>
          <p className="mt-1 text-xs text-white/50">
            Mientras esto no llegue, la entrega se detiene aquí.
          </p>
          <ul className="mt-4 space-y-2">
            {deTuParte.map((p) => (
              <li
                key={p.id}
                className="rounded-lg border border-white/10 bg-[#07050A]/40 px-4 py-2.5 text-sm"
              >
                {p.descripcion}
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/529512128121"
            className="mt-4 inline-block rounded-lg bg-[#FF2F86] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#FF2F86]/90"
          >
            Mandar por WhatsApp
          </a>
        </section>
      )}

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-5 text-sm font-medium text-white/70">
          Las 6 fases de tu proyecto
        </h2>
        <LineaDeFases faseActual={cliente.fase} variante="detallada" />
      </section>

      {denuestroLado.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-medium text-white/70">
            En lo que estamos trabajando
          </h2>
          <ul className="space-y-2">
            {denuestroLado.map((p) => (
              <li
                key={p.id}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70"
              >
                {p.descripcion}
              </li>
            ))}
          </ul>
        </section>
      )}

      {resueltos.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-medium text-white/50">
            Ya resuelto ({resueltos.length})
          </h2>
          <ul className="space-y-2">
            {resueltos.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between rounded-lg border border-white/[0.06] px-4 py-2 text-sm text-white/35"
              >
                <span className="line-through">{p.descripcion}</span>
                <span className="text-xs text-green-400/70">✓</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {abiertos.length === 0 && resueltos.length === 0 && (
        <p className="text-sm text-white/40">
          No hay pendientes registrados por ahora.
        </p>
      )}

      {entregables.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-medium text-white/70">
            Tus documentos
          </h2>
          <ul className="space-y-2">
            {entregables.map((e) => (
              <li key={e.id}>
                <a
                  href={e.urlAbrir ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!e.urlAbrir}
                  className={`flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm ${
                    e.urlAbrir
                      ? "hover:border-[#21C7EA]/40 hover:text-[#21C7EA]"
                      : "cursor-not-allowed opacity-50"
                  }`}
                >
                  <span>{NOMBRES_TIPO_ENTREGABLE[e.tipo] ?? e.tipo}</span>
                  <span className="text-xs text-white/40">
                    {e.urlAbrir ? "Ver ↗" : "Sin URL"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {cliente.dominio && (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs text-white/45">Tu sitio</p>
          <a
            href={`https://${cliente.dominio}`}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-[#21C7EA] hover:underline"
          >
            {cliente.dominio}
          </a>
        </div>
      )}
    </div>
  );
}
