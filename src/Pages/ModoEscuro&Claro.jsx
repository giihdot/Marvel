import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Estado para verificar se o tema escuro está ativo
  const [temaEscuro, setTemaEscuro] = useState(() => {
    // Pega o tema salvo no localStorage (se for "escuro", retorna true)
    return localStorage.getItem("tema") === "escuro";
  });

  // é executado sempre que o estado "temaEscuro" mudar
  useEffect(() => {
    // Se for tema escuro, altera o fundo e o texto para cores escuras/clara
    document.body.style.backgroundColor = temaEscuro ? "#121212" : "#fff";
    // Altera a cor do texto: branco no tema escuro, preto no tema claro
    document.body.style.color = temaEscuro ? "#fff" : "#000";
    // Salva a preferência do tema no localStorage (como "escuro" ou "claro")
    localStorage.setItem("tema", temaEscuro ? "escuro" : "claro");
  }, [temaEscuro]); // Esse efeito roda sempre que o valor de "temaEscuro" mudar

  // Renderiza um botão que, ao ser clicado, inverte o valor de "temaEscuro"
  return (
    <button
      onClick={() => setTemaEscuro(!temaEscuro)} // Inverte o tema ao clicar
      style={{ margin: 10 }} // Estilo simples para dar um espaçamento
    >
      {/* Texto do botão muda conforme o tema atual */}
      Mudar para tema {temaEscuro ? "claro" : "escuro"}
    </button>
  );
}

