import React from 'react';
import "../styles/sobre.css";

function Sobre() {
  return (
    <section id="sobre" className="info">
      <div className="container-sobre">
        <div className="info-content">
          <h3>Sobre o FinanceApp</h3>
          <p>
            Bem-vindo ao <strong>FinanceApp</strong>, sua plataforma confiável para gerenciar e organizar suas finanças de forma simples e eficiente. Sabemos que controlar seu dinheiro pode ser desafiador, mas nosso objetivo é facilitar esse processo, ajudando você a alcançar estabilidade financeira e tomar decisões conscientes.
          </p>
          <h4>Por que o FinanceApp foi criado?</h4>
          <p>
            O FinanceApp foi projetado para atender às necessidades de pessoas que desejam:
          </p>
          <ul>
            <li className="info-content">Acompanhar seus gastos e receitas em tempo real.</li>
            <li>Criar metas financeiras e monitorar o progresso.</li>
            <li>Identificar onde é possível economizar.</li>
            <li>Planejar um orçamento mensal ou anual com base em suas prioridades.</li>
          </ul>
          <h4>O que você pode fazer no FinanceApp?</h4>
          <ul>
            <li><strong>Monitorar Gastos:</strong> Registre suas despesas diárias e identifique onde você está gastando mais.</li>
            <li><strong>Gerenciar Receitas:</strong> Adicione suas fontes de renda e acompanhe os valores que entram no seu orçamento.</li>
            <li><strong>Estabelecer Metas:</strong> Crie metas de economia ou de investimentos e acompanhe o progresso ao longo do tempo.</li>
            <li><strong>Gerar Relatórios:</strong> Visualize gráficos e relatórios que mostram a evolução de suas finanças de forma clara e compreensível.</li>
            <li><strong>Organizar Orçamentos:</strong> Configure categorias e limites de orçamento para manter seus gastos sob controle.</li>
          </ul>
          <h4>Por que usar o FinanceApp?</h4>
          <p>
            No <strong>FinanceApp</strong>, acreditamos que todos podem alcançar a liberdade financeira com as ferramentas certas e o planejamento adequado. Estamos aqui para oferecer suporte a você nessa jornada, fornecendo uma experiência confiável e orientada para resultados.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sobre;
