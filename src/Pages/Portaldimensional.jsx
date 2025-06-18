import { Link } from "react-router-dom";

export default function PortalDimensional() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#e62429" }}> PORTAL DIMENSIONAL </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
        O Multiverso está instável! Sua missão é explorar duas realidades diferentes acessando a
        <strong> página de detalhes de dois heróis distintos</strong>.
      </p>
      
      <p>Encontre curiosidades em cada herói. Se não houver descrição, invente uma!</p>

      <div style={{ backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
        <h3>Exemplo de Curiosidades:</h3>
        <ul style={{ textAlign: "left", maxWidth: "500px", margin: "auto" }}>
          <li><strong>Homem de Ferro:</strong> Gênio, bilionário, filantropo... e viciado em café.</li>
          <li><strong>Doutor Estranho:</strong> Já discutiu com a própria Capa da Levitação por 2 horas.</li>
          <li><strong>Deadpool:</strong> Herói misterioso, só aparece quando não tem bug no código.</li>
        </ul>
      </div>

      <Link to="/listadepersonagens" style={{ marginTop: "20px", display: "inline-block", padding: "10px 20px", backgroundColor: "#e62429", color: "#fff", borderRadius: "5px", textDecoration: "none" }}>
        Começar Exploração
      </Link>
    </div>
  );
}
