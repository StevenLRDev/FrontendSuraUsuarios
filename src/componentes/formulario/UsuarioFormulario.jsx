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

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
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

    const respuesta = await fetch("http://localhost:8080/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const dato = await respuesta.json();

    if (!respuesta.ok) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: dato.mensaje || "Usuario ya registrado",
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

      <form onSubmit={handleSubmit} className="usuario-formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
        />
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
        <select name="rol" onChange={handleChange} defaultValue="">
          <option value="" disabled>
            Selecciona un rol
          </option>
          <option value="ADMIN">ADMIN</option>
          <option value="USUARIO">USUARIO</option>
        </select>
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
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
