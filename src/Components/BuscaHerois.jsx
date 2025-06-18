import { useState, useEffect } from 'react';
import md5 from 'md5';

const publicKey = '3e8bef26ce91bf500ab574be3cc76285';
const privateKey = '450a95fff14e78a0aa9686b4d4889bfd52e90435';

const STORAGE_KEY = 'marvel_herois_favoritos';

export default function BuscaHerois() {
  const [busca, setBusca] = useState('');
  const [herois, setHerois] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [heroiDetalhe, setHeroiDetalhe] = useState(null);

  useEffect(() => {
    const favoritosSalvos = localStorage.getItem(STORAGE_KEY);
    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos));
    }
  }, []);

  function salvarFavoritos(novosFavoritos) {
    setFavoritos(novosFavoritos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novosFavoritos));
  }

  function toggleFavorito(heroi) {
    const existe = favoritos.find(fav => fav.id === heroi.id);
    if (existe) {
      const novos = favoritos.filter(fav => fav.id !== heroi.id);
      salvarFavoritos(novos);
    } else {
      const novoFav = {
        id: heroi.id,
        name: heroi.name,
        thumbnail: heroi.thumbnail,
      };
      salvarFavoritos([...favoritos, novoFav]);
    }
  }

  function limparCofre() {
    localStorage.removeItem(STORAGE_KEY);
    setFavoritos([]);
    alert('Todos os arquivos confidenciais foram destruídos. Nick Fury agradece!');
  }

  async function buscarHerois(termoBusca) {
    const termo = termoBusca.trim();
    if (!termo) return;

    setCarregando(true);
    setErro('');
    setHerois([]);
    setHeroiDetalhe(null);

    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);

    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${encodeURIComponent(
      termo
    )}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (dados.data.results.length > 0) {
        setHerois(dados.data.results);
      } else {
        setErro('Nenhum herói encontrado.');
      }
    } catch (e) {
      setErro('Erro ao buscar heróis.');
      console.error(e);
    } finally {
      setCarregando(false);
    }
  }

  function estaFavorito(id) {
    return favoritos.some(fav => fav.id === id);
  }

  return (
    <div>
      <h1>Busca de Heróis da Marvel</h1>

      <div>
        <input
          type="text"
          placeholder="Digite o nome do herói"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <button onClick={() => buscarHerois(busca)}>Buscar</button>
        <button onClick={limparCofre}>Limpar Cofre!</button>
        <button onClick={() => buscarHerois('Spi')}>🔍 Missão "Spi"</button>
      </div>

      {carregando && <p>Carregando heróis...</p>}
      {erro && <p>{erro}</p>}

      {heroiDetalhe && (
        <div>
          <h2>{heroiDetalhe.name}</h2>
          <img
            src={`${heroiDetalhe.thumbnail.path}.${heroiDetalhe.thumbnail.extension}`}
            alt={heroiDetalhe.name}
          />
          <p><strong>Descrição:</strong> {heroiDetalhe.description || 'Sem descrição disponível.'}</p>

          <h3>Quadrinhos:</h3>
          <ul>
            {heroiDetalhe.comics.items.length > 0 ? (
              heroiDetalhe.comics.items.map((comic, idx) => <li key={idx}>{comic.name}</li>)
            ) : (
              <li>Sem quadrinhos disponíveis.</li>
            )}
          </ul>

          <button onClick={() => setHeroiDetalhe(null)}>Fechar Detalhes</button>
        </div>
      )}

      {herois.length > 0 && !heroiDetalhe && (
        <div>
          <h2>Heróis encontrados: {herois.length}</h2>
          <ul>
            {herois.map(heroi => (
              <li key={heroi.id}>
                <h3>{heroi.name}</h3>
                <img
                  src={`${heroi.thumbnail.path}.${heroi.thumbnail.extension}`}
                  alt={heroi.name}
                />
                <p><strong>ID:</strong> {heroi.id}</p>
                <p><strong>Descrição:</strong> {heroi.description || 'Sem descrição disponível.'}</p>

                <button onClick={() => toggleFavorito(heroi)}>
                  {estaFavorito(heroi.id) ? 'Desfavoritar' : 'Favoritar'}
                </button>

                <button onClick={() => setHeroiDetalhe(heroi)}>
                  Ver Detalhes
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {favoritos.length > 0 && (
        <div>
          <h2>Heróis Favoritos ({favoritos.length})</h2>
          <ul>
            {favoritos.map(fav => (
              <li key={fav.id}>
                <h4>{fav.name}</h4>
                <img
                  src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`}
                  alt={fav.name}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
