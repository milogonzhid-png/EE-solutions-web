---
tipo: referencia
fecha: 2026-08-19
estado: vigente
tags: [desarrollo]
---

# Registro de agentes y herramientas de IA

Inventario de agentes, plugins y skills de Claude Code que EE Solutions tiene integrados, para saber qué hay disponible sin tener que redescubrirlo cada vez. Se actualiza cada vez que se instala, retira o cambia de versión algo.

## Instalados

| Nombre | Tipo | Qué hace | Fuente | Instalado | Estado |
|---|---|---|---|---|---|
| claude-seo-ai | Plugin (agentes + skills) | Auditoría SEO técnico + visibilidad en buscadores de IA (GEO/AEO): crawlability, schema.org, Core Web Vitals, E-E-A-T, social cards, etc. Genera reportes y propone/aplica fixes. | [github.com/Hainrixz/claude-seo-ai](https://github.com/Hainrixz/claude-seo-ai) | 2026-08-20 | Activo |
| emilkowalski/skills | 11 skills (global, no plugin) | Animación y diseño de UI: elegir curva/duración correcta (`animate`, `animate-expo`), vocabulario de animación, principios de diseño de Apple, elegir librería UI en vez de improvisar (`pick-ui-library`), auditar/revisar/mejorar animaciones existentes, prototipar variantes, guía de Sonner (toasts). Útil para `/pagina` y `04-Desarrollo.md` en proyectos de cliente. | [github.com/emilkowalski/skills](https://github.com/emilkowalski/skills) | 2026-08-19 | Activo — instalado global vía `npx skills@latest add`, symlink en `~/.claude/skills/` |
| ConardLi/garden-skills | 5 skills (local del vault, no plugin) | `web-design-engineer` (dueño [[diseno]]) dirección de diseño + 25 recetas de estilo · `gpt-image-2` (dueño [[diseno]], **usar con cautela** — ver fila de abajo) generación de imágenes · `kb-retriever` (dueño [[people]]) navega bases de conocimiento locales por capas · `beautiful-article` (dueño [[marketing]], reasignada de `contenido` el 2026-08-29) convierte URLs/PDFs/notas en artículos pulidos · `web-video-presentation` (dueño [[marketing]]) convierte guiones en presentaciones web 16:9. Ver tabla de Skills instaladas en [[09-Organigrama]]. Primer entregable real: el rediseño de `sitio-demo.html` del cliente demo usó el criterio de `web-design-engineer` de facto (aplicado manualmente antes de instalar esta skill) — pendiente probar la skill instalada en un proyecto real. | [github.com/ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | 2026-08-20 | Activo — instalado local del vault vía `npx skills@latest add ConardLi/garden-skills`, symlink en `.claude/skills/` (no global, a diferencia de emilkowalski/skills) |
| jezweb/claude-skills (plugin design-assets) | 5 skills (local del vault, del plugin `design-assets`; el repo trae 10 plugins/63 skills en total — solo se instaló este) | `ai-image-generator` (dueño [[diseno]]) generación de imágenes por API — Gemini/GPT Image 2, ver **bug conocido abajo: el tier gratuito de Gemini no funciona para esta cuenta**, así que hoy en la práctica requiere facturación habilitada · `color-palette` (dueño [[diseno]]) paletas accesibles desde un hex · `favicon-gen` (dueño [[diseno]]) paquete de favicon · `icon-set-generator` (dueño [[diseno]]) sets de íconos SVG por industria · `image-processing` (dueño [[diseno]]) redimensionar/convertir/optimizar imágenes. Ver tabla de Skills instaladas en [[09-Organigrama]]. | [github.com/jezweb/claude-skills](https://github.com/jezweb/claude-skills) | 2026-08-20 | Activo — instalado local del vault vía `npx skills@latest add jezweb/claude-skills -s ai-image-generator -s color-palette -s favicon-gen -s icon-set-generator -s image-processing -a claude-code --full-depth`, copiado (no symlink) en `.claude/skills/` |

## Cómo usarlo

- **Auditar un sitio (propio o de cliente):** `/claude-seo-ai:audit <url>` — solo lectura, nunca escribe archivos.
- **Aplicar los fixes automáticos de una auditoría:** `/claude-seo-ai:fix` — pide confirmación antes de cada cambio.
- Los reportes de auditoría se guardan en `05-Operacion/SEO/` (sitio propio) o en la carpeta del cliente correspondiente si es un proyecto de `02-Clientes/`.

## Automatización local

| Nombre | Qué hace | Cadencia | Dónde vive |
|---|---|---|---|
| `com.eesolutions.reporte-semanal` (launchd) | 1) Corre `/vigilancia` sobre todos los clientes activos (cada departamento revisa su parte y anota pendientes en `00-Ficha.md`). 2) `datos` recopila lo que aporta cada departamento y genera el reporte semanal en `05-Operacion/Reportes-Semanales/`. 3) `marketing` anexa el programa de contenido de la semana siguiente. 4) `gerencia` revisa el reporte consolidado y lo autoriza con un `## Visto de Gerencia — AAAA-MM-DD` (ver `01-Empresa/Departamentos/gerencia.md`) — si algo no cuadra entre departamentos, lo regresa antes de darlo por cerrado. | Domingos 8:00 am (hora local) | Script: `~/.claude/scripts/reporte-semanal-ee-solutions.sh` · Job: `~/Library/LaunchAgents/com.eesolutions.reporte-semanal.plist` · Logs: `~/.claude/logs/` |

