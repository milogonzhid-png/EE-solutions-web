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
      className="rounded-full border border-linea bg-white/[0.03] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-muted transition-colors hover:border-white/30 hover:text-white"
    >
      Salir
    </button>
  );
}
