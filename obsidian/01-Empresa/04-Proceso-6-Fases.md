---
tipo: contexto
fecha: 2026-08-19
estado: vigente
tags: [empresa]
---

# Proceso de trabajo — 6 fases

El cliente participa activamente en tres: diagnóstico, aprobación de propuesta y validación de la versión de prueba.

| Fase | Objetivo | Entregable | Involucra | Duración | Nota del vault |
|---|---|---|---|---|---|
| **1. Diagnóstico** | Entender el negocio, su mercado y su objetivo con el proyecto | Ficha de diagnóstico | Emilio (humano) + `ventas` + `marketing` | 1-2 días | `01-Diagnostico.md` |
| **2. Propuesta** | Definir alcance, precio y fecha de entrega | Propuesta escrita con precio y cronograma | Emilio (humano) + `ventas` + `finanzas` | 1 día | `02-Propuesta.md` |
| **3. Contenido** | Redactar los textos orientados a conversión | Textos aprobados por el cliente | `marketing` (copy) + Emilio (validador) | 2-3 días | `03-Copy.md` |
| **4. Diseño y desarrollo** | Construir el sitio | Versión de prueba | `diseno` + `ingenieria` + Eduardo (humano) | 4-6 días | `04-Desarrollo.md` |
| **5. Integraciones** | Conectar lo que genera contacto | Sitio funcional con integraciones activas | `producto-ia` + `ingenieria` + `legal` + Eduardo | 2-3 días | `04-Desarrollo.md` |
| **6. Publicación y capacitación** | Publicar y dejar al cliente capacitado | Sitio en vivo + cliente capacitado | Eduardo (humano) + `ingenieria` | 1-2 días | `05-Entrega.md` |

**Fase 1** — conversación inicial por WhatsApp o videollamada; investigación breve de la competencia.
**Fase 5** — asistente conversacional, SEO, botones de contacto, ficha de Google Business y aviso de privacidad.
**Fase 6** — configuración de dominio, DNS y HTTPS; sesión de capacitación al cliente. El dominio del cliente se apunta a Cloudflare cambiando sus **nameservers** en el registrador; antes de cambiarlos se copian a Cloudflare todos sus registros actuales, en especial los de correo (MX, SPF, DKIM, DMARC) — si falta uno, el negocio deja de recibir correo.

**Duración total estimada:** 11 a 17 días.

Ver también: [[operaciones]]
