import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatoMXN } from "@/lib/dinero";
import { LineaDeFases, EmbudoDeFases } from "@/components/LineaDeFases";
import {
  NOMBRES_ESTADO,
  COLOR_ESTADO,
  NOMBRES_DEPARTAMENTO,
} from "@/lib/fases";

export const revalidate = 0;

export default async function DashboardResumen() {
  const supabase = await createClient();

  const [{ data: clientes }, { data: cobros }, { data: gastos }, { data: pendientes }] =
    await Promise.all([
      supabase
        .from("clientes")
        .select("*")
        .order("actualizado_en", { ascending: false }),
      supabase
        .from("cobros")
        .select("*")
        .order("fecha_emision", { ascending: false }),
      supabase.from("gastos").select("*").order("fecha", { ascending: false }),
      supabase
        .from("pendientes")
        .select("*, clientes(nombre_comercial, slug)")
        .eq("resuelto", false)
        .order("creado_en", { ascending: false })
        .limit(8),
    ]);

  const clientesActivos = (clientes ?? []).filter((c) => c.estado === "activo");

  // MRR: monto mensual del cobro más reciente de cada cliente activo.
  type Cobro = NonNullable<typeof cobros>[number];
  const ultimoCobroPorCliente = new Map<string, Cobro>();
  for (const cobro of cobros ?? []) {
    if (!ultimoCobroPorCliente.has(cobro.cliente_id)) {
      ultimoCobroPorCliente.set(cobro.cliente_id, cobro);
    }
  }
  const mrr = clientesActivos.reduce((total, c) => {
    const cobro = ultimoCobroPorCliente.get(c.id);
    return total + (cobro?.monto_mensual_centavos ?? 0);
  }, 0);

  const inicioMes = new Date();
  inicioMes.setDate(1);
  inicioMes.setHours(0, 0, 0, 0);

  const gastosDelMes = (gastos ?? [])
    .filter((g) => new Date(g.fecha) >= inicioMes)
    .reduce((total, g) => total + g.monto_centavos, 0);

  const cobrosPendientes = (cobros ?? []).filter(
    (c) => c.estado_pago !== "pagado",
  );

  // Embudo: solo cuentan los proyectos vivos, no los entregados ni archivados.
  const enProceso = (clientes ?? []).filter(
    (c) => c.estado === "activo" || c.estado === "pausado",
  );
  const conteoPorFase: Record<string, number> = {};
  for (const c of enProceso) {
    conteoPorFase[c.fase] = (conteoPorFase[c.fase] ?? 0) + 1;
  }

  const esperandoAlCliente = (pendientes ?? []).filter(
    (p) => p.depende_de === "cliente",
  ).length;

  const kpis = [
    { label: "Clientes activos", valor: String(clientesActivos.length) },
    { label: "MRR (mensualidades activas)", valor: formatoMXN(mrr) },
    { label: "Gastos del mes", valor: formatoMXN(gastosDelMes) },
    {
      label: "Cobros pendientes de pago",
      valor: String(cobrosPendientes.length),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-xs text-white/50">{kpi.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {kpi.valor}
            </p>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-white/70">
            Embudo de entrega
          </h2>
          <span className="text-xs text-white/35">
            Proyectos activos y pausados, por fase
          </span>
        </div>
        <EmbudoDeFases conteoPorFase={conteoPorFase} />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-white/70">
            Proyectos en curso
          </h2>
          <Link
            href="/dashboard/clientes"
            className="text-xs text-[#21C7EA] hover:underline"
          >
            Ver todos →
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-white/[0.03] text-left text-xs text-white/50">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Cliente</th>
                  <th className="px-4 py-2.5 font-medium">Avance por fase</th>
                  <th className="px-4 py-2.5 font-medium">Estado</th>
                  <th className="px-4 py-2.5 font-medium">Paquete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(clientes ?? []).slice(0, 8).map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-2.5">
                      <Link
                        href={`/dashboard/clientes/${c.slug}`}
                        className="hover:text-[#21C7EA]"
                      >
                        {c.nombre_comercial}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5">
                      <LineaDeFases faseActual={c.fase} variante="compacta" />
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${COLOR_ESTADO[c.estado]}`}
                      >
                        {NOMBRES_ESTADO[c.estado]}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 capitalize text-white/70">
                      {c.paquete ?? "⟨pendiente⟩"}
                    </td>
                  </tr>
                ))}
                {(clientes ?? []).length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-white/40"
                    >
                      Sin clientes registrados todavía.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-white/70">
            Pendientes abiertos
          </h2>
          <div className="flex items-center gap-3">
            {esperandoAlCliente > 0 && (
              <span className="rounded-full bg-[#FF2F86]/15 px-2.5 py-0.5 text-xs text-[#FF2F86]">
                {esperandoAlCliente} esperando al cliente
              </span>
            )}
            <Link
              href="/dashboard/pendientes"
              className="text-xs text-[#21C7EA] hover:underline"
            >
              Ver todos →
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-white/[0.03] text-left text-xs text-white/50">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Descripción</th>
                  <th className="px-4 py-2.5 font-medium">Cliente</th>
                  <th className="px-4 py-2.5 font-medium">Responsable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(pendientes ?? []).map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-2.5">
                      {p.descripcion}
                      {p.depende_de === "cliente" && (
                        <span className="ml-2 rounded-full bg-[#FF2F86]/15 px-2 py-0.5 text-xs text-[#FF2F86]">
                          cliente
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-white/70">
                      {(p as { clientes?: { nombre_comercial?: string } }).clientes
                        ?.nombre_comercial ?? "— (interno)"}
                    </td>
                    <td className="px-4 py-2.5 text-white/70">
                      {p.responsable ? NOMBRES_DEPARTAMENTO[p.responsable] : "—"}
                    </td>
                  </tr>
                ))}
                {(pendientes ?? []).length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-white/40"
                    >
                      Sin pendientes abiertos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