Corre 100% local — no sube nada del vault a la nube (ver por qué en la nota de decisión del 2026-08-19 sobre automatización local vs. cloud).

**Correr manualmente:** `launchctl kickstart -k gui/$(id -u)/com.eesolutions.reporte-semanal`
**Desactivar:** `launchctl bootout gui/$(id -u)/com.eesolutions.reporte-semanal`

## Herramientas locales — generación de PDF

| Nombre | Qué hace | Dónde vive | Cómo se usa |
|---|---|---|---|
| `ee-solutions-pdf-export` | Convierte un HTML autocontenido (Ficha de Pago, Bienvenida/infografía, Agreement) a PDF listo para mandar al cliente. Usa Puppeteer (Chromium headless) con `emulateMediaType('print')`, así que respeta las reglas `@media print` del HTML. | `~/.claude/scripts/pdf-export/` (fuera del vault a propósito — Puppeteer descarga ~300MB de Chromium a `~/.cache/puppeteer/`, y el vault sincroniza a iCloud) | `node ~/.claude/scripts/pdf-export/export.js <entrada.html> <salida.pdf>` |
| `ee-solutions-pdf-export` (screenshot) | Mismo motor, genera un PNG en vez de un PDF, para revisar visualmente un documento **antes** de darlo por terminado. Detectó el bug del 2026-08-21 (ver abajo). | Mismo paquete, script hermano | `node ~/.claude/scripts/pdf-export/screenshot.js <entrada.html> <salida.png>` — leer el PNG con la herramienta de lectura de imágenes |

**Regla del flujo de contratación (ver `.claude/agents/contratacion.md`):** los tres documentos que se le entregan al cliente (Ficha de Pago, Bienvenida, Agreement) **terminan siendo un único archivo `.pdf` cada uno** en `02-Clientes/<slug>/` — sin `.md` ni `.html` sueltos junto a él. Se probó con `.md` + `.pdf` y con `.md` + `.html` + `.pdf`, y en ambos casos el mismo documento aparecía como nodos duplicados en el grafo de Obsidian — se simplificó a un solo archivo por documento.

