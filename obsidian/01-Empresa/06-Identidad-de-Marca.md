---
tipo: contexto
fecha: 2026-08-19
estado: vigente
tags: [empresa]
---

# Identidad de marca

## Logotipo
Dos "E" en itálica sobre fondo oscuro: la primera sólida en blanco, la segunda con el degradado de marca. Referencia visual confirmada por el usuario el 2026-08-21.

**SVG canónico — copiar tal cual, no reinterpretar de memoria:**
```html
<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="eeGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#21C7EA"/>
      <stop offset="50%" stop-color="#8C55D2"/>
      <stop offset="100%" stop-color="#FF2F86"/>
    </linearGradient>
  </defs>
  <g transform="translate(10,10) skewX(-10)">
    <path d="M0,0 H70 V22 H18 V39 H58 V61 H18 V78 H70 V100 H0 Z" fill="#FFFFFF"/>
  </g>
  <g transform="translate(112,10) skewX(-10)">
    <path d="M0,0 H70 V22 H18 V39 H58 V61 H18 V78 H70 V100 H0 Z" fill="url(#eeGrad)"/>
  </g>
</svg>
```

**Uso:** siempre sobre fondo oscuro (`--ink` o negro puro), nunca sobre fondo claro sin invertir. Si un documento necesita `id`s únicos por SVG en la misma página (varios logos en un solo HTML), renombra `eeGrad` a algo único por instancia para evitar colisión de `id`.

**Cada documento/artefacto de EE Solutions que lleve este logo debe copiar este SVG exacto** (Bienvenida-Infografía, Ficha de Pago, Agreement, materiales de marketing) — no reconstruirlo de memoria cada vez, para no repetir el error de un mark genérico que no correspondía al logo real.

| Color | Hex | Uso |
|---|---|---|
| Ink (fondo) | `#07050A` | Base de fondo en sitio web y materiales digitales |
| Cyan | `#21C7EA` | Acento primario — enlaces y elementos interactivos |
| Violet | `#8C55D2` | Acento secundario — transiciones de marca |
| Magenta | `#FF2F86` | Acento de cierre — llamados a la acción |

```css
:root {
  --ink: #07050A;
  --cyan: #21C7EA;
  --violet: #8C55D2;
  --magenta: #FF2F86;
  --gradient-marca: linear-gradient(135deg, var(--cyan), var(--violet), var(--magenta));
}
```

> Esta paleta es **solo para materiales de EE Solutions**. Cada cliente lleva su propia paleta, derivada de su giro y su marca existente.

Ver también: [[diseno]]
