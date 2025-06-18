import { useState } from "react";
import "./Ranking.css"

// Exporta o componente RankingHerois como padrão
export default function RankingHerois() {
  // Declara o estado de votos, inicializando com os dados do localStorage ou um objeto vazio
  const [votos, setVotos] = useState(() => {
    const salvo = localStorage.getItem("ranking"); // Tenta obter os votos salvos do localStorage
    return salvo ? JSON.parse(salvo) : {}; // Se houver, converte de JSON para objeto; caso contrário, retorna um objeto vazio
  });

  // Define a lista de heróis disponíveis para votação para que a pessoa vote 
  const herois = ["Homem de Ferro", "Thor", "Capitão América", "Viúva Negra", "Homem-Aranha"];

  // Função para registrar um voto para um herói
  function votar(nome) {
    const novo = { ...votos, [nome]: (votos[nome] || 0) + 1 }; // Cria um novo objeto de votos, incrementando o voto do herói
    setVotos(novo); // Atualiza o estado de votos
    localStorage.setItem("ranking", JSON.stringify(novo)); // Salva os novos votos no localStorage
  }

  // Cria o ranking a partir dos votos, ordenando do maior para o menor
  const ranking = Object.entries(votos).sort((a, b) => b[1] - a[1]);

  // Renderiza o componente
  return (
    <div style={{ marginTop: 30 }}> {/* Define um estilo de margem superior para o contêiner */}
      <h2>🏆 Vote no Herói Mais Amado!</h2> {/* Título do componente */}
      {herois.map((nome) => ( /* Mapeia cada herói para criar um botão de votação */
        <button key={nome} onClick={() => votar(nome)} style={{ margin: "5px" }}> {/* Define a chave do botão como o nome do herói e chama a função votar ao clicar */}
          {nome} {/* Exibe o nome do herói no botão */}
        </button>
      ))}
      <h3>Ranking:</h3> {/* Título para a seção de ranking */}
      <ol>
        {ranking.map(([nome, qtd], index) => {
          // Define o emoji da posição
          const medalhas = ["🥇", "🥈", "🥉"];
          const emoji = medalhas[index] || "⭐";

          // Aplica classe especial para o 1º lugar
          const classeItem = index === 0 ? "primeiro-lugar" : "";

          return (
            <li key={nome} className={classeItem}>
              <span>{emoji} {nome}</span>
              <span>{qtd} votos</span>
            </li>
          );
        })}
      </ol>
    </div> // Fecha o contêiner principal
  );
}