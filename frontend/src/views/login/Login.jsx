// src/views/login/Login.jsx
import { useState, useContext } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom"; 
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const { stateDispatch } = useContext(UserContext);
  const [form, setForm] = useState({
    usuario: "",
    contrasenia: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const peticion = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const response = await peticion.json();
  
      // Log para ver la respuesta completa del servidor
      console.log("Respuesta del servidor:", response);
  
      if (peticion.ok) {
        // Guarda el token y los datos del usuario en localStorage
        localStorage.setItem("userData", JSON.stringify({
          isLogged: true,
          token: response.token,
          usuario: form.usuario,
          role: response.tipo_usuario, // Cambia 'role' a 'tipo_usuario'
        }));
  
        stateDispatch({
          type: "login",
          payload: {
            token: response.token,
            usuario: form.usuario,
            role: response.tipo_usuario, // Cambia 'role' a 'tipo_usuario'
          },
        });
  
        switch (response.tipo_usuario) { // Cambia 'role' a 'tipo_usuario'
          case "estudiante":
            navigate("/estudiantes"); // Ruta para el dashboard de estudiantes
            break;
          case "profesor":
            navigate("/profesores"); // Ruta para el dashboard de profesores
            break;
          case "admin":
            navigate("/admin"); // Ruta para el dashboard de administradores
            break;
          default:
            setErrorMessage("Rol no reconocido.");
            console.error("Rol no reconocido:", response.tipo_usuario);
            break;
        }
        
      } else {
        console.error("Error al iniciar sesión:", response.msg); // Log del error en la respuesta
        setErrorMessage(response.msg || "Error al iniciar sesión.");
      }
    } catch (error) {
      console.error("Error de conexión:", error); // Log del error de conexión
      setErrorMessage("Error de conexión. Inténtalo de nuevo.");
    }
  };
  
  return (
    <main className="login-container">
      <div className="login-header">
        <h2 className="login-title">Inicia sesión</h2>
        <span></span>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Form className="login-form" onSubmit={handleSubmit}>
        <FloatingLabel controlId="usuario" label="Nombre de Usuario" className="mb-3">
          <Form.Control
            type="text"
            placeholder="example123"
            name="usuario"
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="contrasenia" label="Contraseña" className="mb-3 password-input">
          <Form.Control
            type="password"
            placeholder="name12312"
            name="contrasenia"
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <span className="login-label">
          ¿No tienes una cuenta? <Link to={"/register"}>Regístrate</Link>
        </span>

        <button className="button-login" type="submit">
          Iniciar Sesión
        </button>
      </Form>
    </main>
  );
};

export default Login;
