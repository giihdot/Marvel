import { useEffect, useState } from 'react';

function DetalhesHerois() {
  const [heroi, setHeroi] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // 🔑 Sua chave pública da API Marvel
  const publicKey = '3e8bef26ce91bf500ab574be3cc76285';
  // 🆔 ID do personagem (Exemplo: Homem de Ferro = 1009368)
  const characterId = '450a95fff14e78a0aa9686b4d4889bfd52e90435';

  // 🔍 Função para buscar os dados do herói
  useEffect(function() {
    async function buscarHeroi() {
      try {
        const resposta = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${publicKey}`
        );
        const dados = await resposta.json();
        const personagem = dados.data.results[0];
        setHeroi(personagem);
      } catch (erro) {
        console.error('Erro ao buscar herói:', erro);
      } finally {
        setCarregando(false);
      }
    }

    buscarHeroi();
  }, []);

  // 🔄 Se estiver carregando
  if (carregando) {
    return <p>Carregando heróis...</p>;
  }

  // ❌ Se não encontrar o heróis
  if (!heroi) {
    return <p>Herói não encontrado.</p>;
  }

  // ✅ Conteúdo do herói
  return (
    <div>
      <h1>{heroi.name}</h1>
      <img
        src={`${heroi.thumbnail.path}.${heroi.thumbnail.extension}`}
        alt={heroi.name}
        style={{ width: '300px', borderRadius: '8px' }}
      />
      <p><strong>ID:</strong> {heroi.id}</p>
      <p><strong>Descrição:</strong> {heroi.description || 'Sem descrição disponível.'}</p>
      <p><strong>Última modificação:</strong> {new Date(heroi.modified).toLocaleDateString()}</p>

      <h3>Quadrinhos (Comics)</h3>
      <ul>
        {heroi.comics.items.length > 0 ? (
          heroi.comics.items.map(function(comic, index) {
            return <li key={index}>{comic.name}</li>;
          })
        ) : (
          <li>Sem quadrinhos disponíveis.</li>
        )}
      </ul>

      <h3>Séries</h3>
      <ul>
        {heroi.series.items.length > 0 ? (
          heroi.series.items.map(function(serie, index) {
            return <li key={index}>{serie.name}</li>;
          })
        ) : (
          <li>Sem séries disponíveis.</li>
        )}
      </ul>
    </div>
  );
}

export default DetalhesHerois;
