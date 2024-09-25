import { useContext, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { userType } from "../../context/userTypes";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import "./login.css";

const Login = () => {
  const { stateDispatch } = useContext(UserContext);
  const navigate = useNavigate(); // Inicializa useNavigate para redirigir

  const [form, setForm] = useState({
    usuario: "",
    contrasenia: "",
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const peticion = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json",
      },
    });

    const response = await peticion.json();

    if (peticion.ok) {
      // Guarda el token y el rol en el localStorage
      localStorage.setItem(
        "userData",
        JSON.stringify({
          isLogged: true,
          token: response.token,
          role: response.role, // Asegúrate de que el rol venga en la respuesta
        })
      );

      // Actualiza el estado global
      stateDispatch({
        type: userType.login,
        token: response.token,
        usuario: form.usuario,
      });

      // Redirige según el rol del usuario
      if (response.role === "student") {
        navigate("/student/index"); // Redirige al index del estudiante
      } else if (response.role === "teacher") {
        navigate("/teacher/index"); // Redirige al index del profesor
      } else if (response.role === "admin") {
        navigate("/admin/index"); // Redirige al index del administrador
      }
    } else {
      // Manejo de errores
      alert(response.msg);
    }
  };

  return (
    <main className="login-container">
      <div className="login-header">
        <h2 className="login-title">Login</h2>
        <span></span>
      </div>
      <Form className="login-form" onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="usuario"
          label="Nombre de Usuario"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="example123"
            name="usuario"
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="contrasenia"
          label="Contraseña"
          className="mb-3 password-input"
        >
          <Form.Control
            type="password"
            placeholder="name12312"
            name="contrasenia"
            onChange={handleChange}
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
