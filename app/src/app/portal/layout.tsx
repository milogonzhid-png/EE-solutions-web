import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CerrarSesionBoton } from "@/components/CerrarSesionBoton";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: perfil } = await supabase
    .from("profiles")
    .select("rol, nombre_completo")
    .eq("id", user.id)
    .single();

  if (perfil?.rol === "admin") redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <span className="text-sm font-semibold tracking-tight">
          EE Solutions <span className="text-white/40">· Tu proyecto</span>
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/50">
            {perfil?.nombre_completo}
          </span>
          <CerrarSesionBoton />
        </div>
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
