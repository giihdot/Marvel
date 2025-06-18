import { useState, useEffect } from "react";

export default function RankingHerois() {
  const [votos, setVotos] = useState(() => {
    const salvo = localStorage.getItem("ranking");
    return salvo ? JSON.parse(salvo) : {};
  });

  const herois = ["Homem de Ferro", "Thor", "Capitão América", "Viúva Negra", "Homem-Aranha"];

  function votar(nome) {
    const novo = { ...votos, [nome]: (votos[nome] || 0) + 1 };
    setVotos(novo);
    localStorage.setItem("ranking", JSON.stringify(novo));
  }

  const ranking = Object.entries(votos).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ marginTop: 30 }}>
      <h2>🏆 Vote no Herói Mais Amado!</h2>
      {herois.map((nome) => (
        <button key={nome} onClick={() => votar(nome)} style={{ margin: "5px" }}>
          {nome}
        </button>
      ))}
      <h3>Ranking:</h3>
      <ol>
        {ranking.map(([nome, qtd]) => (
          <li key={nome}>{nome}: {qtd} votos</li>
        ))}
      </ol>
    </div>
  );
}
