import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const UserProfile = () => {
const {userActual} = useAppContext()
    useEffect(()=>{
    console.log(userActual)
    },[userActual])

  return (
    <>
      {userActual && userActual.user ? (
        <div>
          <p>{userActual.message}!</p>
          <p><strong>Nombre:</strong> {userActual.user.nombre}</p>
          <p><strong>Email:</strong> {userActual.user.email}</p>
          <p><strong>Rol:</strong> {userActual.user.role}</p>
        </div>
      ) : (
        <p>Loguéate para ver tu Perfil...</p>
      )}
    </>
  );
};

export default UserProfile;