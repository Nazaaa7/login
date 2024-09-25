import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { state } = useContext(UserContext);

  // Si el usuario NO está autenticado, se permite acceder a las rutas públicas
  return !state.isLogged ? <Outlet /> : <Navigate to={"/tareas"} />;
};

export default PublicRoutes;
