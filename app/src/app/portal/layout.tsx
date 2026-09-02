import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CerrarSesionBoton } from "@/components/CerrarSesionBoton";
import { Marca } from "@/components/Logo";

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
      <div className="rail-vivo h-0.5 w-full" />

      <header className="sticky top-0 z-50 border-b border-linea bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-3.5">
          <Marca sublinea="Tu proyecto" idDegradado="eeGradPortal" />
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted sm:block">
              {perfil?.nombre_completo}
            </span>
            <CerrarSesionBoton />
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-9">{children}</main>

      <footer className="border-t border-linea px-6 py-5">
        <p className="mono-label mx-auto w-full max-w-3xl text-[0.6rem]">
          ¿Dudas? Escríbenos por WhatsApp al 951 212 8121
        </p>
      </footer>
    </div>
  );
}
