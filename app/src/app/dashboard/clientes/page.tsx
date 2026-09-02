import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NOMBRES_ESTADO, COLOR_ESTADO } from "@/lib/fases";
import { LineaDeFases } from "@/components/LineaDeFases";

export const revalidate = 0;

export default async function ClientesPage() {
  const supabase = await createClient();
  const { data: clientes } = await supabase
    .from("clientes")
    .select("*")
    .order("nombre_comercial");

  return (
    <div>
      <h2 className="eyebrow mb-5">Clientes y proyectos</h2>
      <div className="tarjeta overflow-hidden hover:translate-y-0 hover:shadow-none">
        <table className="w-full text-sm">
          <thead className="border-b border-linea bg-white/[0.02] text-left">
            <tr>
              <th className="mono-label px-5 py-3 font-normal">Cliente</th>
              <th className="mono-label px-5 py-3 font-normal">Giro</th>
              <th className="mono-label px-5 py-3 font-normal">Fase</th>
              <th className="mono-label px-5 py-3 font-normal">Estado</th>
              <th className="mono-label px-5 py-3 font-normal">Paquete</th>
              <th className="mono-label px-5 py-3 font-normal">Mantenimiento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {(clientes ?? []).map((c) => (
              <tr key={c.id} className="transition-colors hover:bg-white/[0.03]">
                <td className="px-5 py-3.5">
                  <Link
                    href={`/dashboard/clientes/${c.slug}`}
                    className="font-medium text-white transition-colors hover:text-cyan"
                  >
                    {c.nombre_comercial}
                  </Link>
                </td>
                <td className="px-5 py-3.5 text-muted">{c.giro ?? "—"}</td>
                <td className="px-5 py-3.5">
                  <LineaDeFases faseActual={c.fase} variante="compacta" />
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${COLOR_ESTADO[c.estado]}`}
                  >
                    {NOMBRES_ESTADO[c.estado]}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-white/70 capitalize">
                  {c.paquete ?? "⟨pendiente⟩"}
                </td>
                <td className="px-5 py-3.5 text-white/70">
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
