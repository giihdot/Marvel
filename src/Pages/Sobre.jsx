export default function Sobre() {
  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#e62429", marginBottom: "20px" }}>
        🦸 SOBRE O MARVELVERSE
      </h1>

      <p style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
        Criado por uma equipe de jovens devengers em formação, o MarvelVerse é mais do que um app —
        é uma verdadeira jornada pelo multiverso do front-end!
        <br /><br />
      </p>

      <h2 style={{ fontSize: "1.8rem", color: "#e62429", marginTop: "30px" }}>🚀 O QUE APRENDEMOS:</h2>
      <ul style={{ fontSize: "1.1rem", lineHeight: "1.6", marginLeft: "20px" }}>
        <li>Como usar <strong>React</strong> com <code>useState</code>, <code>useEffect</code> e rotas dinâmicas</li>
        <li>Como consumir APIs reais e tratar respostas (inclusive quando o JSON aparece misteriosamente vazio 👀)</li>
        <li>Como dividir um projeto em componentes reutilizáveis</li>
        <li>Como aplicar estilos e manter o app responsivo</li>
        <li>Como criar desafios interativos que realmente engajam os usuários</li>
        <li>Como pensar como devs de verdade: testando, errando, corrigindo, rindo... e seguindo em frente!</li>
      </ul>

      <h2 style={{ fontSize: "1.8rem", color: "#e62429", marginTop: "30px" }}>🌟 CURIOSIDADES NERDS:</h2>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
        💡 Usamos a API oficial da Marvel para trazer dados reais de personagens como Homem de Ferro, Capitão América,
        Feiticeira Escarlate e muitos outros!<br />
        🧠 Incluímos funcionalidades bônus como modo escuro, ranking de personagens favoritos, e até mesmo desafios secretos do “Portal Dimensional”.<br />
        😂 E sim, criamos descrições como "Herói misterioso, só aparece quando não tem bug no código". Porque humor também é um superpoder.
      </p>

      <h2 style={{ fontSize: "1.8rem", color: "#e62429", marginTop: "30px" }}>🫱🏻‍🫲🏽 TRABALHO EM EQUIPE</h2>
      <p style={{ fontSize: "1.2rem", lineHeight: "1.7" }}>
        Mesmo com diferentes estilos e ritmos, nossa equipe conseguiu dividir as tarefas, ajudar uns aos outros,
        revisar códigos e trazer ideias novas. Aprendemos que na programação — assim como nos Vingadores —
        cada um tem um papel fundamental, e juntos somos mais fortes!
      </p>

      <h2 style={{ fontSize: "1.8rem", color: "#e62429", marginTop: "30px" }}>💬 DEPOIMENTO FINAL:</h2>
      <blockquote style={{
        fontStyle: "italic",
        color: "#555",
        borderLeft: "5px solid #e62429",
        paddingLeft: "15px",
        marginTop: "20px",
        fontSize: "1.1rem"
      }}>
        "Aprendemos muito mais do que código. Aprendemos a colaborar, a resolver problemas e a confiar no nosso
        potencial. Que esse projeto seja só o começo do nosso multiverso dev!" – Equipe MarvelVerse
      </blockquote>
    </div>
  );
}
