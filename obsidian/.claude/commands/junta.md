---
description: Junta de directores — varios agentes trabajan en paralelo sobre un mismo cliente
argument-hint: [slug del cliente]
---

Convoca una junta de departamentos sobre **$ARGUMENTS**.

Lanza **en paralelo, en un solo mensaje** (no uno tras otro) los departamentos que apliquen según la fase en que esté el cliente. Consulta `02-Clientes/$ARGUMENTS/00-Ficha.md` para saber la fase.

| Fase | Agentes a lanzar en paralelo |
|---|---|
| 1 — Diagnóstico | `ventas` (diagnóstico) + `marketing` (competencia) + `ingenieria` (visibilidad actual) |
| 2 — Propuesta | `ventas` (propuesta y objeciones) + `finanzas` (precio y margen) |
| 3 — Contenido | `marketing` (copy) + `diseno` (sistema visual) |
| 4 — Desarrollo | `ingenieria` (build) + `diseno` (revisión visual) |
| 5 — Integraciones | `producto-ia` (Typebot) + `ingenieria` (ficha y NAP) + `legal` (aviso de privacidad) |
| 6 — Entrega | `ingenieria` (checklist) + `marketing` (caso de éxito, si hay permiso) |
| Entregado | `soporte` (revisión de salud y retención) |

Cuando todos terminen:

1. **Señala las contradicciones entre ellos.** Si el financiero dice que el margen no da y el de marketing propone algo que suma horas, eso es lo importante del ejercicio — no lo suavices.
2. Consolida en la nota que corresponda del cliente.
3. Dime en máximo 10 líneas: qué quedó decidido, qué está en conflicto y necesita que decida un humano, y qué datos faltan.

Añade `operaciones` a cualquier fase donde haya riesgo de atraso o de alcance.

Si el cliente está en una fase donde solo aplica un departamento, dilo y lanza solo ese en vez de inventar trabajo para los demás.
