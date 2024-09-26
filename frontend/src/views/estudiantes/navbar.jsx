
import React, { useContext } from 'react';
import './assets/css/navbar.css';
import { UserContext } from '../../context/UserContext'; // Importa el contexto
import { userType } from '../../context/userTypes'; // Importa los tipos de acción

function Navbar() {
  const { stateDispatch } = useContext(UserContext); // Accede al dispatch


  const logOut = () => {
    // Limpia el localStorage antes de la actualización de estado
    localStorage.removeItem("userData");

    // Actualiza el estado para reflejar el cierre de sesión
    stateDispatch({
      type: userType.logOut,
    });

    // Si es necesario, redirige al usuario a la pantalla de login
    window.location.href = "/"; // O usa navigate("/")
  };
  return (
    <nav className="navbar">
      <h1>QuimiCraft</h1>
      <ul className="nav-links">
        <li>Inicio</li>
        <li>Categorias</li>
        <li>Chat</li>
        <li>Blogs</li>
      </ul>
      <button onClick={logOut} className='logOut'>Cerrar Sesión</button>
    </nav>
  );
}

export default Navbar;
