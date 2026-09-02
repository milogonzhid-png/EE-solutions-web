import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Adaptador para correr este Next.js en Cloudflare Workers.
 * El panel vive aquí (y no en Netlify) porque cada build de Next.js consume
 * créditos del plan gratuito de Netlify, y el sitio estático de la agencia
 * casi no consume: separándolos, ninguno de los dos se queda sin presupuesto.
 */
export default defineCloudflareConfig();
