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

  const capturarDatos = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const envioDatos = async (e) => {
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
        "http://localhost:8080/apisura8/v1/usuarios",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!respuesta.ok) {
        throw new Error("Error al conectar con el servidor");
      }

      const usuarios = await respuesta.json();

      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.correo === login.correo &&
          usuario.contraseña === login.contraseña,
      );

      if (!usuarioEncontrado) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Correo o contraseña incorrectos",
        });
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: `Hola ${usuarioEncontrado.nombre}`,
        timer: 1500,
        showConfirmButton: false,
        allowOutsideClick: false,
        scrollbarPadding: false,
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
      <form className="login-formulario" onSubmit={envioDatos}>
        <h2>Iniciar sesión</h2>

        <input
          type="text"
          name="correo"
          placeholder="Correo"
          onChange={capturarDatos}
        />

        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          onChange={capturarDatos}
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
