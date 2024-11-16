import React from "react";
import "./assets/global.css"; // Se tiver algum CSS personalizado

export function LoadingScreen() {
  return (
    <div className="loading-container">
      <div className="snow-pile"></div>
      <img
        className="penguin"
        src="https://i.redd.it/zx1g0310iigd1.gif"
        alt="Pinguim cavando"
        width="300" // Ajuste o tamanho conforme necessário
      />
      <p>Carregando...</p>
    </div>
  );
}
