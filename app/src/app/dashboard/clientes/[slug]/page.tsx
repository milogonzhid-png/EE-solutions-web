import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatoMXN } from "@/lib/dinero";
import { NOMBRES_FASE, NOMBRES_ESTADO, COLOR_ESTADO } from "@/lib/fases";
import { LineaDeFases } from "@/components/LineaDeFases";
import { entregablesConUrl, NOMBRES_TIPO_ENTREGABLE } from "@/lib/entregables";

export const revalidate = 0;

export default async function DetalleClientePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: cliente } = await supabase
    .from("clientes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!cliente) notFound();

  const [{ data: pendientes }, { data: cobros }, entregables] = await Promise.all([
    supabase
      .from("pendientes")
      .select("*")
      .eq("cliente_id", cliente.id)
      .order("creado_en", { ascending: false }),
    supabase
      .from("cobros")
      .select("*")
      .eq("cliente_id", cliente.id)
      .order("fecha_emision", { ascending: false }),
    entregablesConUrl(supabase, cliente.id),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold">{cliente.nombre_comercial}</h1>
          <p className="text-sm text-white/50">{cliente.giro ?? "Giro sin especificar"}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs ${COLOR_ESTADO[cliente.estado]}`}
        >
          {NOMBRES_ESTADO[cliente.estado]}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Dato label="Fase" valor={NOMBRES_FASE[cliente.fase]} />
        <Dato label="Paquete" valor={cliente.paquete ?? "⟨pendiente⟩"} />
        <Dato label="WhatsApp" valor={cliente.whatsapp ?? "⟨pendiente⟩"} />
        <Dato label="Dominio" valor={cliente.dominio ?? "⟨pendiente⟩"} />
      </div>

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-5 text-sm font-medium text-white/70">
          Avance por fase
        </h2>
        <LineaDeFases
          faseActual={cliente.fase}
          variante="detallada"
          mostrarInterno
        />
      </section>

      {cliente.notas && (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
          {cliente.notas}
        </div>
      )}

      <section>
        <h2 className="mb-3 text-sm font-medium text-white/70">Cobros</h2>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-left text-xs text-white/50">
              <tr>
                <th className="px-4 py-2.5 font-medium">Folio</th>
                <th className="px-4 py-2.5 font-medium">Setup</th>
                <th className="px-4 py-2.5 font-medium">Mensual</th>
                <th className="px-4 py-2.5 font-medium">Estado</th>
                <th className="px-4 py-2.5 font-medium">Emisión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(cobros ?? []).map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-2.5">{c.folio}</td>
                  <td className="px-4 py-2.5">{formatoMXN(c.monto_setup_centavos)}</td>
                  <td className="px-4 py-2.5">{formatoMXN(c.monto_mensual_centavos)}</td>
                  <td className="px-4 py-2.5 capitalize text-white/70">
                    {c.estado_pago}
                  </td>
                  <td className="px-4 py-2.5 text-white/60">{c.fecha_emision}</td>
                </tr>
              ))}
              {(cobros ?? []).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-white/40">
                    Sin cobros registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-white/70">Entregables</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {entregables.map((e) => (
            <a
              key={e.id}
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
              <span>
                <span className="text-white/45">
                  {NOMBRES_TIPO_ENTREGABLE[e.tipo] ?? e.tipo}
                </span>{" "}
                · {e.nombre}
              </span>
              <span className="text-xs text-white/40">
                {e.urlAbrir ? "Abrir ↗" : "Sin URL"}
              </span>
            </a>
          ))}
          {entregables.length === 0 && (
            <p className="text-sm text-white/40">
              Sin entregables sincronizados todavía. Se suben desde el vault
              con <code className="text-white/60">sync-entregables.js</code>{" "}
              después de generar los PDF o el sitio demo.
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-white/70">Pendientes</h2>
        <ul className="space-y-2">
          {(pendientes ?? []).map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm"
            >
              <span className={p.resuelto ? "text-white/40 line-through" : ""}>
                {p.descripcion}
              </span>
              {p.resuelto && <span className="text-xs text-green-400">Resuelto</span>}
            </li>
          ))}
          {(pendientes ?? []).length === 0 && (
            <p className="text-sm text-white/40">Sin pendientes.</p>
          )}
        </ul>
      </section>
    </div>
  );
}

function Dato({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs text-white/50">{label}</p>
      <p className="mt-1 text-sm capitalize">{valor}</p>
    </div>
  );
}
