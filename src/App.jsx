import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import LoginUsuarios from "./componentes/login/LoginUsuarios";
import UsuarioFormulario from "./componentes/formulario/UsuarioFormulario";
import Home from "./pages/Home";
import "./App.css";
import "./componentes/colores/Colores.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginUsuarios />} />
        <Route path="/registro" element={<UsuarioFormulario />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

