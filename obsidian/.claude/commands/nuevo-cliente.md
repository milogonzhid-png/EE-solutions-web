---
description: Crea la carpeta y los 6 archivos de un cliente nuevo desde las plantillas
argument-hint: [nombre del negocio]
---

Crea un proyecto de cliente nuevo para: **$ARGUMENTS**

1. Genera el slug en kebab-case sin acentos.
2. Crea `02-Clientes/<slug>/` y dentro `.raw/`.
3. Copia desde `06-Plantillas/` los seis archivos, renombrándolos sin el prefijo `PLANTILLA-`:
   `00-Ficha.md`, `01-Diagnostico.md`, `02-Propuesta.md`, `03-Copy.md`, `04-Desarrollo.md`, `05-Entrega.md`.
4. Rellena en `00-Ficha.md` únicamente lo que yo te haya dicho. Todo lo demás queda como `⟨PENDIENTE⟩`.
5. Registra el cliente en `00-Inbox/_estado.md` bajo "En curso".
6. Corre `node ~/Documents/ee-solutions-secrets/scripts/supabase-sync/sync-clientes.js` parado en la raíz del vault, para que el cliente nuevo aparezca en el dashboard. Si falla, dilo — no es razón para detener lo demás.
7. Termina listando en pantalla **solo** los datos que necesito conseguir para poder avanzar a la Fase 2.

No inventes ningún dato del negocio.
