import { useState } from "react";
import "./UsuarioFormulario.css";
import Swal from "sweetalert2";
import logoSura from "./../../imagenes/logoSura.png";

function UsuarioFormulario() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    rol: "",
    telefono: "",
  });

  const capturarDatos = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState("");

  const validarCorreo = (correo) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  };

  const validarTelefono = (telefono) => {
    return /^[0-9]{7,10}$/.test(telefono);
  };

  const envioDatos = async (e) => {
    e.preventDefault();

    if (
      !usuario.nombre ||
      !usuario.correo ||
      !usuario.contraseña ||
      !usuario.rol
    ) {
      setError("Todos los campos obligatorios deben estar llenos");
      return;
    }

    if (!validarCorreo(usuario.correo)) {
      setError("El correo no es válido");
      return;
    }

    if (usuario.telefono && !validarTelefono(usuario.telefono)) {
      setError("El teléfono solo debe contener números (7 a 10 dígitos)");
      return;
    }

    if (usuario.contraseña.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setError("");

    const respuesta = await fetch("http://localhost:8080/apisura8/v1/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!respuesta.ok) {
      const mensajeError = await respuesta.text();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: mensajeError || "No se pudo crear el usuario",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "¡Éxito!",
      text: "Usuario creado correctamente",
      timer: 2000,
      showConfirmButton: false,
    });

    setUsuario({
      nombre: "",
      correo: "",
      contraseña: "",
      rol: "",
      telefono: "",
    });
  };

  return (
    <div className="contenedor-formulario">
      <img src={logoSura} alt="Logo Sura" className="logo-sura-formulario" />

      <form onSubmit={envioDatos} className="usuario-formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={usuario.nombre}
          onChange={capturarDatos}
        />
        <input
          type="text"
          name="correo"
          placeholder="Correo"
          value={usuario.correo}
          onChange={capturarDatos}
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={usuario.contraseña}
          onChange={capturarDatos}
        />
        <select name="rol" value={usuario.rol} onChange={capturarDatos}>
          <option value="">Selecciona un rol</option>
          <option value="Profesor">PROFESOR</option>
          <option value="Estudiante">ESTUDIANTE</option>
        </select>
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={usuario.telefono}
          onChange={capturarDatos}
        />

        {error && <p className="error-mensaje">{error}</p>}

        <button type="submit" disabled={!usuario.rol}>
          Guardar
        </button>
        <p>
          Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </form>
    </div>
  );
}

export default UsuarioFormulario;