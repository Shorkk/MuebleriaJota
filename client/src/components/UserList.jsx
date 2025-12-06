import { useAppContext } from "../context/AppContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { FaTrashAlt, FaChild } from 'react-icons/fa';

export const UserList = () => {
  const { users, eliminarUserContext, cambiarRolUserContext } = useAppContext();

  const administrarUser = (user) => {
    const handleEliminar = async () => {
      try {
        await eliminarUserContext(user._id);
        toast.success('Usuario eliminado correctamente');
      } catch (error) {
        toast.error('Error al eliminar el usuario');
      }
    };

    const handleCambiarRol = async () => {
      try {
        await cambiarRolUserContext(user);
        toast.success('Rol actualizado correctamente');
      } catch (error) {
        toast.error('Error al cambiar el rol');
      }
    };

    return (
        <>
        <button onClick={handleCambiarRol}>Cambiar Rol <FaChild /></button>
        <button className="button_eliminar" onClick={handleEliminar}>Eliminar Usuario <FaTrashAlt /></button>
    </>
    )
}

  return (
    <>
      <h1>Lista de Usuarios</h1>
        {users.length == 0 ? (
          <h4>Hubo un error en la carga de users.</h4>
        ) : (
            <div className="productos-grid">
            {users.map((user) => (
                <div className="card">
                <p>iD: {user._id}</p>
                <p>Nombre: {user.nombre}</p>
                <p>Email: {user.email}</p>
                <p>Rol: {user.role} </p>
                {administrarUser(user)}
                </div>
          ))}
            </div>
        )}
    </>
  );
}

export default UserList;