import { useEffect, useState } from "react";
import "./ListaUsuarios.css";

function UsuarioLista() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/apisura8/v1/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error(err));
  }, []);

  const verDetalle = (id) => {
    fetch(`http://localhost:8080/apisura8/v1/usuarios/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Usuario no encontrado");
        }
        return res.json();
      })
      .then((data) => {
        setUsuarioSeleccionado(data);
      })
      .catch((err) => {
        console.error(err);
        alert("No se pudo cargar el usuario");
      });
  };

  return (
    <div className="usuario-lista">
      <h2>Usuarios registrados</h2>

      {usuarios.length === 0 && <p>No hay usuarios</p>}

      <div className="usuario-cuadricula">
        {usuarios.map((usuario) => (
          <div className="usuario-carta" key={usuario.id}>
            <h3>{usuario.nombre}</h3>
            <p><strong>Rol:</strong> {usuario.rol}</p>

            <button onClick={() => verDetalle(usuario.id)}>
              Ver detalle
            </button>
          </div>
        ))}
      </div>

      {usuarioSeleccionado && (
        <div className="usuario-detalle">
          <h3>Detalle del usuario</h3>
          <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</p>
          <p><strong>Correo:</strong> {usuarioSeleccionado.correo}</p>
          <p><strong>Rol:</strong> {usuarioSeleccionado.rol}</p>
          <p><strong>Teléfono:</strong> {usuarioSeleccionado.telefono}</p>
        </div>
      )}
    </div>
  );
}

export default UsuarioLista;
