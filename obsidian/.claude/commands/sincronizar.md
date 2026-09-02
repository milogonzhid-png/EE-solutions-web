---
description: Sincroniza clientes/proyectos del vault hacia el dashboard (Supabase)
argument-hint: (sin argumentos)
---

Corre la sincronización vault → Supabase:

```
node ~/Documents/ee-solutions-secrets/scripts/supabase-sync/sync-clientes.js
```

Léelo parado en la raíz del vault (`obsidian/`), igual que los demás comandos.

Reporta en pantalla, en una línea por cliente, si se sincronizó o falló — el
script ya lo hace, tú solo repite el resumen final (cuántos ok, cuántos con
error) y, si algo falló, dile a la persona qué cliente y por qué antes de
seguir con cualquier otra cosa.

**Qué sincroniza hoy:** solo `clientes` (nombre, giro, paquete, fase, estado,
dominio, mantenimiento, fecha de inicio) — el frontmatter de `00-Ficha.md` de
cada carpeta en `02-Clientes/`. Pendientes y cobros no están conectados
todavía (ver nota en `sync-clientes.js`) — si el usuario pregunta por eso,
dile que falta y por qué, no lo intentes hacer a mano tú mismo.

Si el script falla con "No encuentro .../ee-solutions-secrets/.env", el
problema es de configuración de la máquina (falta la llave de Supabase ahí) —
no es algo que se arregle editando el vault.

## Cuándo correrlo
No hace falta acordarse manualmente: agrega este mismo comando (`node
~/Documents/ee-solutions-secrets/scripts/supabase-sync/sync-clientes.js`) al final de `/nuevo-cliente`,
`/contratacion` y `/convertir-prospecto` — cualquier flujo que cree o cambie
`00-Ficha.md` — para que el dashboard quede al día solo, sin que nadie tenga
que acordarse de correr `/sincronizar` aparte. Úsalo manual solo para
resincronizar todo de una vez (ej. después de editar varias fichas a mano).
