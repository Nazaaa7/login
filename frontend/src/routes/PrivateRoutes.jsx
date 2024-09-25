import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { state } = useContext(UserContext);

  // Si el usuario está autenticado, se permite acceder a las rutas privadas
  return state.isLogged ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoutes;
