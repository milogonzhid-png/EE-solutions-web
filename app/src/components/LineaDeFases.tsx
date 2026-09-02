import {
  FASES,
  ORDEN_FASES,
  DURACION_TOTAL,
  indiceDeFase,
  type ClaveFase,
} from "@/lib/fases";

/**
 * Visualizador de las 6 fases de entrega.
 *
 * - `compacta`: barra de 6 segmentos para celdas de tabla en el dashboard.
 * - `detallada`: recorrido completo con entregable y duración; se usa en el
 *   portal del cliente y en la ficha de cada proyecto.
 *
 * `mostrarInterno` decide si se muestran los equipos involucrados: el cliente
 * no tiene por qué ver los nombres internos de los departamentos.
 */

type Props = {
  faseActual: string;
  variante?: "compacta" | "detallada";
  mostrarInterno?: boolean;
};

export function LineaDeFases({
  faseActual,
  variante = "detallada",
  mostrarInterno = false,
}: Props) {
  const indiceActual = indiceDeFase(faseActual);

  if (variante === "compacta") {
    return <LineaCompacta indiceActual={indiceActual} />;
  }

  return (
    <div className="space-y-1">
      {FASES.map((fase, i) => {
        const completada = i < indiceActual;
        const actual = i === indiceActual;
        return (
          <PasoDetallado
            key={fase.clave}
            numero={i + 1}
            nombre={fase.nombre}
            objetivo={fase.objetivo}
            entregable={fase.entregable}
            involucra={fase.involucra}
            duracion={fase.duracion}
            participaCliente={fase.participaCliente}
            completada={completada}
            actual={actual}
            ultima={i === FASES.length - 1}
            mostrarInterno={mostrarInterno}
          />
        );
      })}
      <p className="pt-3 text-xs text-white/35">
        Duración estimada del proceso completo: {DURACION_TOTAL}.
      </p>
    </div>
  );
}

function LineaCompacta({ indiceActual }: { indiceActual: number }) {
  const fase = indiceActual >= 0 ? FASES[indiceActual] : null;
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5" aria-hidden>
        {ORDEN_FASES.map((clave, i) => (
          <span
            key={clave}
            className={`h-1.5 w-4 rounded-full ${
              i < indiceActual
                ? "bg-[#21C7EA]/70"
                : i === indiceActual
                  ? "bg-[#21C7EA]"
                  : "bg-white/12"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-white/60">
        {fase ? `${indiceActual + 1}. ${fase.nombre}` : "—"}
      </span>
    </div>
  );
}

function PasoDetallado({
  numero,
  nombre,
  objetivo,
  entregable,
  involucra,
  duracion,
  participaCliente,
  completada,
  actual,
  ultima,
  mostrarInterno,
}: {
  numero: number;
  nombre: string;
  objetivo: string;
  entregable: string;
  involucra: string;
  duracion: string;
  participaCliente: boolean;
  completada: boolean;
  actual: boolean;
  ultima: boolean;
  mostrarInterno: boolean;
}) {
  return (
    <div className="flex gap-4">
      {/* Columna del indicador: círculo + línea vertical que une los pasos. */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
            completada
              ? "bg-[#21C7EA] text-[#07050A]"
              : actual
                ? "border-2 border-[#21C7EA] text-[#21C7EA]"
                : "border border-white/20 text-white/30"
          }`}
        >
          {completada ? "✓" : numero}
        </div>
        {!ultima && (
          <div
            className={`w-px flex-1 ${completada ? "bg-[#21C7EA]/40" : "bg-white/10"}`}
          />
        )}
      </div>

      <div className={`flex-1 pb-6 ${ultima ? "pb-0" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={
              actual
                ? "font-medium text-white"
                : completada
                  ? "text-white/70"
                  : "text-white/35"
            }
          >
            {nombre}
          </span>
          {actual && (
            <span className="rounded-full bg-[#21C7EA]/15 px-2 py-0.5 text-xs text-[#21C7EA]">
              En curso
            </span>
          )}
          {participaCliente && !completada && (
            <span className="rounded-full bg-[#8C55D2]/15 px-2 py-0.5 text-xs text-[#8C55D2]">
              Participas aquí
            </span>
          )}
        </div>

        {(actual || completada) && (
          <p
            className={`mt-1 text-sm ${actual ? "text-white/60" : "text-white/40"}`}
          >
            {objetivo}
          </p>
        )}

        <p
          className={`mt-1 text-xs ${actual ? "text-white/50" : "text-white/30"}`}
        >
          Entregable: {entregable} · {duracion}
          {mostrarInterno ? ` · ${involucra}` : ""}
        </p>
      </div>
    </div>
  );
}

/**
 * Embudo: cuántos proyectos hay en cada fase. Da la foto de la operación
 * completa de un vistazo, que es lo que le sirve a dirección.
 */
export function EmbudoDeFases({
  conteoPorFase,
}: {
  conteoPorFase: Record<string, number>;
}) {
  const total = Object.values(conteoPorFase).reduce((a, b) => a + b, 0);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {FASES.map((fase, i) => {
        const cantidad = conteoPorFase[fase.clave] ?? 0;
        return (
          <div
            key={fase.clave}
            className={`rounded-xl border p-4 ${
              cantidad > 0
                ? "border-[#21C7EA]/30 bg-[#21C7EA]/[0.06]"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <p className="text-xs text-white/40">Fase {i + 1}</p>
            <p
              className={`mt-1 text-sm ${cantidad > 0 ? "text-white/80" : "text-white/40"}`}
            >
              {fase.nombre}
            </p>
            <p
              className={`mt-2 text-2xl font-semibold tracking-tight ${
                cantidad > 0 ? "text-[#21C7EA]" : "text-white/20"
              }`}
            >
              {cantidad}
            </p>
          </div>
        );
      })}
      {total === 0 && (
        <p className="col-span-full text-xs text-white/35">
          El embudo se llena solo conforme des de alta clientes y avancen de fase.
        </p>
      )}
    </div>
  );
}

export type { ClaveFase };
