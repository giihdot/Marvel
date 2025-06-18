import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Favoritos from "./Pages/Favoritos"
import BuscaHerois from "./Components/BuscaHerois";
import Detalhes from "./Components/DetalhesHeroi";
import ListaDePersonagens from "./Components/ListaPersonagem";
import PortalDimensional from "./Pages/Portaldimensional";
import "./App.css";
import './Components/Navbar.css'
import Header from "./Components/Header";


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <nav className="naveg">
        <Link to="/"> MARVEL </Link>
        {/* <Link to="/favoritos"> FAVORITOS </Link> */}
        <Link to="/buscaHerois"> BUSCA HEROIS </Link>
        <Link to="/listadepersonagens"> LISTA DE PERSONAGENS </Link>
        <Link to="/portal">PORTAL DIMENSIONAL</Link>
        <Link path="/portal" element={<PortalDimensional />} />
    
      </nav>

      <Routes>
        {/* <Route path="/favoritos" element={<Favoritos/>} /> */}
        <Route path="/buscaHerois" element={<BuscaHerois />} />
        <Route path="/detalhes" element={<Detalhes />} />
        <Route path="/listadepersonagens" element={<ListaDePersonagens />} />
        <Route path="/portal" element={<PortalDimensional />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
