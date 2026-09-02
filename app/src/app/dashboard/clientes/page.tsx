import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NOMBRES_FASE, NOMBRES_ESTADO, COLOR_ESTADO } from "@/lib/fases";

export const revalidate = 0;

export default async function ClientesPage() {
  const supabase = await createClient();
  const { data: clientes } = await supabase
    .from("clientes")
    .select("*")
    .order("nombre_comercial");

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">Clientes y proyectos</h1>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-left text-xs text-white/50">
            <tr>
              <th className="px-4 py-2.5 font-medium">Cliente</th>
              <th className="px-4 py-2.5 font-medium">Giro</th>
              <th className="px-4 py-2.5 font-medium">Fase</th>
              <th className="px-4 py-2.5 font-medium">Estado</th>
              <th className="px-4 py-2.5 font-medium">Paquete</th>
              <th className="px-4 py-2.5 font-medium">Mantenimiento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {(clientes ?? []).map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-2.5">
                  <Link
                    href={`/dashboard/clientes/${c.slug}`}
                    className="font-medium hover:text-[#21C7EA]"
                  >
                    {c.nombre_comercial}
                  </Link>
                </td>
                <td className="px-4 py-2.5 text-white/60">{c.giro ?? "—"}</td>
                <td className="px-4 py-2.5 text-white/70">
                  {NOMBRES_FASE[c.fase]}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${COLOR_ESTADO[c.estado]}`}
                  >
                    {NOMBRES_ESTADO[c.estado]}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-white/70 capitalize">
                  {c.paquete ?? "⟨pendiente⟩"}
                </td>
                <td className="px-4 py-2.5 text-white/70">
                  {c.mantenimiento ? "Sí" : "No"}
                </td>
              </tr>
            ))}
            {(clientes ?? []).length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-white/40">
                  Sin clientes registrados todavía. Se crean desde{" "}
                  <code className="text-white/60">/nuevo-cliente</code> en el
                  vault y se sincronizan aquí.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
