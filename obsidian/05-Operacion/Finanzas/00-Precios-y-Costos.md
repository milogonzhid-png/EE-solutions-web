---
tipo: finanzas
fecha: 2026-08-21
estado: parcial
tags: [finanzas, validar]
---

# Precios y costos — modelo

Insumos cerrados del modelo de costos que sustentan los precios de [[01-Paquetes-de-Servicio]]: insumos, horas por fase, y el cálculo que llega al precio de lista.

## Insumos cerrados (2026-08-21)

| Insumo | Valor |
|---|---|
| Tipo de cambio (TC) de referencia | $17.45 MXN/USD |
| Clientes activos considerados | 0 |
| Tarifa objetivo | $300 MXN/hora |
| Costo de Typebot | $0 — plan gratuito (ver [[Precios]] §Costos que afectan el margen) |
| Margen objetivo — setup | 35% |
| Margen objetivo — suscripción mensual | 15% |

## Resultado — precios de lista

| Paquete | Setup | Suscripción mensual |
|---|---|---|
| Esencial | $6,300 MXN | $350 MXN/mes |
| Completo | $8,700 MXN | $550 MXN/mes |

Detalle de alcance de cada paquete: [[01-Paquetes-de-Servicio]].

## Horas de trabajo por fase (cerrado 2026-08-21)

| Fase | Esencial | Completo |
|---|---|---|
| 1. Diagnóstico | 1 h | 1 h |
| 2. Propuesta | 1 h | 1.5 h |
| 3. Contenido (copy) | 2.5 h | 3 h |
| 4. Diseño y desarrollo | 5 h | 6 h |
| 5. Integraciones | 1.5 h | 4 h |
| 6. Publicación y capacitación | 1 h | 1.5 h |
| **Total** | **12 h** | **17 h** |

**El cálculo, no solo el resultado:**

| | Horas | × Tarifa $300/h | Costo en horas | Precio de lista | Margen implícito |
|---|---|---|---|---|---|
| Esencial | 12 h | $300 | $3,600 | $6,300 | 42.9% |
| Completo | 17 h | $300 | $5,100 | $8,700 | 41.4% |

El margen realizado (≈42% y ≈41%) queda **por encima** del piso objetivo de 35% para setup — el precio de lista se redondeó a un monto cerrado ($6,300 / $8,700) en vez de cotizar al piso exacto. No es un error: 35% es el mínimo aceptable, no el margen real. La Integración salta de 1.5h (Esencial) a 4h (Completo) porque ahí vive el trabajo real de diferenciación: Typebot + Google Business Profile.

**Costo de dominio:** ya está considerado dentro del costo del paquete — no es un renglón aparte que falte definir.

## Qué sigue sin cerrar

- **Para qué se usa el tipo de cambio hoy**, si Typebot está en plan gratuito ($0). Probablemente para costos futuros en USD (Typebot Pro, dominios vía proveedores en dólares) — confirmar el caso de uso antes de recalcular algo con este TC.
- **Margen real de la suscripción mensual.** El 15% objetivo está definido, pero no hay horas de soporte mensual estimadas para verificarlo contra el precio ($350/$550) de la misma forma que el setup.

**Decidido, no pendiente:** no hay ni va a haber desglose por componente (web/SEO/asistente/etc. con precio individual) — el modelo cotiza por paquete completo. Ver [[Precios]].

## Regla de uso
Estos son los montos vigentes — **cualquier propuesta o ficha de pago usa estos números tal cual**, nunca los recalcula ni los redondea distinto. Si la tarifa/hora, el TC o el costo de Typebot cambian, esta nota se actualiza primero y de ahí se propagan los precios — no al revés.

---

> ⚠️ Pendiente de validación humana — Eduardo Gallegos Bolaños-Cacho (Operativo)

Ver también: [[01-Paquetes-de-Servicio]] · [[Precios]] · [[Cobros]] · [[finanzas]]
