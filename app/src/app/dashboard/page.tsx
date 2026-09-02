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
    {
      label: "Clientes activos",
      valor: String(clientesActivos.length),
      color: "#21C7EA",
    },
    {
      label: "MRR activo",
      valor: formatoMXN(mrr),
      color: "#8C55D2",
    },
    {
      label: "Gastos del mes",
      valor: formatoMXN(gastosDelMes),
      color: "#FF2F86",
    },
    {
      label: "Cobros por cobrar",
      valor: String(cobrosPendientes.length),
      color: "#FFFFFF",
    },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <div
            key={kpi.label}
            className="tarjeta aparecer relative overflow-hidden p-5"
            style={{ "--retraso": `${i * 60}ms` } as React.CSSProperties}
          >
            <span
              className="absolute inset-y-0 left-0 w-0.5"
              style={{ background: kpi.color }}
            />
            <p className="mono-label">{kpi.label}</p>
            <p className="mt-2.5 font-display text-[1.7rem] font-extrabold tracking-tight text-white">
              {kpi.valor}
            </p>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="eyebrow">Embudo de entrega</h2>
          <span className="text-xs text-muted">
            Proyectos activos y pausados, por fase
          </span>
        </div>
        <EmbudoDeFases conteoPorFase={conteoPorFase} />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="eyebrow">Proyectos en curso</h2>
          <Link
            href="/dashboard/clientes"
            className="text-xs text-cyan transition-colors hover:text-white"
          >
            Ver todos →
          </Link>
        </div>
        <div className="tarjeta overflow-hidden hover:translate-y-0 hover:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b border-linea bg-white/[0.02] text-left">
                <tr>
                  <th className="mono-label px-5 py-3 font-normal">Cliente</th>
                  <th className="mono-label px-5 py-3 font-normal">
                    Avance por fase
                  </th>
                  <th className="mono-label px-5 py-3 font-normal">Estado</th>
                  <th className="mono-label px-5 py-3 font-normal">Paquete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(clientes ?? []).slice(0, 8).map((c) => (
                  <tr
                    key={c.id}
                    className="transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/dashboard/clientes/${c.slug}`}
                        className="font-medium text-white transition-colors hover:text-cyan"
                      >
                        {c.nombre_comercial}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <LineaDeFases faseActual={c.fase} variante="compacta" />
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-widest ${COLOR_ESTADO[c.estado]}`}
                      >
                        {NOMBRES_ESTADO[c.estado]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 capitalize text-muted">
                      {c.paquete ?? "⟨pendiente⟩"}
                    </td>
                  </tr>
                ))}
                {(clientes ?? []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center">
                      <p className="text-sm text-muted">
                        Sin clientes registrados todavía.
                      </p>
                      <p className="mono-label mt-2 justify-center text-[0.6rem]">
                        Se dan de alta desde /nuevo-cliente en el vault
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="eyebrow">Pendientes abiertos</h2>
          <div className="flex items-center gap-3">
            {esperandoAlCliente > 0 && (
              <span className="rounded-full border border-magenta/40 bg-magenta/10 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-widest text-magenta">
                {esperandoAlCliente} esperando al cliente
              </span>
            )}
            <Link
              href="/dashboard/pendientes"
              className="text-xs text-cyan transition-colors hover:text-white"
            >
              Ver todos →
            </Link>
          </div>
        </div>
        <div className="tarjeta overflow-hidden hover:translate-y-0 hover:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="border-b border-linea bg-white/[0.02] text-left">
                <tr>
                  <th className="mono-label px-5 py-3 font-normal">
                    Descripción
                  </th>
                  <th className="mono-label px-5 py-3 font-normal">Cliente</th>
                  <th className="mono-label px-5 py-3 font-normal">
                    Responsable
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(pendientes ?? []).map((p) => (
                  <tr
                    key={p.id}
                    className="transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-3.5 text-texto">
                      {p.descripcion}
                      {p.depende_de === "cliente" && (
                        <span className="ml-2 rounded-full border border-magenta/40 bg-magenta/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-magenta">
                          cliente
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-muted">
                      {(p as { clientes?: { nombre_comercial?: string } }).clientes
                        ?.nombre_comercial ?? "— (interno)"}
                    </td>
                    <td className="px-5 py-3.5 text-muted">
                      {p.responsable ? NOMBRES_DEPARTAMENTO[p.responsable] : "—"}
                    </td>
                  </tr>
                ))}
                {(pendientes ?? []).length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-5 py-10 text-center text-sm text-muted"
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
