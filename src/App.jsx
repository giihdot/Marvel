import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Herois from "./Components/Herois"
import Favoritos from "./Pages/Favoritos"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <nav className="naveg">
        <Link to="/"> MARVEL </Link>
        <Link to="/favoritos"> FAVORITOS </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Herois />} />
        <Route path="/favoritos" element={<Favoritos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
