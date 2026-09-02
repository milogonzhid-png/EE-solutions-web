"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function CerrarSesionBoton() {
  const router = useRouter();

  async function cerrarSesion() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={cerrarSesion}
      className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
    >
      Cerrar sesión
    </button>
  );
}
