"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [verificando, setVerificando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function enviarEnlace(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: correo,
      options: {
        // basePath ("/app") no se aplica solo a strings armados a mano —
        // hay que agregarlo explícito aquí porque este URL lo consume
        // Supabase (fuera del router de Next), no un <Link>/router.push.
        emailRedirectTo: `${window.location.origin}/app/auth/callback`,
      },
    });

    setEnviando(false);
    if (error) {
      setError("No se pudo enviar el enlace. Verifica el correo e intenta de nuevo.");
      return;
    }
    setEnviado(true);
  }

  async function verificarCodigo(e: React.FormEvent) {
    e.preventDefault();
    setVerificando(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email: correo,
      token: codigo.trim(),
      type: "email",
    });

    setVerificando(false);
    if (error) {
      setError("Código incorrecto o vencido. Pide uno nuevo e intenta de nuevo.");
      return;
    }
    // basePath no aplica a strings armados a mano. Se va a /app/dashboard (no
    // a /app pelado, que entra en un ciclo de diagonal final con el proxy del
    // sitio principal); si el usuario es cliente, el middleware lo manda a
    // /app/portal.
    window.location.href = `${window.location.origin}/app/dashboard`;
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-9 flex flex-col items-center text-center">
          <Logo className="h-10 w-auto" idDegradado="eeGradLogin" />
          <h1 className="mt-5 font-display text-xl font-extrabold text-white">
            Panel EE Solutions
          </h1>
          <p className="mono-label mt-2 text-[0.6rem]">
            Acceso solo para cuentas invitadas
          </p>
          {/*
            basePath ("/app") no se aplica a strings armados a mano — hay que
            agregarlo explícito, igual que con emailRedirectTo abajo.
          */}
          <a
            href="/app/tutorial-acceso-panel.html"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-xs text-cyan transition-colors hover:text-white"
          >
            ¿Primera vez? Mira cómo entrar →
          </a>
        </div>

        {enviado ? (
          <div className="space-y-4">
            <div className="tarjeta hover:translate-y-0 hover:shadow-none">
              <div className="rail h-0.5 rounded-t-[18px]" />
              <div className="p-5 text-sm text-texto">
                Te mandamos un acceso a{" "}
                <strong className="text-white">{correo}</strong>. Ábrelo desde
                este mismo dispositivo.
              </div>
            </div>

            <div className="tarjeta hover:translate-y-0 hover:shadow-none">
              <div className="p-5">
                <p className="mono-label">O usa el código</p>
                <p className="mt-2 text-sm text-muted">
                  El correo trae un código de 6 dígitos. Escríbelo aquí si el
                  enlace no te funciona.
                </p>
                <form onSubmit={verificarCodigo} className="mt-4 space-y-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="123456"
                    className="w-full rounded-xl border border-linea bg-white/[0.04] px-3.5 py-3 text-center font-mono text-lg tracking-[0.35em] text-white outline-none transition-colors focus:border-cyan"
                  />
                  <BotonPrimario cargando={verificando}>
                    {verificando ? "Verificando…" : "Entrar"}
                  </BotonPrimario>
                </form>
              </div>
            </div>

            {error && <p className="text-sm text-magenta">{error}</p>}
          </div>
        ) : (
          <form onSubmit={enviarEnlace} className="space-y-4">
            <div>
              <label htmlFor="correo" className="mono-label mb-2">
                Correo
              </label>
              <input
                id="correo"
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full rounded-xl border border-linea bg-white/[0.04] px-3.5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-cyan"
              />
            </div>

            {error && <p className="text-sm text-magenta">{error}</p>}

            <BotonPrimario cargando={enviando}>
              {enviando ? "Enviando…" : "Enviar acceso"}
            </BotonPrimario>

            <p className="mono-label justify-center text-center text-[0.58rem] leading-relaxed">
              ¿No tienes cuenta? Pide que te inviten desde Contratación
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/** Botón con el degradado de marca y el lift de los CTA del sitio. */
function BotonPrimario({
  cargando,
  children,
}: {
  cargando: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={cargando}
      className="w-full rounded-full px-4 py-3 text-sm font-semibold text-[#0B0710] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,47,134,.25)] disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
      style={{
        background: "linear-gradient(90deg,#FFFFFF,#21C7EA 45%,#8C55D2 100%)",
      }}
    >
      {children}
    </button>
  );
}
