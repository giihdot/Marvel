import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
// import Favoritos from "./Pages/Favoritos"
import BuscaHerois from "./Components/BuscaHerois"
import Detalhes from "./Components/DetalhesHeroi"
import ListaDePersonagens from "./Components/ListaPersonagem"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <nav className="naveg">
        <Link to="/"> MARVEL </Link>
        {/* <Link to="/favoritos"> FAVORITOS </Link> */}
        <Link to="/herois"> HERÓIS </Link>
        <Link to="/buscaHerois"> BUSCA HEROIS </Link>
        <Link to="/listadepersonagens"> LISTA DE PERSONAGENS </Link>
      </nav>

      <Routes>
        {/* <Route path="/" element={<Herois />} /> */}
        {/* <Route path="/favoritos" element={<Favoritos/>} /> */}
        <Route path="/buscaHerois" element={<BuscaHerois/>} />
        <Route path="/detalhes" element={<Detalhes/>} />
        <Route path="/listadepersonagens" element={<ListaDePersonagens/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
