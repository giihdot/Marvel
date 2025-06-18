import { useEffect, useState } from 'react';

function DetalhesHerois() {
  // Estado que armazena os dados do herói
  const [heroi, setHeroi] = useState(null);
  // Estado para controlar o carregamento
  const [carregando, setCarregando] = useState(true);

  // Chave pública da API da Marvel
  const publicKey = '3e8bef26ce91bf500ab574be3cc76285';
  // ID do personagem a ser buscado
  const characterId = '450a95fff14e78a0aa9686b4d4889bfd52e90435';

  // useEffect roda uma vez ao carregar o componente
  useEffect(function () {
    // Função assíncrona para buscar os dados do herói
    async function buscarHeroi() {
      try {
        // Faz a requisição à API da Marvel usando o ID e a chave pública
        const resposta = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${publicKey}`
        );
        // Converte a resposta para JSON
        const dados = await resposta.json();
        // Pega o primeiro personagem do array de resultados
        const personagem = dados.data.results[0];
        // Atualiza o estado com o herói encontrado
        setHeroi(personagem);
      } catch (erro) {
        // Se der erro, mostra no console
        console.error('Erro ao buscar herói:', erro);
      } finally {
        // Finaliza o carregamento (seja com erro ou sucesso)
        setCarregando(false);
      }
    }

    // Chama a função que busca o herói
    buscarHeroi();
  }, []); // O array vazio [] garante que o useEffect rode só uma vez

  // Se estiver carregando, mostra uma mensagem temporária
  if (carregando) {
    return <p>Carregando heróis...</p>;
  }

  // Se o herói não for encontrado, mostra mensagem de erro
  if (!heroi) {
    return <p>Herói não encontrado.</p>;
  }

  // Se tudo deu certo, renderiza os detalhes do herói
  return (
    <div>
      {/* Nome do herói */}
      <h1>{heroi.name}</h1>

      {/* Imagem do herói */}
      <img
        src={`${heroi.thumbnail.path}.${heroi.thumbnail.extension}`}
        alt={heroi.name}
        style={{ width: '300px', borderRadius: '8px' }}
      />

      {/* ID do herói */}
      <p><strong>ID:</strong> {heroi.id}</p>

      {/* Descrição do herói ou uma frase padrão */}
      <p><strong>Descrição:</strong> {heroi.description || 'Sem descrição disponível.'}</p>

      {/* Data da última modificação */}
      <p><strong>Última modificação:</strong> {new Date(heroi.modified).toLocaleDateString()}</p>

      {/* Título da galeria de quadrinhos */}
      <h3>Galeria de HQs</h3>

      {/* Lista de quadrinhos estilizada com flexbox */}
      <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: 0, listStyle: "none" }}>
        {/* Verifica se há quadrinhos, se sim, renderiza cada um */}
        {heroi.comics.items.length > 0 ? (
          heroi.comics.items.map((comic, index) => (
            // Cada quadrinho é uma caixinha com nome
            <li
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: "#f8f8f8",
                fontSize: "14px"
              }}
            >
              {comic.name}
            </li>
          ))
        ) : (
          // Se não houver quadrinhos, mostra mensagem
          <li>Sem quadrinhos disponíveis.</li>
        )}
      </ul>

      {/* Título da seção de séries */}
      <h3>Séries</h3>

      {/* Lista de séries em que o herói aparece */}
      <ul>
        {/* Verifica se há séries, se sim, renderiza cada uma */}
        {heroi.series.items.length > 0 ? (
          heroi.series.items.map(function (serie, index) {
            return <li key={index}>{serie.name}</li>; // Cada série é uma lista
          })
        ) : (
          // Se não houver séries, mostra mensagem
          <li>Sem séries disponíveis.</li>
        )}
      </ul>
    </div>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default DetalhesHerois;
