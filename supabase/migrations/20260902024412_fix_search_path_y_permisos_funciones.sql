alter function is_admin() set search_path = public, pg_temp;
alter function mi_cliente_id() set search_path = public, pg_temp;

revoke execute on function is_admin() from anon;
revoke execute on function mi_cliente_id() from anon;
grant execute on function is_admin() to authenticated;
grant execute on function mi_cliente_id() to authenticated;
