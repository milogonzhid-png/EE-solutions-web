-- El portal necesita separar "lo que necesitamos del cliente" (textos, fotos,
-- accesos) de "lo que estamos haciendo nosotros". Antes solo existía
-- `responsable` (departamento interno) y un NULL ahí era ambiguo.
create type responsable_pendiente as enum ('nosotros', 'cliente');

alter table pendientes
  add column depende_de responsable_pendiente not null default 'nosotros';

comment on column pendientes.depende_de is
  'Quién tiene la pelota: "cliente" se muestra en el portal como acción requerida de su parte.';

create index idx_pendientes_depende_de on pendientes(depende_de) where resuelto = false;
