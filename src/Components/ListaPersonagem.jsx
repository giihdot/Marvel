import React, { useEffect, useState } from 'react';
// Importa o Axios para fazer requisições HTTP
import axios from 'axios';
// Importa o md5 para gerar o hash de autenticação exigido pela API da Marvel
import md5 from 'md5';

const PUBLIC_KEY = '3e8bef26ce91bf500ab574be3cc76285';
const PRIVATE_KEY = '450a95fff14e78a0aa9686b4d4889bfd52e90435';

const MarvelCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      // Gera um timestamp atual, exigido pela Marvel
      const ts = new Date().getTime();
      // Gera o hash md5 com base no timestamp, chave privada e chave pública
      const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
      // Monta a URL da requisição com os parâmetros obrigatórios e o limite de 20 personagens
      const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=20`;

    try {
        // Faz a requisição GET à API da Marvel
        const response = await axios.get(url);
        // Salva os personagens retornados no estado
        setCharacters(response.data.data.results);
      } catch (error) {
        // Em caso de erro, exibe no console
        console.error('Erro ao buscar personagens:', error);
      } finally {
        // Após a requisição (com sucesso ou erro), desativa o loading
        setLoading(false);
      }
    };

// Executa a função de busca
    fetchCharacters();
  }, []); // Executa apenas uma vez ao montar (array de dependências vazio)

  if (loading) return <p>Carregando personagens...</p>;

// Retorna o conteúdo com os personagens da Marvel
  return (
    <div>
      <h1>Personagens da Marvel</h1>
      <ul>
        {characters.map((char) => (
          <li>
            <h2>{char.name}</h2>
            <img
              src={`${char.thumbnail.path}.${char.thumbnail.extension}`} // Monta o caminho completo da imagem (path + extension)
              alt={char.name} // Texto alternativo para a imagem (usando o nome do personagem)
            />
            <p>{char.description || 'Sem descrição disponível.'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarvelCharacters;

