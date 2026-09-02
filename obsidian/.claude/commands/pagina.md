---
description: Genera la propuesta de página web completa (formato de 10 puntos)
argument-hint: [slug del cliente]
---

Genera la propuesta de página web para el cliente **$ARGUMENTS**.

Antes de escribir: lee `02-Clientes/$ARGUMENTS/00-Ficha.md`, `01-Diagnostico.md` y, si existe, lo que haya en `.raw/`. Lee también `01-Empresa/05-Tono-de-Voz.md`.

Responde en el formato de 10 puntos del §6 de CLAUDE.md:
1. Resumen ejecutivo · 2. Análisis del negocio · 3. Estructura de la página · 4. Copy completo · 5. Diseño y UI · 6. SEO local · 7. Conversión · 8. Código inicial · 9. Datos faltantes · 10. Recomendaciones finales.

Guarda el copy en `03-Copy.md` y las decisiones técnicas + código en `04-Desarrollo.md`. El punto 9 no puede quedar vacío.
