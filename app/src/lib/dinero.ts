/** Formatea centavos (enteros, como se guardan en Supabase) a MXN legible. */
export function formatoMXN(centavos: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(centavos / 100);
}
