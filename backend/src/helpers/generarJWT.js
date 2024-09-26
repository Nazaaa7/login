import jwt from "jsonwebtoken";

export const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    // Encapsulamos el id en un objeto.
    const payload = { id };

    jwt.sign(
      payload, 
      process.env.JWT_SECRET || "mysecret", // Usamos una variable de entorno o un valor por defecto
      {
        expiresIn: '24h', // Se puede escribir como '24h' para mayor claridad
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
