-- Las funciones is_admin()/mi_cliente_id() vivían en public, que Supabase
-- expone automáticamente vía PostgREST como RPC (aunque el REVOKE ya las
-- deja sin ejecutar para 'anon'). El advisor de seguridad marca cualquier
-- función SECURITY DEFINER expuesta en el schema público, sin importar los
-- grants. La forma correcta de que el linter quede en verde es sacarlas del
-- schema expuesto: se mueven a un schema "privado" que RLS sigue pudiendo
-- usar (las políticas no dependen de PostgREST) pero que la API REST nunca ve.

create schema if not exists privado;
revoke all on schema privado from anon, authenticated;
grant usage on schema privado to postgres, service_role;

alter function public.is_admin() set schema privado;
alter function public.mi_cliente_id() set schema privado;

alter function privado.is_admin() set search_path = public, pg_temp;
alter function privado.mi_cliente_id() set search_path = public, pg_temp;

revoke execute on function privado.is_admin() from public, anon, authenticated;
revoke execute on function privado.mi_cliente_id() from public, anon, authenticated;

-- Las políticas RLS ejecutan como el owner de la política (evaluación interna
-- del planner), no vía RPC HTTP, así que no necesitan EXECUTE explícito para
-- 'authenticated' una vez que la función ya no está en el schema expuesto;
-- postgres/service_role (dueños de las políticas) sí la pueden ejecutar.
grant execute on function privado.is_admin() to postgres, service_role;
grant execute on function privado.mi_cliente_id() to postgres, service_role;

-- Reescribe las políticas para apuntar al nuevo schema.
drop policy profiles_select on profiles;
create policy profiles_select on profiles for select using (id = auth.uid() or privado.is_admin());

drop policy profiles_admin_write on profiles;
create policy profiles_admin_write on profiles for all using (privado.is_admin()) with check (privado.is_admin());

drop policy clientes_select on clientes;
create policy clientes_select on clientes for select using (privado.is_admin() or id = privado.mi_cliente_id());

drop policy clientes_admin_write on clientes;
create policy clientes_admin_write on clientes for insert with check (privado.is_admin());

drop policy clientes_admin_update on clientes;
create policy clientes_admin_update on clientes for update using (privado.is_admin());

drop policy clientes_admin_delete on clientes;
create policy clientes_admin_delete on clientes for delete using (privado.is_admin());

drop policy pendientes_select on pendientes;
create policy pendientes_select on pendientes for select using (privado.is_admin() or cliente_id = privado.mi_cliente_id());

drop policy pendientes_admin_write on pendientes;
create policy pendientes_admin_write on pendientes for insert with check (privado.is_admin());

drop policy pendientes_admin_update on pendientes;
create policy pendientes_admin_update on pendientes for update using (privado.is_admin());

drop policy pendientes_admin_delete on pendientes;
create policy pendientes_admin_delete on pendientes for delete using (privado.is_admin());

drop policy cobros_admin_only on cobros;
create policy cobros_admin_only on cobros for all using (privado.is_admin()) with check (privado.is_admin());

drop policy gastos_admin_only on gastos;
create policy gastos_admin_only on gastos for all using (privado.is_admin()) with check (privado.is_admin());

drop policy departamentos_admin_write on departamentos;
create policy departamentos_admin_write on departamentos for all using (privado.is_admin()) with check (privado.is_admin());

drop policy reportes_admin_only on reportes_semanales;
create policy reportes_admin_only on reportes_semanales for all using (privado.is_admin()) with check (privado.is_admin());
