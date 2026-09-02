-- Las políticas RLS se evalúan con los privilegios del usuario que consulta,
-- no con los del dueño de la política. Al mover is_admin()/mi_cliente_id() al
-- esquema "privado" se les revocó todo a 'authenticated', así que cualquier
-- consulta de un usuario logueado fallaba con:
--   ERROR 42501: permission denied for function is_admin
-- Eso rompía el login: el dashboard no podía leer el rol y mandaba al admin
-- al portal de cliente.
--
-- Dar USAGE + EXECUTE aquí NO reexpone las funciones en la API REST: PostgREST
-- solo publica funciones de los esquemas expuestos (public, graphql_public),
-- y "privado" no está en esa lista. El linter de seguridad sigue en verde.
grant usage on schema privado to authenticated, anon;

grant execute on function privado.is_admin() to authenticated, anon;
grant execute on function privado.mi_cliente_id() to authenticated, anon;
