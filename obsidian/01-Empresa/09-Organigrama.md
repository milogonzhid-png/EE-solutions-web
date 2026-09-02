---
tipo: contexto
fecha: 2026-08-20
estado: vigente
tags: [empresa, rrhh]
---

# Organigrama — departamentos de EE Solutions

> **Nota:** los agentes viven en `.claude/agents/`, una carpeta oculta que Obsidian no muestra (los archivos que empiezan con punto están ocultos por diseño del sistema, y Claude Code exige esa ruta exacta). Esta nota es el espejo legible. Para editar un agente, ábrelo desde la terminal: `open .claude/agents/<nombre>.md`

## Cómo está estructurado (revisado 2026-08-29)

EE Solutions opera como una empresa con **departamentos autónomos**. Cada uno tiene mandato propio, autoridad real dentro de su área, y fija sus propios estándares. Se coordinan entre ellos, no a través de los fundadores.

Desde 2026-08-29 hay tres niveles, no dos:

1. **Los 12 departamentos operativos** de la tabla de abajo — deciden y documentan dentro de su ámbito, sin pedir permiso.
2. **[[gerencia]]** — no produce entregables de cliente. Revisa el trabajo agregado entre departamentos (empieza por el reporte semanal de los domingos) con criterio de gerente/administración de empresa, y lo autoriza. No repite las decisiones que cada departamento ya tomó en su ámbito.
3. **El consejo** — [[00-Contexto-Empresarial|Emilio]] (comercial) y Eduardo (operativo), fundadores y directores, arriba de Gerencia y de todos los departamentos. Aprueban únicamente las cinco decisiones reservadas de abajo — ni el visto de Gerencia las autoriza.

Detalle completo del rol de Gerencia y por qué existe: `.claude/agents/_ESTATUTO.md` §"Los tres niveles".

## Las cinco decisiones reservadas al consejo

1. **Dinero comprometido con un cliente** — precio final, descuentos, reembolsos, cambios de alcance con costo.
2. **Publicar a producción** en el dominio de un cliente, o mandarle algo a un cliente.
3. **Documentos que se firman** o que crean obligación legal.
4. **Aceptar o rechazar un proyecto** y comprometer fechas de entrega.
5. **Exponer datos personales o credenciales** — todo lo que active la LFPDPPP.

Fuera de esas cinco, el departamento decide y documenta. Ningún agente pide autorización para hacer su trabajo — pero el trabajo agregado (ej. el reporte semanal) pasa por [[gerencia]] antes de darse por cerrado.

Escalar no es preguntar "¿qué hago?". Es presentar el problema, las opciones con su costo, una recomendación, y qué pasa si nadie decide.

## Los 12 departamentos + Gerencia

> Cada uno tiene su nota propia en `01-Empresa/Departamentos/` (con más detalle y sus propios enlaces) — la tabla de abajo es el resumen.

> **Fusiones 2026-08-29:** `contenido` se fusionó dentro de `marketing` (eran la misma función: dónde poner el esfuerzo y qué decir con él). `growth-seo` se fusionó dentro de `ingenieria` (el SEO técnico y de negocio se ejecutan junto con el código). Ya no existen como departamentos separados. Se agregó `gerencia` como capa nueva entre los departamentos y el consejo.

| Departamento | Agente | Clúster | Dueño de | Responde por |
|---|---|---|---|---|
| Comercial | [[ventas]] | 🔴 Comercial y Crecimiento | Embudo: prospecto → diagnóstico → propuesta → cierre | Nuevos clientes/mes, tasa de cierre, calidad del cliente cerrado |
| Marketing y Contenido | [[marketing]] | 🔴 Comercial y Crecimiento | Posicionamiento, canales, generación de demanda, competencia, copy de sitios/redes, calendario editorial, voz de marca, programa de contenido semanal | Prospectos por canal, costo en horas por prospecto, copy aprobado, consistencia de voz |
| Diseño | [[diseno]] | 🟠 Creativo | Sistema visual, jerarquía, UX, movimiento, generación de imágenes | Que un negocio local se vea serio y dinámico, no estático |
| Ingeniería y SEO Técnico | [[ingenieria]] | 🔵 Producto y Tecnología | Código, infraestructura, deploy, SEO técnico y local (NAP, Google Business, sitemap, Search Console) | Tiempo de carga, errores en producción, posiciones, reseñas, indexación |
| Producto Conversacional | [[producto-ia]] | 🔵 Producto y Tecnología | Flujos de Typebot, basados en el contexto real del cliente | Tasa de conversión del asistente |
| Finanzas | [[finanzas]] | 🟣 Gobernanza | Costeo, precios, margen, flujo, cobranza | Margen por proyecto, utilidad, cartera vencida |
| Legal y Cumplimiento | [[legal]] | 🟣 Gobernanza | Avisos de privacidad, LFPDPPP, riesgos | Que ningún sitio salga sin cumplir |
| Datos y Analítica | [[datos]] | 🟣 Gobernanza | KPIs, reportes (mensual y semanal), patrones | Que se decida con números, no con impresiones |
| Operaciones (PMO) | [[operaciones]] | 🟡 Operación y Personas | Fases, capacidad, calidad, control de alcance | Entregas a tiempo, horas facturables vs. disponibles |
| Contratación | [[contratacion]] | 🟡 Operación y Personas | Ficha de pago y bienvenida al cerrar | Que el cliente arranque el mismo día |
| Customer Success | [[soporte]] | 🟡 Operación y Personas | Clientes entregados, retención | **MRR y churn** |
| Personas | [[people]] | 🟡 Operación y Personas | Procesos internos, quién decide qué | Que el conocimiento no viva en una sola cabeza |
| **Gerencia** | [[gerencia]] | ⚪ Gerencia (nivel propio) | Revisión y autorización del trabajo agregado entre departamentos | Que ningún reporte semanal salga sin contradicciones señaladas |

## Cobertura de los [[01-Servicios-y-Paquetes|seis servicios]]

| Servicio que vendemos | Departamento dueño |
|---|---|
| Página web profesional | [[diseno]] + [[ingenieria]] |
| SEO y presencia en Google | [[ingenieria]] |
| Asistente de chat con IA 24/7 | [[producto-ia]] |
| Botones de conversión | [[ingenieria]] (implementa) + [[diseno]] (jerarquía) |
| Dominio, hospedaje y seguridad | [[ingenieria]] |
| Soporte y mantenimiento | [[soporte]] |

## Tensiones diseñadas a propósito

No son fallas del organigrama, son su función. Cuando dos departamentos se contradicen, **la contradicción se hace explícita y sube a [[gerencia]]** (o al consejo si toca una de las cinco decisiones reservadas) — no se promedia ni se suaviza.

| Tensión | Por qué existe |
|---|---|
| [[ventas]] ↔ [[operaciones]] | Uno quiere cerrar, el otro protege que se pueda entregar |
| [[finanzas]] ↔ todos | Puede declarar que un proyecto pierde dinero aunque ya se vendió |
| [[datos]] ↔ todos | Cada área tiene incentivo de contar bien su historia; `datos` no |
| [[legal]] ↔ [[ingenieria]] | Puede bloquear una publicación que recabe datos sin aviso |
| [[ingenieria]] ↔ [[producto-ia]] | Dice que la ficha de Google trae más clientes que el sitio que vendemos (tensión heredada de `growth-seo`) |

## Quién puede detener qué

| Departamento | Puede bloquear |
|---|---|
| [[operaciones]] | Una entrega que no pase el checklist de calidad |
| [[ingenieria]] | Un deploy que no pase su checklist técnico o de SEO, o una publicación con NAP inconsistente |
| [[legal]] | Una publicación que recabe datos sin aviso de privacidad |
| [[diseno]] | Diseñar sobre texto de relleno, o usar foto de stock |
| [[marketing]] | Publicar un post sin el dato que lo haría bueno |
| [[ventas]] | Descalificar un prospecto que no nos conviene |
| [[gerencia]] | Autorizar un reporte semanal o entregable agregado que no cuadre entre departamentos |

## Cómo invocarlos

Desde la terminal, en la carpeta del vault:

```
claude
```

- **Un departamento:** "usa el agente `finanzas` para costear el proyecto de X"
- **Varios en paralelo:** pídelos en un mismo mensaje — "lanza `diseno` y `marketing` sobre el cliente X"
- **Junta por fase:** `/junta <slug-del-cliente>` convoca a los que tocan según la fase y señala las contradicciones

## Comandos disponibles

