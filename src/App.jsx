import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import BuscaHerois from "./Components/BuscaHerois";
import Detalhes from "./Components/DetalhesHeroi";
import ListaDePersonagens from "./Components/ListaPersonagem";
import PortalDimensional from "./Pages/Portaldimensional";
import Sobre from "./Pages/Sobre";
import RankingHerois from "./Components/Ranking";
import ModoEscuroEClaro from "./Pages/ModoEscuro&Claro";
import "./App.css";
import './Components/Navbar.css';
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ModoEscuroEClaro />

      <nav className="naveg">
        <Link to="/"> MARVEL </Link>
        <Link to="/buscaHerois"> BUSCA HERÓIS </Link>
        <Link to="/listadepersonagens"> LISTA DE PERSONAGENS </Link>
        <Link to="/portal">PORTAL DIMENSIONAL</Link>
        <Link to="/ranking">RANKING</Link>
        <Link to="/sobre">SOBRE</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscaHerois" element={<BuscaHerois />} />
        <Route path="/detalhes" element={<Detalhes />} />
        <Route path="/listadepersonagens" element={<ListaDePersonagens />} />
        <Route path="/portal" element={<PortalDimensional />} />
        <Route path="/ranking" element={<RankingHerois />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
