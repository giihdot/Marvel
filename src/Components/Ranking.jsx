import { useState } from "react";
import "./Ranking.css"

export default function RankingHerois() {
  
  // Declara o estado de votos, inicializando com os dados do localStorage ou um objeto vazio
  const [votos, setVotos] = useState(() => {
    const salvo = localStorage.getItem("ranking"); // Tenta obter os votos salvos do localStorage
    return salvo ? JSON.parse(salvo) : {}; // Se houver, converte de JSON para objeto; caso contrário, retorna um objeto vazio
  });

  // Define a lista de heróis disponíveis para votação
  const herois = ["Homem de Ferro", "Thor", "Capitão América", "Viúva Negra", "Homem-Aranha"];

  // Função para registrar um voto para um herói
  function votar(nome) {
    const novo = { ...votos, [nome]: (votos[nome] || 0) + 1 }; // Cria um novo objeto de votos, incrementando o voto do herói
    setVotos(novo); // Atualiza o estado de votos com o novo objeto
    localStorage.setItem("ranking", JSON.stringify(novo)); // Salva os novos votos no localStorage como uma string JSON
  }

  // Cria o ranking a partir dos votos, ordenando do maior para o menor
  const ranking = Object.entries(votos).sort((a, b) => b[1] - a[1]);

  // Renderiza o componente
  return (
    <div className="ranking-container"> {/* Aplica a classe de estilo ao contêiner */}
      <h2>🏆 Vote no Herói Mais Amado!</h2> {/* Título do componente com emoji */}
      {herois.map((nome) => ( // Mapeia cada herói para criar um botão de votação
        <button key={nome} onClick={() => votar(nome)} style={{ margin: "5px" }}> {/* Define a chave do botão como o nome do herói e chama a função votar ao clicar */}
          {nome} {/* Exibe o nome do herói no botão */}
        </button>
      ))}
      <h3>Ranking:</h3> {/* Título para a seção de ranking */}
      <ol> {/* Inicia uma lista ordenada para exibir o ranking */}
        {ranking.map(([nome, qtd], index) => { // Mapeia o ranking para criar uma lista de itens
          const medalhas = ["🥇", "🥈", "🥉"]; // Define os emojis para as posições
          const emoji = medalhas[index] || "⭐"; // Seleciona o emoji correspondente à posição ou um padrão
          const classeItem = index === 0 ? "primeiro-lugar" : ""; // Aplica classe especial para o 1º lugar

          return ( // Retorna o item da lista
            <li key={nome} className={classeItem}> {/* Define a chave do item como o nome do herói e aplica a classe se for o primeiro lugar */}
              <span>{emoji} {nome}</span> {/* Exibe o emoji e o nome do herói */}
              <span>{qtd} votos</span> {/* Exibe a quantidade de votos */}
            </li>
          );
        })}
      </ol> {/* Fecha a lista ordenada */}
    </div> // Fecha o contêiner principal
  );
}
