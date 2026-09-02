import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CerrarSesionBoton } from "@/components/CerrarSesionBoton";
import { Marca } from "@/components/Logo";
import { NavPanel } from "@/components/NavPanel";

const ENLACES = [
  { href: "/dashboard", texto: "Resumen" },
  { href: "/dashboard/clientes", texto: "Clientes" },
  { href: "/dashboard/finanzas", texto: "Finanzas" },
  { href: "/dashboard/pendientes", texto: "Pendientes" },
];

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

  const iniciales = (perfil?.nombre_completo ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      {/* Hilo degradado de marca arriba de todo, como firma visual. */}
      <div className="rail-vivo h-0.5 w-full" />

      <header className="sticky top-0 z-50 border-b border-linea bg-ink/85 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5">
          <div className="flex flex-wrap items-center gap-8">
            <Marca sublinea="Dirección" idDegradado="eeGradPanel" />
            <NavPanel enlaces={ENLACES} />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2.5 sm:flex">
              <span
                className="grid h-8 w-8 place-items-center rounded-lg text-xs font-semibold text-ink"
                style={{
                  background:
                    "linear-gradient(135deg,#21C7EA,#8C55D2 60%,#FF2F86)",
                }}
              >
                {iniciales || "EE"}
              </span>
              <span className="text-xs text-muted">
                {perfil?.nombre_completo}
              </span>
            </div>
            <CerrarSesionBoton />
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-9">
        <div className="mx-auto w-full max-w-[1180px]">{children}</div>
      </main>

      <footer className="border-t border-linea px-6 py-5">
        <p className="mono-label mx-auto w-full max-w-[1180px] text-[0.6rem]">
          EE Solutions · Panel interno
        </p>
      </footer>
    </div>
  );
}
