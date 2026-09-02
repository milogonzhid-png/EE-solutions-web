# Agentes de EE Solutions — fuente funcional

Estos son los archivos reales que Claude Code carga como agentes (departamentos autónomos) cuando se abre esta carpeta del vault (`obsidian/`) como directorio de trabajo. Antes solo existían en la Mac local; se respaldan aquí para que:

**Para hojear los agentes sin entrar a una carpeta oculta:** hay una copia de lectura en `/Agentes-EE-Solutions/` (raíz del repo). Si editas algo, edita el original aquí y vuelve a copiarlo allá — esta carpeta es la que de verdad usa Claude Code.

- No dependan de una sola máquina — si se pierde el equipo local, no se pierde la definición de cómo opera cada departamento.
- El futuro dashboard/app de EE Solutions pueda leer esta misma fuente (nombre, mandato, KPI) en vez de mantenerla por separado.

## Qué hay aquí

- `_ESTATUTO.md` — el contrato que heredan los 13 agentes: los tres niveles (departamentos → gerencia → consejo), las cinco decisiones reservadas, y cómo escala cada uno. Es la fuente citada por `01-Empresa/09-Organigrama.md` y `CLAUDE.md`.
- Un archivo por departamento (`ventas.md`, `marketing.md`, `diseno.md`, `ingenieria.md`, `producto-ia.md`, `finanzas.md`, `legal.md`, `datos.md`, `operaciones.md`, `contratacion.md`, `soporte.md`, `people.md`, `gerencia.md`) — mandato completo, checklist de skills, protocolos de trabajo.

La versión "espejo legible" (resumen sin el detalle operativo completo) sigue viviendo en `01-Empresa/Departamentos/` para que aparezca en el grafo de Obsidian — este archivo es la fuente real que ambos citan.

## Skills que usan estos agentes

Los agentes no traen las skills vendorizadas aquí (serían decenas de MB de código de terceros). El inventario de qué skill usa cada departamento y de dónde se instala está en:

- `obsidian/skills-lock.json` — hash de verificación de cada skill instalada.
- `01-Empresa/09-Organigrama.md` §"Skills instaladas" — tabla skill → departamento dueño → comando de instalación.
- `07-Recursos/Agentes-y-Herramientas/00-Registro-de-Agentes.md` — registro completo de agentes/plugins/automatizaciones.

Para reinstalar todo en una máquina nueva: `npx skills@latest add <fuente>` por cada fila de `09-Organigrama.md`, o `npx skills@latest add jezweb/claude-skills -s ai-image-generator -s color-palette -s favicon-gen -s icon-set-generator -s image-processing -a claude-code --full-depth` para el paquete de diseño.

## Comandos

`obsidian/.claude/commands/` — los 10 comandos de barra (`/nuevo-cliente`, `/pagina`, `/propuesta`, `/contratacion`, `/junta`, `/prospecto`, `/convertir-prospecto`, `/auditar`, `/cierre`, `/vigilancia`) documentados en `01-Empresa/09-Organigrama.md` §"Comandos disponibles".
