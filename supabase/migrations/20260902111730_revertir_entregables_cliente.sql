-- Se retira la sincronización de entregables (PDF + sitio demo) al dashboard,
-- decidido el mismo día que se construyó: esos archivos quedan solo locales
-- en el vault (02-Clientes/<slug>/Entregables/), sin tabla ni Storage.
-- El bucket "entregables-clientes" y sus objetos se borraron por separado vía
-- Storage API (protect_delete impide DDL directo sobre storage.objects/buckets).
drop table if exists entregables_cliente;
drop type if exists tipo_entregable;

drop policy if exists entregables_storage_select on storage.objects;
drop policy if exists entregables_storage_admin_write on storage.objects;
drop policy if exists entregables_storage_admin_update on storage.objects;
drop policy if exists entregables_storage_admin_delete on storage.objects;
