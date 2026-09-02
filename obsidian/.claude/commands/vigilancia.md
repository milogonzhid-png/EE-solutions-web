---
description: Cada departamento revisa su parte de uno o todos los clientes activos y señala lo que está roto, vencido o inconsistente
argument-hint: "[slug del cliente] (vacío = todos los clientes activos)"
---

Corre una revisión de vigilancia sobre **$ARGUMENTS** (si viene vacío: todos los clientes con `estado: activo` en `02-Clientes/*/00-Ficha.md`).

**Esto es una auditoría, no una sesión de avance.** No escribas copy nuevo, no diseñes nada nuevo, no toques código de producción. Solo revisa y reporta.

Para cada cliente:

1. Lee `00-Ficha.md` para saber fase, paquete y estado.
2. Lanza **en paralelo, en un solo mensaje**, los departamentos dueños de algo en ese cliente según su fase y la tabla de Cobertura de servicios de `01-Empresa/09-Organigrama.md`. Guía de qué revisa cada uno (ajusta según lo que de verdad aplique al cliente):

| Departamento | Qué revisa |
|---|---|
| `ventas` | ¿El embudo sigue moviéndose o el cliente lleva demasiado tiempo en la misma fase sin razón? |
| `finanzas` | ¿Hay cobros vencidos o pendientes de registrar en `Cobros.md`? ¿El margen sigue en línea con lo cotizado? |
| `marketing` | ¿Hay copy pendiente de aprobar? ¿Sigue vigente la voz de marca acordada? |
| `diseno` | ¿El sistema visual sigue consistente? ¿Hay texto de relleno o foto de stock que no se reemplazó? |
| `ingenieria` | ¿El sitio sigue en línea, sin errores, con tiempos de carga razonables? ¿NAP consistente en el sitio? ¿Ficha de Google Business activa y correcta? ¿Sigue indexado? |
| `producto-ia` | Si tiene Typebot integrado: ¿el flujo sigue funcionando? |
| `legal` | ¿Aviso de privacidad presente y vigente si el sitio recaba datos? |
| `soporte` | Si ya fue entregado: ¿señales de riesgo de cancelación? ¿Cuándo fue el último contacto? |
| `operaciones` | ¿Riesgo de atraso contra el cronograma acordado? |

No apliques un departamento que no tenga nada que ver con la fase o el paquete del cliente — dilo y sáltalo en vez de inventarle trabajo.

3. Cuando todos terminen, para cada hallazgo real (no cosmético): agrégalo como pendiente con checkbox y responsable en `00-Ficha.md` del cliente, bajo un encabezado `## Vigilancia — AAAA-MM-DD` (crea el encabezado si no existe; no borres revisiones anteriores, solo agrega la más reciente arriba).
4. Si algo requiere una de las cinco decisiones reservadas al consejo, márcalo explícitamente como tal — no lo resuelvas tú.

Cierra con un resumen de máximo 2 líneas por cliente revisado: qué se encontró (o "sin novedad") y si algo necesita al consejo.
