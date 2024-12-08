import React from 'react';
import "../styles/sobre.css";
import sobreIcon from "../assets/icons/sobre.png";
import planejamentoIcon from "../assets/icons/planejamento.png";
import analisarIcon from "../assets/icons/analisar.png";

function Sobre() {
  return (
    <section id="sobre" className="container-sobre">
      <div className="info-content">
        <h2 className="cases-title">Como funciona o FinanceApp</h2>
        <div className="cases-grid">
          <div className="case-card">
            <img src={sobreIcon} alt="Ícone Controle de Gastos" className="case-logo" />
            <p className="case-description">
              Controle seus gastos de forma simples e eficiente, categorizando cada despesa e identificando onde está gastando mais.
            </p>
          </div>
          <div className="case-card">
            <img src={planejamentoIcon} alt="Ícone Planejamento Financeiro" className="case-logo" />
            <p className="case-description">
              Planeje suas metas financeiras, acompanhe o progresso e ajuste suas estratégias para alcançar seus objetivos.
            </p>
          </div>
          <div className="case-card">
            <img src={analisarIcon} alt="Ícone Organização de Orçamentos" className="case-logo" />
            <p className="case-description">
              Organize seu orçamento mensal ou anual, defina limites de gastos e monitore sua estabilidade financeira em tempo real.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sobre;
