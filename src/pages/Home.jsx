import { Navigate } from "react-router-dom";
import Navbar from "../componentes/navbar/Navbar";
import UsuarioLista from "../componentes/lista/ListaUsuarios";
import "./Home.css";

function Home() {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <UsuarioLista />
    </>
  );
}

export default Home;
