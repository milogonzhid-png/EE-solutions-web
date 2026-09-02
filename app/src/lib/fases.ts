/**
 * Las 6 fases del proceso de entrega de EE Solutions.
 * Fuente única de verdad: `obsidian/01-Empresa/04-Proceso-6-Fases.md`.
 * Si cambia el vault, cambia aquí — no inventar nombres.
 */

export type ClaveFase = "1" | "2" | "3" | "4" | "5" | "6";

export const ORDEN_FASES: ClaveFase[] = ["1", "2", "3", "4", "5", "6"];

export type Fase = {
  clave: ClaveFase;
  nombre: string;
  /** Qué se busca lograr en la fase. */
  objetivo: string;
  /** Qué recibe el cliente al terminarla. */
  entregable: string;
  /** Equipos y personas involucradas (uso interno, no se muestra al cliente). */
  involucra: string;
  duracion: string;
  /**
   * El cliente participa activamente en tres fases: diagnóstico, aprobación de
   * la propuesta y validación de la versión de prueba (fases 1, 2 y 4).
   */
  participaCliente: boolean;
};

export const FASES: Fase[] = [
  {
    clave: "1",
    nombre: "Diagnóstico",
    objetivo: "Entender el negocio, su mercado y su objetivo con el proyecto",
    entregable: "Ficha de diagnóstico",
    involucra: "Emilio + ventas + marketing",
    duracion: "1-2 días",
    participaCliente: true,
  },
  {
    clave: "2",
    nombre: "Propuesta",
    objetivo: "Definir alcance, precio y fecha de entrega",
    entregable: "Propuesta escrita con precio y cronograma",
    involucra: "Emilio + ventas + finanzas",
    duracion: "1 día",
    participaCliente: true,
  },
  {
    clave: "3",
    nombre: "Contenido",
    objetivo: "Redactar los textos orientados a conversión",
    entregable: "Textos aprobados por el cliente",
    involucra: "marketing (copy) + Emilio (validador)",
    duracion: "2-3 días",
    participaCliente: false,
  },
  {
    clave: "4",
    nombre: "Diseño y desarrollo",
    objetivo: "Construir el sitio",
    entregable: "Versión de prueba",
    involucra: "diseño + ingeniería + Eduardo",
    duracion: "4-6 días",
    participaCliente: true,
  },
  {
    clave: "5",
    nombre: "Integraciones",
    objetivo: "Conectar lo que genera contacto",
    entregable: "Sitio funcional con integraciones activas",
    involucra: "producto-ia + ingeniería + legal + Eduardo",
    duracion: "2-3 días",
    participaCliente: false,
  },
  {
    clave: "6",
    nombre: "Publicación y capacitación",
    objetivo: "Publicar y dejar al cliente capacitado",
    entregable: "Sitio en vivo + cliente capacitado",
    involucra: "Eduardo + ingeniería",
    duracion: "1-2 días",
    participaCliente: true,
  },
];

export const DURACION_TOTAL = "11 a 17 días";

/** Acceso rápido por clave. */
export const FASE_POR_CLAVE: Record<string, Fase> = Object.fromEntries(
  FASES.map((f) => [f.clave, f]),
);

/** Se mantiene por compatibilidad con las vistas que solo necesitan el nombre. */
export const NOMBRES_FASE: Record<string, string> = Object.fromEntries(
  FASES.map((f) => [f.clave, f.nombre]),
);

/** Índice (0-5) de una fase; -1 si la clave no es válida. */
export function indiceDeFase(clave: string): number {
  return ORDEN_FASES.indexOf(clave as ClaveFase);
}

/** Porcentaje de avance considerando la fase actual como "en curso". */
export function avanceDeFase(clave: string): number {
  const i = indiceDeFase(clave);
  if (i < 0) return 0;
  return Math.round((i / (ORDEN_FASES.length - 1)) * 100);
}

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
