// Importa o hook useState para controlar os estados no componente
import { useState } from 'react';
// Importa a biblioteca md5, usada para gerar o hash exigido pela API da Marvel
import md5 from 'md5';

// Chaves da API da Marvel (pode deixar no código nesse projeto)
const publicKey = '3e8bef26ce91bf500ab574be3cc76285';
const privateKey = '450a95fff14e78a0aa9686b4d4889bfd52e90435';

// Função principal do componente, exportada como padrão
export default function BuscaHeroi() {
  // Estado para guardar o texto digitado no input
  const [busca, setBusca] = useState('');
  // Estado para guardar o herói retornado pela API
  const [heroi, setHeroi] = useState(null);
  // Estado para indicar se a busca está carregando
  const [carregando, setCarregando] = useState(false);
  // Estado para exibir mensagens de erro
  const [erro, setErro] = useState('');

  // Função executada ao clicar no botão "Buscar"
  async function buscar() {
    // Remove espaços em branco antes e depois do texto digitado
    const termo = busca.trim();

    // Se o campo estiver vazio, não faz nada
    if (!termo) return;

    // Ativa o carregamento, limpa erro e resultado anterior
    setCarregando(true);
    setErro('');
    setHeroi(null);

    // Geração de hash para autenticação da API da Marvel
    const ts = new Date().getTime(); // timestamp
    const hash = md5(ts + privateKey + publicKey); // hash md5 baseado na fórmula da Marvel

    // Monta a URL da requisição com o nome digitado
    const url = `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(termo)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
      // Faz a requisição para a API
      const resposta = await fetch(url);
      // Converte o retorno para JSON
      const dados = await resposta.json();

      // Se a API retornar algum resultado, guarda o herói no estado
      if (dados.data.results.length > 0) {
        setHeroi(dados.data.results[0]);
      } else {
        // Caso não encontre nenhum herói com o nome buscado
        setErro('Herói não encontrado.');
      }
    } catch (e) {
      // Captura erros de requisição ou conexão
      setErro('Erro ao buscar herói.');
      console.error(e);
    } finally {
      // Desativa o carregamento em qualquer situação
      setCarregando(false);
    }
  }

  // JSX que será renderizado na tela
  return (
    <div>
      {/* Título da página */}
      <h1>Busca de Heróis da Marvel</h1>

      {/* Input para digitar o nome do herói */}
      <input
        type="text"
        placeholder="Digite o nome do herói"
        value={busca} // Valor atual do input
        onChange={e => setBusca(e.target.value)} // Atualiza o estado ao digitar
        style={{ padding: '8px', width: '70%', marginRight: '10px' }} // Estilo inline
      />

      {/* Botão que aciona a função de busca */}
      <button onClick={buscar} style={{ padding: '8px' }}>
        Buscar
      </button>

      {/* Exibe mensagem de carregamento, se estiver buscando */}
      {carregando && <p>Carregando...</p>}

      {/* Exibe erro, se houver */}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {/* Se houver um herói encontrado, exibe os dados dele */}
      {heroi && (
        <div style={{ marginTop: '20px' }}>
          {/* Nome do herói */}
          <h2>{heroi.name}</h2>

          {/* Imagem do herói */}
          <img
            src={`${heroi.thumbnail.path}.${heroi.thumbnail.extension}`} // Monta a URL da imagem
            alt={heroi.name}
            style={{ width: '300px', borderRadius: '8px' }}
          />

          {/* Informações básicas do herói */}
          <p><strong>ID:</strong> {heroi.id}</p>
          <p><strong>Descrição:</strong> {heroi.description || 'Sem descrição disponível.'}</p>
          <p><strong>Última modificação:</strong> {new Date(heroi.modified).toLocaleDateString()}</p>

          {/* Lista de quadrinhos em que o herói aparece */}
          <h3>Quadrinhos (Comics)</h3>
          <ul>
            {heroi.comics.items.length > 0 ? (
              // Lista os quadrinhos se existirem
              heroi.comics.items.map((comic, index) => (
                <li key={index}>{comic.name}</li>
              ))
            ) : (
              // Exibe mensagem se não houver quadrinhos
              <li>Sem quadrinhos disponíveis.</li>
            )}
          </ul>

          {/* Lista de séries em que o herói aparece */}
          <h3>Séries</h3>
          <ul>
            {heroi.series.items.length > 0 ? (
              // Lista as séries se existirem
              heroi.series.items.map((serie, index) => (
                <li key={index}>{serie.name}</li>
              ))
            ) : (
              // Exibe mensagem se não houver séries
              <li>Sem séries disponíveis.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
