create extension if not exists "pgcrypto";
create type rol_usuario as enum ('admin', 'cliente');
create type perfil_cliente as enum ('1', '2', '3');
create type paquete_servicio as enum ('esencial', 'completo');
create type estado_proyecto as enum ('activo', 'pausado', 'entregado', 'archivado');
create type fase_proyecto as enum ('1', '2', '3', '4', '5', '6');
create type estado_pago as enum ('pendiente', 'parcial', 'pagado');
create type departamento_slug as enum (
  'ventas', 'marketing', 'diseno', 'ingenieria', 'producto-ia',
  'finanzas', 'legal', 'datos', 'operaciones', 'contratacion',
  'soporte', 'people', 'gerencia'
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  rol rol_usuario not null default 'cliente',
  nombre_completo text not null,
  cliente_id uuid,
  creado_en timestamptz not null default now()
);

create table clientes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nombre_comercial text not null,
  giro text,
  perfil perfil_cliente,
  paquete paquete_servicio,
  fase fase_proyecto not null default '1',
  estado estado_proyecto not null default 'activo',
  mantenimiento boolean not null default false,
  fecha_inicio date,
  dominio text,
  whatsapp text,
  direccion text,
  notas text,
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

alter table profiles
  add constraint profiles_cliente_id_fkey
  foreign key (cliente_id) references clientes(id) on delete set null;

create table pendientes (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid references clientes(id) on delete cascade,
  fase fase_proyecto,
  descripcion text not null,
  responsable departamento_slug,
  resuelto boolean not null default false,
  creado_en timestamptz not null default now(),
  resuelto_en timestamptz
);

create table cobros (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade,
  folio text not null unique,
  monto_setup_centavos bigint not null default 0,
  monto_mensual_centavos bigint not null default 0,
  estado_pago estado_pago not null default 'pendiente',
  fecha_emision date not null default current_date,
  fecha_pago date,
  creado_en timestamptz not null default now()
);

create table gastos (
  id uuid primary key default gen_random_uuid(),
  categoria text not null,
  descripcion text not null,
  monto_centavos bigint not null,
  recurrente boolean not null default false,
  fecha date not null default current_date,
  creado_en timestamptz not null default now()
);

create table departamentos (
  slug departamento_slug primary key,
  nombre text not null,
  cluster text not null,
  dueno_de text,
  responde_por text
);

create table reportes_semanales (
  id uuid primary key default gen_random_uuid(),
  semana_inicio date not null,
  semana_fin date not null,
  resumen text,
  visto_gerencia boolean not null default false,
  visto_gerencia_en timestamptz,
  creado_en timestamptz not null default now(),
  unique (semana_inicio, semana_fin)
);

create index idx_pendientes_cliente on pendientes(cliente_id);
create index idx_cobros_cliente on cobros(cliente_id);
create index idx_clientes_estado on clientes(estado);
create index idx_profiles_cliente on profiles(cliente_id);

create or replace function is_admin() returns boolean language sql security definer stable as $$
  select exists (select 1 from profiles where id = auth.uid() and rol = 'admin');
$$;

create or replace function mi_cliente_id() returns uuid language sql security definer stable as $$
  select cliente_id from profiles where id = auth.uid();
$$;

alter table profiles enable row level security;
alter table clientes enable row level security;
alter table pendientes enable row level security;
alter table cobros enable row level security;
alter table gastos enable row level security;
alter table departamentos enable row level security;
alter table reportes_semanales enable row level security;

create policy profiles_select on profiles for select using (id = auth.uid() or is_admin());
create policy profiles_admin_write on profiles for all using (is_admin()) with check (is_admin());

create policy clientes_select on clientes for select using (is_admin() or id = mi_cliente_id());
create policy clientes_admin_write on clientes for insert with check (is_admin());
create policy clientes_admin_update on clientes for update using (is_admin());
create policy clientes_admin_delete on clientes for delete using (is_admin());

create policy pendientes_select on pendientes for select using (is_admin() or cliente_id = mi_cliente_id());
create policy pendientes_admin_write on pendientes for insert with check (is_admin());
create policy pendientes_admin_update on pendientes for update using (is_admin());
create policy pendientes_admin_delete on pendientes for delete using (is_admin());

create policy cobros_admin_only on cobros for all using (is_admin()) with check (is_admin());
create policy gastos_admin_only on gastos for all using (is_admin()) with check (is_admin());

create policy departamentos_select on departamentos for select using (auth.uid() is not null);
create policy departamentos_admin_write on departamentos for all using (is_admin()) with check (is_admin());

create policy reportes_admin_only on reportes_semanales for all using (is_admin()) with check (is_admin());
