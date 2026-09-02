# EE Solutions — Sitio web corporativo

Sitio web estático de **EE Solutions**, agencia de servicios digitales en Mérida, Yucatán, dedicada a crear páginas web, SEO local y chatbots con IA para negocios locales y prestadores de servicio.

Sitio en producción: **[eesolutions.com.mx](https://eesolutions.com.mx)**

## Contenido del repositorio

| Archivo / carpeta | Descripción |
|---|---|
| `index.html` | Landing page principal (hero, servicios, proceso, equipo, FAQ, CTA de contacto). |
| `privacidad.html` | Aviso de privacidad. |
| `sitemap.xml` | Mapa del sitio para Google Search Console. |
| `netlify.toml` | Configuración de Netlify (redirect 301 del dominio temporal de Netlify al dominio propio). |
| `foto-edu.jpeg`, `foto-emilio.jpeg` | Fotografías de los fundadores usadas en la sección de equipo. |
| `obsidian/` | Vault interno (Obsidian) con la documentación operativa de la empresa: contexto empresarial, stack tecnológico, plantillas de propuesta/contrato, proceso comercial, prospectos y clientes. **No es parte del sitio publicado.** |
| `app/` | Dashboard interno + portal de clientes (Next.js + Supabase). Se despliega como un sitio de Netlify aparte y se sirve en `eesolutions.com.mx/app` vía proxy — ver `app/README.md`. **Tampoco es parte del sitio estático**, aunque comparta repo y dominio. |

El sitio de marketing (todo lo de la tabla salvo `obsidian/` y `app/`) es 100% estático: HTML, CSS y JavaScript en un solo archivo (`index.html`), sin build step ni dependencias de npm.

## Stack técnico

- **Hospedaje / despliegue:** [Netlify](https://netlify.com), con publicación automática en cada push a `main`.
- **Dominio:** gestionado en Hostinger, apuntando por DNS al proyecto de Netlify.
- **Chatbot:** [Typebot](https://typebot.io) embebido vía script (burbuja de chat con IA, 24/7).
- **Control de versiones:** GitHub (este repositorio).
- **SEO:** metadatos Open Graph, `sitemap.xml` enviado a Google Search Console, y ficha de Google Business Profile.

## Desarrollo local

No requiere instalación. Para previsualizar cambios localmente:

```bash
git clone https://github.com/milogonzhid-png/EE-solutions-web.git
cd EE-solutions-web
# Abrir index.html directamente en el navegador, o servirlo con cualquier servidor estático:
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Despliegue

El flujo estándar es:

1. Editar `index.html` (o los archivos correspondientes) y hacer commit a `main`.
2. Netlify detecta el push y publica el build automáticamente (no hay paso de compilación, sirve los archivos tal cual).
3. El dominio propio (`eesolutions.com.mx`) apunta por DNS al sitio de Netlify con HTTPS activo.

> **Nota:** actualmente hay una discrepancia entre el dominio canónico declarado en `index.html` (`ee-solutions.mx`) y el dominio real de producción (`eesolutions.com.mx`) usado en `sitemap.xml`, `netlify.toml` y el contacto de la empresa — pendiente de unificar.

## Dashboard y portal de clientes

Vive en `app/` (Next.js + Supabase, con Row Level Security separando lo que ve un admin de lo que ve un cliente) — detalles en `app/README.md`. Se sirve en `eesolutions.com.mx/app` mediante la regla de proxy de este `netlify.toml`, aunque es un sitio de Netlify distinto del sitio estático (base directory `app` dentro de este mismo repo). Pendiente: sincronización automática vault de Obsidian → Supabase.

## Contacto

- **Correo:** eesolutions.data@gmail.com
- **WhatsApp / Teléfono:** 951 212 8121
- **Ubicación:** Mérida, Yucatán, México

---
© EE Solutions. Páginas web, chatbots y SEO básico.
