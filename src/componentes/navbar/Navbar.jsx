import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logoSura from "./../../imagenes/logoSura.png";

function Navbar() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const salir = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-izquierda">
        <img src={logoSura} alt="Logo Sura" className="logo-sura-navbar" />
        <h3>Hola, {usuario?.nombre} 👋</h3>
      </div>
      <button onClick={salir}>Cerrar sesión</button>
    </nav>
  );
}

export default Navbar;
