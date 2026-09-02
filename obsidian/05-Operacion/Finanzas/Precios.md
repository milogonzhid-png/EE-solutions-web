---
tipo: finanzas
fecha: 2026-08-21
estado: vigente
tags: [finanzas]
---

# Precios de lista

Fuente única de precios vigentes. `propuesta.md` y el agente `contratacion` leen este archivo para no inventar montos — mientras un renglón diga `⟨PENDIENTE⟩`, cualquier propuesta o ficha de pago que lo necesite debe marcarlo igual y detenerse a preguntar, nunca inferirlo.

**Modelo vigente desde el 2026-08-21: 2 paquetes** (Esencial/Completo) — ver [[01-Paquetes-de-Servicio]] para alcance completo de cada uno y [[00-Precios-y-Costos]] para el modelo de costos detrás de estos montos. Reemplaza el esquema de 3 paquetes archivado en `99-Archivo/paquetes-3-niveles-reemplazado-2026-08-21.md`.

## Paquetes (pago único de producción + suscripción mensual)

| Paquete | Setup (pago único) | Suscripción mensual | Vigente desde |
|---|---|---|---|
| Esencial | $6,300 MXN | $350 MXN/mes | 2026-08-21 |
| Completo | $8,700 MXN | $550 MXN/mes | 2026-08-21 |

## Desglose por componente — decidido: no existe, y no va a existir

Para la ficha de pago (`06-Ficha-de-Pago.md`), que muestra por qué cuesta lo que cuesta — ver `01-Empresa/01-Servicios-y-Paquetes.md` para la descripción de cada componente.

**No es un dato pendiente por cargar — es la forma en que se cotiza.** El modelo de costos da el precio total de cada paquete (Esencial/Completo), no un precio por pieza. La Ficha de Pago desglosa por **característica** (qué incluye cada componente, en texto) sin ponerle precio individual a cada una — ver `06-Plantillas/PLANTILLA-Ficha-de-Pago-Documento.html`. Nunca inventes ni repartas el total en montos por componente.

## Costos que afectan el margen

- **Typebot** — **$0 por cliente por ahora.** Se usa la versión gratuita de Typebot; no hay costo real que reste margen al mantenimiento mientras se opere en ese plan. Revisar este renglón si el volumen de clientes obliga a subir a un plan de pago (ver `Cobros.md`).
- **Dominio** — **ya incluido dentro del costo del paquete**, no es un renglón aparte que EE Solutions absorba o traslade por separado.
- Modelo de costos completo (tarifa/hora, tipo de cambio, capacidad instalada, horas por fase, márgenes por paquete): [[00-Precios-y-Costos]].

Pendientes de esta área: ver [[00-Pendientes-Generales]] — ya no se llevan aquí, para no duplicar.

Ver también: [[01-Paquetes-de-Servicio]] · [[00-Precios-y-Costos]] · [[01-Servicios-y-Paquetes]] · [[Cobros]] · [[finanzas]]
