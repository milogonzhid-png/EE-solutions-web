"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

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
    // basePath no aplica a strings armados a mano — forzamos la recarga
    // completa a /app para que el middleware te mande a dashboard/portal.
    window.location.href = `${window.location.origin}/app`;
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            EE Solutions
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Acceso al panel — solo para cuentas invitadas.
          </p>
        </div>

        {enviado ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-[#21C7EA]/30 bg-[#21C7EA]/10 p-4 text-sm">
              Te mandamos un enlace de acceso a <strong>{correo}</strong>.
              Ábrelo desde este mismo dispositivo para entrar.
            </div>

            <div className="rounded-lg border border-white/15 bg-white/5 p-4">
              <p className="mb-3 text-sm text-white/70">
                ¿El enlace del correo no te funcionó? Ese mismo correo trae
                también un código de 6 dígitos — escríbelo aquí:
              </p>
              <form onSubmit={verificarCodigo} className="space-y-3">
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="123456"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-center text-lg tracking-widest outline-none focus:border-[#21C7EA] focus:ring-1 focus:ring-[#21C7EA]"
                />
                <button
                  type="submit"
                  disabled={verificando}
                  className="w-full rounded-lg bg-[#8C55D2] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#8C55D2]/90 disabled:opacity-50"
                >
                  {verificando ? "Verificando…" : "Verificar código"}
                </button>
              </form>
            </div>

            {error && <p className="text-sm text-[#FF2F86]">{error}</p>}
          </div>
        ) : (
          <form onSubmit={enviarEnlace} className="space-y-4">
            <div>
              <label htmlFor="correo" className="mb-1.5 block text-sm text-white/70">
                Correo
              </label>
              <input
                id="correo"
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-[#21C7EA] focus:ring-1 focus:ring-[#21C7EA]"
              />
            </div>

            {error && <p className="text-sm text-[#FF2F86]">{error}</p>}

            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-lg bg-[#8C55D2] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#8C55D2]/90 disabled:opacity-50"
            >
              {enviando ? "Enviando…" : "Enviar enlace de acceso"}
            </button>

            <p className="text-center text-xs text-white/40">
              ¿No tienes cuenta? Pide que te inviten desde{" "}
              <span className="text-white/60">Contratación</span>.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
