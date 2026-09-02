import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Se sirve bajo eesolutions.com.mx/app/* — el sitio estático de la agencia
  // hace un proxy de esa ruta hacia este worker, para que visualmente sea un
  // solo dominio y no "otra página". El prefijo /app se conserva aunque el
  // panel ya viva en Cloudflare, porque es lo que espera ese proxy.
  basePath: "/app",
};

export default nextConfig;
