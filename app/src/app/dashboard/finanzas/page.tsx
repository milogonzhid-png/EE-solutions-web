import { createClient } from "@/lib/supabase/server";
import { formatoMXN } from "@/lib/dinero";

export const revalidate = 0;

export default async function FinanzasPage() {
  const supabase = await createClient();

  const [{ data: cobros }, { data: gastos }] = await Promise.all([
    supabase
      .from("cobros")
      .select("*, clientes(nombre_comercial)")
      .order("fecha_emision", { ascending: false }),
    supabase.from("gastos").select("*").order("fecha", { ascending: false }),
  ]);

  const totalCobrado = (cobros ?? [])
    .filter((c) => c.estado_pago === "pagado")
    .reduce((t, c) => t + c.monto_setup_centavos + c.monto_mensual_centavos, 0);
  const totalGastado = (gastos ?? []).reduce((t, g) => t + g.monto_centavos, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-lg font-semibold">Finanzas</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs text-white/50">Total cobrado (histórico)</p>
          <p className="mt-2 text-2xl font-semibold text-green-400">
            {formatoMXN(totalCobrado)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs text-white/50">Total gastado (histórico)</p>
          <p className="mt-2 text-2xl font-semibold text-[#FF2F86]">
            {formatoMXN(totalGastado)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs text-white/50">Utilidad (histórico)</p>
          <p className="mt-2 text-2xl font-semibold">
            {formatoMXN(totalCobrado - totalGastado)}
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-medium text-white/70">Ingresos (cobros)</h2>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-left text-xs text-white/50">
              <tr>
                <th className="px-4 py-2.5 font-medium">Folio</th>
                <th className="px-4 py-2.5 font-medium">Cliente</th>
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
                  <td className="px-4 py-2.5 text-white/70">
                    {(c as { clientes?: { nombre_comercial?: string } }).clientes
                      ?.nombre_comercial ?? "—"}
                  </td>
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
                  <td colSpan={6} className="px-4 py-6 text-center text-white/40">
                    Sin cobros registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-white/70">Gastos</h2>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-left text-xs text-white/50">
              <tr>
                <th className="px-4 py-2.5 font-medium">Categoría</th>
                <th className="px-4 py-2.5 font-medium">Descripción</th>
                <th className="px-4 py-2.5 font-medium">Monto</th>
                <th className="px-4 py-2.5 font-medium">Recurrente</th>
                <th className="px-4 py-2.5 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(gastos ?? []).map((g) => (
                <tr key={g.id}>
                  <td className="px-4 py-2.5 text-white/70">{g.categoria}</td>
                  <td className="px-4 py-2.5">{g.descripcion}</td>
                  <td className="px-4 py-2.5">{formatoMXN(g.monto_centavos)}</td>
                  <td className="px-4 py-2.5 text-white/70">
                    {g.recurrente ? "Sí" : "No"}
                  </td>
                  <td className="px-4 py-2.5 text-white/60">{g.fecha}</td>
                </tr>
              ))}
              {(gastos ?? []).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-white/40">
                    Sin gastos registrados todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
