const BASE_URL = import.meta.env.VITE_BASE_URL;

// Registro de usuario
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  console.log('authService.registerUser', res.status, data);
  const errorMsg = data.error || data.message || 'Error al registrar usuario';
  if (!res.ok) throw new Error(errorMsg);
  return data; // { token , user }
};

// Login de usuario
export const loginUser = async (credentials) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  console.log('authService.loginUser', res.status, data);
  const errorMsg = data.error || data.message || 'Error en el login';
  if (!res.ok) throw new Error(errorMsg);
  return data; // { token, user }
};