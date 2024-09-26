import jwt from "jsonwebtoken";
import { connectDB } from "../db/database.js";

export const validarJWT = async (token) => {
  try {
    // Verificamos el token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecret");
    const { id } = decoded;

    // Conexión a la base de datos.
    const connection = await connectDB();

    // Consulta SQL asegurando que el id sea un valor seguro.
    const [usuario] = await connection.query(
      "SELECT * FROM USUARIOS WHERE id = ? LIMIT 1",
      [id] // Usamos ? para prevenir inyecciones SQL
    );

    // Verificamos si el usuario existe.
    if (!usuario || usuario.length === 0) {
      return false;
    }

    // Retornamos el usuario encontrado.
    return usuario[0];
  } catch (error) {
    console.error("Error al validar el JWT:", error);
    return false;
  }
};
