---
description: Cliente cerrado — genera ficha de pago, bienvenida y Agreement, cada uno como un único .pdf
argument-hint: [slug del cliente]
---

Se cerró la venta con **$ARGUMENTS**. Usa el agente `contratacion`.

Genera tres documentos en `02-Clientes/$ARGUMENTS/`, **cada uno como un único archivo `.pdf`** — sin dejar `.md` ni `.html` sueltos junto a él (dos archivos para lo mismo se ven como nodos duplicados en el grafo de Obsidian).

1. **Ficha de pago** → `06-Ficha-de-Pago.pdf`
2. **Bienvenida** → `07-Bienvenida.pdf`
3. **Agreement** → `08-Agreement.pdf`

Para cada uno: redacta el contenido directo en un `.html` temporal (desde `06-Plantillas/PLANTILLA-Ficha-de-Pago-Documento.html` / `PLANTILLA-Bienvenida-Infografia.html` / `PLANTILLA-Agreement-Documento.html` — usa `PLANTILLA-06-Ficha-de-Pago.md` / `PLANTILLA-07-Bienvenida.md` / `PLANTILLA-08-Agreement.md` solo como guía de qué secciones lleva cada uno, no las copies al cliente), genera el PDF, y borra el `.html`:

```
node ~/.claude/scripts/pdf-export/export.js "02-Clientes/$ARGUMENTS/06-Ficha-de-Pago.html" "02-Clientes/$ARGUMENTS/06-Ficha-de-Pago.pdf" && rm "02-Clientes/$ARGUMENTS/06-Ficha-de-Pago.html"
node ~/.claude/scripts/pdf-export/export.js "02-Clientes/$ARGUMENTS/07-Bienvenida.html" "02-Clientes/$ARGUMENTS/07-Bienvenida.pdf" && rm "02-Clientes/$ARGUMENTS/07-Bienvenida.html"
node ~/.claude/scripts/pdf-export/export.js "02-Clientes/$ARGUMENTS/08-Agreement.html" "02-Clientes/$ARGUMENTS/08-Agreement.pdf" && rm "02-Clientes/$ARGUMENTS/08-Agreement.html"
```

El logo va tal cual está en `01-Empresa/06-Identidad-de-Marca.md` (SVG canónico, dos "E" itálicas — blanca + degradado, sobre fondo negro) — no lo reconstruyas de memoria.

Al terminar, `02-Clientes/$ARGUMENTS/` debe tener exactamente `06-Ficha-de-Pago.pdf`, `07-Bienvenida.pdf`, `08-Agreement.pdf` — nada más de estos tres.

Si `02-Propuesta.md` no existe o no tiene precio/alcance, genera igual los tres PDF marcando cada monto o fecha que falte como `⟨PENDIENTE⟩` — no te detengas a esperar el precio.

Si `01-Diagnostico.md` está vacío, dilo también — sin diagnóstico la bienvenida sale genérica y pierde todo su efecto.

Si `node export.js` falla con `Failed to launch the browser process`, ver `00-Registro-de-Agentes.md` §Herramientas locales — generación de PDF (Chromium quedó a medio descargar, se reinstala con `npx puppeteer browsers install chrome`).

Termina con qué datos faltan (precio, fechas, material del cliente) y quién consigue cada uno.
