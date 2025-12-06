import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { UserList } from '../components/UserList.jsx';

const UserProfile = () => {
  const {userActual} = useAppContext()
    const { isAuthenticated } = useAuthContext();
  useEffect(()=>{
    console.log(userActual)
  },[userActual])

  return (
    <>
      <h1>MI PERFIL</h1>
      {userActual && userActual.user && isAuthenticated ? (
        <div>
          <p>{userActual.message}!</p>
          <h2><strong>Nombre:</strong> {userActual.user.nombre}</h2>
          <h2><strong>Email:</strong> {userActual.user.email}</h2>
          <h2><strong>Rol:</strong> {userActual.user.role}</h2>
        </div>
      ) : (
          <h2> Loguéate para ver tu perfil...</h2>
          )}
          { userActual.user.role === 'admin' ? (
            <div>
              <UserList />
            </div>
            ) : (
              <h4>No tienes privilegios de administrador.</h4>
            )
        }    
    </>
  );
};

export default UserProfile;