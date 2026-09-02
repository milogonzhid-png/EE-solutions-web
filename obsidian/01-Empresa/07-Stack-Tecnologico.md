---
tipo: contexto
fecha: 2026-08-19
estado: vigente
tags: [empresa]
---

# Infraestructura y tecnología

| Área | Herramienta | Para qué |
|---|---|---|
| Control de versiones | **GitHub** | Respaldo y control de cambios del código de cada sitio |
| Hospedaje y despliegue | **Netlify** | Publicación automática al actualizar el código, con HTTPS |
| Dominios | **Hostinger** | Registro de dominio propio para cada cliente |
| Asistente conversacional | **Typebot** | Chatbot con IA integrado a cada sitio, 24/7 |
| CRM | **HubSpot + Google Sheets** | Organización de leads y seguimiento comercial |
| SEO | **Google Search Console + sitemap** | Monitoreo de indexación y visibilidad |
| Presencia local | **Google Business Profile** | Ficha en Google Maps y búsquedas locales |
| Redes sociales | **Meta Business Suite** | Administración de Facebook e Instagram |
| IA interna | **Claude** | Desarrollo, redacción de propuestas, modelado financiero |

**Flujo de despliegue estándar:** código en el vault/repo → push a GitHub → build automático en Netlify → dominio de Hostinger apuntando por DNS → HTTPS activo → sitemap enviado a Search Console.

> Las credenciales de estas plataformas **no se guardan en el vault**.

Ver también: [[ingenieria]]
