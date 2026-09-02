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
| Hospedaje de sitios de cliente | **Cloudflare Pages** | Publicación automática al actualizar el código, con HTTPS. Plan gratuito, permite uso comercial |
| Sitio y panel de la agencia | **Netlify** (sitio público) + **Cloudflare Workers** (panel) | Separados a propósito: cada build de Next.js consume créditos del plan gratuito de Netlify y el sitio estático casi no consume |
| Dominios | **Hostinger** | Registro de dominio propio para cada cliente |
| Asistente conversacional | **Typebot** | Chatbot con IA integrado a cada sitio, 24/7 |
| CRM | **HubSpot + Google Sheets** | Organización de leads y seguimiento comercial |
| SEO | **Google Search Console + sitemap** | Monitoreo de indexación y visibilidad |
| Presencia local | **Google Business Profile** | Ficha en Google Maps y búsquedas locales |
| Redes sociales | **Meta Business Suite** | Administración de Facebook e Instagram |
| IA interna | **Claude** | Desarrollo, redacción de propuestas, modelado financiero |

**Flujo de despliegue estándar:** código en el vault/repo → push a GitHub → build automático en Cloudflare Pages → nameservers del dominio del cliente apuntando a Cloudflare → HTTPS activo → sitemap enviado a Search Console.

> **Nota sobre el dominio del cliente (fase 6):** Cloudflare solo puede servir el dominio raíz (`negocio.com`, sin `www`) si sus **nameservers** apuntan a Cloudflare. Se cambian una sola vez, en el registrador donde se compró el dominio. Antes de cambiarlos, hay que copiar a Cloudflare todos los registros existentes del cliente — sobre todo los de correo (MX, SPF, DKIM, DMARC): si falta uno, ese negocio deja de recibir correo.

> Los clientes ya publicados en Netlify **se quedan ahí**. No hay que migrarlos: solo los sitios nuevos entran por Cloudflare.

> Las credenciales de estas plataformas **no se guardan en el vault**.

Ver también: [[ingenieria]]
