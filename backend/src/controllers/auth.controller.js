import { connectDB } from "../db/database.js";
import bcrypt from "bcrypt";
import { generarJWT } from "../helpers/generarJWT.js";



// Controlador para obtener tipos de usuario
export const getTiposUsuario = async (req, res) => {
  const connection = await connectDB();
  
  const sql = "SELECT * FROM tipousuario"; // Aquí obtienes todos los tipos de usuario

  try {
    const [result] = await connection.query(sql);
    res.json(result); // Envías los resultados al frontend
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener tipos de usuario" });
  }
};



export const register = async (req, res) => {
  const { nombre, apellido, usuario, correo, contrasenia, id_rela_tipo_usuario } = req.body;

  const connection = await connectDB();

  const sql = `
    INSERT INTO USUARIOS (nombre, apellido, usuario, correo, contrasenia, id_rela_tipo_usuario) 
    VALUES (?,?,?,?,?,?)
  `;

  const hashContrasenia = bcrypt.hashSync(contrasenia, 10);

  await connection.query(sql, [
    nombre,
    apellido,
    usuario,
    correo,
    hashContrasenia,
    id_rela_tipo_usuario || 2, // Este campo debe corresponder al select del frontend
  ]);

  res.json({
    msg: "Registrado correctamente",
  });
};


export const login = async (req, res) => {
  const { usuario, contrasenia } = req.body;

  const connection = await connectDB();

  const sql = `
    SELECT u.*, t.descripcion AS tipo_usuario
    FROM USUARIOS u
    JOIN tipousuario t ON u.id_rela_tipo_usuario = t.idTipoUsuario
    WHERE u.usuario = ? LIMIT 1
  `;

  const [buscarUsuario] = await connection.query(sql, [usuario]);

  if (!buscarUsuario[0]) {
    return res.status(400).json({
      msg: "El usuario no existe",
    });
  }

  const validarContrasenia = bcrypt.compareSync(
    contrasenia,
    buscarUsuario[0].contrasenia
  );

  if (!validarContrasenia) {
    return res.status(401).json({
      msg: "El usuario o contraseña no coinciden",
    });
  }

  // Genera el token incluyendo el tipo de usuario
  const token = await generarJWT({
    id: buscarUsuario[0].id,
    tipo_usuario: buscarUsuario[0].tipo_usuario,
  });

  return res.json({
    msg: "Inicio de sesión exitoso",
    token,
    tipo_usuario: buscarUsuario[0].tipo_usuario, // Devuelve el tipo de usuario en la respuesta
  });
};
