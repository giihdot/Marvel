// Importa os hooks useEffect e useState do React
import { useEffect, useState } from "react";

// Importa o Axios para fazer requisições HTTP
import axios from "axios";

// Importa a biblioteca md5 para gerar o hash de autenticação da API da Marvel
import md5 from "md5";

// Importa o arquivo de estilos CSS
import "./ListaPersonagem.css";

// Chave pública fornecida pela Marvel para autenticação da API
const PUBLIC_KEY = "3e8bef26ce91bf500ab574be3cc76285";

// Chave privada fornecida pela Marvel (normalmente deve ser mantida segura)
const PRIVATE_KEY = "450a95fff14e78a0aa9686b4d4889bfd52e90435";

// Componente principal que renderiza os personagens da Marvel
const MarvelCharacters = () => {
  // Estado para armazenar a lista de personagens
  const [characters, setCharacters] = useState([]);

  // Estado para indicar se os dados ainda estão sendo carregados
  const [loading, setLoading] = useState(true);

  // Hook useEffect que executa o código quando o componente for montado
  useEffect(() => {
    // Função assíncrona para buscar personagens na API da Marvel
    const fetchCharacters = async () => {
      // Gera o timestamp atual (necessário para a autenticação)
      const ts = new Date().getTime();

      // Gera o hash md5 (timestamp + chave privada + chave pública)
      const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

      // Monta a URL de requisição para a API da Marvel com autenticação
      const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=12`;

      try {
        // Faz a requisição GET à API
        const response = await axios.get(url);

        // Armazena os resultados da requisição no estado "characters"
        setCharacters(response.data.data.results);
      } catch (error) {
        // Em caso de erro na requisição, exibe no console
        console.error("Erro ao buscar personagens:", error);
      } finally {
        // Define o estado de loading como falso, independente do resultado
        setLoading(false);
      }
    };

    // Chama a função de busca ao montar o componente
    fetchCharacters();
  }, []); // O array vazio garante que isso rode apenas uma vez, na montagem

  // Enquanto estiver carregando, exibe uma mensagem
  if (loading) return <p>Carregando personagens...</p>;

  // Quando o carregamento terminar, exibe a lista de personagens
  return (
    <>
      <div className="container">
        <h1 className="titulo">PERSONAGENS DA MARVEL </h1>
        
        {/* Grid com os cards dos personagens */}
        <div className="grid">
          {characters.map((char) => (
            <div key={char.id} className="card">
              <h2 className="nome">{char.name}</h2>
              
              {/* Exibe a imagem do personagem */}
              <div className="imagem">
                <img
                // Monta a URL da imagem do personagem usando as propriedades `path` e `extension`
                // Exemplo de resultado: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg"
                  src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                // Define o texto alternativo da imagem com o nome do personagem
                // Isso melhora a acessibilidade e é exibido caso a imagem não carregue
                  alt={char.name}
                />
              </div>

              {/* Botão de favoritar (sem funcionalidade ainda) */}
              <button className="botao">Favoritar</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default MarvelCharacters;

