import React from "react";
import "../styles/apresentation.css";
import apresentation from "../assets/apresentation.png";

function Apresentation() {
  return (
    <section id="apresentation">
      <div className="apresentation">
        <div>
          <h3 className="info">FinanceApp</h3>
          <p className="descricao">
            A melhor maneira de transformar suas finanças pessoais.
          </p>
          <p className="sub-descricao">
          Com o FinanceApp, você pode acompanhar seus gastos, planejar metas financeiras e 
          manter suas finanças organizadas de forma simples e eficiente.Transforme a maneira 
          como você lida com seu dinheiro e alcance seus objetivos com mais tranquilidade.
          </p>
        </div>
        <div>
          <img src={apresentation} alt="Ícone Controle de Gastos" />
        </div>
      </div>
    </section>
  );
}

export default Apresentation;
