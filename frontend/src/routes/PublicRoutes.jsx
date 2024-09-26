// src/routes/PublicRoutes.jsx
import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
  // Verifica si el usuario está autenticado con datos del localStorage
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const isAuthenticated = userData?.isLogged || false;

  // Log para verificar estado de autenticación y rol del usuario
  console.log("Acceso a rutas públicas. Autenticado:", isAuthenticated);
  console.log("Rol del usuario:", userData.role);

  // Si el usuario está autenticado, redirige a la vista según su rol
  if (isAuthenticated) {
    switch (userData.role) {
      case "student":
        return <Navigate to="/estudiantes" />;
      case "teacher":
        return <Navigate to="/profesores" />;
      case "admin":
        return <Navigate to="/admin" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return <Outlet />; // Permite el acceso a las rutas públicas (Login, Register)
};

export default PublicRoutes;
