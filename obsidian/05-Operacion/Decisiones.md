---
tipo: bitacora
fecha: 2026-08-19
estado: activo
tags: [decision]
---

# Bitácora de decisiones

Una línea por decisión que cambie cómo opera la empresa. Formato: fecha · decisión · quién la tomó · por qué · qué se descartó.

| Fecha | Decisión | Quién | Por qué | Alternativa descartada |
|---|---|---|---|---|
| 2026-08-19 | Se adopta este vault de Obsidian como fuente de verdad operativa | Eduardo | Centralizar contexto de clientes y agencia para trabajar con Claude Code | Notas dispersas en Google Docs |
| 2026-08-19 | La automatización recurrente (ej. `com.eesolutions.reporte-semanal`) corre 100% local vía `launchd`, nunca en un servicio cloud | Usuario | Los datos que procesa son de clientes y de la operación interna — privados; correr local evita subirlos a una rutina en la nube | Automatización basada en un servicio cloud (ej. GitHub Actions, cron remoto) |
| 2026-08-20 | La dirección física del cliente sí se publica en el sitio (schema `LocalBusiness`) | Consejo | Se recopila específicamente para usarse en la web — es dato de confianza esperado en negocios locales, no un dato sensible que se guarde sin propósito | Omitirla u ofrecerla como opcional caso por caso |
| 2026-08-21 | Se cierra el catálogo a **2 paquetes — Esencial ($6,300 setup / $350 mes) y Completo ($8,700 setup / $550 mes)** | Eduardo (Financiero) | Modelo de costos cerrado (TC $17.45, 3 clientes activos, tarifa $300/h, Typebot plan gratuito, margen 35% setup / 15% suscripción) — ver [[00-Precios-y-Costos]] y [[01-Paquetes-de-Servicio]] | El esquema de 3 paquetes (Básico/Estándar/Premium), que nunca llegó a tener precio de lista — archivado en `99-Archivo/paquetes-3-niveles-reemplazado-2026-08-21.md` |

Ver también: [[09-Organigrama]]
