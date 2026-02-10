import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logoSura from "./../../imagenes/logoSura.png";

function Navbar() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const salir = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const redirigir = (ruta) => {
    navigate(ruta);
    setMenuAbierto(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-sura-izquierda">
        <img src={logoSura} alt="Logo Sura" className="logo-sura-navbar" />
        <h3>Hola, {usuario?.nombre} 👋</h3>
      </div>
      
      <div className="acciones-derecha">
        <div className="contenedor-menu">
          <button
            className="boton-menu"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            ☰
          </button>

          {menuAbierto && (
            <div className="menu-lateral menu-derecha">
              <div onClick={() => redirigir("/home")} className="menu-paginas">
                🏠 Home
              </div>
              <div onClick={() => redirigir("/usuarios")} className="menu-paginas">
                👤 Usuarios
              </div>
              <div onClick={() => redirigir("/configuracion")} className="menu-paginas">
                ⚙️ Configuración
              </div>
              <div onClick={salir} className="menu-paginas salir-menu">
                🚪 Cerrar sesión
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


