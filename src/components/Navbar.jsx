import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <header className="header-main">
      <div className="header-container">
        <h3 className="header-main-logo">FinanceApp</h3>
        <nav>
          <ul className="menu">
            <li className="menu-item">
              <a href="#sobre" className="menu-item-link">
                Sobre
              </a>
            </li>
            <li className="menu-item">
              <Link to="/login" className="menu-item-link">
                Entrar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
