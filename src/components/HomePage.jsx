import React from "react";
import Navbar from "./Navbar";
import "../styles/navbar.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Bem-vindo à sua plataforma de gestão financeira!
          </h1>
          <p className="hero-description">
            Organize seus gastos, acompanhe suas finanças e tenha o controle
            total da sua vida financeira.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2 className="about-title">Controle Total das Suas Finanças</h2>
          <p className="about-description">
            Nossa plataforma oferece ferramentas poderosas para você controlar
            suas despesas, entradas e saldos de maneira prática e eficiente.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
