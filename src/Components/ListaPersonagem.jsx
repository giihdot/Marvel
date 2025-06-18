// // Importando hooks do React
// import { useState, useEffect } from 'react';
// // Importando o pacote md5 para gerar o hash exigido pela API da Marvel
// import md5 from 'md5';

// // Chaves da API da Marvel
// const publicKey = '3e8bef26ce91bf500ab574be3cc76285';
// const privateKey = '450a95fff14e78a0aa9686b4d4889bfd52e90435';

// // Criando o componente ListaPersonagens
// export default function ListaPersonagens({ busca }) {
//   // Criando o estado para armazenar os personagens
//   const [personagens, setPersonagens] = useState([]);

//   // useEffect para executar a busca quando o texto da busca mudar
//   useEffect(() => {
//     // Função para buscar os personagens na API da Marvel
//     async function buscarPersonagens() {
//       // Criando um timestamp (tempo atual em milissegundos)
//       const ts = new Date().getTime();
//       // Criando o hash MD5 usando ts + chave privada + chave pública
//       const hash = md5(ts + privateKey + publicKey);

//       // Montando a URL da requisição para a Marvel
//       const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${busca}&ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=10`;

//       try {
//         // Fazendo a requisição para a API
//         const resposta = await fetch(url);
//         // Convertendo a resposta em JSON
//         const dados = await resposta.json();
//         // Salvando os personagens encontrados no estado
//         setPersonagens(dados.data.results);
//       } catch (erro) {
//         // Se der erro, exibe no console
//         console.log('Erro:', erro);
//       }
//     }

//     // Se o texto da busca tiver pelo menos 2 letras, faz a busca
//     if (busca.length >= 2) {
//       buscarPersonagens();
//     } else {
//       // Se não, limpa a lista
//       setPersonagens([]);
//     }
//   }, [busca]); // Executa o useEffect sempre que o "busca" mudar

//   // O que será exibido na tela
//   return (
//     <div>
//       {/* Se não tiver personagens, mostra uma mensagem */}
//       {personagens.length === 0 && <p>Digite um nome para buscar</p>}

//       {/* Listando cada personagem */}
//       {personagens.map(function (p) {
//         return (
//           <div key={p.id}>
//             {/* Nome do personagem */}
//             <p>Nome: {p.name}</p>

//             {/* Imagem do personagem */}
//             <img
//               src={p.thumbnail.path + '.' + p.thumbnail.extension}
//               alt={p.name}
//               width="100"
//             />

//             {/* Descrição ou mensagem de ausência de descrição */}
//             <p>{p.description || 'Sem descrição.'}</p>

//             {/* Linha separadora */}
//             <hr />
//           </div>
//         );
//       })}
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import md5 from 'md5';

const publicKey = '3e8bef26ce91bf500ab574be3cc76285';
const privateKey = '450a95fff14e78a0aa9686b4d4889bfd52e90435';

export default function ListaPersonagens({ termoBusca }) {
  const [personagens, setPersonagens] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    async function buscarPersonagens() {
      if (!termoBusca) return;

      setCarregando(true);

      const ts = new Date().getTime();
      const hash = md5(ts + privateKey + publicKey);

      const url = `https://gateway.marvel.com/v1/public/characters?name=${termoBusca}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

      try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        setPersonagens(dados.data.results);
      } catch (erro) {
        console.log('Erro ao buscar personagens:', erro);
      } finally {
        setCarregando(false);
      }
    }

    buscarPersonagens();
  }, [termoBusca]);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      {personagens.length === 0 && <p>Nenhum personagem encontrado.</p>}

      {personagens.map((p) => (
        <div key={p.id}>
          <p>Nome: {p.name}</p>
          <img
            src={`${p.thumbnail.path}.${p.thumbnail.extension}`}
            alt={p.name}
            width="100"
          />
          <p>{p.description || 'Sem descrição.'}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