1. El contenido se redacta **directo en un `.html` temporal** — la versión visual con marca de EE Solutions, desde `06-Plantillas/PLANTILLA-Ficha-de-Pago-Documento.html` / `PLANTILLA-Bienvenida-Infografia.html` / `PLANTILLA-Agreement-Documento.html`. Las plantillas `.md` (`PLANTILLA-06-Ficha-de-Pago.md` / `PLANTILLA-07-Bienvenida.md` / `PLANTILLA-08-Agreement.md`) siguen existiendo en `06-Plantillas/` solo como guía de qué secciones lleva cada uno — no se copian al cliente.
2. **Antes de convertir a PDF, verifica con `screenshot.js`** que el documento se ve bien (ver bug conocido abajo).
3. `.pdf` — generado del `.html` con el comando de arriba, después se borra el `.html`: `node export.js entrada.html salida.pdf && rm entrada.html`. **Este es el único archivo que queda en la carpeta del cliente y el que se le manda** — descargable, no requiere que abran nada en el navegador.
4. El logo de EE Solutions dentro del HTML es el SVG canónico de `01-Empresa/06-Identidad-de-Marca.md` — se copia tal cual, no se reconstruye de memoria (la primera versión usaba un ícono genérico que no correspondía al logo real).

**Bug conocido (2026-08-21) — texto invisible en la infografía de Bienvenida:** la plantilla es de tema oscuro (fondo `--ink`), pero traía una regla `@media print { body { background: paper; color: ink } }` que volteaba el fondo general a claro sin tocar el fondo oscuro de las tarjetas (`.card`, `.contact-card`) — el texto (heredando el color oscuro del `body`) quedaba oscuro sobre fondo oscuro, casi invisible. Se detectó con `screenshot.js`, no se hubiera visto solo leyendo el HTML. **Fix:** se quitó el volteo de color — la infografía se queda oscura también en el PDF (es la identidad de marca, no un documento que deba imprimirse en blanco) — y se agregó `-webkit-print-color-adjust: exact; print-color-adjust: exact;` a las 3 plantillas para que fondos y degradados impriman tal cual se ven en pantalla. Cualquier plantilla nueva con fondo oscuro debe llevar esa misma regla y **no** un override de `@media print` que cambie colores.

**Bug conocido (2026-08-21) — la infografía de Bienvenida se desbordaba a 2 páginas:** con los espaciados "de pantalla" (paddings y márgenes generosos pensados para verse bien en un navegador), el contenido no cabía en una hoja carta (11in de alto). **Fix:** se agregó un bloque `@media print` compacto en `PLANTILLA-Bienvenida-Infografia.html` — paddings, tipografía y espaciados reducidos que solo aplican al PDF, no a una vista en navegador. Con contenido de largo normal (3 hallazgos, párrafo de 3-4 líneas, 2 pendientes) queda en 1 página con margen de sobra. Verificar siempre con `file archivo.pdf` → debe decir `1 pages`; si el contenido de un cliente es inusualmente largo, se acorta el texto, no se afloja el CSS.

**Bug conocido (2026-08-21) — `screenshot.js` medía mal el alto y daba falsos "se desborda":** el script leía `document.documentElement.scrollHeight`, que en Chromium se infla hasta igualar el alto del *viewport* que uno mismo le pasa a `setViewport()` cuando el contenido real es más corto — no refleja el contenido, refleja el número que el propio script eligió. Así se reportó "1200px / 2 páginas" para una Ficha de Pago que en realidad medía 920px y sí cabía en 1 hoja. **Fix:** el script ahora mide `document.body.scrollHeight` (el contenido real), y además fija el ancho de captura en 739px — el ancho de impresión real de una hoja carta con los márgenes de `export.js` (8.5in − 0.8in = 7.7in), no un ancho de ventana arbitrario como 900px. Con un ancho más generoso el texto envuelve menos y todo parece caber cuando en el PDF real no cabe (así se nos fue una ficha a producción creyendo que estaba en 1 página). **La prueba definitiva siempre es `file archivo.pdf` sobre el PDF real, nunca solo la captura.**

