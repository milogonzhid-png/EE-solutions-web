---
tipo: indice
fecha: 2026-08-20
estado: vigente
tags: [pendiente]
---

# 06-Plantillas/ — índice

16 plantillas base, se copian y no se editan:

- [[PLANTILLA-00-Ficha]] · [[PLANTILLA-01-Diagnostico]] · [[PLANTILLA-02-Propuesta]] · [[PLANTILLA-03-Copy]]
- [[PLANTILLA-04-Desarrollo]] · [[PLANTILLA-05-Entrega]] · [[PLANTILLA-06-Ficha-de-Pago]] · [[PLANTILLA-07-Bienvenida]]
- [[PLANTILLA-Bienvenida-Infografia]] · [[PLANTILLA-08-Agreement]] · [[PLANTILLA-Ficha-de-Pago-Documento]] · [[PLANTILLA-Agreement-Documento]]
- [[PLANTILLA-Contrato-OPCIONAL]] · [[PLANTILLA-Prospecto]] · [[PLANTILLA-Post-Redes]] · [[PLANTILLA-Reporte-Semanal]]

Al cerrar un cliente (`/convertir-prospecto` o `/contratacion`) se generan los tres documentos que se le entregan — Ficha de Pago, Bienvenida y Agreement — y **cada uno termina siendo un único `06-Ficha-de-Pago.pdf` / `07-Bienvenida.pdf` / `08-Agreement.pdf`** en la carpeta del cliente. Nada de `.md` ni `.html` sueltos junto al PDF — se probó y se veían como nodos duplicados en el grafo de Obsidian.

- `PLANTILLA-06-Ficha-de-Pago.md` / `PLANTILLA-07-Bienvenida.md` / `PLANTILLA-08-Agreement.md` — **no se copian al cliente.** Solo indican qué secciones lleva cada documento.
- `PLANTILLA-Ficha-de-Pago-Documento.html` / `PLANTILLA-Bienvenida-Infografia.html` / `PLANTILLA-Agreement-Documento.html` — de aquí sí se redacta directo el contenido, en un `.html` temporal que se borra en cuanto sale el PDF (`node ~/.claude/scripts/pdf-export/export.js` — ver `00-Registro-de-Agentes.md` §Herramientas locales). Logo: SVG canónico de `01-Empresa/06-Identidad-de-Marca.md`, nunca reconstruido de memoria.

`PLANTILLA-Contrato-OPCIONAL` sigue existiendo para el caso excepcional donde un cliente pida contrato legal completo en vez del Agreement — no es el flujo por defecto, y se queda como `.md` (un contrato se firma y revisa como texto, no como infografía).

Dueños: [[people]] (que el proceso no viva en una sola cabeza) · [[operaciones]] (estructura fija de cada cliente) · [[contratacion]] (Ficha de Pago, Bienvenida, Infografía y Agreement).

Ver también: [[09-Organigrama]] · [[00-Indice-Clientes]]
