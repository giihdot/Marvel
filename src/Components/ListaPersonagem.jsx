import { useState, useEffect } from 'react';
import md5 from 'md5';
import './ListaPersonagem.css'
import DetalhesHeroi from './DetalhesHeroi';

const publicKey = '3e8bef26ce91bf500ab574be3cc76285';
const privateKey = '450a95fff14e78a0aa9686b4d4889bfd52e90435';

export default function ListaPersonagens({ busca }) {
  const [personagens, setPersonagens] = useState([]);
  const [heroiSelecionado, setHeroiSelecionado] = useState(null);

  useEffect(() => {
    const fetchPersonagens = async () => {
      const ts = new Date().getTime();
      const hash = md5(ts + privateKey + publicKey);
      const baseURL = 'https://gateway.marvel.com/v1/public/characters';
      const url = `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=20&nameStartsWith=${busca}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPersonagens(data.data.results);
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      }
    };

    if (busca.length >= 2) fetchPersonagens();
  }, [busca]);

  return (
    <div>
      {heroiSelecionado ? (
        <DetalhesHeroi heroi={heroiSelecionado} onVoltar={() => setHeroiSelecionado(null)} />
      ) : (
        <div>
          {personagens.map((p) => (
            <div key={p.id} onClick={() => setHeroiSelecionado(p)} style={{ cursor: 'pointer', marginBottom: 10 }}>
              <strong>{p.name}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}