| Comando | Qué hace |
|---|---|
| `/nuevo-cliente <negocio>` | Crea la carpeta y archivos del cliente |
| `/pagina <slug>` | Propuesta de página web (formato de 10 puntos) |
| `/propuesta <slug>` | Propuesta comercial con paquete y cronograma |
| `/contratacion <slug>` | Ficha de pago + bienvenida + Agreement, cada uno como un único .pdf descargable |
| `/junta <slug>` | Varios departamentos en paralelo según la fase |
| `/prospecto <negocio>` | Registra prospecto + primer mensaje |
| `/convertir-prospecto <slug>` | Prospecto cerrado → cliente: migra datos, borra el prospecto y genera ficha de pago + bienvenida + Agreement (cada uno un único .pdf) |
| `/auditar` | Revisa inconsistencias y pendientes del vault |
| `/cierre` | Actualiza `_estado.md` y cierra sesión |

## Skills instaladas

| Skill | Para qué | Dueño | Instalación |
|---|---|---|---|
| `emil-design-eng` | Movimiento y pulido de componentes | [[diseno]] | `npx skills@latest add emilkowalski/skills` (global) |
| `web-design-engineer` | Dirección de diseño para artefactos web: asesor de dirección + 25 recetas de estilo de referencia (Linear, Aesop, Stripe Press, etc.), guía para layouts responsive | [[diseno]] | `npx skills@latest add ConardLi/garden-skills` (local del vault) |
| `gpt-image-2` | Generación de imágenes con prompts estructurados (79 plantillas, 18 categorías) | [[diseno]] | ídem — hoy en segundo plano frente a `ai-image-generator` (ver abajo), que cubre el mismo caso con una opción gratuita |
| `kb-retriever` | Navega bases de conocimiento locales (Markdown/PDF/Excel) por capas sin llenar el contexto | [[people]] | ídem |
| `beautiful-article` | Convierte URLs/PDFs/notas en artículos pulidos, 10 tipos y 11 temas de autoría | [[marketing]] (reasignada de `contenido`, fusionado 2026-08-29) | ídem |
| `web-video-presentation` | Convierte guiones/artículos en presentaciones web 16:9 (23 temas, 1920×1080 fijo, lista para grabar pantalla) | [[marketing]] | ídem |
| `ai-image-generator` | Generación de imágenes por API — Gemini (**gratis**, ~500/día) para fotos/escenas, GPT Image 2 (pago, $0.006-$0.211/img) cuando hace falta texto legible en la imagen o variaciones en lote | [[diseno]] | `npx skills@latest add jezweb/claude-skills -s ai-image-generator -a claude-code` (local del vault) — **aprobada por el usuario 2026-08-20** como reemplazo del camino manual, tras vetar higgsfield. Requiere `GEMINI_API_KEY` con facturación habilitada (el tier gratuito tiene cuota 0 para imágenes, ver `00-Registro-de-Agentes.md` bug 2026-08-23) |
| `color-palette` | Genera paletas de color accesibles (WCAG) a partir de un hex | [[diseno]] | ídem |
| `favicon-gen` | Genera el paquete de favicon (SVG/PNG/manifest) de un sitio de cliente | [[diseno]] | ídem |
| `icon-set-generator` | Genera sets de íconos SVG consistentes por industria/estilo | [[diseno]] | ídem |
| `image-processing` | Redimensiona, convierte y optimiza imágenes (WebP, recorte, compresión) | [[diseno]] | ídem |

Otras skills instalables del paquete `emilkowalski/skills` (`npx skills@latest add emilkowalski/skills`), sin agente dueño asignado todavía: `animate`, `animate-expo`, `animation-vocabulary`, `apple-design`, `ask-sonner`, `find-animation-opportunities`, `improve-animations`, `pick-ui-library`, `prototype`, `review-animations`. Detalle en [[00-Registro-de-Agentes]].

## Modelo anterior

Antes del 2026-08-20, la empresa operaba con 6 funciones (no departamentos autónomos ni agentes reales). Ese modelo quedó archivado sin editar en `99-Archivo/modelo-6-funciones-reemplazado-2026-08-20.md` — no se actualiza, es solo referencia histórica.

El modelo de 14 departamentos sin Gerencia (2026-08-20 a 2026-08-29) no se archivó como documento aparte — el cambio queda registrado en `00-Inbox/_estado.md` y en las notas de fusión de `marketing.md` e `ingenieria.md`.

Ver también: [[04-Proceso-6-Fases]] · [[08-KPIs]] · [[00-Registro-de-Agentes]] · `.claude/agents/_ESTATUTO.md`
