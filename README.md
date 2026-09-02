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

Es un sitio 100% estático: HTML, CSS y JavaScript en un solo archivo (`index.html`), sin build step ni dependencias de npm.

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

## Roadmap: app con dashboards

Este repositorio contiene únicamente el sitio de marketing (landing page). Si el plan es construir una **app más personalizada con dashboards profesionales** (por ejemplo, panel de clientes, seguimiento de leads, reportes), lo recomendable es:

- Decidir si vivirá en este mismo repo (como subcarpeta o subdominio, p. ej. `app.eesolutions.com.mx`) o en un repositorio aparte, dado que el sitio actual es estático y sin framework.
- Elegir stack (React/Next.js, Vite, etc.) y una fuente de datos (HubSpot, Google Sheets, o una base de datos propia) ya que hoy no existe backend ni base de datos en este proyecto.
- Definir autenticación si el dashboard será privado para clientes o uso interno del equipo.

## Contacto

- **Correo:** eesolutions.data@gmail.com
- **WhatsApp / Teléfono:** 951 212 8121
- **Ubicación:** Mérida, Yucatán, México

---
© EE Solutions. Páginas web, chatbots y SEO básico.
