import { createClient } from "@/lib/supabase/server";
import { NOMBRES_FASE, NOMBRES_ESTADO, COLOR_ESTADO } from "@/lib/fases";

export const revalidate = 0;

const ORDEN_FASES = ["1", "2", "3", "4", "5", "6"] as const;

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

  const { data: cliente } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", perfil.cliente_id)
    .single();

  const { data: pendientes } = await supabase
    .from("pendientes")
    .select("*")
    .eq("cliente_id", perfil.cliente_id)
    .order("resuelto", { ascending: true })
    .order("creado_en", { ascending: false });

  if (!cliente) {
    return (
      <p className="text-center text-white/50">
        No se encontró tu proyecto. Contáctanos si esto no es lo que esperabas.
      </p>
    );
  }

  const indiceFaseActual = ORDEN_FASES.indexOf(cliente.fase);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold">{cliente.nombre_comercial}</h1>
          <p className="text-sm text-white/50">
            {cliente.paquete ? `Paquete ${cliente.paquete}` : "Paquete por confirmar"}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs ${COLOR_ESTADO[cliente.estado]}`}
        >
          {NOMBRES_ESTADO[cliente.estado]}
        </span>
      </div>

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-5 text-sm font-medium text-white/70">
          Avance del proyecto
        </h2>
        <div className="space-y-4">
          {ORDEN_FASES.map((fase, i) => {
            const completada = i < indiceFaseActual;
            const actual = i === indiceFaseActual;
            return (
              <div key={fase} className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                    completada
                      ? "bg-[#21C7EA] text-black"
                      : actual
                        ? "border-2 border-[#21C7EA] text-[#21C7EA]"
                        : "border border-white/20 text-white/30"
                  }`}
                >
                  {completada ? "✓" : i + 1}
                </div>
                <span
                  className={
                    actual
                      ? "font-medium text-white"
                      : completada
                        ? "text-white/60"
                        : "text-white/30"
                  }
                >
                  {NOMBRES_FASE[fase]}
                </span>
                {actual && (
                  <span className="ml-auto text-xs text-[#21C7EA]">En curso</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-white/70">
          Pendientes de tu proyecto
        </h2>
        <ul className="space-y-2">
          {(pendientes ?? []).map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm"
            >
              <span className={p.resuelto ? "text-white/40 line-through" : ""}>
                {p.descripcion}
              </span>
              {p.resuelto && (
                <span className="text-xs text-green-400">Resuelto</span>
              )}
            </li>
          ))}
          {(pendientes ?? []).length === 0 && (
            <p className="text-sm text-white/40">Sin pendientes por ahora.</p>
          )}
        </ul>
      </section>
    </div>
  );
}
