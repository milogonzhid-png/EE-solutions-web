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
 * Los indicadores usan la progresión de color blanco → cyan → violeta →
 * magenta de la sección "Proceso" del sitio público.
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
      {FASES.map((fase, i) => (
        <PasoDetallado
          key={fase.clave}
          numero={i + 1}
          fase={fase}
          completada={i < indiceActual}
          actual={i === indiceActual}
          ultima={i === FASES.length - 1}
          mostrarInterno={mostrarInterno}
          retraso={i * 60}
        />
      ))}
      <p className="mono-label pt-3 text-[0.6rem]">
        Proceso completo · {DURACION_TOTAL}
      </p>
    </div>
  );
}

function LineaCompacta({ indiceActual }: { indiceActual: number }) {
  const fase = indiceActual >= 0 ? FASES[indiceActual] : null;
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex gap-1" aria-hidden>
        {ORDEN_FASES.map((clave, i) => {
          const alcanzada = i <= indiceActual;
          return (
            <span
              key={clave}
              className={`h-1.5 w-4 rounded-full transition-all ${
                i === indiceActual ? "w-6" : ""
              }`}
              style={{
                background: alcanzada
                  ? FASES[i].degradado
                  : "rgba(255,255,255,.10)",
                opacity: alcanzada && i < indiceActual ? 0.55 : 1,
              }}
            />
          );
        })}
      </div>
      <span className="text-xs text-muted">
        {fase ? `${indiceActual + 1}. ${fase.nombre}` : "—"}
      </span>
    </div>
  );
}

function PasoDetallado({
  numero,
  fase,
  completada,
  actual,
  ultima,
  mostrarInterno,
  retraso,
}: {
  numero: number;
  fase: (typeof FASES)[number];
  completada: boolean;
  actual: boolean;
  ultima: boolean;
  mostrarInterno: boolean;
  retraso: number;
}) {
  const encendido = completada || actual;

  return (
    <div
      className="aparecer flex gap-4"
      style={{ "--retraso": `${retraso}ms` } as React.CSSProperties}
    >
      {/* Columna del indicador: círculo + línea que une los pasos. */}
      <div className="flex flex-col items-center">
        <div
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-xs font-extrabold transition-transform ${
            actual ? "latido scale-105" : ""
          } ${encendido ? "" : "border border-white/15 text-white/25"}`}
          style={
            encendido
              ? {
                  background: fase.degradado,
                  color: fase.textoOscuro ? "#0B0710" : "#fff",
                  opacity: completada && !actual ? 0.75 : 1,
                }
              : undefined
          }
        >
          {completada ? "✓" : numero}
        </div>
        {!ultima && (
          <div
            className="w-px flex-1"
            style={{
              background: completada
                ? "linear-gradient(180deg,rgba(33,199,234,.5),rgba(140,85,210,.25))"
                : "rgba(255,255,255,.08)",
            }}
          />
        )}
      </div>

      <div className={`flex-1 ${ultima ? "pb-0" : "pb-6"}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`font-display text-[0.95rem] font-semibold ${
              actual
                ? "text-white"
                : completada
                  ? "text-texto"
                  : "text-white/30"
            }`}
          >
            {fase.nombre}
          </span>
          {actual && (
            <span className="rounded-full border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-cyan">
              En curso
            </span>
          )}
          {fase.participaCliente && !completada && (
            <span className="rounded-full border border-violet/40 bg-violet/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-violet">
              Participas
            </span>
          )}
        </div>

        {encendido && (
          <p
            className={`mt-1 text-sm ${actual ? "text-texto" : "text-muted"}`}
          >
            {fase.objetivo}
          </p>
        )}

        <p className="mono-label mt-1.5 text-[0.6rem] normal-case tracking-[0.08em]">
          {fase.entregable} · {fase.duracion}
          {mostrarInterno ? ` · ${fase.involucra}` : ""}
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
        const activa = cantidad > 0;
        return (
          <div
            key={fase.clave}
            className="tarjeta aparecer relative overflow-hidden p-4"
            style={{ "--retraso": `${i * 50}ms` } as React.CSSProperties}
          >
            {/* Filo de color que identifica la fase, aun cuando esté vacía. */}
            <span
              className="absolute inset-x-0 top-0 h-0.5"
              style={{ background: fase.degradado, opacity: activa ? 1 : 0.25 }}
            />
            <p className="mono-label text-[0.58rem]">Fase {i + 1}</p>
            <p
              className={`mt-1 font-display text-[0.82rem] font-semibold leading-tight ${
                activa ? "text-white" : "text-white/35"
              }`}
            >
              {fase.nombre}
            </p>
            <p
              className="mt-3 font-display text-2xl font-extrabold tracking-tight"
              style={
                activa
                  ? {
                      background: fase.degradado,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }
                  : { color: "rgba(255,255,255,.16)" }
              }
            >
              {cantidad}
            </p>
          </div>
        );
      })}
      {total === 0 && (
        <p className="col-span-full text-xs text-muted">
          El embudo se llena solo conforme des de alta clientes y avancen de fase.
        </p>
      )}
    </div>
  );
}

export type { ClaveFase };
