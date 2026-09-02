/**
 * Logotipo de EE Solutions.
 * SVG canónico copiado tal cual de `obsidian/01-Empresa/06-Identidad-de-Marca.md`
 * — no reconstruirlo de memoria. Dos "E" en itálica: la primera sólida en
 * blanco, la segunda con el degradado de marca.
 *
 * `id` del degradado parametrizado para que no choquen dos logos en la misma
 * página (el vault lo advierte explícitamente).
 */
export function Logo({
  className = "h-8 w-auto",
  idDegradado = "eeGrad",
}: {
  className?: string;
  idDegradado?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="EE Solutions"
    >
      <defs>
        <linearGradient id={idDegradado} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#21C7EA" />
          <stop offset="50%" stopColor="#8C55D2" />
          <stop offset="100%" stopColor="#FF2F86" />
        </linearGradient>
      </defs>
      <g transform="translate(10,10) skewX(-10)">
        <path
          d="M0,0 H70 V22 H18 V39 H58 V61 H18 V78 H70 V100 H0 Z"
          fill="#FFFFFF"
        />
      </g>
      <g transform="translate(112,10) skewX(-10)">
        <path
          d="M0,0 H70 V22 H18 V39 H58 V61 H18 V78 H70 V100 H0 Z"
          fill={`url(#${idDegradado})`}
        />
      </g>
    </svg>
  );
}

/** Logo + nombre, como aparece en la barra superior de la web. */
export function Marca({
  sublinea,
  idDegradado = "eeGradMarca",
}: {
  sublinea?: string;
  idDegradado?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Logo className="h-7 w-auto" idDegradado={idDegradado} />
      <div className="leading-tight">
        <span className="font-display text-sm font-extrabold tracking-tight text-white">
          EE Solutions
        </span>
        {sublinea && (
          <span className="mono-label block text-[0.6rem]">{sublinea}</span>
        )}
      </div>
    </div>
  );
}
