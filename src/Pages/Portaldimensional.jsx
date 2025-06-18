// Importa o componente Link do react-router-dom para navegação entre páginas
import { Link } from "react-router-dom";

export default function PortalDimensional() {
  
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", textAlign: "center" }}> // Define um contêiner com estilo de padding, fonte e alinhamento central
      <h1 style={{ fontSize: "2.5rem", color: "#e62429" }}> PORTAL DIMENSIONAL </h1> // Título principal com tamanho de fonte e cor
      <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}> // Parágrafo com tamanho de fonte e margem inferior
        O Multiverso está instável! Sua missão é explorar duas realidades diferentes acessando a
        <strong> página de detalhes de dois heróis distintos</strong>. // Texto em negrito para destacar a parte da missão
      </p>
      
<<<<<<< HEAD
      <p>Encontre curiosidades em cada herói. Se não houver descrição, invente uma!</p>

      <div style={{ backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
        <h3>Exemplo de Curiosidades:</h3>
        <ul style={{ textAlign: "left", maxWidth: "500px", margin: "auto" }}>
          <li><strong>Homem de Ferro:</strong> Gênio, bilionário, filantropo... e viciado em café.</li>
          <li><strong>Doutor Estranho:</strong> Já discutiu com a própria Capa da Levitação por 2 horas.</li>
          <li><strong>Deadpool:</strong> Herói misterioso, só aparece quando não tem bug no código.</li>
        </ul>
      </div>
=======
      <p>🚀 Encontre curiosidades em cada herói. Se não houver descrição, invente uma!</p> // Parágrafo incentivando a exploração de curiosidades

      <div style={{ backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "10px", marginTop: "20px" }}> // Contêiner com fundo cinza claro, padding, bordas arredondadas e margem superior
        <h3>📌 Exemplo de Curiosidades:</h3> // Título para a seção de exemplos de curiosidades
        <ul style={{ textAlign: "left", maxWidth: "500px", margin: "auto" }}> // Lista não ordenada com estilo de alinhamento à esquerda, largura máxima e centralização
          <li><strong>Homem de Ferro:</strong> Gênio, bilionário, filantropo... e viciado em café.</li> // Item da lista com texto em negrito
          <li><strong>Doutor Estranho:</strong> Já discutiu com a própria Capa da Levitação por 2 horas.</li> // Item da lista com texto em negrito
          <li><strong>Deadpool:</strong> Herói misterioso, só aparece quando não tem bug no código.</li> // Item da lista com texto em negrito
        </ul> // Fecha a lista não ordenada
      </div> // Fecha o contêiner de exemplos de curiosidades
>>>>>>> b0c1751a4664432453da66ec0a45d9391bd6ceb6

      <Link to="/listadepersonagens" style={{ marginTop: "20px", display: "inline-block", padding: "10px 20px", backgroundColor: "#e62429", color: "#fff", borderRadius: "5px", textDecoration: "none" }}> // Link para a página de lista de personagens com estilo de margem superior, exibição em bloco, padding, cor de fundo, cor do texto, bordas arredondadas e sem sublinhado
        Começar Exploração // Texto do link
      </Link> // Fecha o componente Link
    </div> 
  );
}
