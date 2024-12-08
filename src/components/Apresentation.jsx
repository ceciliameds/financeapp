import React from 'react';
import "../styles/apresentation.css"
import apresentation from "../assets/apresentation.png";

function Apresentation() {
  return (
    <section id="apresentation">
      <div className="apresentation">
        <div>
          <h3 className='info'>FinanceApp</h3>
          <p className='descricao'>
            A melhor forma para organizar suas finanças.
          </p>
        </div>
        <div>
        <img src={apresentation} alt="Ícone Controle de Gastos"/> 
        </div>
      </div>
    </section>
  );
}

export default Apresentation;
