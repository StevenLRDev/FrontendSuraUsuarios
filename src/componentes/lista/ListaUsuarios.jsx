import { useEffect, useState } from "react";
import "./ListaUsuarios.css";
import Swal from "sweetalert2";

function UsuarioLista() {
  const [usuarios, setUsuarios] = useState([]);
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    fetch("http://localhost:8080/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error(err));
  }, []);

  const eliminarUsuario = (id) => {
    if (usuarioLogueado.rol !== "ADMIN") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No tienes permisos para eliminar usuarios",
      });
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#05C3DE",
      cancelButtonColor: "#001E60",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/usuarios/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "rol-usuario": usuarioLogueado.rol,
          },
        })
          .then(async (res) => {
            if (!res.ok) {
              const msg = await res.text();
              throw new Error(msg);
            }
            setUsuarios(usuarios.filter((u) => u.id !== id));
            Swal.fire(
              "Eliminado",
              "El usuario ha sido eliminado correctamente.",
              "success",
            );
          })
          .catch((err) => {
            Swal.fire("Error", err.message, "error");
          });
      }
    });
  };

  return (
    <div className="usuario-lista">
      <h2>Usuarios registrados</h2>

      {usuarios.length === 0 && <p>No hay usuarios</p>}

      <div className="usuario-cuadricula">
        {usuarios.map((u) => (
          <div className="usuario-carta" key={u.id}>
            <h3>{u.nombre}</h3>
            <p>
              <strong>Correo:</strong> {u.correo}
            </p>
            <p>
              <strong>Rol:</strong> {u.rol}
            </p>
            <p>
              <strong>Teléfono:</strong> {u.telefono}
            </p>

            <button
              className="boton-eliminar"
              onClick={() => eliminarUsuario(u.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsuarioLista;
