import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CerrarSesionBoton } from "@/components/CerrarSesionBoton";

export default async function DashboardLayout({
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

  if (perfil?.rol !== "admin") redirect("/portal");

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold tracking-tight">
            EE Solutions <span className="text-white/40">· Dirección</span>
          </span>
          <nav className="flex gap-4 text-sm text-white/60">
            <Link href="/dashboard" className="hover:text-white">
              Resumen
            </Link>
            <Link href="/dashboard/clientes" className="hover:text-white">
              Clientes
            </Link>
            <Link href="/dashboard/finanzas" className="hover:text-white">
              Finanzas
            </Link>
            <Link href="/dashboard/pendientes" className="hover:text-white">
              Pendientes
            </Link>
          </nav>
        </div>
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
