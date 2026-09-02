---
tipo: pendientes
fecha: 2026-08-21
estado: activo
tags: [pendiente]
---

# Pendientes generales

**Fuente única de todo lo que falta resolver** — antes cada departamento tenía su propia lista (`Precios.md`, `Cobros.md`, `_estado.md`) y se repetían o se desactualizaban entre sí sin que nadie lo notara. Desde el 2026-08-21 todo vive aquí. Los archivos de cada área siguen existiendo para su contenido normal, pero ya no llevan su propia sección `## Pendientes` — enlazan a esta nota.

**Regla:** al cerrar un pendiente, no lo borres — táchalo `[x]` con la fecha y una línea de qué se decidió, igual que en `05-Operacion/Decisiones.md`. Perder el historial de qué se resolvió y cuándo es tan malo como no saber qué falta.

## Generales — empresa

- [x] **Datos bancarios para los recibos** — [[finanzas]] (Emilio confirma). El campo ya existe en la plantilla de Ficha de Pago (`06-Plantillas/PLANTILLA-Ficha-de-Pago-Documento.html`) y en `Cobros.md`; falta llenarlo la primera vez que se mande una ficha real. No es un dato único que se cargue aquí — se llena a mano en cada Ficha de Pago real, este renglón es solo el recordatorio de que sigue en blanco.
- [x] **Habilitar facturación en Google Cloud para `GEMINI_API_KEY`** — [[ingenieria]]. El tier gratuito tiene cuota **0** para generación de imágenes (no ~500/día como se pensaba) — ver bug 2026-08-23 en `00-Registro-de-Agentes.md`. Sin esto, `ai-image-generator` no sirve para nada; `diseno` sigue usando ilustración SVG.

## Por fase de cliente

**Esta sección sigue siendo la fuente única real.** Además, cada cliente activo lleva un espejo de sus propias filas en su `00-Ficha.md` (sección "Pendientes de este cliente") para poder ver el control por fase sin salir de su carpeta. **Regla de sincronía:** cualquier pendiente de cliente que se agregue, edite o resuelva aquí se agrega/edita/resuelve también en el espejo de esa ficha, en el mismo movimiento — nunca en un lugar nomás. Al resolver: tacha `[x]` en los dos lugares con la misma fecha, mueve la línea al "Resueltos recientes" de aquí abajo, y borra la línea del espejo en la ficha del cliente (el historial vive solo aquí, para no duplicarlo).

Sin pendientes vivos — `02-Clientes/` está vacío.

### Fase 1 — Diagnóstico
### Fase 2 — Propuesta
### Fase 3 — Contenido (Copy)
### Fase 4 — Diseño y desarrollo
### Fase 5 — Integraciones
### Fase 6 — Publicación y capacitación

## Resueltos recientes (referencia — no borrar, mueve aquí lo cerrado)

- [x] 2026-08-21 — Precio de lista de los 2 paquetes (Esencial $6,300+$350/mes, Completo $8,700+$550/mes) y modelo de costos completo — [[finanzas]]. Ver [[01-Paquetes-de-Servicio]] y [[00-Precios-y-Costos]].
- [x] 2026-08-21 — Desglose por componente: decidido que **no existe**, se cotiza por paquete completo. Ver [[Precios]].
- [x] 2026-08-21 — Costo de dominio: va incluido en el costo del paquete, no es renglón aparte.
- [x] 2026-08-21 — El Agreement es simbólico, no contrato legal — no necesita razón social/RFC ni revisión de abogado para usarse (esa revisión solo aplicaría a `PLANTILLA-Contrato-OPCIONAL.md`, la excepción).
- [x] 2026-08-21 — `GEMINI_API_KEY` configurada en `~/.zshrc` (esa parte sí quedó lista — lo que falla es la cuota gratuita de imágenes, ver pendiente vivo arriba).
- [x] 2026-08-20/21 — Costo de Typebot = $0 (plan gratuito) · dirección física sí se publica en la web · calendario de contenido orgánico · WhatsApp oficial confirmado `951 212 8121` · skills de generación de imágenes instaladas ([[diseno]]).
- [x] 2026-08-23 — **AME Events** (recinto para eventos, Mérida), cargado en `02-Clientes/ame-events/` hasta Fase 4. Ver `00-Indice-Clientes.md`. *Corrección 2026-08-29: el usuario aclaró que este también era un demo, no un cliente real pagando — nunca ha habido un cliente real. Carpeta borrada, ver `_estado.md` #41.*
- [x] 2026-08-24 — Corregido nombre del cliente de "ME Events" a **"AME Events"** en todo el vault (ficha, propuesta, copy, desarrollo, índice de clientes, cobros, folio EE-2026-001, sitio y los 3 PDF de cierre) — el nombre correcto lo confirma la propia ficha de Google Maps del negocio. Carpeta renombrada de `02-Clientes/me-events/` a `02-Clientes/ame-events/`. `.raw/google-maps-listing-20260823.md` no se tocó (regla de intocabilidad) — conserva la captura original tal como se pegó, con el nombre como se transcribió entonces.
- [x] 2026-08-24 — Confirmado con el usuario: el logo "La 34" encontrado en las fotos del recinto **no** es AME Events, es otro espacio del mismo predio. El nombre del cliente se queda como está, sin cambios.
- [x] 2026-08-24 — **Fotos y video reales de AME Events recibidos** (5 capturas del usuario) — guardadas en `.raw/fotos-videos-20260824/`, optimizadas en `assets/`, ya integradas al sitio (hero + galería). Sitio rediseñado con fotografía real a sangre completa, tomando como referencia estructural `haciendateya.com` (sin copiarlo). Ver [[04-Desarrollo]].
- [x] 2026-08-24 — Paleta del sitio de AME Events cambiada de añil/terracota a un sistema neutro grafito/bronce — el usuario reportó que la paleta anterior "está fea", pidió colores más neutros. Ver [[04-Desarrollo]].
- [x] 2026-08-24 — **Romelia Bakery** (brunch, Col. Altabrisa, Mérida), cargado en `02-Clientes/romelia-bakery/` hasta Fase 3 (Fase 4 abierta pero en espera). Ver `00-Indice-Clientes.md`. El usuario prometió mandar carpeta de menú y fotos reales antes de construir el sitio — no recibida todavía, `sitio-demo.html` no se construye hasta entonces. *Corrección 2026-08-29: también era un demo, no un cliente real — carpeta borrada, ver `_estado.md` #41.*
- [x] 2026-08-24 — Recibida la carpeta de menú y fotos reales de Romelia Bakery, y confirmado que el cliente eligió el paquete Completo. Se construyó `sitio-demo.html` (concepto editorial claro/panadería, distinto en paleta y estructura a AME Events) con menú real (~25 platillos con precio), 5 fotos reales integradas, y se generaron los 3 documentos de cierre con folio **EE-2026-002** ($8,700 + $550/mes). Ver `04-Desarrollo.md`.

Ver también: [[00-Inbox/_estado]] (bitácora de sesión, día a día) · [[05-Operacion/Decisiones]] (decisiones de negocio) · [[05-Operacion/Finanzas/Precios]] · [[05-Operacion/Finanzas/Cobros]] · [[09-Organigrama]]
