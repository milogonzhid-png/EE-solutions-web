import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Se sirve bajo eesolutions.com.mx/app/* — el sitio estático (otro repo,
  // otro deploy de Netlify) hace un proxy de esa ruta hacia este proyecto,
  // para que visualmente sea un solo dominio y no "otra página".
  basePath: "/app",
};

export default nextConfig;
