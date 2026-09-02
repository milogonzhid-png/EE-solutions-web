# Agentes de EE Solutions — copia legible

Esta carpeta es una **copia de lectura** de los 13 departamentos autónomos que operan EE Solutions, pensada para que se puedan hojear desde Finder o GitHub sin entrar a una carpeta oculta.

## ⚠️ Esta no es la fuente funcional

La fuente que realmente carga Claude Code cuando trabajan en el vault es:

```
obsidian/.claude/agents/
```

Tiene que quedarse ahí — no en esta carpeta — porque Claude Code busca `.claude/agents/` relativo a la carpeta donde se corre el comando `claude`, y ustedes lo corren parados dentro de `obsidian/` (así lo indica `CLAUDE.md` y `01-Empresa/09-Organigrama.md`). Además, cada agente lee documentos del vault con rutas relativas a esa carpeta (ej. `01-Empresa/00-Contexto-Empresarial.md`) — si esta copia fuera la que se usa, esas rutas no encontrarían nada.

**Si editas un agente, edita el original en `obsidian/.claude/agents/` y vuelve a copiar aquí** — de lo contrario esta copia queda desactualizada. (Cuando construyamos la app/dashboard, la idea es que ambas fuentes se reemplacen por una sola tabla en la base de datos — por ahora son dos copias que hay que mantener sincronizadas a mano.)

## Qué hay aquí

- `_ESTATUTO.md` — el contrato que heredan los 13 agentes: los tres niveles (departamentos → gerencia → consejo), las cinco decisiones reservadas, y cómo escala cada uno.
- Un archivo por departamento (`ventas.md`, `marketing.md`, `diseno.md`, `ingenieria.md`, `producto-ia.md`, `finanzas.md`, `legal.md`, `datos.md`, `operaciones.md`, `contratacion.md`, `soporte.md`, `people.md`, `gerencia.md`) — mandato completo, checklist de skills, protocolos de trabajo.

La versión "espejo legible" resumida (sin el detalle operativo completo, pensada para el grafo de Obsidian) sigue viviendo en `obsidian/01-Empresa/Departamentos/` — es una tercera copia con otro propósito, no la confundas con esta.

## Skills que usan estos agentes

No se vendorizan aquí (serían decenas de MB de código de terceros). El inventario de qué skill usa cada departamento y de dónde se instala está en:

- `obsidian/skills-lock.json` — hash de verificación de cada skill instalada.
- `obsidian/01-Empresa/09-Organigrama.md` §"Skills instaladas" — tabla skill → departamento dueño → comando de instalación.
- `obsidian/07-Recursos/Agentes-y-Herramientas/00-Registro-de-Agentes.md` — registro completo de agentes/plugins/automatizaciones.

Para reinstalar todo en una máquina nueva: `npx skills@latest add <fuente>` por cada fila de `09-Organigrama.md`, o `npx skills@latest add jezweb/claude-skills -s ai-image-generator -s color-palette -s favicon-gen -s icon-set-generator -s image-processing -a claude-code --full-depth` para el paquete de diseño.

## Comandos

Los 10 comandos de barra (`/nuevo-cliente`, `/pagina`, `/propuesta`, `/contratacion`, `/junta`, `/prospecto`, `/convertir-prospecto`, `/auditar`, `/cierre`, `/vigilancia`) siguen solo en `obsidian/.claude/commands/` (funcionales) — no se duplicaron aquí porque son comandos, no documentación de referencia.
