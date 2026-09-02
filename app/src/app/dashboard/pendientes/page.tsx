import { createClient } from "@/lib/supabase/server";
import { NOMBRES_DEPARTAMENTO, NOMBRES_FASE } from "@/lib/fases";

export const revalidate = 0;

export default async function PendientesPage() {
  const supabase = await createClient();
  const { data: pendientes } = await supabase
    .from("pendientes")
    .select("*, clientes(nombre_comercial, slug)")
    .order("resuelto", { ascending: true })
    .order("creado_en", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">Pendientes</h1>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-left text-xs text-white/50">
            <tr>
              <th className="px-4 py-2.5 font-medium">Descripción</th>
              <th className="px-4 py-2.5 font-medium">Cliente</th>
              <th className="px-4 py-2.5 font-medium">Fase</th>
              <th className="px-4 py-2.5 font-medium">Responsable</th>
              <th className="px-4 py-2.5 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {(pendientes ?? []).map((p) => (
              <tr key={p.id}>
                <td
                  className={`px-4 py-2.5 ${p.resuelto ? "text-white/40 line-through" : ""}`}
                >
                  {p.descripcion}
                </td>
                <td className="px-4 py-2.5 text-white/70">
                  {(p as { clientes?: { nombre_comercial?: string } }).clientes
                    ?.nombre_comercial ?? "— (interno)"}
                </td>
                <td className="px-4 py-2.5 text-white/60">
                  {p.fase ? NOMBRES_FASE[p.fase] : "—"}
                </td>
                <td className="px-4 py-2.5 text-white/70">
                  {p.responsable ? NOMBRES_DEPARTAMENTO[p.responsable] : "—"}
                </td>
                <td className="px-4 py-2.5">
                  {p.resuelto ? (
                    <span className="text-xs text-green-400">Resuelto</span>
                  ) : (
                    <span className="text-xs text-yellow-400">Abierto</span>
                  )}
                </td>
              </tr>
            ))}
            {(pendientes ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-white/40">
                  Sin pendientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
