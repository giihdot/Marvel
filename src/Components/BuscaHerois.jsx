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

  // Carregar favoritos do localStorage ao iniciar o app
  useEffect(() => {
    const favoritosSalvos = localStorage.getItem(STORAGE_KEY);
    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos));
    }
  }, []);

  // Função para salvar favoritos no localStorage
  function salvarFavoritos(novosFavoritos) {
    setFavoritos(novosFavoritos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novosFavoritos));
  }

  // Favoritar/desfavoritar um herói
  function toggleFavorito(heroi) {
    const existe = favoritos.find(fav => fav.id === heroi.id);

    if (existe) {
      // Remove dos favoritos
      const novos = favoritos.filter(fav => fav.id !== heroi.id);
      salvarFavoritos(novos);
    } else {
      // Adiciona aos favoritos só com id, nome e thumbnail (pedido no desafio)
      const novoFav = {
        id: heroi.id,
        name: heroi.name,
        thumbnail: heroi.thumbnail,
      };
      salvarFavoritos([...favoritos, novoFav]);
    }
  }

  // Limpar o cofre (localStorage e estado)
  function limparCofre() {
    localStorage.removeItem(STORAGE_KEY);
    setFavoritos([]);
    alert('Todos os arquivos confidenciais foram destruídos 💣');
  }

  async function buscar() {
    const termo = busca.trim();
    if (!termo) return;

    setCarregando(true);
    setErro('');
    setHerois([]);

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

  // Função que diz se o herói está favoritado
  function estaFavorito(id) {
    return favoritos.some(fav => fav.id === id);
  }

  return (
    <div>
      <h1>Busca de Heróis da Marvel</h1>
      <input
        type="text"
        placeholder="Digite o nome do herói"
        value={busca}
        onChange={e => setBusca(e.target.value)}
        style={{ padding: '8px', width: '70%', marginRight: '10px' }}
      />
      <button onClick={buscar} style={{ padding: '8px', marginRight: '10px' }}>
        Buscar
      </button>
      <button onClick={limparCofre} style={{ padding: '8px', backgroundColor: '#d33', color: 'white' }}>
        Limpar Cofre!
      </button>

      {carregando && <p>Carregando heróis...</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {/* Lista de heróis da busca */}
      {herois.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Heróis encontrados: {herois.length}</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {herois.map(heroi => (
              <li
                key={heroi.id}
                style={{
                  marginBottom: '30px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '15px',
                }}
              >
                <h3>{heroi.name}</h3>
                <img
                  src={`${heroi.thumbnail.path}.${heroi.thumbnail.extension}`}
                  alt={heroi.name}
                  style={{ width: '150px', borderRadius: '8px' }}
                />
                <p><strong>ID:</strong> {heroi.id}</p>
                <p><strong>Descrição:</strong> {heroi.description || 'Sem descrição disponível.'}</p>

                <button
                  onClick={() => toggleFavorito(heroi)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: estaFavorito(heroi.id) ? '#4caf50' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  {estaFavorito(heroi.id) ? 'Desfavoritar' : 'Favoritar'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lista de heróis favoritos */}
      {favoritos.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2>Heróis Favoritos ({favoritos.length})</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {favoritos.map(fav => (
              <li
                key={fav.id}
                style={{
                  marginBottom: '20px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '10px',
                }}
              >
                <h4>{fav.name}</h4>
                <img
                  src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`}
                  alt={fav.name}
                  style={{ width: '100px', borderRadius: '8px' }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}