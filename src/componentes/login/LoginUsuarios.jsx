import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginUsuarios.css";
import Swal from "sweetalert2";
import logoSura from "./../../imagenes/logoSura.png";

function LoginUsuarios() {
  const [login, setLogin] = useState({
    correo: "",
    contraseña: "",
  });

  const navegacion = useNavigate();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login.correo || !login.contraseña) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Correo y contraseña obligatorios",
      });
      return;
    }

    try {
      const respuesta = await fetch(
        "http://localhost:8080/autenticacion/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: login.correo,
            password: login.contraseña,
          }),
        },
      );

      const dato = await respuesta.json();

      if (!respuesta.ok) {
        // Si vienen errores de validación
        const mensaje = dato.mensaje
          ? dato.mensaje
          : Object.values(dato).join("\n");

        Swal.fire({
          icon: "error",
          title: "Error",
          text: mensaje,
        });
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(dato));

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: `Hola ${dato.nombre}`,
        timer: 1500,
        showConfirmButton: false,
      });

      navegacion("/home");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor",
      });
      console.error(err);
    }
  };

  return (
    <div className="contenedor-login">
      <img src={logoSura} alt="Logo Sura" className="logo-sura-login" />
      <form className="login-formulario" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <input
          type="text"
          name="correo"
          placeholder="Correo"
          onChange={handleChange}
        />

        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <button type="submit">Entrar</button>
        <p>
          No tienes cuenta? <a href="/registro">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
}

export default LoginUsuarios;