**Bug conocido (2026-08-21) — tabla de la Ficha de Pago se desbordaba por texto envuelto en la primera columna:** al ancho de impresión real (739px), los nombres de característica ("Ficha de Google Business Profile", "Dominio, hospedaje y seguridad") hacían salto de línea porque la columna no tenía ancho fijo, añadiendo una línea extra por fila y desbordando la hoja. **Fix:** las tablas de desglose (`table.tabla-incluye` en `PLANTILLA-Ficha-de-Pago-Documento.html`) ahora usan `table-layout: fixed` con la primera columna a 34% de ancho fijo — el nombre de la característica ya no envuelve, la descripción sí (es lo esperado). No aplicar `table-layout: fixed` a las demás tablas del documento (Cómo se paga, Datos para transferencia) sin revisar, porque tienen distinto número de columnas.

**Bug conocido (2026-08-23) — `ai-image-generator` con Gemini no funciona en el tier gratuito de esta cuenta:** al generarle imágenes reales a AME Events (cliente de prueba, después reclasificado como demo y borrado — nunca ha habido un cliente real), tanto `gemini-3.1-flash-image` como `gemini-2.5-flash-image` devolvieron `429 RESOURCE_EXHAUSTED` con `limit: 0` en la cuota gratuita — no es que se haya agotado un límite de uso (~500/día como decía la skill), es que el proyecto de Google Cloud ligado a la `GEMINI_API_KEY` tiene cuota **cero** asignada para modelos de generación de imágenes. La skill y la documentación previa del vault asumían que era gratis; no lo es para esta cuenta tal como está configurada hoy. **Camino a futuro:** habilitar facturación en la consola de Google Cloud del proyecto (`aistudio.google.com` → el proyecto de la key → facturación) para desbloquear los modelos de imagen — el costo por imagen es bajo, pero requiere tarjeta. Hasta entonces, `ai-image-generator` no es viable y `diseno` sigue construyendo ilustración SVG propia (el caso que expuso esto era `04-Desarrollo.md` de AME Events, ya borrado junto con la carpeta) — sigue siendo preferible a foto de stock de cualquier forma.

Si `node ~/.claude/scripts/pdf-export/export.js` falla con `Failed to launch the browser process`, el Chromium de Puppeteer quedó a medio descargar — borrar `~/.cache/puppeteer` y correr `npx puppeteer browsers install chrome` desde `~/.claude/scripts/pdf-export/` para reinstalarlo limpio (esto ya pasó una vez, ver `00-Inbox/_estado.md`).

## Enrutamiento de departamentos (no son "herramientas", son la empresa)

Los 13 departamentos/agentes de EE Solutions (`ventas`, `marketing`, `diseno`, `ingenieria`, `gerencia`, etc.) **no se registran aquí** — viven en `.claude/agents/` y su organigrama completo está en `01-Empresa/09-Organigrama.md`. Esta tabla es solo para plugins, skills y automatizaciones externas que se le integran a la operación, no para el organigrama en sí.

## Por integrar / en evaluación

_(vacío por ahora — anotar aquí cualquier agente que se esté probando antes de darlo por "instalado")_

## Convención de esta tabla

- **Un renglón por agente/plugin**, no por cada skill individual que traiga — el detalle de qué skills incluye vive en su propia documentación (`~/.claude/plugins/...`), no se duplica aquí.
- **Estado:** `Activo` (en uso) · `Pausado` (instalado pero sin usar) · `Retirado` (desinstalado — mover el renglón a un bloque `## Retirados` con la fecha y el motivo, no borrar).
- Al integrar uno nuevo, agrega el renglón y enlaza el primer entregable real que produjo, no solo "se instaló".

Ver también: [[08-KPIs]] · [[people]] · [[09-Organigrama]] · resumen semanal en `05-Operacion/Reportes-Semanales/`.
