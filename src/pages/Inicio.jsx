import { Link } from "react-router-dom";
import "./Inicio.css";
import logoSura from "./../imagenes/logoSura.png";
function Inicio() {
  return (
    <div className="contenedor-inicio">

      <img src={logoSura} alt="Logo Sura" className="logo-sura-inicio" />

      <h1>Bienvenido</h1>

      <Link to="/login">
        <button>Iniciar sesión</button>
      </Link>

      <Link to="/registro">
        <button>Registrarse</button>
      </Link>
    </div>
  );
}

export default Inicio;
