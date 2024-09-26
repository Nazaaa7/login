// src/routes/PrivateRoutes.jsx
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAuthenticated = userData?.isLogged;

  console.log("Acceso a rutas privadas. Autenticado:", isAuthenticated);

  // Si el usuario está autenticado, permite el acceso a las rutas privadas
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
