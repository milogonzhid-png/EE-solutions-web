# EE Solutions — App (dashboard + portal de clientes)

Dashboard interno de EE Solutions: un panel de administración para Emilio y Eduardo (proyectos/clientes, finanzas, pendientes) y un portal donde cada cliente ve solo su propio proyecto.

Vive como subcarpeta dentro de este mismo repo (`EE-solutions-web`), junto al sitio estático (`index.html`, raíz del repo) y al vault de Obsidian (`obsidian/`) — todo el código de la agencia en un solo lugar. Aun así se **despliega aparte, en Cloudflare Workers**, mientras que el sitio estático sigue en Netlify: son runtimes distintos — este es Next.js con build y backend, el sitio raíz es HTML estático sin build. Están separados también por costo: cada build de Next.js consume créditos del plan gratuito de Netlify y el sitio estático casi no consume, así que teniéndolos en proveedores distintos ninguno se queda sin presupuesto. Lo que los une de cara al visitante es la regla de proxy en el `netlify.toml` de la raíz del repo (`/app/*` → este worker), para que nunca se note que son dos deploys.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS 4).
- **Supabase** — Postgres + Auth (magic link) + Row Level Security. Un solo rol admin ve todo; un rol cliente solo ve su propio registro (impuesto por RLS, no por lógica de la app).
- **Cloudflare Workers** — deploy, con `@opennextjs/cloudflare`.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # ya trae la URL y la anon key del proyecto de Supabase
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

- `src/app/dashboard/` — panel de administración (protegido: solo `rol = admin`).
- `src/app/portal/` — portal de cliente (protegido: solo `rol = cliente`, y filtrado a su propio `cliente_id` vía RLS).
- `src/app/login/`, `src/app/auth/callback/` — autenticación por enlace mágico (sin contraseñas; las cuentas se invitan desde Supabase Auth).
- `src/lib/supabase/` — clientes de Supabase para browser, server components y middleware.
- `middleware.ts` — refresca la sesión y redirige según rol en cada petición.

## Roles y acceso

No hay registro público. Las cuentas se crean invitando el correo desde el dashboard de Supabase Auth del proyecto (`gschzabkoftrsccrcjgd`), y se les asigna rol y `cliente_id` (si aplica) en la tabla `profiles`.

## Origen de los datos

El esquema replica la estructura del vault de Obsidian (`obsidian/02-Clientes/<slug>/00-Ficha.md`, `00-Pendientes-Generales.md`, `Cobros.md`) más las tablas nuevas (`gastos`, `reportes_semanales`) que no existían antes en el vault. La sincronización vault → Supabase es la siguiente pieza pendiente (ver Roadmap en `EE-solutions-web/README.md`).

## Deploy

Worker de Cloudflare (`ee-solutions-app`), con **root directory = `app`** dentro de este repo.

```bash
npm run cf:build     # compila con el adaptador de OpenNext
npm run cf:deploy    # compila y publica el worker
```

Variables de entorno que necesita el build: `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (ver `.env.example`). El adaptador requiere las banderas `nodejs_compat` y `global_fetch_strictly_public`, ya declaradas en `wrangler.jsonc`.

Se ve en **`eesolutions.com.mx/app`** — nunca en el dominio del worker — gracias a la regla de proxy en el `netlify.toml` de la raíz del repo. `basePath: "/app"` en `next.config.ts` es lo que hace que todas las rutas de esta app (`/app/login`, `/app/dashboard`, etc.) coincidan con esa ruta.
