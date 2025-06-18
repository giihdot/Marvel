
import { useState, useEffect } from "react";
import md5 from "md5";
import "./BuscaHerois.css";

// Define a chave pública da API Marvel
const publicKey = "3e8bef26ce91bf500ab574be3cc76285";

// Define a chave privada da API Marvel
const privateKey = "450a95fff14e78a0aa9686b4d4889bfd52e90435";

// Define a chave para armazenar os favoritos no localStorage
const STORAGE_KEY = "marvel_herois_favoritos";

// Exporta o componente BuscaHerois como padrão
export default function BuscaHerois() {
  
  // Declara os estados para busca, heróis, favoritos, carregando, erro e detalhes do herói
  const [busca, setBusca] = useState("");
  const [herois, setHerois] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [heroiDetalhe, setHeroiDetalhe] = useState(null);

  
  // useEffect para carregar os favoritos do localStorage ao montar o componente
  useEffect(() => {
    const favoritosSalvos = localStorage.getItem(STORAGE_KEY);
    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos)); // Converte os favoritos salvos de JSON para objeto
    }
  }, []); // Executa apenas uma vez ao montar o componente

  
  // Função para salvar os favoritos no estado e no localStorage
  function salvarFavoritos(novosFavoritos) {
    setFavoritos(novosFavoritos); // Atualiza o estado de favoritos
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novosFavoritos)); // Salva os favoritos no localStorage
  }

  
  // Função para alternar o status de favorito de um herói
  function toggleFavorito(heroi) {
    const existe = favoritos.find((fav) => fav.id === heroi.id); // Verifica se o herói já está nos favoritos
    if (existe) {
      const novos = favoritos.filter((fav) => fav.id !== heroi.id); // Remove o herói dos favoritos
      salvarFavoritos(novos); // Salva os novos favoritos
    } else {
      const novoFav = {
        id: heroi.id,
        name: heroi.name,
        thumbnail: heroi.thumbnail,
      };
      salvarFavoritos([...favoritos, novoFav]); // Adiciona o herói aos favoritos
    }
  }

  
  // Função para limpar todos os favoritos do localStorage
  function limparCofre() {
    localStorage.removeItem(STORAGE_KEY); // Remove os favoritos do localStorage
    setFavoritos([]); // Limpa o estado de favoritos
    alert("Todos os arquivos confidenciais foram destruídos! 💣"); // Alerta ao usuário
  }

  
  // Função assíncrona para buscar heróis na API da Marvel
  async function buscarHerois(termoBusca) {
    const termo = termoBusca.trim(); // Remove espaços em branco do termo de busca
    if (!termo) return; // Se o termo estiver vazio, não faz nada

    setCarregando(true); // Define o estado de carregando como verdadeiro
    setErro(""); // Limpa qualquer erro anterior
    setHerois([]); // Limpa a lista de heróis
    setHeroiDetalhe(null); // Limpa os detalhes do herói

    const ts = new Date().getTime(); // Gera um timestamp atual
    const hash = md5(ts + privateKey + publicKey); // Gera um hash usando o timestamp, chave privada e chave pública

    // Monta a URL da API com os parâmetros necessários
    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${encodeURIComponent(
      termo
    )}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
      const resposta = await fetch(url); // Faz a requisição para a API
      const dados = await resposta.json(); // Converte a resposta para JSON

      if (dados.data.results.length > 0) {
        setHerois(dados.data.results); // Atualiza o estado com os heróis encontrados
      } else {
        setErro("Nenhum herói encontrado."); // Define uma mensagem de erro se nenhum herói for encontrado
      }
    } catch (e) {
      setErro("Erro ao buscar heróis."); // Define uma mensagem de erro em caso de falha na requisição
      console.error(e); // Loga o erro no console
    } finally {
      setCarregando(false); // Define o estado de carregando como falso
    }
  }

  
  // Função para verificar se um herói está nos favoritos
  function estaFavorito(id) {
    return favoritos.some((fav) => fav.id === id); // Retorna verdadeiro se o herói estiver nos favoritos
  }

  
  // Renderiza o componente
  return (
    <div className="container">
      <h1 className="titulo">Busca de Heróis da Marvel</h1>

      <div className="busca-container">
        <input
          className="input-busca"
          type="text"
          placeholder="Digite o nome do herói (EM INGLÊS)"
          value={busca} // Define o valor do input como o estado de busca
          onChange={(e) => setBusca(e.target.value)} // Atualiza o estado de busca ao digitar
        />
        <button className="btn" onClick={() => buscarHerois(busca)}>
          Buscar
        </button>
        <button className="btn" onClick={limparCofre}>
          Limpar Cofre!
        </button>
        <button className="btn" onClick={() => buscarHerois("Spi")}>
           Missão "Spi" 
        </button>
      </div>

      {carregando && <p className="mensagem">Carregando heróis...</p>} // Exibe mensagem de carregamento se estiver carregando
      {erro && <p className="erro">{erro}</p>} // Exibe mensagem de erro se houver

      {heroiDetalhe && ( // Se houver detalhes do herói, renderiza o card de detalhes
        <div className="detalhe-card">
          <h2>{heroiDetalhe.name}</h2>
          <img
            src={`${heroiDetalhe.thumbnail.path}.${heroiDetalhe.thumbnail.extension}`} // Exibe a imagem do herói
            alt={heroiDetalhe.name} // Define o texto alternativo da imagem
          />
          <p>
            <strong>Descrição:</strong>{" "}
            {heroiDetalhe.description || "Sem descrição disponível."} // Exibe a descrição do herói
          </p>

          <h3>Quadrinhos:</h3>
          <ul>
            {heroiDetalhe.comics.items.length > 0 ? ( // Se houver quadrinhos, renderiza a lista
              heroiDetalhe.comics.items.map((comic, idx) => (
                <li key={idx}>{comic.name}</li> // Exibe o nome de cada quadrinho
              ))
            ) : (
              <li>Sem quadrinhos disponíveis.</li> // Mensagem se não houver quadrinhos
            )}
          </ul>

          <button className="btn" onClick={() => setHeroiDetalhe(null)}>
            Fechar Detalhes
          </button>
        </div>
      )}

      {herois.length > 0 && !heroiDetalhe && ( // Se houver heróis encontrados e não houver detalhes, renderiza a lista de heróis
        <div className="card-heroi">
          <h2>Heróis encontrados: {herois.length}</h2>
          <ul className="lista-herois">
            {herois.map((heroi) => ( // Mapeia cada herói encontrado
              <li key={heroi.id} className="item-heroi">
                <div className="card-conteudo">
                  <div className="card-column">
                  <img
                    src={`${heroi.thumbnail.path}.${heroi.thumbnail.extension}`} // Exibe a imagem do herói
                    alt={heroi.name} // Define o texto alternativo da imagem
                  />
                  <h3>{heroi.name}</h3> // Exibe o nome do herói
                    <p>
                      <strong>ID:</strong> {heroi.id} // Exibe o ID do herói
                    </p>
                    </div>
                  <div className="info-heroi">

                    <p>
                      <strong>Descrição:</strong>{" "}
                      {heroi.description || "Sem descrição disponível."} // Exibe a descrição do herói
                    </p>
                    <button onClick={() => toggleFavorito(heroi)}>
                      {estaFavorito(heroi.id) ? "Desfavoritar" : "Favoritar"} // Alterna entre "Favoritar" e "Desfavoritar"
                    </button>
                    <button onClick={() => setHeroiDetalhe(heroi)}>
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {favoritos.length > 0 && ( // Se houver heróis favoritos, renderiza a lista de favoritos
        <div className="card-favorito">
          <h2>Heróis Favoritos ({favoritos.length})</h2>
          <ul className="lista-favorito">
            {favoritos.map((fav) => ( // Mapeia cada herói favorito
              <li key={fav.id} className="item-favorito">
                <h4>{fav.name}</h4> // Exibe o nome do herói favorito
                <img
                  src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`} // Exibe a imagem do herói favorito
                  alt={fav.name} // Define o texto alternativo da imagem
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

