const BASE_URL = import.meta.env.VITE_BASE_URL

export async function fetchUsers() { // Me retorna todo los usuarios
  const res = await fetch(`${BASE_URL}/api/users`);

  if (!res.ok) throw new Error('Error al obtener los usuarios');
  return res.json();
}

export async function fetchUsersPorId(id) { // Me retorna 1 usuario
  const res = await fetch(`${BASE_URL}/api/users/${id}`);
  if (!res.ok) throw new Error('Usuario no encontrado');
  return res.json();
}

export async function createUser(data) { // Me retorna el usuario creado
  const res = await fetch(`${BASE_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear un usuario');
  return res.json();
}

export async function perfilUsuario(token) { // con auth, me retorna el perfil del usuario
      try {
        if (!token) {
          console.error("No se encontró token de autenticación.");
          return;
        }

        const response = await fetch(`${BASE_URL}/api/users/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          const error = await response.json();
          throw new Error("No se pudo acceder al perfil. Error:",error);
        }

        const data = await response.json();
        console.log(data)
        return data //  Devuelvo la data
      } catch (error) {
        console.error("Error al obtener perfil:", error.message);
      }
    
}

export async function eliminarUser(user) {
  const res = await fetch(`${BASE_URL}/api/users/${user._id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar el usuario');
  return res.json();
}

export async function cambiarRolUser(user) {
  const res = await fetch(`${BASE_URL}/api/users/${user._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: user.role === 'admin' ? 'user' : 'admin' }),
  });
  if (!res.ok) throw new Error('Error al cambiar el rol del usuario');
  return res.json();
}