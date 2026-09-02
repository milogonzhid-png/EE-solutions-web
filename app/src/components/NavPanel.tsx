"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navegación del panel con estado activo. Es cliente porque necesita
 * `usePathname`; el resto del layout sigue siendo servidor.
 */
export function NavPanel({
  enlaces,
}: {
  enlaces: { href: string; texto: string }[];
}) {
  const ruta = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-1">
      {enlaces.map(({ href, texto }) => {
        // "/dashboard" solo se marca activo en su ruta exacta; las demás
        // aceptan subrutas (p. ej. /dashboard/clientes/[slug]).
        const activo =
          href === "/dashboard" ? ruta === href : ruta.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
              activo ? "text-white" : "text-muted hover:text-white"
            }`}
          >
            {texto}
            {activo && (
              <span className="rail absolute inset-x-3 -bottom-px h-0.5 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
