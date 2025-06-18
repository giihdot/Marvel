import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [temaEscuro, setTemaEscuro] = useState(() => {
    return localStorage.getItem("tema") === "escuro";
  });

  useEffect(() => {
    document.body.style.backgroundColor = temaEscuro ? "#121212" : "#fff";
    document.body.style.color = temaEscuro ? "#fff" : "#000";
    localStorage.setItem("tema", temaEscuro ? "escuro" : "claro");
  }, [temaEscuro]);

  return (
    <button onClick={() => setTemaEscuro(!temaEscuro)} style={{ margin: 10 }}>
      Mudar para tema {temaEscuro ? "claro" : "escuro"}
    </button>
  );
}
