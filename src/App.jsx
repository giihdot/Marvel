import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BuscaHerois from "./Components/BuscaHerois";
import Detalhes from "./Components/DetalhesHeroi";
import Home from './Pages/Home';
import ListaDePersonagens from "./Components/ListaPersonagem";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="naveg">
        <Link to="/"> 🛡️ MARVEL </Link>
        <Link to="/buscaHerois"> BUSCA HERÓIS </Link>
        <Link to="/listadepersonagens"> LISTA DE PERSONAGENS </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscaHerois" element={<BuscaHerois />} />
        <Route path="/detalhes" element={<Detalhes />} />
        <Route path="/listadepersonagens" element={<ListaDePersonagens />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
