-- Correo de contacto del cliente: fuente para invitar credencial de acceso al portal.
alter table clientes add column correo text;

create type tipo_entregable as enum ('ficha_pago', 'bienvenida', 'agreement', 'demo_web', 'otro');

create table entregables_cliente (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade,
  tipo tipo_entregable not null,
  nombre text not null,
  storage_path text,
  url_externa text,
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  constraint entregables_una_ubicacion check (
    (storage_path is not null and url_externa is null)
    or (storage_path is null and url_externa is not null)
  ),
  unique (cliente_id, nombre)
);

create index idx_entregables_cliente on entregables_cliente(cliente_id);

alter table entregables_cliente enable row level security;

create policy entregables_select on entregables_cliente
  for select using (privado.is_admin() or cliente_id = privado.mi_cliente_id());

create policy entregables_admin_write on entregables_cliente
  for all using (privado.is_admin()) with check (privado.is_admin());

-- Bucket privado: los PDF llevan precio/contrato, y el acceso siempre pasa
-- por una URL firmada generada del lado del servidor (Server Component),
-- nunca por una URL pública fija.
insert into storage.buckets (id, name, public)
values ('entregables-clientes', 'entregables-clientes', false);

-- Convención de ruta: <slug-del-cliente>/<archivo>. El primer segmento del
-- path decide el acceso: admin ve todo, cliente solo su propia carpeta.
create policy entregables_storage_select on storage.objects
  for select using (
    bucket_id = 'entregables-clientes'
    and (
      privado.is_admin()
      or (storage.foldername(name))[1] = (
        select slug from clientes where id = privado.mi_cliente_id()
      )
    )
  );

create policy entregables_storage_admin_write on storage.objects
  for insert with check (bucket_id = 'entregables-clientes' and privado.is_admin());

create policy entregables_storage_admin_update on storage.objects
  for update using (bucket_id = 'entregables-clientes' and privado.is_admin());

create policy entregables_storage_admin_delete on storage.objects
  for delete using (bucket_id = 'entregables-clientes' and privado.is_admin());
