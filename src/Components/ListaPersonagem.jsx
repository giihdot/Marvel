import { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';
import './ListaPersonagem.css';

const PUBLIC_KEY = '3e8bef26ce91bf500ab574be3cc76285';
const PRIVATE_KEY = '450a95fff14e78a0aa9686b4d4889bfd52e90435';

const MarvelCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      const ts = new Date().getTime();
      const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
      const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=12`;

      try {
        const response = await axios.get(url);
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Carregando personagens...</p>;

  return (
    <div className="container">
      <h1 className="titulo">Personagens da Marvel</h1>
      <div className="grid">
        {characters.map((char) => (
          <div key={char.id} className="card">
            <h2 className="nome">{char.name}</h2>
            <div className="imagem">
              <img
                src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                alt={char.name}
              />
            </div>
            <button className="botao">Favoritar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarvelCharacters;