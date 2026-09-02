insert into profiles (id, rol, nombre_completo) values
  ('f3b112f7-9235-452f-b46e-e3dce95a5207', 'admin', 'Emilio González Hidalgo'),
  ('e7c06709-f0b7-4d44-ba7c-ad20b709c982', 'admin', 'Eduardo Gallegos Bolaños-Cacho')
on conflict (id) do update set rol = excluded.rol, nombre_completo = excluded.nombre_completo;
