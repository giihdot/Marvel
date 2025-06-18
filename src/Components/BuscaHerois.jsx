import { useState } from 'react';
import md5 from 'md5';

const publicKey = '3e8bef26ce91bf500ab574be3cc76285';
const privateKey = '450a95fff14e78a0aa9686b4d4889bfd52e90435';

export default function BuscaHeroi() {
  const [busca, setBusca] = useState('');
  const [heroi, setHeroi] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function buscar() {
    const termo = busca.trim();
    if (!termo) return;

    setCarregando(true);
    setErro('');
    setHeroi(null);

    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);

    const url = `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(termo)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (dados.data.results.length > 0) {
        setHeroi(dados.data.results[0]);
      } else {
        setErro('Herói não encontrado.');
      }
    } catch (e) {
      setErro('Erro ao buscar herói.');
      console.error(e);
    } finally {
      setCarregando(false);
    }
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
      <button onClick={buscar} style={{ padding: '8px' }}>
        Buscar
      </button>

      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {heroi && (
        <div style={{ marginTop: '20px' }}>
          <h2>{heroi.name}</h2>
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
              heroi.comics.items.map((comic, index) => (
                <li key={index}>{comic.name}</li>
              ))
            ) : (
              <li>Sem quadrinhos disponíveis.</li>
            )}
          </ul>

          <h3>Séries</h3>
          <ul>
            {heroi.series.items.length > 0 ? (
              heroi.series.items.map((serie, index) => (
                <li key={index}>{serie.name}</li>
              ))
            ) : (
              <li>Sem séries disponíveis.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
