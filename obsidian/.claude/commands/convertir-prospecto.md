---
description: Prospecto cerrado — lo convierte en cliente migrando sus datos y genera sus documentos de bienvenida (cada uno como un único .pdf)
argument-hint: [slug del prospecto]
---

Se cerró el trato con el prospecto **$ARGUMENTS**. Conviértelo en cliente.

## Parte 1 — Migrar (siempre)

1. Verifica que exista `03-Prospectos/$ARGUMENTS.md`. Si no existe, detente y dímelo — no adivines el slug.
2. Crea `02-Clientes/$ARGUMENTS/` y dentro `.raw/`.
3. Copia desde `06-Plantillas/` los siete archivos, renombrándolos sin el prefijo `PLANTILLA-`:
   `00-Ficha.md`, `01-Diagnostico.md`, `02-Propuesta.md`, `03-Copy.md`, `04-Desarrollo.md`, `05-Entrega.md`, `06-Soporte.md`.
4. Rellena `00-Ficha.md` migrando lo que ya estaba en el prospecto — negocio, giro, contacto, WhatsApp, ubicación, perfil — sin volver a preguntarlo. `fase: 1`, `estado: activo`.
5. Vuelca "Observación concreta" y "Bitácora" del prospecto dentro de `01-Diagnostico.md`, bajo un encabezado `## Traído del prospecto`, como punto de partida del diagnóstico — no como diagnóstico ya hecho.
6. Todo lo que el prospecto no tenía queda `⟨PENDIENTE⟩` en la ficha del cliente. No inventes ningún dato del negocio.
7. Borra `03-Prospectos/$ARGUMENTS.md` — su información ya vive en `02-Clientes/$ARGUMENTS/`, no se duplica.

## Parte 2 — Documentos de bienvenida (siempre, usa el agente `contratacion`)

Genera en `02-Clientes/$ARGUMENTS/` los mismos tres documentos que genera `/contratacion`, **cada uno como un único archivo `.pdf`** — sin `.md` ni `.html` sueltos junto a él (se ven como nodos duplicados en el grafo de Obsidian).

8. **Ficha de pago** → `06-Ficha-de-Pago.pdf` — redactada directo en un `.html` temporal desde `PLANTILLA-Ficha-de-Pago-Documento.html` (usa `PLANTILLA-06-Ficha-de-Pago.md` solo como guía de secciones) — desglose completo del costo.
9. **Bienvenida** → `07-Bienvenida.pdf` — redactada directo en un `.html` temporal desde `PLANTILLA-Bienvenida-Infografia.html` (logo y paleta de EE Solutions, usa `PLANTILLA-07-Bienvenida.md` solo como guía) — con lo que trajo el prospecto y `01-Diagnostico.md`.
10. **Agreement** → `08-Agreement.pdf` — redactado directo en un `.html` temporal desde `PLANTILLA-Agreement-Documento.html` (usa `PLANTILLA-08-Agreement.md` solo como guía de cláusulas) — alcance, precio y plazo.

El logo va tal cual está en `01-Empresa/06-Identidad-de-Marca.md` (SVG canónico) — no lo reconstruyas de memoria. Para cada uno, genera el PDF y borra el `.html`:

```
node ~/.claude/scripts/pdf-export/export.js "02-Clientes/$ARGUMENTS/<archivo>.html" "02-Clientes/$ARGUMENTS/<archivo>.pdf" && rm "02-Clientes/$ARGUMENTS/<archivo>.html"
```

Al terminar, `02-Clientes/$ARGUMENTS/` debe tener exactamente `06-Ficha-de-Pago.pdf`, `07-Bienvenida.pdf`, `08-Agreement.pdf` — nada más de estos tres.

**Si `02-Propuesta.md` todavía no tiene precio ni alcance definidos** (lo normal justo al convertir un prospecto, antes de la Fase 2), genera igual los tres documentos marcando cada monto y fecha como `⟨PENDIENTE⟩` — no te detengas a esperarlo. Cuando la propuesta se cierre después, vuelve a correr `/contratacion $ARGUMENTS` para actualizarlos con los montos reales.

## Cierre

12. Registra en `00-Inbox/_estado.md` bajo "En curso": qué prospecto se convirtió, en qué fecha, y si los documentos de bienvenida quedaron completos o con pendientes.
13. Corre `node ~/Documents/ee-solutions-secrets/scripts/supabase-sync/sync-clientes.js` parado en la raíz del vault, para que el cliente nuevo aparezca en el dashboard. Si falla, dilo — no es razón para detener lo demás.

Termina listando en pantalla **solo** los datos que faltan (para Fase 2 y para completar los documentos de bienvenida) y quién los consigue.
