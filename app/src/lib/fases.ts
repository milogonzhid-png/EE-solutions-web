/**
 * Las 6 fases del proceso comercial de EE Solutions
 * (ver obsidian/01-Empresa/04-Proceso-6-Fases.md).
 */
export const NOMBRES_FASE: Record<string, string> = {
  "1": "Diagnóstico",
  "2": "Propuesta",
  "3": "Contratación",
  "4": "Diseño y contenido",
  "5": "Desarrollo",
  "6": "Publicación y entrega",
};

export const NOMBRES_ESTADO: Record<string, string> = {
  activo: "Activo",
  pausado: "Pausado",
  entregado: "Entregado",
  archivado: "Archivado",
};

export const COLOR_ESTADO: Record<string, string> = {
  activo: "bg-[#21C7EA]/15 text-[#21C7EA]",
  pausado: "bg-yellow-500/15 text-yellow-400",
  entregado: "bg-green-500/15 text-green-400",
  archivado: "bg-white/10 text-white/50",
};

export const NOMBRES_DEPARTAMENTO: Record<string, string> = {
  ventas: "Ventas",
  marketing: "Marketing",
  diseno: "Diseño",
  ingenieria: "Ingeniería",
  "producto-ia": "Producto & IA",
  finanzas: "Finanzas",
  legal: "Legal",
  datos: "Datos",
  operaciones: "Operaciones",
  contratacion: "Contratación",
  soporte: "Soporte",
  people: "People",
  gerencia: "Gerencia",
};
